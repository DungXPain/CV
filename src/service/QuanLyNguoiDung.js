import { GROUPID } from "../util/settings/config";
import { baseService } from "./baseService";

class QuanLyNguoiDung extends baseService {
    dangNhap(user) {
        return this.post(`QuanLyNguoiDung/DangNhap`, user)
    }
    dangKy(userNew) {
        return this.post(`QuanLyNguoiDung/DangKy`, userNew)
    }
    lichSuDatVe() {
        return this.post(`QuanLyNguoiDung/ThongTinTaiKhoan`)
    }
    layDanhSachNguoiDung() {
        return this.get(`QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUPID}
        `)
    }
    timKiemNguoiDung(value) {
        if (value != '') {
            return this.get(`QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=${GROUPID}&tuKhoa=${value}`)
        }
        return this.get(`QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=${GROUPID}`)
    }
    layDanhSachLoaiNguoiDung (){
        return this.get(`QuanLyNguoiDung/LayDanhSachLoaiNguoiDung`)
    }
    themNguoiDung (newUser){
        return this.post(`QuanLyNguoiDung/ThemNguoiDung`,newUser)
    }
    xoaNguoiDung (accountName){
        return this.delete(`QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${accountName}`)
    }
    capNhatThongTinNguoiDangNhap (update){
        return this.put(`QuanLyNguoiDung/CapNhatThongTinNguoiDung`,update)
    }
    capNhatThongTinNguoiDung (updateUsesr){
        return this.post(`QuanLyNguoiDung/CapNhatThongTinNguoiDung`,updateUsesr)
    }
}
export const quanLyNguoiDungService = new QuanLyNguoiDung()