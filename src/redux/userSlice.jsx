import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    cartItems: [],
    totalQuantity: 0,
    totalAmount: 0
}

const userSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart:(state, action)=>{
        const newItem = action.payload
        const existingItem = state.cartItems.find(item => item.id === newItem.id)
        state.totalQuantity++

        if (!existingItem) {
            state.cartItems.push({
                id: newItem.id,
                title: newItem.title,
                price: newItem.price,
                thumbnail: newItem.thumbnail,
                quantity: 1,
                category: newItem.category,
                brand: newItem.brand,
                description: newItem.description,
                rating: newItem.rating,
                totalPrice: newItem.price
            })
        }
        else {
            existingItem.quantity++
            existingItem.totalPrice = Number(existingItem.totalPrice) + Number(newItem.price)
        }
        state.totalAmount = state.cartItems.reduce((total, item)=> total + Number(item.price)*Number(item.quantity),0)
    },
    deleteItem:(state,action)=>{
        const id = action.payload
        const existingItem = state.cartItems.find( item => item.id==id)
        if(existingItem){
            state.cartItems=state.cartItems.filter(item => item.id !==id)
            state.totalQuantity=state.totalQuantity- existingItem.quantity
    }
    state.totalAmount = state.cartItems.reduce((total, item)=> total + Number(item.price)*Number(item.quantity),0)
},

    clearCart: (state) => {
        state.cartItems = []
        state.totalQuantity = 0
        state.totalAmount = 0
    }

  }
});

export const { addToCart, deleteItem,clearCart } = userSlice.actions

export default userSlice.reducer;