import ProductCardLoader from "../card/ProductCardLoader";
import { Grid } from "@mui/material";

function ProductCarouselLoader() {
    const numberOfProducts = 5;
    const productLoaders = [];

    for (let i = 0; i < numberOfProducts; i++) {
        productLoaders.push(<ProductCardLoader key={i} />);
    }

    return (
        <Grid container spacing={5}>
        {productLoaders}
        </Grid>
    );
}

export default ProductCarouselLoader;
