import React, { useEffect } from 'react'
import { Tabs } from 'antd';
import UserProfile from './UserProfile/UserProfile';
import HistoryChecked from './HistoryChecked/HistoryChecked'
import { useDispatch, useSelector } from 'react-redux';
import { layThongTinNguoiDungAction } from '../../redux/actions/QuanLyNguoiDungAction';
export default function Profile() {
  const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(layThongTinNguoiDungAction())
    },[])
    const { thongTinNguoiDung } = useSelector(state => state.QuanLyNguoiDungReducer)
    const data = thongTinNguoiDung?.thongTinDatVe;
  return (
    <div className='container m-5'>
      <Tabs
      type='card'
        defaultActiveKey="1"
        items={[
          {
            label: `Thông tin người dùng`,
            key: '1',
            children: <UserProfile data={thongTinNguoiDung}/>,
          },
          {
            label: `Lịch sử đặt vé`,
            key: '2',
            children: <HistoryChecked data={data}/>,
          },
         
        ]}
      />
    </div>
  )
}
