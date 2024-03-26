import {createSlice} from '@reduxjs/toolkit'
import { sumPrice, sumQuantity } from '../../helpers/helpers'

const initialState = {
    selectItems:[],
    itemCounter:0,
    total:0,
    checkout:false
}

const cartSlice = createSlice({
    name:'cart',
    initialState , 
    reducers: {
        addItem:(state , action) => {
            if(!state.selectItems.find(i => i.id === action.payload.id)){
                state.selectItems.push({...action.payload , quantity: 1})
                state.total = sumPrice(state.selectItems)
                state.itemCounter = sumQuantity(state.selectItems)
                state.checkout = false
            }
        },
        removeItem:(state , action) => {
            const newSelectedItems = state.selectItems.filter(i => i.id !== action.payload.id)
            state.selectItems = newSelectedItems
            state.total = sumPrice(state.selectItems)
            state.itemCounter = sumQuantity(state.selectItems)
        },
        increase:(state , action) => {
            const increaseIndex = state.selectItems.findIndex(
                i => i.id === action.payload.id
            )
            state.selectItems[increaseIndex].quantity++
            state.total = sumPrice(state.selectItems)
            state.itemCounter  = sumQuantity(state.selectItems)
        },
        decrease:(state , action) => {
            const decreaseIndex = state.selectItems.findIndex(
                i => i.id === action.payload.id
            )
            state.selectItems[decreaseIndex].quantity--
            state.total = sumPrice(state.selectItems)
            state.itemCounter = sumQuantity(state.selectItems)
        },
        checkout:(state) => {
            state.selectItems = []
            state.checkout = true
            state.total = 0
            state.itemCounter = 0
        }
    }
})

export default cartSlice.reducer
export const {
    addItem,
    removeItem,
    increase,
    decrease,
    checkout
} = cartSlice.actions