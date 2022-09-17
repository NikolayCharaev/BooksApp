import {configureStore} from '@reduxjs/toolkit'
import requestSlices from './requestSlices/requestSlices'


export const store = configureStore({
    reducer: {
        requestSlices: requestSlices
    }
})