import React, { Fragment, useRef } from 'react'
import { AutoComplete, Button, Table } from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import Search from 'antd/lib/input/Search';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getDanhSachNguoiDungAction, timKiemNguoiDungAction, xoaNguoiDungAction } from '../../../redux/actions/QuanLyNguoiDungAction';
import { NavLink } from 'react-router-dom';
import { history } from '../../../App';
import { UPDATE_NGUOI_DUNG } from '../../../redux/types/QuanLyNguoiDungType';
export default function User(props) {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getDanhSachNguoiDungAction())
  }, [])
  let searchRef = useRef()
  const { danhSachNguoiDung } = useSelector(state => state.QuanLyNguoiDungReducer)

  const columns = [
    {
      title: 'STT',
      dataIndex: 'stt',
      sorter: (a, b) => a.stt - b.stt,
      sortDirections: ['descend', 'ascend'],
      render: (text, value, index) => {
        for (let i = 1; i < danhSachNguoiDung?.length; i++) {
          return <div>{(index + 1) * i}</div>
        }
      }
    },
    {
      title: 'Tài khoản',
      dataIndex: 'taiKhoan',
      sortDirections: ['descend', 'ascend'],
      sorter: (a, b) => a.taiKhoan - b.taiKhoan,
    },
    {
      title: 'Mật khẩu',
      dataIndex: 'matKhau',
    },
    {
      title: 'Họ tên',
      dataIndex: 'hoTen',
      sortDirections: ['descend', 'ascend'],
      sorter: (a, b) => a.hoTen - b.hoTen,
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'soDt',
    },
    {
      title: 'Thao tác',
      dataIndex: 'thaoTac',
      render: (text, value, index) => {
        return <Fragment>
          <NavLink onClick={()=>{
           dispatch({
            type: UPDATE_NGUOI_DUNG,
            updateNguoiDung: value
          })
          }}  style={{ color: 'green' }} type='button' to={`/admin/user/updateUser/${value.taiKhoan}`}><EditOutlined /></NavLink>
          <span onClick={() => {
            if (window.confirm(`Bạn có muốn xóa tài khoản ${value.taiKhoan}`)) {
              dispatch(xoaNguoiDungAction(value.taiKhoan))
            }
          }} style={{ color: 'red', marginLeft: '10px', cursor: 'pointer' }}><DeleteOutlined /></span>
        </Fragment>
      }
    },
  ];
  const data = danhSachNguoiDung;
  
  return (
    <div>
      <h3 className='text-2xl'>Danh sách người dùng</h3>
      <Button onClick={() => {
        history.push('/admin/user/addUser')
      }}>Thêm người dùng</Button>
      <AutoComplete
        dropdownMatchSelectWidth={252}
        style={{ width: '100%' }}
        onSearch={(value) => {
          if (searchRef.current) {
            clearTimeout(searchRef.current)
          }
          searchRef.current = setTimeout(() => {
            dispatch(timKiemNguoiDungAction(value))
          }, 1000)
        }}
      >
        <Search
          placeholder="input search text"
          allowClear

          style={{
            width: '100%',
            marginTop: '10px',
            marginBottom: '10px'
          }}
        />
      </AutoComplete>

      <Table rowKey={'taiKhoan'} columns={columns} dataSource={data}  />
    </div>
  )
}
