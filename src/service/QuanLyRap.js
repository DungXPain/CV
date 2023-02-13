import { baseService } from "./baseService";
import { GROUPID } from "../util/settings/config";
class QuanLyRapService extends baseService {
    layDanhSachCumRap() {
        return this.get(`QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${GROUPID}`)
    }
    layThongTinHeThongRap() {
        return this.get(`QuanLyRap/LayThongTinHeThongRap?maHeThongRap=${GROUPID}`)
    }
    layThongTinLichChieuPhim(maPhim) {
        return this.get(`QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`)
    }
    layThongTinCumRap(maHeThongRap){
        return this.get(`QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`)
    }
    taoLichChieu (date){
        return this.post(`QuanLyDatVe/TaoLichChieu`,date)
    }
}
export const quanLyRapService = new QuanLyRapService()