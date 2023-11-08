import { IconButton } from '@mui/material'
import { FaChevronLeft } from 'react-icons/fa'

const PrevButton = ({ onClick }) => (
    <IconButton color='black' onClick={onClick} >
        <FaChevronLeft size={16} />
    </IconButton>
)

export default PrevButton