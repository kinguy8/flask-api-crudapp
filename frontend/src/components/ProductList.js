import React from "react";
import Product from './Product'

function ProductList({ data, handleChange }) {
    
  return (
    <ul className="list-group">
  {data.map((product, index) => {
        return (
          <Product
            product={product}
            key={index}
            index={index}
          />
        );
      })}
      </ul>
  );
}

// ProductList.propTypes = {
//   todos: PropTypes.arrayOf(PropTypes.object).isRequired,
//   onToggle: PropTypes.func.isRequired,
// };

export default ProductList;
