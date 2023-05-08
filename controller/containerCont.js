const Docker = require('dockerode');
const docker1 = new Docker({ socketPath: '/var/run/docker.sock' });
const docker = new Docker();

exports.createContainer = (req, res) => {
  const containerOptions = {
    Image: 'nginx:latest',
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
    }
  
    // Container created successfully
    console.log('Container created:', container.id);
      // Start the container
  container.start((err) => {
    if (err) {
      console.error('Error starting container:', err);
      return;
    }

    console.log('Container started:', container.id);
  });
});

  
  
 /* 
  docker.createContainer(containerConfig).then((container) => {
    console.log(`Container created with ID ${container.id}`);
    // Start container
    return container.start();
  }).then(() => {
    console.log('Container started');
    res.send('Container created and started successfully');
  }).catch((err) => {
    console.error(err);
    res.status(500).send('Error creating container');
  });*/
};