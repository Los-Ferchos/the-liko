import React, { useState } from "react";
import { Button, Box, Typography, IconButton } from "@mui/material";
import { IoCloudUploadOutline, IoCloseSharp } from "react-icons/io5";

const allowedFormats = ['image/bmp', 'image/tiff', 'image/jpeg', 'image/gif', 'image/png', 'image/svg', 'image/webp'];
const maxSize = 5 * 1024 * 1024;

const ImageUploader = ({ file, setFile, text = "Selected image:", errorMsg, handleErrorMsg }) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [error, setError] = useState("")

  const validateImage = (file) => {
    if(!allowedFormats.includes(file.type)){
        handleErrorMsg("image", "Invalid image file format, allowed formats are: BMP, TIFF, JPEG, GIF, PNG, SVG, WEBP");
        return false;
    } else if(file.size > maxSize) {
        handleErrorMsg("image", "Invalid image file size, maximum size allowed is 5MB");
        return false;
    }
    return true;
  }

  const handleDrop = (e) => {
    setBorderColor("#ccc");
    e.preventDefault();
    if(file) return;
    const imageFile = e.dataTransfer.files[0];
    if(!validateImage(imageFile)) return;
    setFile(imageFile);
    setImageUrl(URL.createObjectURL(imageFile));
    handleErrorMsg("image", "")
  };

  const handleFileSelect = (e) => {
    if(file) return;
    const imageFile = e.target.files[0];
    if(!validateImage(imageFile)) return;
    setFile(imageFile);
    setImageUrl(URL.createObjectURL(imageFile));
    handleErrorMsg("image", "")
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
    <>
        <Typography marginLeft={3} variant="subtitle1" color={"#555"} marginTop={12}>Product image *</Typography>
        <Box
            onDrop={handleDrop}
            onDragOver={handleOnDragOver}
            onDragLeave={handleOnDragOut}
            p={3}
            textAlign="center"
            borderTop={2}
            borderBottom={2}
            borderLeft={2}
            borderRight={2}
            style={{
                paddingTop: 24,
                paddingBottom: 24,
                borderRadius: "6px",
                borderColor: borderColor,
                borderStyle: "dashed"
            }}
            >
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
        <br />
        {
            errorMsg !== "" && (
                <Typography marginLeft={6} color={"error"} variant="body2" textAlign={"left"}>{errorMsg}</Typography>
            )
        }
    </>
  );
};

export default ImageUploader;