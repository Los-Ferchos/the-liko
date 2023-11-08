import { IconButton } from '@mui/material'
import { FaChevronLeft } from 'react-icons/fa'

/** Button component representing the previous navigation action.
 * 
 * @param {Object} props - The properties passed to the component.
 * @param {Function} props.onClick - The function to be called when the button is clicked.
 * 
 * @returns {JSX.Element} Rendered PrevButton component.
 */
const PrevButton = ({ onClick }) => (
    <IconButton color='black' onClick={onClick} >
        <FaChevronLeft size={16} />
    </IconButton>
)

export default PrevButton