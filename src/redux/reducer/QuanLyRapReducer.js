import { GET_DANH_SACH_CUM_RAP } from "../types/QuanLyRapType"

const initialState = {
    heThongRapChieu: []
}

const QuanLyRapReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_DANH_SACH_CUM_RAP: {
            state.heThongRapChieu = action.heThongRapChieu
            return { ...state }
        }


        default:
            return state
    }
}
export default QuanLyRapReducer
