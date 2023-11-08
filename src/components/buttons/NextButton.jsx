import { IconButton } from '@mui/material'
import { FaChevronRight } from 'react-icons/fa'

/**
 * Button component representing the next navigation action.
 * 
 * @param {Object} props - The properties passed to the component.
 * @param {Function} props.onClick - The function to be called when the button is clicked.
 * 
 * @returns {JSX.Element} Rendered NextButton component.
 */
const NextButton = ({ onClick }) => (
    <IconButton color='black' onClick={onClick} >
        <FaChevronRight size={16} />
    </IconButton>
)

export default NextButton