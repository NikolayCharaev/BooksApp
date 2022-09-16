import {configureStore} from '@reduxjs/toolkit'
import mainSlices from './mainSlices/mainSlice'


export const store = configureStore({
    reducer: {
        mainSlices: mainSlices
    }
})