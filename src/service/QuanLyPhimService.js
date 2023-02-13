import { GROUPID } from "../util/settings/config"
import { baseService } from "./baseService"


class QuanLyPhimService extends baseService {
    layDanhSachBanner = () => {
        return this.get(`QuanLyPhim/LayDanhSachBanner`)
    }
    layDanhSachPhim(tenPhim = '') {
        if (tenPhim !== '') {
            return this.get(`QuanLyPhim/LayDanhSachPhim?maNhom=${GROUPID}&tenPhim=${tenPhim}`)
        }
        return this.get(`QuanLyPhim/LayDanhSachPhim?maNhom=${GROUPID}`)
    }
    themPhimUploadHinh(formData) {
        return this.post(`QuanLyPhim/ThemPhimUploadHinh`, formData)
    }
    layThongTinPhim(maPhim) {
        return this.get(`QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`)
    }
    capNhatPhimUpload(formDataUpdate) {
        return this.post(`QuanLyPhim/CapNhatPhimUpload`, formDataUpdate)
    }
    xoaPhim(maPhim) {
        return this.delete(`QuanLyPhim/XoaPhim?MaPhim=${maPhim}`)
    }
}
export const quanLyPhimService = new QuanLyPhimService()