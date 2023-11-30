import React, { useState } from 'react';
import {
  Button,
  Grid,
  Typography,
} from '@mui/material';
import '../../assets/styles/loaderBottle.css'
import { useNavigate } from 'react-router-dom';
import useWindowSize from '../hooks/useWindowSize';
import FieldText from '../fields/FieldText';
import { handleUploadImage, uploadProduct } from '../../utils/methods';
import ImageUploader from '../products/form/ImgUploader';
import ProductsChecklist from '../products/selection/ProductsChecklist';

/**
 * Component for rendering a form to add a new product.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {Object} props.productData - The product data to initialize the form.
 * 
 * @component
 * @returns {JSX.Element} - The rendered ComboForm component.
 */
const ComboForm = ({ edit = false, productData: comboData = {
    name: '',
    description: '',
    stock: 1,
    price: 1,
  } }) => {
  const navigate = useNavigate();

  const [file, setFile] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const [nonRequiredFields, setNonRequiredFields] = useState([]);

  const [formData, setFormData] = useState(comboData);

  const [formError, setFormError] = useState({
    name: '',
    description: '',
    stock: '',
    image: '', 
    price: '',
  })

  /**
   * Handles changes in form fields.
   *
   * @param {Object} e - The event object.
   */
  const handleChange = (e, maxLength) => {
    const inputValue = e.target.value.toString().slice(0, maxLength)
    setError(false);
    setSuccess(false);
    setFormData({ ...formData, [e.target.name]: inputValue });
    handleErrorMsg(e.target.name, '')
  };

  /**
   * Sets the error message for a specific form field.
   *
   * @param {string} name - The name of the form field.
   * @param {string} val - The error message.
   */
  const handleErrorMsg = (name, val) => {
    setFormError({ ...formError, [name]: val });
  };

  /**
   * Validates form fields and file upload before submission.
   *
   * @returns {boolean} - Indicates whether the form is valid.
   */
  const validateFiles = () => {
    const formErrorCopy = { ...formError }
    Object.entries(formData).forEach(([key, value]) => {
        if(value === '' && !nonRequiredFields.includes(key))
            formErrorCopy[key] = "This field is required, please fill it";
    });

    if(file === '' && (!comboData.imgUrl || Object.keys(formError).includes("imgUrl")))
        formErrorCopy.image = "This field is required, please upload an image of your product."
    
    setFormError(formErrorCopy)

    let isThereError = false;
    Object.entries(formErrorCopy).forEach(([key, value]) => {
        if(value !== '') isThereError = true;
    });
    return !isThereError;
  }

  /**
   * Handles the form submission.
   *
   * @param {Object} e - The event object.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!validateFiles()) return;

    setLoading(true);
    let imageStatus;
    if(file !== ''){
      imageStatus = await handleUploadImage(file);
      if(!imageStatus.success){
        setLoading(false);
        setError(true);
        return;
      }
    }

    const productDataUp = { ...formData, image: (file === '' && comboData.imgUrl) ? comboData.imgUrl : imageStatus.url };
    setFormData(productDataUp);
    const success = await uploadProduct(productDataUp, edit, comboData._id ? comboData._id : "");
    setLoading(false);
    setError(!success);

    if(success){
      setSuccess(true);
      setTimeout(() => {
        navigate("/admin/view-combos")
      }, 1500);
    }
  };

  const { width } = useWindowSize();

  return (
    <form onSubmit={handleSubmit} noValidate>
        <Grid container spacing={width > 960 ? 12 : 0}>
            <Grid item xs={12} md={6}>
                <FieldText
                  label="Name"
                  name="name"
                  placeholder='Eg: Fernet'
                  value={formData.name}
                  onChange={handleChange}
                  errorMsg={formError.name}
                  handleErrorMsg={handleErrorMsg}
                  maxLength={50}
                />

                <FieldText
                  label="Description"
                  name="description"
                  placeholder='Eg: Bitter alcoholic drink made from several types of herbs, which are macerated in grape alcohol.'
                  value={formData.description}
                  onChange={handleChange}
                  multiline
                  rows={4}
                  errorMsg={formError.description}
                  handleErrorMsg={handleErrorMsg}
                  maxLength={500}
                />


                <FieldText
                  label="Price in USD"
                  name="price"
                  type="number"
                  placeholder='Eg: 15.99'
                  value={formData.price}
                  onChange={handleChange}
                  errorMsg={formError.price}
                  handleErrorMsg={handleErrorMsg}
                  typeNumber='price'
                  maxLength={10}
                />

                <ImageUploader
                  setFile={setFile} 
                  file={file} 
                  errorMsg={formError.image}
                  handleErrorMsg={handleErrorMsg} 
                  handleChange={handleChange} 
                  productData={comboData}
                  edit={edit}
                />
            </Grid>

            <Grid item xs={12} md={6}>
                <ProductsChecklist
                  label='Products included in the combo:'
                />
            </Grid>

            <Grid 
              item 
              xs={12} md={12} 
              display={"flex"} alignItems={"center"} justifyContent={"center"} 
              marginTop={width > 960 ? 0 : 16}
            >
                <Button 
                  style={{ fontSize: 17, marginRight: 15, paddingLeft: 100, paddingRight: 100 }} 
                  type="submit" 
                  variant="contained" 
                  color="primary" 
                  size='large'
                  disabled={loading}
                >
                    {loading ? "Saving..." : "Save"}
                </Button>

                { loading && <span className="small-loader"></span> }
            </Grid>

            <Grid item xs={12} md={12} marginTop={width > 960 ? 0 : 12}>
                { error && <Typography color={"error"} textAlign={"center"}>There was an error, please try again.</Typography>}
                { success && 
                  <Typography color={"green"} textAlign={"center"}>
                    {`Product ${edit ? "edited" : "added"} succesfully`}
                  </Typography>
                }
            </Grid>
        </Grid>
    </form>
  );
};

export default ComboForm;
