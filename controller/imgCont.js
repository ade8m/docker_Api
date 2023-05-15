const axios = require('axios');
const Image = require('../modules/Image'); 
const Docker = require('dockerode');
const docker1 = new Docker({ socketPath: '/var/run/docker.sock' });


// Function to retrieve the list of Docker images
exports.getDockerImages = async (req, res) => {
  let imageNames = []; // Define imageNames variable as an empty array

  try {
    const response = await axios.get('https://registry.hub.docker.com/v2/repositories/library/?page_size=100');
    const repositories = response.data.results;

    // Extract the image names from the repositories array
    imageNames = repositories.map(repository => repository.name);

    console.log('Available Docker images:');
    imageNames.forEach(image => console.log(image));

    res.status(200).json(imageNames);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error retrieving Docker images' });
  }
};

// pull image 

exports.pullImage = async (req, res) => {
  const { imageName } = req.body;

  try {
    // Create a new Docker client
    const docker = new Docker();

    // Pull the specified image
    const stream = await docker.pull(imageName);

    // Monitor the pull progress
    await new Promise((resolve, reject) => {
      docker.modem.followProgress(stream, async (err, output) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          console.log('Image pulled successfully:', imageName);
          try {
            // Retrieve additional information about the pulled image
            const imageInspect = await docker.getImage(imageName).inspect();

            // Create a new document in the Image collection with the retrieved information
            await Image.create({
              ImgName: imageName,
              version: imageInspect.ContainerConfig.Labels['org.opencontainers.image.version'],
              description: imageInspect.ContainerConfig.Labels['org.opencontainers.image.description'],
              Dockerfile: imageInspect.ContainerConfig.Labels['org.opencontainers.image.source.dockerfile'],
              SourceCode: imageInspect.ContainerConfig.Labels['org.opencontainers.image.sourcecode'],
              Size: imageInspect.Size
            });
            console.log('Image saved in the database:', imageName);
          } catch (error) {
            console.error('Error saving image in the database:', error);
          }
          resolve(output);
        }
      });
    });

    res.status(200).json({ message: 'Image pulled successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error pulling Docker image' });
  }
};