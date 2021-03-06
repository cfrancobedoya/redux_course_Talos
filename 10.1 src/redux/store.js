import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'

// Midleware
const logger = (store) => (next) => (action) => {
  console.log('Ha ocurrido una accion')
  next(action)
}

const confirmDeleteTodo = (store) => (next) => (action) => {
  if (action.type === 'DELETE_TODO') {
    let conf = window.confirm('Seguro que quieres elimiar el todo?')

    if (conf) {
      next(action)
    }
  } else {
    next(action)
  }
  
  // setTimeout(() => {
  //   next(action)
  // }, 1000)

  // if (action.type !== 'ADD_TODO') {
  //     setTimeout(() => {
  //       store.dispatch({
  //         type: 'ADD_TODO',
  //         payload: {
  //           text: 'Todo Creado en Midleware',
  //           checked: false,
  //           id: 'd15sad1asd1'
  //         }
  //       })
  //     }, 4000)
  // }
}

// Store
// Almacenamiento de nuestro estado
const store = createStore(rootReducer, applyMiddleware(confirmDeleteTodo, logger))

export default store