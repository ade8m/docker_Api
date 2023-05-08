const Docker = require('dockerode');
const docker = new Docker();

exports.createContainer = (req, res) => {
  const containerConfig = {
    ImgName: req.body.ImgName,
    ContainerName: req.body.containerName,
    cmd: ['nginx', '-g', 'daemon off;'],
    Tty: true,
    HostConfig: {
      PortBindings: {
        '80/tcp': [
          {
            Port: req.body.portNumber,
          },
        ],
      },
    },
  };
  
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
  });
};