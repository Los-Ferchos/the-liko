import { Box } from "@mui/material"
import WishButton from "../../buttons/WishButton"
import RatingProduct from "./RatingProduct"

const RatingWishProduct = ({ rating, reviews, productId }) => (
    <Box display="flex" alignItems="center">
        <Box>
            <RatingProduct rating={rating} reviews={reviews} />
        </Box>
        <Box display="flex" alignItems="flex-end" justifyContent="flex-end" ml="auto">
            <WishButton productId={productId}/>
        </Box>
    </Box>
)

export default RatingWishProduct;
