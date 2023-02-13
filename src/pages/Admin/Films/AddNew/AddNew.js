import React, { useState } from 'react'
import {
  Form,
  Input,
  Button,
  DatePicker,
  InputNumber,
  Switch,
} from 'antd';
import { useFormik } from 'formik';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { themPhimUploadHinhAction } from '../../../../redux/actions/QuanLyPhimAction';
import { GROUPID } from '../../../../util/settings/config';



export default function AddNew(props) {
  const [imgSrc, setImgSrc] = useState('')
  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues: {
      tenPhim: '',
      trailer: '',
      moTa: '',
      ngayKhoiChieu: '',
      dangChieu: false,
      sapChieu: false,
      hot: false,
      danhGia: 0,
      hinhAnh: {},
    },

    onSubmit: (value) => {
      value.maNhom = GROUPID
      let formData = new FormData()
      for (let key in value) {
        if (key !== 'hinhAnh') {
          formData.append(key, value[key])
        } else {
          formData.append('File', value.hinhAnh, value.hinhAnh.name)
        }
      }

      dispatch(themPhimUploadHinhAction(formData))
    },
  })
  const handleChangeDatePicker = (e) => {
    let ngayKhoiChieu = moment(e._d).format('DD/MM/YYYY')
    formik.setFieldValue('ngayKhoiChieu', ngayKhoiChieu)
  }
  const handleChangeSwitch = (name) => {
    return (value) => {
      
      formik.setFieldValue(name, value)
    }
  }
  const handleChangInputNumber = (name) => {
    return (value) => {
      formik.setFieldValue(name, value)
    }
  }
  const handleChangeFile = (e) => {
    let file = e.target.files[0]
    if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/gif' || file.type === 'image/png') {
      let reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = (e) => {
        setImgSrc(e.target.result)
      }
      formik.setFieldValue('hinhAnh', file)
    }
  }
  return (
    <div>
      <h3>Thêm mới phim</h3>
      <>
        <Form
          onSubmitCapture={formik.handleSubmit}
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout="horizontal"

        >
          <Form.Item label="Tên phim">
            <Input name='tenPhim' onChange={formik.handleChange} />
          </Form.Item>

          <Form.Item label="Trailer" >
            <Input name='trailer' onChange={formik.handleChange} />
          </Form.Item>

          <Form.Item label="Mô tả">
            <Input name='moTa' onChange={formik.handleChange} />
          </Form.Item>

          <Form.Item label="Ngày khởi chiếu">
            <DatePicker format={'DD/MM/YYYY'} name='ngayKhoiChieu' onChange={handleChangeDatePicker} />
          </Form.Item>

          <Form.Item label="Đang chiếu">
            <Switch name='dangChieu' onChange={handleChangeSwitch('dangChieu')} />
          </Form.Item>

          <Form.Item label="Sắp chiếu">
            <Switch onChange={handleChangeSwitch('sapChieu')} />
          </Form.Item>

          <Form.Item label="Hot">
            <Switch name='hot' onChange={handleChangeSwitch('hot')} />
          </Form.Item>

          <Form.Item label="Số sao">
            <InputNumber name='danhGia' min={1} max={10} onChange={handleChangInputNumber('danhGia')} />
          </Form.Item>

          <Form.Item label="Hình ảnh">
            <input type='file' onChange={handleChangeFile} accept="image/png, image/jpeg,image/gif,image/png"/>
            <br />
            <img style={{ width: '150px', height: '150px' }} src={imgSrc} alt={`...`} />
          </Form.Item>



          <Form.Item>
            <Button htmlType='submit' type='submit'>Thêm phim</Button>
          </Form.Item>
        </Form>
      </>
    </div>
  )
}
