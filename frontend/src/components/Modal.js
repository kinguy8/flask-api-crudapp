import React, { useState } from 'react'
import Alert from './Alert'


function Modal({ onCreate, data }) {
  const [value, setValue] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')

  function sumbitHandler(event) {
    event.preventDefault()
    const newProduct = {
      'id': '',
      'name': value,
      'price': price,
      'description': description,
      'qty': 1337
    }
    onCreate(newProduct)
    setValue('')
    setPrice('')
    setDescription('')
  }

  return (
    <form onSubmit={sumbitHandler}>
      <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Добавить продукт</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {data.alert ? <Alert status={data} /> : null}
              <div className="form-group">
                <label for="exampleFormControlInput1">Название</label>
                <input type="text" htmlFor="name" className="form-control" id="exampleFormControlInput1" placeholder="Название" name="name" value={value} onChange={event => setValue(event.target.value)} />
              </div>
              <div className="form-group">
                <label for="exampleFormControlInput1">Цена</label>
                <input type="text" htmlFor="price" className="form-control" id="exampleFormControlInput1" placeholder="Цена" name="price" value={price} onChange={event => setPrice(event.target.value)} />
              </div>
              <div className="form-group">
                <label for="exampleFormControlTextarea1">Example textarea</label>
                <textarea htmlFor="description" className="form-control" id="exampleFormControlTextarea1" rows="3" name="description" value={description} onChange={event => setDescription(event.target.value)}></textarea>
              </div>

            </div>
            <div className="modal-footer">
              <input type="submit" className="btn btn-success" value="Отправить"></input>
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Отмена</button>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}

export default Modal