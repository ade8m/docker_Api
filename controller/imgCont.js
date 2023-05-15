const axios = require('axios');

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