import React, { useEffect, useState } from "react";
import "./App.css";

function capitalize(s) {
  return s && s[0].toUpperCase() + s.slice(1);
}

function App() {
  const [breeds, setBreeds] = useState({});
  const [breed, setBreed] = useState("");
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    async function getBreeds() {
      const response = await fetch("https://dog.ceo/api/breeds/list/all");
      const data = await response.json();
      setBreeds(data.message);
    }
    getBreeds().then();
  }, []);

  useEffect(() => {
    const getRandom = async () => {
      const response = await fetch(
        "https://dog.ceo/api/breeds/image/random/10"
      );
      const data = await response.json();
      setPhotos(data.message);
    };
    getRandom().then();
  }, []);

  useEffect(() => {
    async function fetchBreed() {
      const response = await fetch(
        "https://dog.ceo/api/breed/" + breed + "/images/random/10"
      );
      const data = await response.json();
      setPhotos(data.message);
    }
    if (breed) {
      fetchBreed().then();
    }
  }, [breed]);

  return (
    <div className="App">
      <h1>Find a dog</h1>
      <select
        name="breed"
        id="breed"
        value={breed}
        onChange={(e) => setBreed(e.target.value)}
      >
        <option value="">Select breed</option>
        {Object.entries(breeds).map(([breed]) => (
          <option value={breed} key={breed}>
            {capitalize(breed)}
          </option>
        ))}
      </select>
      <div className="gallery">
        {photos.map((photo) => (
          <div className="photo" key={photo}>
            <img src={photo} alt={"dog"} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
