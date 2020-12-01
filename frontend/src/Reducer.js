import { FETCH_DATA, ADD_DATA, ERROR_DATA, DELETE_DATA, UPDATE_DATA, ALERT } from './constants/FetchConstants'

function Reducer(state, action) {
    switch (action.type) {
        case ADD_DATA:
            return ({
                ...state,
                loading: false,
                data: [...state.data, action.payload],
                error: '',
                alert: true,
                alertText: 'Продукт успешно добавлен',
                alertStyle: 'alert alert-success',
                visibility: "visible"
            })
        case FETCH_DATA:
            return {
                loading: false,
                data: action.payload,
                error: '',
                alert: false,
                visibility: "visible"
            }
        case ERROR_DATA:
            return {
                ...state,
                loading: false,
                alert: true,
                alertStyle: 'alert alert-danger',
                alertText: 'Что-то пошло не так',
                visibility: "visible"
            }
        case DELETE_DATA:
            return {
                ...state,
                data: state.data.filter(product => product.id !== action.payload),
                alert: true,
                alertText: 'Продукт удален',
                alertStyle: 'alert alert-secondary',
                visibility: "visible"
            }   
        case ALERT:
            return ({
                ...state,
                alert: false,
                visibility: 'hidden'
            })
        case UPDATE_DATA:
            console.log("action is", action)
            return ({
                ...state,
                data: state.data.map(product => product.id === action.objectId  ? { "id": product.id, "name": action.payload }
                 : { "id": product.id, "name": product.name}),
                alert: state.data.filter(product => product.name !== action.payload ? true : false),
                alertText: 'Продукт успешно добавлен',
                alertStyle: 'alert alert-success',
                visibility: "visible"
            })
        default:
            return state
    }
}

export default Reducer