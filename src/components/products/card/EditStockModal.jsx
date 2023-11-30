import { Box, Modal, Typography } from '@mui/material';
import React, { useState } from 'react';
import FieldText from '../../fields/FieldText';

const EditStockModal = ({ open, handleClose, product={}}) => {

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
          value={product.quantity}
          //onChange={handleChange}
          //errorMsg={formError.stock}
          //handleErrorMsg={handleErrorMsg}
          maxLength={10}
      />
        </Box>
     </Modal>
    );
};

export default EditStockModal;