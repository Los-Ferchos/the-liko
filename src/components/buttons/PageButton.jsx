import { Button } from '@mui/material';
import { FaShoppingCart } from 'react-icons/fa';

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
