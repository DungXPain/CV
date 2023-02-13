import { ThongTinDatVe } from "../_core/Models/ThongTinDatVe";
import { baseService } from "./baseService";

class QuanLyDatVeService extends baseService{
    layChiTietPhongVe(maLichChieu){
        return this.get(`QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`)
    }
    thongTinDatVe (thongTinDatVe = new ThongTinDatVe()){
        return this.post(`QuanLyDatVe/DatVe`,thongTinDatVe)
    }
}
export const quanLyDatVeService = new QuanLyDatVeService()