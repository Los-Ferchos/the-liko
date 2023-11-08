import { FaStar, FaStarHalf } from 'react-icons/fa';
import { Box } from '@mui/material';

/**
 * @description
 * RatingStars component displays a row of stars based on the given rating value.
 *
 * @component
 * @example
 * // Usage in a parent component
 * // ...
 * // <RatingStars rating={4.5} />
 *
 * @param {Object} props - The properties to customize the RatingStars component.
 * @param {number} props.rating - The rating value to be displayed (can have decimals).
 * @returns {JSX.Element} Returns a row of stars representing the given rating value.
 */
const RatingStars = ({ rating }) => {
  const totalStars = 5;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;

  return (
    <Box display="flex" alignItems="center">
      {[...Array(fullStars)].map((_, index) => (
        <FaStar key={index} color="#EEBB58" />
      ))}
      {hasHalfStar && <FaStarHalf color="#EEBB58" />}
      {[...Array(totalStars - fullStars - (hasHalfStar ? 1 : 0))].map((_, index) => (
        <FaStar key={fullStars + index + 1} color="#EEBB58" />
      ))}
    </Box>
  );
};

export default RatingStars;
