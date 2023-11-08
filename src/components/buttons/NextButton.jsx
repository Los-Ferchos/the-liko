import { IconButton } from '@mui/material'
import { FaChevronRight } from 'react-icons/fa'

const NextButton = ({ onClick }) => (
    <IconButton color='black' onClick={onClick} >
        <FaChevronRight size={16} />
    </IconButton>
)

export default NextButton