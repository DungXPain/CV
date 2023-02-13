
import { quanLyNguoiDungService } from "../../service/QuanLyNguoiDung"
import { SUCCESS } from "../../util/settings/config"
import { GET_DANH_SACH_NGUOI_DUNG, LAY_DANH_SACH_LOAI_NGUOI_DUNG, LOGIN_ACTION, SET_THONG_TIN_NGUOI_DUNG } from "../types/QuanLyNguoiDungType"
import { history } from "../../App"
export const userLoginAcition = (user) => {
    return async dispatch => {
        try {
            let result = await quanLyNguoiDungService.dangNhap(user)
            if (result.data.statusCode === SUCCESS) {
                dispatch({
                    type: LOGIN_ACTION,
                    userLogin: result.data.content
                })
                history.push('/home')
            }
        } catch (error) {
            console.log(error.response.data)
        }
    }
}
export const userSignUpAction = (userNew) => {
    return async dispatch => {
        try {
            let result = await quanLyNguoiDungService.dangKy(userNew)
            if (result.data.statusCode === SUCCESS) {
                history.push('/login')
            }
        } catch (error) {
            console.log(error.response.data)
        }
    }
}
export const layThongTinNguoiDungAction = () => {
    return async dispatch => {
        try {
            const result = await quanLyNguoiDungService.lichSuDatVe()
            if (result.status === SUCCESS) {
                dispatch({
                    type: SET_THONG_TIN_NGUOI_DUNG,
                    thongTinNguoiDung: result.data.content
                })
            }
        } catch (error) {
            console.log(error.response.data)
        }
    }
}
export const getDanhSachNguoiDungAction = () => {
    return async dispatch => {
        try {
            let result = await quanLyNguoiDungService.layDanhSachNguoiDung()
            if (result.status === SUCCESS) {
                dispatch({
                    type: GET_DANH_SACH_NGUOI_DUNG,
                    danhSachNguoiDung: result.data.content
                })
            }
        } catch (error) {
            console.log(error.response.data)
        }
    }
}
export const timKiemNguoiDungAction = (value) => {
    return async dispatch => {
        try {
            let result = await quanLyNguoiDungService.timKiemNguoiDung(value)
            if (result.status === SUCCESS) {
                dispatch({
                    type: GET_DANH_SACH_NGUOI_DUNG,
                    danhSachNguoiDung: result.data.content
                })
            }
        } catch (error) {
            console.log(error.response.data)
        }
    }
}
export const layDanhSachLoaiNguoiDungAction = () => {
    return async dispatch => {
        try {
            let result = await quanLyNguoiDungService.layDanhSachLoaiNguoiDung()
            if (result.status === SUCCESS) {
                dispatch({
                    type: LAY_DANH_SACH_LOAI_NGUOI_DUNG,
                    danhSachLoaiNguoiDung: result.data.content
                })
            }
        } catch (error) {
            console.log(error.response.data)
        }
    }
}
export const themNguoiDungAction = (newUser)=>{
    return async dispatch =>{
        try {
            let result = await quanLyNguoiDungService.themNguoiDung(newUser)
            if(result.status === SUCCESS){
                alert('Thêm người dùng thành công')
                dispatch(getDanhSachNguoiDungAction())
                history.push('/admin/user')
            }
        } catch (error) {
            console.log(error.response.data)
        }
    }
}
export const xoaNguoiDungAction = (accountName)=>{
    return async dispatch =>{
        try {
            let result = await quanLyNguoiDungService.xoaNguoiDung(accountName)
            if(result.status === SUCCESS){
                alert('Xóa người dùng thành công')
                dispatch(timKiemNguoiDungAction(accountName))
                dispatch(getDanhSachNguoiDungAction())
            }
        } catch (error) {
            console.log(error.response.data)
        }
    }
}
export const capNhatThongTinNguoiDangNhapAction = (update)=>{
    return async dispatch =>{
        try {
            let result = await quanLyNguoiDungService.capNhatThongTinNguoiDangNhap(update)
            if(result.status === SUCCESS){
                alert('Cập nhật thành công')
                dispatch(getDanhSachNguoiDungAction())
            }
        } catch (error) {
            console.log(error.response.data)
            
        }
    }
}
export const capNhatThongTinNguoiDungAction = (update)=>{
    return async dispatch =>{
        try {
            let result = await quanLyNguoiDungService.capNhatThongTinNguoiDung(update)
           
            if(result.status === SUCCESS){
                alert('Cập nhật thành công')
                dispatch(getDanhSachNguoiDungAction())
                history.push('/admin/user')
            }
        } catch (error) {
            console.log(error.response.data)
        }
    }
}