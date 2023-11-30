import { Box, Button, Grid, Modal, Typography } from '@mui/material';
import React, { useState } from 'react';
import FieldText from '../../fields/FieldText';
import { uploadProduct } from '../../../utils/methods';

const EditStockModal = ({ open, handleClose, product={}}) => {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        borderRadius: '15px',
        p: 4,
      };

  const [errorMsg, setErrorMesage] = useState("");

    /**
   * Sets the error message for a specific form field.
   *
   * @param {string} name - The name of the form field.
   * @param {string} val - The error message.
   */
    const handleErrorMsg = () => {
      setErrorMesage("");
    };

    const [value, setValue] = useState(parseInt(product.quantity, 10));

  /**
   * Handles changes in form fields.
   *
   * @param {Object} e - The event object.
   */
  const handleChange = (e, maxLength) => {
    const inputValue = e.target.value.toString().slice(0, maxLength)
    setError(false);
    setSuccess(false);
    setValue( (parseInt(inputValue, 10)) ?  parseInt(inputValue,10) : '');
    handleErrorMsg('')
  };

  

  const handleSumbit = async (e) => {
    e.preventDefault();
    setLoading(true);

    product.quantity = value;
    const edit = true;

    const success = await uploadProduct( { 
      ...product,
      name: product.name,
      description: product.description,
      stock: product.quantity,
      image: product.imgUrl, 
      category: product.category,
      subcategory: product.subcategory,
      price: product.price.value, 
      brand: product.details.brand,
      abv: parseFloat(product.details.abv),
      type: product.details.type
  }, edit, product._id ? product._id : "");

    setLoading(false);
    setError(!success);
    handleClose

  }

    return (
        <Modal
        open={open}
        onClose={handleClose}
        sx={{borderRadius:'25px'}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" color='primary' variant="h5" sx={{fontWeight:'900', textAlign:'center'}} component="h2">
            Set Stock
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Update the stock of the product
          </Typography>
          <FieldText
              label="Stock"
              name="stock"
              type="number"
              typeNumber='int'
              placeholder='Eg: 50'
              value={value}
              onChange={handleChange}
              errorMsg={errorMsg}
              handleErrorMsg={handleErrorMsg}
              maxLength={10}
      />
       <Grid 
              item 
              xs={12} md={12} 
              display={"flex"} alignItems={"center"} justifyContent={"center"} 
              marginTop={10}
            >
                <Button 
                  style={{ fontSize: 15, marginRight:14, paddingLeft: 20, paddingRight: 20 }} 
                  type="submit" 
                  variant="contained" 
                  color="primary" 
                  disabled={loading}
                  onClick={handleSumbit}
                >
                    {loading ? "Saving..." : "Save"}
                </Button>

                { loading && <span className="small-loader"></span> }

                <Button 
                  style={{ fontSize: 15, paddingLeft: 20, paddingRight: 20 }} 
                  variant="outlined" 
                  color="primary" 
                  disabled={loading}
                >
                  Cancel
                </Button>
            </Grid>
        </Box>
     </Modal>
    );
};

export default EditStockModal;