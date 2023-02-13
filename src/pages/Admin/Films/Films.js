import React from 'react'
import { Table, Input, Button, AutoComplete } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { layDanhSachPhimAction, xoaPhimAction } from '../../../redux/actions/QuanLyPhimAction';
import { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import {
    EditOutlined,
    DeleteOutlined,
    CalendarOutlined
} from '@ant-design/icons';
import { history } from '../../../App';
import { useRef } from 'react';
const { Search } = Input;
export default function Films() {
    const { arrPhimBackUp } = useSelector(state => state.QuanLyPhimReducer)
    let searchRef = useRef()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(layDanhSachPhimAction())
    }, [])
    const columns = [
        {
            title: 'Mã phim',
            dataIndex: 'maPhim',
            value: (text, object) => { return <span>{text}</span> },
            sorter: (a, b) => a.maPhim - b.maPhim,
            sortDirections: ['descend'],
            width: '10%'
        },
        {
            title: 'Tên phim',
            dataIndex: 'tenPhim',
            defaultSortOrder: 'descend',
            sorter: (a, b) => {
                let tenPhimA = a.tenPhim.toLowerCase().trim()
                let tenPhimB = b.tenPhim.toLowerCase().trim()
                if (tenPhimA > tenPhimB) {
                    return 1
                }
                return -1
            },
            sortDirections: ['descend', 'ascend']
        },
        {
            title: 'Hình ảnh',
            dataIndex: 'hinhAnh',
            render: (text, record, index) => {
                return <div><img style={{ width: '30px' }} onError={(e) => { e.target.onError = null; e.target.src = 'https://picsum.photos/30' }} src={`${text}`} alt={`${text}`} /></div>
            }
        },
        {
            title: 'Mô tả',
            dataIndex: 'moTa',
            render: (text, film, index) => {
                return <Fragment>
                    {film.moTa.length > 50 ? film.moTa.substr(0, 50) + '...' : film.moTa}
                </Fragment>
            },
            sortDirections: ['descend', 'ascend']
        },
        {
            title: 'Hành động',
            dataIndex: 'hanhDong',
            render: (text, film, index) => {
                return <Fragment>
                    <NavLink className='bg-green-600 p-3 rounded-md mr-3 text-white' to={`/admin/films/edit/${film.maPhim}`}><EditOutlined /></NavLink>
                    <span className='bg-red-600 p-3 rounded-md text-white cursor-pointer' onClick={() => {
                        if (window.confirm(`Bạn có chắc muốn xóa phim ${film.tenPhim}`)) {
                            dispatch(xoaPhimAction(film.maPhim))
                        }
                    }}><DeleteOutlined /></span>
                    <NavLink className='bg-blue-400 p-3 rounded-md ml-3 mr-3 text-white hover:text-white' to={`/admin/films/showtime/${film.maPhim}/${film.tenPhim}`} onClick={()=>{localStorage.setItem('filmParams',JSON.stringify(film))}}><CalendarOutlined /></NavLink>
                    
                </Fragment>
            },

        },
    ];
    const data = arrPhimBackUp

    const onChange = () => {

    };
    return (
        <div>
            <h3 className='text-4xl'>Quản lý phim</h3>
            <Button className='mb-5' onClick={() => {
                history.push('/admin/films/addnew')
            }}>Thêm phim</Button>
            <AutoComplete
                dropdownMatchSelectWidth={252}
                style={{ width: '100%' }}
                onSearch={(value)=>{
                    if(searchRef.current){
                        clearTimeout(searchRef.current)
                    }
                    searchRef.current = setTimeout(()=>{
                        dispatch(layDanhSachPhimAction(value))
                    },1000)
                }}
            >
                <Search placeholder="Input search here" style={{ marginBottom: '15px' }} enterButton />
            </AutoComplete>
            <Table rowKey={'maPhim'} columns={columns} dataSource={data} onChange={onChange} />;
        </div>
    )
}
