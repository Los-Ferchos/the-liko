import React, { useEffect, useState } from "react";
import { Button, Box, Typography, IconButton } from "@mui/material";
import { IoCloudUploadOutline, IoCloseSharp } from "react-icons/io5";
import { truncateString } from "../../../utils/methods";

const allowedFormats = ['image/bmp', 'image/tiff', 'image/jpeg', 'image/gif', 'image/png', 'image/svg', 'image/webp'];
const maxSize = 5 * 1024 * 1024;

/**
 * ImageUploader component for uploading images with drag-and-drop functionality.
 * @component
 * @param {Object} props - The component props.
 * @param {File} props.file - The currently selected image file.
 * @param {function} props.setFile - The callback function to set the image file.
 * @param {string} [props.text="Selected image:"] - The text to display when an image is selected.
 * @param {string} props.errorMsg - The error message to display.
 * @param {function} props.handleErrorMsg - The callback function to handle error messages.
 * @param {Number} props.initMarginTop - The margin top of the component
 * @returns {JSX.Element} - The rendered ImageUploader component.
 */
const ImageUploader = (
  { 
    file, 
    setFile, 
    text = "Selected image:", 
    errorMsg, 
    handleErrorMsg, 
    productData, 
    edit, 
    label = "Product image *",
    initMarginTop = 12
  }
) => {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if(edit) setImageUrl(productData.imgUrl ? productData.imgUrl : null)
  }, [productData])
  
  /**
   * Validates the selected image file based on allowed formats and maximum size.
   * @param {File} file - The selected image file.
   * @returns {boolean} - True if the file is valid, false otherwise.
   */
  const validateImage = (file) => {
    if (!allowedFormats.includes(file.type)) {
      handleErrorMsg("image", "Invalid image file format, allowed formats are: BMP, TIFF, JPEG, GIF, PNG, SVG and WEBP");
      return false;
    } else if (file.size > maxSize) {
      handleErrorMsg("image", "Invalid image file size, maximum size allowed is 5MB");
      return false;
    }
    return true;
  }

  /**
   * Handles the drop event for the image file.
   * @param {Object} e - The drop event.
   */
  const handleDrop = (e) => {
    setBorderColor("#ccc");
    e.preventDefault();
    if (file) return;
    const imageFile = e.dataTransfer.files[0];
    if (!validateImage(imageFile)) return;
    setFile(imageFile);
    setImageUrl(URL.createObjectURL(imageFile));
    handleErrorMsg("image", "");
  };

  /**
   * Handles the file selection event.
   * @param {Object} e - The file selection event.
   */
  const handleFileSelect = (e) => {
    if (file) return;
    const imageFile = e.target.files[0];
    if (!validateImage(imageFile)) return;
    setFile(imageFile);
    setImageUrl(URL.createObjectURL(imageFile));
    handleErrorMsg("image", "");
  };

  const [borderColor, setBorderColor] = useState("#ccc");

  /**
   * Handles the drag-over event.
   * @param {Object} e - The drag-over event.
   */
  const handleOnDragOver = (e) => {
    e.preventDefault();
    if (file !== "") return;
    setBorderColor("#f00");
  }

  /**
   * Handles the drag-out event.
   * @param {Object} e - The drag-out event.
   */
  const handleOnDragOut = (e) => {
    e.preventDefault();
    setBorderColor("#ccc");
  }

  /**
   * Deletes the currently selected image.
   */
  const deleteImage = () => {
    setFile("");
    setImageUrl(null);
    handleErrorMsg("imgUrl", "")
  }

  return (
    <>
      <Typography marginLeft={3} variant="subtitle1" color={"#555"} marginTop={initMarginTop}>{label}</Typography>
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
              <Typography>{text} {file.name && truncateString(file.name)}</Typography>
            </Box>
            <img src={imageUrl} alt="Selected" style={{ maxHeight: 200, width: 'auto', maxWidth: '100%' }} />
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
