
import { history } from '../../App'
import { quanLyPhimService } from '../../service/QuanLyPhimService'
import { GET_DANHSACHPHIM, SET_THONG_TIN_PHIM } from '../types/DanhSachPhimType'
export const layDanhSachPhimAction = (tenPhim = '') => {
    return async dispatch => {
        try {
            let result = await quanLyPhimService.layDanhSachPhim(tenPhim)
            dispatch({
                type: GET_DANHSACHPHIM,
                arrPhim: result.data.content
            })
        } catch (error) {
            console.log(error)
        }
    }
}
export const themPhimUploadHinhAction = (formData) => {
    return async dispatch => {
        try {
            let result = await quanLyPhimService.themPhimUploadHinh(formData)
            alert('Thêm phim thành công')
        } catch (error) {
            console.log(error.response?.data)
        }
    }
}
export const layThongTinPhimAction = (maPhim) => {
    return async dispatch => {
        try {
            let result = await quanLyPhimService.layThongTinPhim(maPhim)
            dispatch({
                type: SET_THONG_TIN_PHIM,
                thongTinPhim: result.data.content
            })

        } catch (error) {
            console.log(error.response?.data)
        }
    }
}
export const capNhatPhimUploadAction = (formData) => {
    return async dispatch => {
        try {
            let result = await quanLyPhimService.capNhatPhimUpload(formData)
            alert('Cập nhật phim thành công')
            history.push('/admin/films')
        } catch (error) {
            console.log(error.response?.data)
        }
    }
}
export const xoaPhimAction = (maPhim) => {
    return async dispatch => {
        try {
            let result = await quanLyPhimService.xoaPhim(maPhim)
            alert('Xóa phim thành công')
            dispatch(layDanhSachPhimAction())
        } catch (error) {
            console.log(error.response?.data)
        }
    }
}