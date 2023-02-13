import { quanLyRapService } from "../../service/QuanLyRap"
import { GET_DANH_SACH_CUM_RAP, SET_CHI_TIET_PHIM } from "../types/QuanLyRapType"


export const layDanhSachCumRapAction = () => {
    return async dispatch => {
        try {
            let result = await quanLyRapService.layDanhSachCumRap()
            dispatch({
                type: GET_DANH_SACH_CUM_RAP,
                heThongRapChieu: result.data.content
            })
        } catch (error) {
            console.log(error)
        }
    }
}
export const layThongTinChiTietPhim = (maPhim) => {
    return async dispatch => {
        try {
            let result = await quanLyRapService.layThongTinLichChieuPhim(maPhim)
            dispatch({
                type: SET_CHI_TIET_PHIM,
                FilmDetail: result.data.content
            })
        } catch (error) {
            console.log(error)
        }
    }
}