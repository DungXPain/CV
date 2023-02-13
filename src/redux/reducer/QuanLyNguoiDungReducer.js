import { TOKEN, USER_LOGIN } from "../../util/settings/config"
import { GET_DANH_SACH_NGUOI_DUNG, LAY_DANH_SACH_LOAI_NGUOI_DUNG, LOGIN_ACTION, SET_THONG_TIN_NGUOI_DUNG, UPDATE_NGUOI_DUNG } from "../types/QuanLyNguoiDungType"

let user = {}
if (localStorage.getItem(USER_LOGIN)) {
    user = JSON.parse(localStorage.getItem(USER_LOGIN))
}
const initialState = {
    userLogin: user,
    thongTinNguoiDung:{},
    danhSachNguoiDung:[],
    danhSachLoaiNguoiDung:[],
    updateNguoiDung: {}
}

const QuanLyNguoiDungReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_ACTION: {
            state.userLogin = action.userLogin
            localStorage.setItem(USER_LOGIN, JSON.stringify(state.userLogin))
            localStorage.setItem(TOKEN, state.userLogin.accessToken)
            return { ...state }
        }
        case SET_THONG_TIN_NGUOI_DUNG:{
            state.thongTinNguoiDung = action.thongTinNguoiDung
            return {...state}
        }
        case GET_DANH_SACH_NGUOI_DUNG:{
            state.danhSachNguoiDung = action.danhSachNguoiDung
            return {...state}
        }
        case LAY_DANH_SACH_LOAI_NGUOI_DUNG :{
            state.danhSachLoaiNguoiDung = action.danhSachLoaiNguoiDung
            return {...state}
        }
        case UPDATE_NGUOI_DUNG:{
            state.updateNguoiDung = action.updateNguoiDung
            return {...state}
        }
        default:
            return state
    }
}
export default QuanLyNguoiDungReducer