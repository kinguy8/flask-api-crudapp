import React, { useEffect, useReducer } from 'react';
import { FETCH_DATA, ADD_DATA, ERROR_DATA, DELETE_DATA, UPDATE_DATA, ALERT } from './constants/FetchConstants'
import Buttons from './components/Buttons'
import ProductList from './components/ProductList'
import EmptyProduct from './components/EmptyProduct'
import Context from './components/Context'
import Spiner from './components/Spiner'
import Reducer from './Reducer'
import axios from 'axios'
import Alert from './components/Alert'
import Input from './components/Input'


const initState = {
  data: "",
  error: '',
  loading: true,
  alertText: '',
  alertStyle: '',
  visibility: 'visible'
}

function App() {
  const [state, dispatch] = useReducer(Reducer, initState)
  useEffect(() => {
    axios.get('/product')
      .then(res => setTimeout(() => {
        const data = res.data
        dispatch({
          type: FETCH_DATA,
          payload: data,
        })
      }, 2000))
  }, [])

  async function addProduct(data) {
    const product = {
      "id": state.data.length === 0 ? state.data.length + 1 : state.data.length + 1,
      "name": data
    }
    axios.post('/product', product)
      .then(res => {
        if (res.status === 200) {
          dispatch({
            type: ADD_DATA,
            payload: product
          })
          console.log("Added seccessful")
        }
      })
      .catch(error => {
        dispatch({
          type: ERROR_DATA
        })
      })
  }

  async function deleteProduct(id) {
    axios.delete(`/product/${id}`)
      .then(res => {
        if (res.status === 200) {
          dispatch({
            type: DELETE_DATA,
            payload: id
          })
        }
      })
      .catch(error => {
        dispatch({
          type: ERROR_DATA
        })
      })
  }

  function clearAlert() {
    dispatch({
      type: ALERT,
    })
  }

  async function handleBlur(id, value) {
    axios.put(`/product/${id}`, { name: value })
      .then(res => {
        if (res.status === 200) {
          dispatch({
            type: UPDATE_DATA,
            objectId: id,
            payload: value
          })
        }
      }).catch(error =>{
        dispatch({
          type: ERROR_DATA
        })
      })
  }

  return (
    <Context.Provider value={{ deleteProduct, clearAlert, handleBlur }}>
      <div className="wrapper container">
        <Alert status={state}/>
        <h1 className="display-4 text-center">Информация о продуках</h1>
        {state.loading ? <Spiner /> : <Input onCreate={addProduct} />}
        <hr />
        {state.data.length ? (
          <ProductList data={state.data} />) : state.loading ? null : (<EmptyProduct />)}
      </div>
    </Context.Provider>
  )
}

export default App
  