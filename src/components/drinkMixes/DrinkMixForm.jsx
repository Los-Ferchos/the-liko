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
import { handleUploadImage, uploadCombo } from '../../utils/methods';
import ImageUploader from '../products/form/ImgUploader';
import ProductsChecklist from '../products/selection/ProductsChecklist';

/**
 * Component for rendering a form to add a new drink mix.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {Object} props.drinkMixData - The drink mix data to initialize the form.
 * 
 * @component
 * @returns {JSX.Element} - The rendered DrinkMixForm component.
 */
const DrinkMixForm = ({ edit = false, drinkMixData = {
    name: '',
    description: '',
    ingredients: [''],
    relatedProducts: [],
    preparationSteps: ['']
  } }) => {
  const navigate = useNavigate();

  const [file, setFile] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState(drinkMixData);

  const [formError, setFormError] = useState({
    name: '',
    description: '',
    image: '', 
    ingredients: '',
    preparationSteps: '',
    relatedProducts: ''
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
   * Handles changes in form fields by searching by key and value.
   *
   * @param {Object} key - The key to edit the form data.
   * @param {Object} value - The value to edit the form data.
   */
  const handleChangeByKeyAndValue = (key, value) => {
    setError(false);
    setSuccess(false);
    setFormData({ ...formData, [key]: value });
    handleErrorMsg(key, '')
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
        if(value === '' && key !== "items")
            formErrorCopy[key] = "This field is required, please fill it";
    });

    if(file === '' && (!comboData.imgUrl || Object.keys(formError).includes("imgUrl")))
        formErrorCopy.image = "This field is required, please upload an image of your product."
    if(formData.items.length === 0)
      formErrorCopy.items = "Please, select at least one product."

    setFormError(formErrorCopy)

    let isThereError = false;
    Object.entries(formErrorCopy).forEach(([key, value]) => {
        if(value !== '') isThereError = true;
    });
    console.log(formErrorCopy)
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

    const drinkMixDataUp = { ...formData, image: (file === '' && comboData.imgUrl) ? comboData.imgUrl : imageStatus.url };
    setFormData(drinkMixDataUp);
    const success = await uploadCombo(drinkMixDataUp, edit, comboData._id ? comboData._id : "");
    setLoading(false);
    setError(!success);

    if(success){
      setSuccess(true);
      setTimeout(() => {
        navigate("/admin/view-drink-mixes")
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
                  placeholder='Eg: Chufflay'
                  value={formData.name}
                  onChange={handleChange}
                  errorMsg={formError.name}
                  handleErrorMsg={handleErrorMsg}
                  maxLength={50}
                />

                <FieldText
                  label="Description"
                  name="description"
                  placeholder='Eg: Drink composed of one part liquor and another part soda, to which slices of lemon are added'
                  value={formData.description}
                  onChange={handleChange}
                  multiline
                  rows={4}
                  errorMsg={formError.description}
                  handleErrorMsg={handleErrorMsg}
                  maxLength={500}
                />

                <ImageUploader
                  setFile={setFile} 
                  file={file} 
                  errorMsg={formError.image}
                  handleErrorMsg={handleErrorMsg} 
                  handleChange={handleChange} 
                  productData={comboData}
                  edit={edit}
                  label="Drink Mix image *"
                />
            </Grid>

            <Grid item xs={12} md={6}>
                <ProductsChecklist
                  label='Products related to the drink mix:'
                  errorMessage={formError.relatedProducts}
                  clearError={() => handleErrorMsg("relatedProducts", "")}
                  items={formData.relatedProducts}
                  setItems={(items) => handleChangeByKeyAndValue("relatedProducts", items)}
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
                    {`Drink Mix ${edit ? "edited" : "added"} succesfully`}
                  </Typography>
                }
            </Grid>
        </Grid>
    </form>
  );
};

export default DrinkMixForm;