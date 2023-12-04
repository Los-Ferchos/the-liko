import { Box } from "@mui/material";
import WishButton from "../../buttons/WishButton";
import RatingProduct from "./RatingProduct";

/**
 * Displays the rating of a product along with a wish button.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {number} props.rating - The rating of the product.
 * @param {number} props.reviews - The number of reviews for the product.
 * @param {string} props.productId - The unique identifier of the product.
 * 
 * @returns {JSX.Element} Rendered RatingWishProduct component.
 */
const RatingWishProduct = ({ rating, reviews, productId, isSlide }) => (
  <Box display="flex" alignItems="center">
    {
      isSlide ? <>
        <Box display="flex">
          <RatingProduct rating={rating} reviews={reviews} />
          <WishButton productId={productId} />
        </Box>
      </> : <>
        <Box>
          <RatingProduct rating={rating} reviews={reviews} />
        </Box>

        <Box display="flex" alignItems="flex-end" justifyContent="flex-end" ml="auto">
          <WishButton productId={productId} />
        </Box>
      </>
    }
  </Box>
);

export default RatingWishProduct;
