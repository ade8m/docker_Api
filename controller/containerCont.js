const Docker = require('dockerode');
const Container = require('../modules/Container');
const docker1 = new Docker({ socketPath: '/var/run/docker.sock' });
const docker = new Docker();

exports.createContainer = (req, res) => {
  const imageName = req.body.imageName;
  const containerName = req.body.containerName;

  // Check if the required fields are present
  if (!imageName || !containerName) {
    return res.status(400).json({ error: 'Image name and container name are required' });
  }


  const containerOptions = {
    Image: imageName,
    Cmd: [],
    AttachStdin: false,
    AttachStdout: true,
    AttachStderr: true,
    Tty: false,
    OpenStdin: false,
    StdinOnce: false,
    
  };
  docker.createContainer(containerOptions, (err, container) => {
    if (err) {
      console.error('Error creating container:', err);
      return;
    };
 // Container created successfully
 console.log('Container created:', container.id);

 // Start the container
container.start((err) => {
if (err) {
 console.error('Error starting container:', err);
 return res.status(500).json({ error: 'Error starting container' });
}
/*
// Get stats of container use stats() methode with dockerode API
container.stats({ stream: false }, (err, stats) => {
  if (err) {
    console.error('Error retrieving container stats:', err);
    return res.status(500).json({ error: 'Error retrieving container stats' });
  }

 // Parse the container statistics to get RAM and disk usage
 const memoryStats = stats.memory_stats;
  const ramUsage = memoryStats.usage;
  const diskUsage = stats.disk_usage;
});
*/
//save container to the database
const newContainer = new Container({
  containerId: container.id,
  ContainerName: containerName,
  ImgName: imageName,
  //RamUsage:ramUsage,
 // DiskUsage: diskUsage,
  
})
newContainer.save()
      .then((savedContainer) => {
        console.log('Container saved:', savedContainer);
        res.status(200).json({ message: 'Container started and saved successfully' });
      })
      .catch((err) => {
        console.error('Error saving container:', err);
        res.status(500).json({ error: 'Error saving container' });
      });
});
});

  };
// start container
  exports.startContainer = (req, res) => {
    const containerId = req.body.containerId; 
  
    // Find the container by ID
    const container = docker.getContainer(containerId);
  
    // Start the container
    container.start((err) => {
      if (err) {
      
        res.status(500).json({ error: 'Error starting container' });
        return;
      }
  
      console.log('Container started:', containerId);
      res.status(200).json({ message: 'Container started successfully' });
    });
  };

 



// Route handler to stop a container

exports.stopContainer = (req, res) => {
  const containerId = req.params.containerId; // Assuming the container ID is passed as a URL parameter

  // Find the container by ID
  const container = docker.getContainer(containerId);

  // Stop the container
  container.stop((err) => {
    if (err) {
      console.error('Error stopping container:', err);
      res.status(500).json({ error: 'Error stopping container' });
      return;
    }

    console.log('Container stopped:', containerId);
    res.status(200).json({ message: 'Container stopped successfully' });
  });
};

//Get All Containers from database 

exports.getAllContainers =(req,res) =>{
  Container.find()
  .then((containers) =>{
    res.status(200).json(containers);
  })
  .catch ((err) =>{
    res.status(500).json({ error: 'Error retrieving containers' });
  });
  };


  //Route handler to get the list of started containers

  exports.getStartedContainers = (req, res) => {
    docker.listContainers({all:true ,filters:{status:['running']}} ,(err,containers) => {
      if(err){
        console.error('Error retrieving started containers:', err);
      res.status(500).json({ error: 'Error retrieving started containers' });
      return;
      }
      const startedContainers = containers.map((containerInfo) => {
        return {
          containerId: containerInfo.Id,
          containerName: containerInfo.Names[0].substring(1), // Remove the leading '/'
          imageName: containerInfo.Image,
        };
      });
  
      res.status(200).json(startedContainers);
    });
    };

    //stop All containers:

    exports.stopAllContainers = (req, res) => {
      docker.listContainers({ all: true }, (err, containers) => {
        if (err) {
          console.error('Error retrieving containers:', err);
          return res.status(500).json({ error: 'Error retrieving containers' });
        }
    
        const containerIds = containers.map((containerInfo) => containerInfo.Id);
    
        Promise.all(
          containerIds.map((containerId) => {
            const container = docker.getContainer(containerId);
            return container.stop();
          })
        )
          .then(() => {
            console.log('All containers stopped successfully');
            res.status(200).json({ message: 'All containers stopped successfully' });
          })
          .catch((err) => {
            console.error('Error stopping containers:', err);
            res.status(500).json({ error: 'Error stopping containers' });
          });
      });
    };
    
  // Remove docker container 
  
  exports.DeleteContainer =(req,res) =>{
    const containerId = req.params.containerId;
    const container = docker.getContainer(containerId);
    container.remove({force: true},(err) =>{
      if(err){
        res.status(500).json({ error: 'Error removing container' });
        return;
      }
      console.log('Container removed:', containerId);

      // Remove the container from the database
      Container.findOneAndDelete({ containerId: containerId }, (err, deletedContainer) => {
        if (err) {
          console.error('Error removing container from database:', err);
          res.status(500).json({ error: 'Error removing container from database' });
          return;
        }
  
        if (!deletedContainer) {
          res.status(404).json({ error: 'Container not found in the database' });
          return;
        }
  
        console.log('Container removed from the database:', deletedContainer);
        res.status(200).json({ message: 'Container removed successfully' });
      });
    });
    };
  
  