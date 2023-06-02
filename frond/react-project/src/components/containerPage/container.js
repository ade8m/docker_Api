import { response } from "express";
import React, { useState, useEffect} from "react";

const ContainerLogic = ()=>{
    const [containers, setContainers] = useState([]);
    const [activeContainer, setActiveContainer] = useState("");
    const [images, setImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState("");


  useEffect(() => {
    
    fetchActiveContainers();
    fetchAvailableImages();
  }, []);

  const fetchActiveContainers = () =>{
    //get active containrs from server
    fetch("http://localhost:3001/container/startedContainers")
    .then((response) => response.json)
    .then((data) =>{
        setContainers(data);
    })
    .catch((error) => {
        console.error("Error get active containers:", error);
      });
  };

  const fetchAvailableImages = () =>{
    //get the images from docker hub
    fetch("http://localhost:3001/")
    .then((response) => response)
    .then((data) =>{
        setImages(data);
    })
    .catch((error) => {
        console.error("Error get images:", error);
      });
  };
 
  const handleCreateContainer = () => {
    // Create a new container using the selected image
    fetch("http://localhost:3001/", {
      method: "POST",
      body: JSON.stringify({ image: selectedImage }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
    
        console.log("Container created:", data);
        fetchActiveContainers();
      })
      .catch((error) => {
        console.error("Error creating container:", error);
      });
  };
  const handleStartContainer = (containerId) => {
    
    fetch(`http://localhost:3001/container${containerId}/start`, {
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Container started:", data);
        fetchActiveContainers();
      })
      .catch((error) => {
        console.error("Error starting container:", error);
      });
  };
  const handleStopContainer = (containerId) => {
    
    fetch(`http://localhost:3001/${containerId}/stop`, {
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Container stopped:", data);
        fetchActiveContainers();
      })
      .catch((error) => {
        console.error("Error stopping container:", error);
      });
  };

    return (
        <div>
          <h2>Container Management</h2>
    
          <h3>Create Container</h3>
          <label>Select Image:</label>
          <select
            value={selectedImage}
            onChange={(e) => setSelectedImage(e.target.value)}
          >
            <option value="">Select an image</option>
            {images.map((image) => (
              <option key={image.id} value={image.id}>
                {image.name}
              </option>
            ))}
          </select>
          <button onClick={handleCreateContainer}>Create</button>
    
          <h3>Active Containers</h3>
          {containers.length > 0 ? (
            <ul>
              {containers.map((container) => (
                <li key={container.id}>
                  Container ID: {container.id} - Image: {container.image}
                  <button onClick={() => handleStartContainer(container.id)}>
                    Start
                  </button>
                  <button onClick={() => handleStopContainer(container.id)}>
                    Stop
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No active containers</p>
          )}
        </div>
      );
    };
    
export default ContainerLogic;