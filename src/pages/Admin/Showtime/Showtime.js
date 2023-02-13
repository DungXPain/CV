import React from 'react'
import { Button,  Form, DatePicker, InputNumber, Select } from 'antd';
import { useState } from 'react';
import { useEffect } from 'react';
import { quanLyRapService } from '../../../service/QuanLyRap';
import { SUCCESS } from '../../../util/settings/config';
import { useFormik } from 'formik';
import moment from 'moment';

export default function Showtime(props) {
  let films = {}
  if(localStorage.getItem('filmParams')){
    films = JSON.parse(localStorage.getItem('filmParams'))
  }
  const formik = useFormik({
    initialValues: {
      maPhim: props.match.params.id,
      ngayChieuGioChieu: '',
      maRap: '',
      giaVe: 0
    },
    onSubmit: async (value)=> {
      try {
        let result = await quanLyRapService.taoLichChieu(value)
        if(result.status === SUCCESS){
          alert('Tạo lịch chiếu thành công')
        }
      } catch (error) {
        console.log(error)
      }
    }
  })

  const [state, setState] = useState({
    heThongRapChieu: [],
    cumRapChieu: []
  })
  useEffect(() => {
    async function getDanhSachCumRap() {
      try {
        let result = await quanLyRapService.layDanhSachCumRap()
        setState({
          ...state,
          heThongRapChieu: result.data.content
        })


      } catch (error) {
        console.log(error)
      }
    }
    getDanhSachCumRap()
  }, [])

  const handleChangeHeThongRap = async (value, options) => {
    try {
      let result = await quanLyRapService.layThongTinCumRap(value)
      setState({
        ...state,
        cumRapChieu: result.data.content
      })
    } catch (error) {
      console.log(error)
    }
    
  }

  const handleChangeCumRap = (value) => {
    formik.setFieldValue('maRap',value)
  }

  const onOk = (value) => {
    formik.setFieldValue('ngayChieuGioChieu',moment(value).format('DD/MM/YYYY hh:mm:ss'))
  }
  const onChangeDate = (value) => {
    formik.setFieldValue('ngayChieuGioChieu',moment(value).format('DD/MM/YYYY hh:mm:ss'))
  }
  const onChangeInputNumber = (value) => {
    formik.setFieldValue('giaVe',value)
  }
  const convertSelectHTR = () => {
    return state.heThongRapChieu?.map((htr, index) => {
      return { label: htr.tenHeThongRap, value: htr.maHeThongRap }
    })
  }
  return (
    <div className=''>
      <h3 className='text-2xl'>Tạo lịch chiếu - {props.match.params.tenPhim}</h3>
      <img src={films.hinhAnh} alt='...' style={{width:'300px',height:'300px'}}/>
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
        // onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Hệ thống rạp"
        >
          <Select options={convertSelectHTR()}
            placeholder='Chọn hệ thống rạp'
            style={{ width: '100%' }}
            onChange={handleChangeHeThongRap}
          />

        </Form.Item>


        <Form.Item
          label="Cụm rạp"
        >
          <Select options={state.cumRapChieu?.map((cumRap, index) => ({ label: cumRap.tenCumRap, value: cumRap.maCumRap }))}
            placeholder='Chọn cụm rạp'
            style={{ width: '100%' }}
            onChange={handleChangeCumRap}
          />

        </Form.Item>
        <Form.Item
          label="Ngày khởi chiếu"
        >
          <DatePicker format={'DD/MM/YYYY hh:mm:ss'} onChange={onChangeDate} showTime onOk={onOk} />
        </Form.Item>

        <Form.Item
          label="Giá vé"
        >
          <InputNumber min={'75000'} max={'150000'} onChange={onChangeInputNumber} />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Tạo lịch
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
