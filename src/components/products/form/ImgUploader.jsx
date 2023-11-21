import React, { useState } from "react";
import { Button, Box, Typography, IconButton } from "@mui/material";
import { IoCloudUploadOutline, IoCloseSharp } from "react-icons/io5";

const allowedFormats = ['image/bmp', 'image/tiff', 'image/jpeg', 'image/gif', 'image/png', 'image/svg', 'image/webp'];
const maxSize = 5 * 1024 * 1024;

const ImageUploader = ({ file, setFile, text = "Selected image:" }) => {
  const [imageUrl, setImageUrl] = useState(null);

  console.log(file)
  const handleDrop = (e) => {
    setBorderColor("#ccc");
    e.preventDefault();
    if(file) return;
    const imageFile = e.dataTransfer.files[0];
    console.log(imageFile)

    if(!imageFile.type.includes())
    if(imageFile.size > maxSize) {
        console.log('mal hermano')
        return;
    }
    console.log(imageFile)
    setFile(imageFile);
    setImageUrl(URL.createObjectURL(imageFile));
  };

  const handleFileSelect = (e) => {
    if(file) return;
    const imageFile = e.target.files[0];
    setFile(imageFile);
    setImageUrl(URL.createObjectURL(imageFile));
  };

  const [borderColor, setBorderColor] = useState("#ccc")

  const handleOnDragOver = (e) => {
    e.preventDefault();
    if(file !== "") return;
    setBorderColor("#f00")
  }

  const handleOnDragOut = (e) => {
    e.preventDefault();
    setBorderColor("#ccc");
  }

  const deleteImage = () => {
    setFile("");
    setImageUrl(null);
  }

  return (
    <Box
      onDrop={handleDrop}
      onDragOver={handleOnDragOver}
      onDragLeave={handleOnDragOut}
      p={3}
      textAlign="center"
      borderTop={1.4}
      borderBottom={1.4}
      borderLeft={1.4}
      borderRight={1.4}
      style={{
        marginTop: 24,
        paddingTop: 24,
        paddingBottom: 24,
        borderRadius: "6px",
        borderColor: borderColor
      }}
    >
      <Typography variant="h6">Product image: </Typography>
      {imageUrl ? (
        <>
          <Box mb={2}>
            <Typography>{text} {file.name}</Typography>
          </Box>
          <img src={imageUrl} alt="Selected" style={{ maxHeight: 200, width: 'auto' }} />
          <IconButton onClick={deleteImage}>
            <IoCloseSharp />
          </IconButton>
        </>
      ) : (
        <>
          <Box mb={4} mt={4}>
            <IoCloudUploadOutline size={64} color={"#999"} />
            <Typography color={"grey"}>Drag & drop an image here</Typography>
            <Typography color={"grey"}>or</Typography>
          </Box>
          <input
            accept="image/*"
            id="contained-button-file"
            type="file"
            style={{ display: "none" }}
            onChange={handleFileSelect}
          />
          <label htmlFor="contained-button-file">
            <Button variant="outlined" component="span">
              Select an image from your device
            </Button>
          </label>
        </>
      )}
    </Box>
  );
};

export default ImageUploader;