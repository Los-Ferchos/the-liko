import ProductCardLoader from "../card/ProductCardLoader";
import { Grid } from "@mui/material";
import '../../../assets/styles/carousel.css'

/**
 * Displays a grid of loading placeholders for product cards.
 *
 * @returns {JSX.Element} Rendered ProductsListLoader component.
 */
function ProductCarouselLoader() {
    const numberOfProducts = 4;
    const productLoaders = [];

    for (let i = 0; i < numberOfProducts; i++) {
        productLoaders.push(<ProductCardLoader key={i} className={"carousel-card"}/>);
    }

    return (
        <Grid container spacing={5}>
        {productLoaders}
        </Grid>
    );
}

export default ProductCarouselLoader;
