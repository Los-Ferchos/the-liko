import { FaStar } from 'react-icons/fa';
import { Box, Typography } from '@mui/material';

/**
 * Displays the product rating along with the number of reviews using star icon.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {number} [props.rating=0] - The rating of the product (default is 0).
 * @param {number} [props.reviews=0] - The number of reviews for the product (default is 0).
 * 
 * @returns {JSX.Element} Rendered RatingProduct component.
 */
const RatingProduct = ({ rating = 0, reviews = 0 }) => (
  <Box display="flex" alignItems="center">
    <FaStar color="#000" size={14} style={{ marginTop: -2 }} />

    <div className="rating-middle">
      <Typography variant='body-2'>{rating}</Typography>
    </div>

    <Typography variant='body-2'>{`(${reviews})`}</Typography>
  </Box>
);

export default RatingProduct;
