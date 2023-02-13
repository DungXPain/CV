import { GET_DANHSACHPHIM, SET_DANH_SACH_PHIM_DANG_CHIEU, SET_DANH_SACH_PHIM_SAP_CHIEU, SET_THONG_TIN_PHIM } from "../types/DanhSachPhimType"
import { SET_CHI_TIET_PHIM } from "../types/QuanLyRapType"

const initialState = {
    arrPhim: [],
    arrPhimBackUp: [],
    FilmDetail: {},
    thongTinPhim:{}
}

const QuanLyPhimReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DANHSACHPHIM:
            state.arrPhim = action.arrPhim
            state.arrPhimBackUp = state.arrPhim
            return { ...state }
        case SET_DANH_SACH_PHIM_DANG_CHIEU: {
            state.arrPhim = state.arrPhimBackUp.filter(item => item.dangChieu === true && item.sapChieu === false)
            return { ...state }
        }
        case SET_DANH_SACH_PHIM_SAP_CHIEU: {
            state.arrPhim = state.arrPhimBackUp.filter(item => item.dangChieu === false && item.sapChieu === true)
            return { ...state }
        }
        case SET_CHI_TIET_PHIM: {
            state.FilmDetail = action.FilmDetail
            return {...state}
        }
        case SET_THONG_TIN_PHIM:{
            state.thongTinPhim = action.thongTinPhim
            return {...state}
        }
        default:
            return state
    }
}
export default QuanLyPhimReducer
