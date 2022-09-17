import {configureStore} from '@reduxjs/toolkit'
import mainSlices from './requestSlices/mainSlice'


export const store = configureStore({
    reducer: {
        mainSlices: mainSlices
    }
})