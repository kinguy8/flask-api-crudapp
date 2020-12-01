import React, { useContext, useRef } from "react"
import Context from './Context'

function Product({ product }) {
  const { deleteProduct, handleBlur} = useContext(Context)
  const text = useRef('')

  return (

    <li className="list-group-item products">
      <div>
        <input type="checkbox"></input>&nbsp;&nbsp;
      <strong ref={text} suppressContentEditableWarning = {true} contentEditable='true' onBlur={() => handleBlur(product.id, text.current.innerHTML)}>
        {product.name}</strong>&nbsp;&nbsp;
      <small>{new Date().toLocaleDateString()}</small>
      </div>
      <button type="button" onClick={() => deleteProduct(product.id)}
        className="btn btn-outline-danger btn-sm">&times;
      </button>
    </li>
  )
}

export default Product;
