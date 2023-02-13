import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import CarouselReducer from './reducer/CarouselReducer'
import QuanLyPhimReducer from './reducer/QuanLyPhimReducer'
import QuanLyRapReducer from './reducer/QuanLyRapReducer'
import QuanLyNguoiDungReducer from './reducer/QuanLyNguoiDungReducer'
import QuanLyDatVeReducer from './reducer/QuanLyDatVeReducer'
import LoadingReducer from './reducer/LoadingReducer'
const rootReducer = combineReducers({
    CarouselReducer,
    QuanLyPhimReducer,
    QuanLyRapReducer,
    QuanLyNguoiDungReducer,
    QuanLyDatVeReducer,
    LoadingReducer
})
export const store = configureStore({ reducer: rootReducer, middleware: [thunk] })