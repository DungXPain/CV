export class ThongTinLichChieu {
    thongTinPhim = new this.ThongTinPhim()
    danhSachGhe = new Array (this.DanhSachGhe)
}
export class ThongTinPhim {
    maLichChieu = '';
    tenCumRap = '';
    tenRap = ''
    diaChi = ''
    tenPhim = ''
    hinhAnh = ''
    ngayChieu = ''
    gioChieu = ''
}
export class DanhSachGhe {
    maGhe = 0
    tenGhe = ""
    maRap = 0
    loaiGhe = "0"
    stt = "0"
    giaVe = 0
    daDat = true
    taiKhoanNguoiDat = ""
}