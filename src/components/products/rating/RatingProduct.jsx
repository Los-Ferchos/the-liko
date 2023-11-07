import { FaStar, FaStarHalf } from 'react-icons/fa';
import { Box, Typography } from '@mui/material';

const RatingProduct = ({ rating = 0, reviews = 0 }) => {
  const totalStars = 5;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;

  return (
    <Box display="flex" alignItems="center">
        <FaStar color="#000" size={14} style={{ marginTop: -2 }} />
        <div className="rating-middle">
            <Typography variant='body-2'>{rating}</Typography>
        </div>
        <Typography variant='body-2'>{`(${reviews})`}</Typography>
    </Box>
  );
};

export default RatingProduct;
