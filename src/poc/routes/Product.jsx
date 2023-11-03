import { Link } from 'react-router-dom';

const Product = ({ id, name }) => {
  return (
    <div className="product">
      <h3>{name}</h3>
      <Link to={`/product/${id}`}>View Details</Link>
    </div>
  );
}

export default Product;
