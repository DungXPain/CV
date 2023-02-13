import { CHANGE_TAB_ACTIVE, CHUYEN_TAB, DAT_VE_ACTION, DAT_VE_CHECKOUT, DAT_VE_REALTIME, HOAN_TAT_DAT_VE } from "../types/QuanLyDatVeType"

const initialState = {
    chiTietPhongVe: {},
    danhSachGheDangDat: [],
    danhSachGheKhachDat: [],
    tabActive: 1
}

const QuanLyDatVeReducer = (state = initialState, action) => {
    switch (action.type) {

        case DAT_VE_ACTION: {
            state.chiTietPhongVe = action.chiTietPhongVe
            return { ...state }
        }
        case DAT_VE_CHECKOUT: {
            let danhSachGheCapNhat = [...state.danhSachGheDangDat]
            let index = danhSachGheCapNhat.findIndex(gheDD => gheDD.maGhe === action.gheDuocChon.maGhe)

            if (index !== -1) {
                danhSachGheCapNhat.splice(index, 1)
            } else {
                danhSachGheCapNhat.push(action.gheDuocChon)
            }
            state.danhSachGheDangDat = danhSachGheCapNhat

            return { ...state }
        }
        case HOAN_TAT_DAT_VE: {
            state.danhSachGheDangDat = []
            return { ...state }
        }
        case CHUYEN_TAB: {
            state.tabActive = 2
            return { ...state }
        }
        case CHANGE_TAB_ACTIVE: {
            state.tabActive = action.number
            return { ...state }
        }
        case DAT_VE_REALTIME: {
            state.danhSachGheKhachDat = action.arrGheKhachDat
            return { ...state }
        }

        default:
            return { ...state }
    }
}
export default QuanLyDatVeReducer
