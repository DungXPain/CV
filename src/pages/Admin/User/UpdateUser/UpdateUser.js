import React, { useEffect } from 'react'
import { Button, Form, Input, Select } from 'antd';
import { GROUPID } from '../../../../util/settings/config';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { capNhatThongTinNguoiDungAction, layDanhSachLoaiNguoiDungAction } from '../../../../redux/actions/QuanLyNguoiDungAction';
import { history } from '../../../../App';


const layout = {
  labelCol: {
    span: 3,
  },
  wrapperCol: {
    span: 16,
  },
};

export default function UpdateUser(props) {
  const dispatch = useDispatch()
  const { danhSachLoaiNguoiDung, updateNguoiDung } = useSelector(state => state.QuanLyNguoiDungReducer)
  useEffect(() => {
    dispatch(layDanhSachLoaiNguoiDungAction())
  }, [])

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      taiKhoan: updateNguoiDung?.taiKhoan,
      matKhau: updateNguoiDung?.matKhau,
      email: updateNguoiDung?.email,
      soDt: updateNguoiDung?.soDt,
      maNhom: GROUPID,
      maLoaiNguoiDung: updateNguoiDung?.maLoaiNguoiDung,
      hoTen: updateNguoiDung?.hoTen
    },
    onSubmit: (value) => {
      dispatch(capNhatThongTinNguoiDungAction(value))
    }
  })
  const handleChangeMaLoaiNguoiDung = (name) => {
    return (value) => {
      formik.setFieldValue(name, value)
    }
  }

  return (
    <div>
      <h3>Sửa thông tin tài khoản {updateNguoiDung.taiKhoan}</h3>
      <Form onSubmitCapture={formik.handleSubmit} {...layout} name="nest-messages" style={{ color: 'black!important' }}>
        <Form.Item
          label="Tài khoản"
        >
          <Input disabled name='taiKhoan' onChange={formik.handleChange} value={formik.values.taiKhoan} />
        </Form.Item>
        <Form.Item
          label="Mật khẩu"
        >
          <Input disabled name='matKhau' onChange={formik.handleChange} value={formik.values.matKhau} />
        </Form.Item>
        <Form.Item
          label="Email"
        >
          <Input name='email' onChange={formik.handleChange} value={formik.values.email} />
        </Form.Item>
        <Form.Item
          label="Tên người dùng"
        >
          <Input name='hoTen' onChange={formik.handleChange} value={formik.values.hoTen} />
        </Form.Item>
        <Form.Item
          label="Số điện thoại"
        >
          <Input name='soDt' onChange={formik.handleChange} value={formik.values.soDt} />
        </Form.Item>

        <Form.Item label="Loại người dùng">
          <Select onChange={handleChangeMaLoaiNguoiDung('maLoaiNguoiDung')} defaultValue={updateNguoiDung?.maLoaiNguoiDung}>
            {danhSachLoaiNguoiDung?.map((loaiNguoiDung, index) => {
              return <Select.Option key={index} value={loaiNguoiDung.maLoaiNguoiDung}>{loaiNguoiDung.tenLoai}</Select.Option>
            })}
          </Select>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 3, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Cập nhật
          </Button>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 3, span: 16 }}>
          <Button type="primary" onClick={()=>{
            history.push('/admin/user')
          }}>
            Trở về 
          </Button>
        </Form.Item>

      </Form>
    </div>
  )
}
