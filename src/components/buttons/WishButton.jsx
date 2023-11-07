import { IconButton } from '@mui/material'
import { FaRegHeart } from 'react-icons/fa'

const WishButton = ({ productId }) => {

  /**
   * Method to be called to manage a product addition
   */
  const addProductToWishList = () => {
    console.log(productId + " clicked to wish")
  }

  return (
    <IconButton color='primary'>
        <FaRegHeart onClick={addProductToWishList}/>
    </IconButton>
  )
}

export default WishButton