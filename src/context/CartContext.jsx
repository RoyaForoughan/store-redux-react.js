import { createContext, useContext, useReducer } from "react"
import { sumProducts } from "../helpers/helpers"

const initialState = {
    selectItems:[],
    itemCounter:0,
    total:0,
    checkout:false
}


const reducer = (state , action) => {
    switch(action.type){
        case 'ADD_ITEM' : 
            if(!state.selectItems.find(item => item.id === action.payload.id)){
                state.selectItems.push({...action.payload , quantity:1})
            }
            return {
                ...state,
                ...sumProducts(state.selectItems),
                checkout:false,
            }
        case 'REMOVE_ITEM':
            const newSelectedItem = state.selectItems.filter(item => item.id !== action.payload.id)
            return{
                ...state,
                selectItems : [...newSelectedItem],
                ...sumProducts(newSelectedItem)
            }
        case 'INCREASE':
            const increaseIndex = state.selectItems.findIndex(item => item.id === action.payload.id)    
            state.selectItems[increaseIndex].quantity++
            return {
                ...state,
                ...sumProducts(state.selectItems)
            }
        case 'DECREASE':
            const decreaseIndex = state.selectItems.findIndex(item => item.id === action.payload.id)
            state.selectItems[decreaseIndex].quantity--
            return{
                ...state ,
                ...sumProducts(state.selectItems)
            }
        case 'CHECKOUT':
            return{
                selectItems:[],
                itemCounter:0,
                total:0,
                checkout:true
            }
        default:
            throw new Error('Invalid Action!')
    }
}

const CartContext = createContext()

function CartProvider({children}) {
    const [state , dispatch]  = useReducer(reducer , initialState)
  return (
    <CartContext.Provider value={{state , dispatch}}>
        {children}
    </CartContext.Provider>
  )
}

const useCart = () => {
    const {state , dispatch} = useContext(CartContext)
    return [state , dispatch]
}

export default CartProvider
export  {useCart}