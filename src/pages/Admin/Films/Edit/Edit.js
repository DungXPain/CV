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
import { useDispatch, useSelector } from 'react-redux';
import { capNhatPhimUpload, capNhatPhimUploadAction, layThongTinPhimAction, themPhimUploadHinhAction } from '../../../../redux/actions/QuanLyPhimAction';
import { GROUPID } from '../../../../util/settings/config';
import { useEffect } from 'react';



export default function Edit(props) {
    const [imgSrc, setImgSrc] = useState('')
    const { thongTinPhim } = useSelector(state => state.QuanLyPhimReducer)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(layThongTinPhimAction(props.match.params.id))
    }, [])
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            maPhim: thongTinPhim?.maPhim,
            tenPhim: thongTinPhim?.tenPhim,
            trailer: thongTinPhim?.trailer,
            moTa: thongTinPhim?.moTa,
            ngayKhoiChieu: thongTinPhim?.ngayKhoiChieu,
            dangChieu: thongTinPhim?.dangChieu,
            sapChieu: thongTinPhim?.sapChieu,
            hot: thongTinPhim?.hot,
            danhGia: thongTinPhim?.danhGia,
            hinhAnh: null
        },

        onSubmit: (value) => {
            value.maNhom = GROUPID
            let formData = new FormData()
            for (let key in value) {
                if (key !== 'hinhAnh') {
                    formData.append(key, value[key])
                } else {
                    if(value.hinhAnh != null){
                        formData.append('File', value.hinhAnh, value.hinhAnh.name)
                    }
                }
            }
            dispatch(capNhatPhimUploadAction(formData))
        },
    })
    const handleChangeDatePicker = (e) => {
        let ngayKhoiChieu = moment(e)
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
    const handleChangeFile = async (e) => {
        let file = e.target.files[0]
        if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/gif' || file.type === 'image/png') {
            await formik.setFieldValue('hinhAnh', file)
            let reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = (e) => {
                console.log(e.target.result)
                setImgSrc(e.target.result)
            }
            
        }
    }
    return (
        <div>
            <h3>Sửa phim</h3>
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
                        <Input name='tenPhim' onChange={formik.handleChange} value={formik.values?.tenPhim} />
                    </Form.Item>

                    <Form.Item label="Trailer" >
                        <Input name='trailer' onChange={formik.handleChange} value={formik.values?.trailer} />
                    </Form.Item>

                    <Form.Item label="Mô tả">
                        <Input name='moTa' onChange={formik.handleChange} value={formik.values?.moTa} />
                    </Form.Item>

                    <Form.Item label="Ngày khởi chiếu">
                        <DatePicker format={'DD/MM/YYYY'} name='ngayKhoiChieu' onChange={handleChangeDatePicker} value={moment(formik.values?.ngayKhoiChieu)} />
                    </Form.Item>

                    <Form.Item label="Đang chiếu">
                        <Switch name='dangChieu' onChange={handleChangeSwitch('dangChieu')} checked={formik.values?.dangChieu} />
                    </Form.Item>

                    <Form.Item label="Sắp chiếu">
                        <Switch onChange={handleChangeSwitch('sapChieu')} checked={formik.values?.sapChieu} />
                    </Form.Item>

                    <Form.Item label="Hot">
                        <Switch name='hot' onChange={handleChangeSwitch('hot')} checked={formik.values?.hot} />
                    </Form.Item>

                    <Form.Item label="Số sao">
                        <InputNumber name='danhGia' min={1} max={10} onChange={handleChangInputNumber('danhGia')} value={formik.values?.danhGia} />
                    </Form.Item>

                    <Form.Item label="Hình ảnh">
                        <input type='file' onChange={handleChangeFile} accept="image/png, image/jpeg,image/gif,image/png" />
                        <br />
                        <img style={{ width: '150px', height: '150px' }} src={imgSrc === '' ? thongTinPhim?.hinhAnh : imgSrc} alt={`...`} />
                    </Form.Item>



                    <Form.Item>
                        <Button htmlType='submit' type='submit'>Cập nhật</Button>
                    </Form.Item>
                </Form>
            </>
        </div>
    )
}
