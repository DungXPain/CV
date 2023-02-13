
import { connection } from "../.."
import { quanLyDatVeService } from "../../service/QuanLyDatVeService"
import { SUCCESS } from "../../util/settings/config"
import { ThongTinDatVe } from "../../_core/Models/ThongTinDatVe"
import { CHUYEN_TAB, DAT_VE_ACTION, DAT_VE_CHECKOUT, HOAN_TAT_DAT_VE } from "../types/QuanLyDatVeType"
import { DISPLAY_LOADING_ACITON, HIDE_LOADING_ACTION } from "./LoadingAction"


export const quanLyDatVeAction = (maLichChieu) => {
    return async dispatch => {
        try {
            let result = await quanLyDatVeService.layChiTietPhongVe(maLichChieu)
            if (result.status === SUCCESS) {
                dispatch({
                    type: DAT_VE_ACTION,
                    chiTietPhongVe: result.data.content
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
}
export const datVeAction = (thongTinDatVe = new ThongTinDatVe()) => {
    return async (dispatch, getState) => {
        dispatch(DISPLAY_LOADING_ACITON)
        try {
            let result = await quanLyDatVeService.thongTinDatVe(thongTinDatVe)
            if (result.status === SUCCESS) {
                await dispatch(quanLyDatVeAction(thongTinDatVe.maLichChieu))
                await dispatch({
                    type: HOAN_TAT_DAT_VE
                })
                await dispatch(HIDE_LOADING_ACTION)
                let userLogin = getState().QuanLyNguoiDungReducer.userLogin
                await connection.invoke('datGheThanhCong',userLogin.taiKhoan,thongTinDatVe.maLichChieu)
                dispatch({
                    type: CHUYEN_TAB
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
}
export const datGheAction = (ghe, maLichChieu) => {
    return async (dispatch, getState) => {
        await dispatch({
            type: DAT_VE_CHECKOUT,
            gheDuocChon: ghe
        })
        let danhSachGheDangDat = getState().QuanLyDatVeReducer.danhSachGheDangDat
        let taiKhoan = getState().QuanLyNguoiDungReducer.userLogin.taiKhoan
        
        danhSachGheDangDat = JSON.stringify(danhSachGheDangDat)
        
        connection.invoke('datGhe', taiKhoan, danhSachGheDangDat, maLichChieu)
    }
}