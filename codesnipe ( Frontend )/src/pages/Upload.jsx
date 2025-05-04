import React, { useState, useEffect } from "react";

const UploadForm = () => {
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState(null);
  const[data, setData] = useState([]);
    console.log(photo);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("photo", photo);

    try {
      const response = await fetch("http://localhost:3000/image/upload", {
        method: "POST",
        body: formData, // Don't set Content-Type! Let fetch handle it.
      });

      if (response.ok) {
        alert("Upload successful");
      } else {
        alert("Upload failed");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred");
    }
  };


  return (
    <>
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="file"
        onChange={(e) => setPhoto(e.target.files[0])}
        accept="image/*"
      />
      <button type="submit">Upload</button>
    </form>
    <ImageGallery />
    </>
  );
};

export default UploadForm;



export const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/image")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched data:", data);
        if (Array.isArray(data)) {
          setImages(data);
        } else if (Array.isArray(data.images)) {
          setImages(data.images);
        } else {
          throw new Error("Invalid data format");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Uploaded Images</h2>
      {images.map((img) => (
        <div key={img._id}>
          <p>{img.name}</p>
          <img
            src={`http://localhost:3000/image/${img._id}`}
            alt={img.name}
            width="200"
          />
        </div>
      ))}
    </div>
  );
};
