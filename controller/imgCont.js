const Docker = require('dockerode');
const docker = new Docker();

exports.createImage = (req, res) => {
  const imageConfig = {
    fromImage: req.body.fromImage,
  };

  docker.pull(req.body.fromImage, (err, stream) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error pulling image');
    }

    docker.buildImage(stream, imageConfig).then((image) => {
      console.log(`Image created with ID ${image.id}`);
      res.send('Image created successfully');
    }).catch((err) => {
      console.error(err);
      res.status(500).send('Error creating image');
    });
  });
};
