import { API_URL_LINK } from "./constants";

/**
 * Filters an array of objects based on a specific property and value, while ignoring case and replacing spaces with hyphens.
 *
 * @param {Object[]} arrayToFilter - The array to filter.
 * @param {string} compareData - The property to compare.
 * @param {string} valueData - The value to compare against.
 * @returns {Object[]} - The filtered array.
 */
export const filterDataArray = (arrayToFilter, compareData, valueData) => 
    arrayToFilter.filter(cat => cat[compareData].toLowerCase().replace(" ", "-") === valueData);

/**
 * Capitalizes the first letter of a string, converts the rest of the string to lowercase, and replaces hyphens with spaces.
 *
 * @param {string} str - The string to capitalize.
 * @returns {string} - The capitalized string.
 */
export const capitalizeString = (str) => `${str.charAt(0).toUpperCase()}${str.slice(1).toLowerCase().replace("-", " ")}`;

/**
 * Generates an array of inactive paths for navigation breadcrumbs.
 *
 * @param {string} name - The name to include in the inactive paths.
 * @returns {Object[]} - The array of inactive paths.
 */
export const getInactivePaths = (name) => {
    const inactivePaths = [{ title: "Home", href: "/" }];
    if (name !== "") {
        inactivePaths.push({ title: capitalizeString(name), href: `/${name}`});
    }
    return inactivePaths;
}

/**
 * Generates an array of inactive paths for admin navigation breadcrumbs.
 *
 * @param {string} name - The name to include in the inactive paths.
 * @returns {Object[]} - The array of inactive paths.
 */
export const getInactiveAdminPaths = (name) => {
  const inactivePaths = [{ title: "Admin", href: "/" }];
  if (name !== "") {
      inactivePaths.push({ title: capitalizeString(name), href: `/${name}`});
  }
  return inactivePaths;
}

/**
 * Converts a string to lowercase and replaces spaces with hyphens.
 *
 * @param {string} str - The string to convert.
 * @returns {string} - The hyphened string.
 */
export const getHyphenedString = (str) => str.toLowerCase().replace(" ", "-");

export const sendInvoice = async (userId, nit, cartItems, name, totalCost) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify({
            userId,
            nit: nit.trim() === '' ? "SIN NIT" : nit, 
            name: name.trim() === '' ? "SIN NOMBRE" : name,
            cartItems,
            totalCost: totalCost.toFixed(2)
        }),
    };

    try {
        const response = await fetch(`${API_URL_LINK}/send-invoice`, requestOptions);
        const data = await response.json();
        if (response.ok) {
            return true;
        } else return false;
    } catch (e) {
        return false;
    }
}

/**
 * Truncates a string if its length is greater than 30 characters.
 * Replaces characters from the 30th character until three characters before a dot with '...'.
 *
 * @param {string} inputString - The input string to be truncated.
 * @returns {string} - The truncated string.
 */
export const truncateString = (inputString) => {
  const maxLength = 30;

  if (inputString.length > maxLength) {
    const indexOfDot = inputString.lastIndexOf('.');

    if (indexOfDot !== -1 && indexOfDot > maxLength + 3) {
      const truncatedString = inputString.substring(0, maxLength) + '...' + inputString.substring(indexOfDot - 3);
      return truncatedString;
    }
  }

  return inputString;
}

/**
 * Handles the upload of an image to ImgBB using the provided file.
 *
 * @param {File} file - The image file to be uploaded.
 * @returns {Promise<{success: boolean, url: string}>} - An object indicating the success of the upload and the URL of the uploaded image.
 */
export const handleUploadImage = async(file) => {
    try {
      const imgbbApiKey = "a35353a7fbe2c639caeed1d21af3820b";
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch("https://api.imgbb.com/1/upload?key=" + imgbbApiKey, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      return { success: true, url: data.data.url }
    } catch (error) {
      return { success: false, url: '' }
    }
}

/**
 * Uploads product data to the specified API endpoint.
 *
 * @param {Object} productData - The product data to be uploaded.
 * @param {string} productData.name - The name of the product.
 * @param {string} productData.description - The description of the product.
 * @param {number} productData.stock - The stock quantity of the product.
 * @param {string} productData.image - The URL of the product image.
 * @param {string} productData.category - The category of the product.
 * @param {string} productData.subcategory - The subcategory of the product.
 * @param {number} productData.price - The price of the product.
 * @param {string} productData.brand - The brand of the product.
 * @param {number} productData.abv - The Alcohol By Volume (ABV) of the product.
 * @param {string} productData.type - The type of the product.
 * @returns {Promise<boolean>} - A promise indicating whether the product upload was successful.
 */
export const uploadProduct = async (
    productData = {
        name: '',
        description: '',
        stock: 0,
        image: '', 
        category: '',
        subcategory: '',
        price: 0,
        brand: '',
        abv: 0,
        type: ''
    }, edit = false, productId = ''
) => {
    const productJSON = {
        name: productData.name,
        description: productData.description,
        rating: productData.rating ? productData.rating : 0,
        totalReviews: productData.totalReviews ? productData.totalReviews : 0,
        sells: productData.sells ? productData.sells : 0,
        quantity: productData.stock,
        imgUrl: productData.image,
        category: productData.category,
        price: {
            value: productData.price,
            currency: "USD"
        },
        details: {
            abv: productData.abv,
            brand: productData.brand,
            type: productData.type
        },
        drinkMixes: [],
        combos: []
    }

    if(productData.subcategory !== ""){
      productJSON["subcategory"] = productData.subcategory;
    }

    try {
      const response = await fetch(`${API_URL_LINK}/products/${productId}`, {
        method: edit ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productJSON),
      });
  
      if (!response.ok) {
        return false;
      }
  
      const result = await response.json();
      return true;
    } catch (error) {
      return false;
    }
};


export const getLocalCurrencyCode = async () => {
  try {
    // Make a request to the Geoplugin API to get geolocation information using fetch
    const response = await fetch('http://www.geoplugin.net/json.gp');
    
    if (!response.ok) {
      throw new Error(`Error fetching geolocation: ${response.statusText}`);
    }

    // Parse the response JSON
    const data = await response.json();

    console.log(data)

    // Extract the currency code from the response data
    const currencyCode = data.geoplugin_currencyCode;

    console.log(currencyCode)

    return currencyCode;
  } catch (error) {
    console.error('Error fetching geolocation:', error);
    // Handle errors or return a default currency code if needed
    return 'USD';
  }
};
