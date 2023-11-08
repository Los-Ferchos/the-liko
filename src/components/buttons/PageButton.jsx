import { Button } from '@mui/material';

/**
 * Button component representing a page number in pagination.
 * 
 * @param {Object} props - The properties passed to the component.
 * @param {number} props.page - The page number to be displayed on the button.
 * @param {boolean} props.isCurrent - A boolean indicating if the button represents the current active page.
 * @param {Function} props.onClick - The function to be called when the button is clicked.
 * 
 * @returns {JSX.Element} Rendered PageButton component.
 */
const PageButton = ({ page, isCurrent, onClick }) => (
    <Button
      variant={isCurrent ? "contained" : "text"}
      color={isCurrent ? "primary" : "gray"}
      onClick={onClick}
      style={{ 
        padding: 4, 
        minWidth: 0, 
        width: 36, 
        height: 36, 
        fontSize: 15, 
        fontWeight: isCurrent ? "500" : "normal", 
        marginRight: 4,
        marginLeft: 4,
        borderRadius: '50%'
      }}
    >
      {page}
    </Button>
);

export default PageButton;
