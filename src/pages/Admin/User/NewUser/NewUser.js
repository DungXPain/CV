import React, { useEffect } from 'react'
import { Button, Form, Input, Select } from 'antd';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { layDanhSachLoaiNguoiDungAction, themNguoiDungAction } from '../../../../redux/actions/QuanLyNguoiDungAction';
import { GROUPID } from '../../../../util/settings/config';
import { history } from '../../../../App';


export default function NewUser(props) {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(layDanhSachLoaiNguoiDungAction())
  }, [])
  const { danhSachLoaiNguoiDung } = useSelector(state => state.QuanLyNguoiDungReducer)


  const formik = useFormik({
    initialValues: {
      taiKhoan: '',
      matKhau: '',
      email: '',
      soDt: '',
      maNhom: GROUPID,
      maLoaiNguoiDung: '',
      hoTen: ''
    },
    onSubmit: (value) => {
      dispatch(themNguoiDungAction(value))
    }
  })


  const handleChangeLoaiNguoiDung = (name) => {
    return (value) => {
      formik.setFieldValue(name, value)
    }
  }

  
  return (
    <div>
      <h2 className='text-3xl'>Thêm người dùng</h2>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onSubmitCapture={formik.handleSubmit}
      >
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <Form.Item
              label="Tài khoản"
              name="taiKhoan"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
            >
              <Input name='taiKhoan' onChange={formik.handleChange}/>
            </Form.Item>

            <Form.Item
              label="Mật khẩu"
              name="matKhau"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password name='matKhau' onChange={formik.handleChange}/>
            </Form.Item>

            <Form.Item
              label="Họ tên"
              name="hoTen"
              rules={[
                {
                  required: true,
                  message: 'Please input your name!',
                },
              ]}
            >
              <Input name='hoTen' onChange={formik.handleChange}/>
            </Form.Item>
          </div>
          <div>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input your email !',
                },
              ]}
            >
              <Input name='email' onChange={formik.handleChange}/>
            </Form.Item>

            <Form.Item
              label="Số điện thoại"
              name="soDt"
              rules={[
                {
                  required: true,
                  message: 'Please input your phone number!',
                },
              ]}
            >
              <Input name='soDt' onChange={formik.handleChange}/>
            </Form.Item>

            <Form.Item
              label="Loại người dùng"
              name="maLoaiNguoiDung"
            >
              <Select
                style={{
                  width: 120,
                }}
                name='maLoaiNguoiDung' 
                onChange={handleChangeLoaiNguoiDung('maLoaiNguoiDung')}
                options={
                  danhSachLoaiNguoiDung?.map((loaiNguoiDung, index) => {
                    return {
                      label: loaiNguoiDung.tenLoai,
                      value: loaiNguoiDung.maLoaiNguoiDung
                    }
                  })
                }
              />
            </Form.Item>
          </div>
        </div>



        <Form.Item
          wrapperCol={{
            offset: 3,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Thêm
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
