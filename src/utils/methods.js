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
 * Converts a string to lowercase and replaces spaces with hyphens.
 *
 * @param {string} str - The string to convert.
 * @returns {string} - The hyphened string.
 */
export const getHyphenedString = (str) => str.toLowerCase().replace(" ", "-");