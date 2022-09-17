import {configureStore} from '@reduxjs/toolkit'
import requestSlices from './requestSlices/requestSlices'
import cartRendering from './cartRendering/cartRenderingSlice'


export const store = configureStore({
    reducer: {
        requestSlices: requestSlices,
        cartRendering: cartRendering
    }
})