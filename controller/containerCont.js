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
