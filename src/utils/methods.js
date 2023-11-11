export const filterDataArray = (arrayToFilter, compareData, valueData) => 
    arrayToFilter.filter(cat => cat[compareData].toLowerCase().replace(" ", "-") === valueData);

export const capitalizeString = (str) => `${str.charAt(0).toUpperCase()}${str.slice(1).toLowerCase().replace("-", " ")}`;

export const getInactivePaths = (name) => {
    const inactivePaths = [{ title: "Home", href: "/" }]
    if(name != "")
        inactivePaths.push({ title: capitalizeString(name), href: `/${name}`})
    return inactivePaths;
}

export const getHyphenedString = (str) => str.toLowerCase().replace(" ", "-")