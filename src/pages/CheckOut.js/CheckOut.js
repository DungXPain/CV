import React, { Fragment, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import style from './CheckOut.module.css'
import _ from 'lodash'
import { Button, Tabs } from 'antd';
import {HomeOutlined} from '@ant-design/icons'
import {
  CloseOutlined,
  UserOutlined,
  CheckOutlined,
  SmileOutlined
} from '@ant-design/icons';
import { datGheAction, datVeAction, quanLyDatVeAction } from '../../redux/actions/QuanLyDatVeAction'
import { CHANGE_TAB_ACTIVE, DAT_VE_REALTIME } from '../../redux/types/QuanLyDatVeType';
import { ThongTinDatVe } from '../../_core/Models/ThongTinDatVe';
import { layThongTinNguoiDungAction } from '../../redux/actions/QuanLyNguoiDungAction';
import moment from 'moment';
import { connection } from '../..';
import { history } from '../../App';
function CheckOut(props) {
  const { id } = props.match.params
  const dispatch = useDispatch()
  const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer)
  const { chiTietPhongVe, danhSachGheDangDat, danhSachGheKhachDat } = useSelector(state => state.QuanLyDatVeReducer)
  useEffect(() => {
    dispatch(quanLyDatVeAction(id))
    connection.on('datVeThanhCong', () => {
      dispatch(quanLyDatVeAction(id))
    })
    connection.invoke('loadDanhSachGhe', id)
    connection.on('loadDanhSachGheDaDat', (dsGheKhachDat) => {
      dsGheKhachDat = dsGheKhachDat.filter(item => item.taiKhoan !== userLogin.taiKhoan)
      let arrGheKhachDat = dsGheKhachDat.reduce((result, item, index) => {
        let arrGhe = JSON.parse(item.danhSachGhe)
        return [...result, ...arrGhe]
      }, [])
      arrGheKhachDat = _.uniqBy(arrGheKhachDat, 'maGhe')
      dispatch({
        type: DAT_VE_REALTIME,
        arrGheKhachDat: arrGheKhachDat
      })
    })
    window.addEventListener('beforeunload', () => {
      clearGhe()
      window.removeEventListener('beforeunload', clearGhe)
    })
  }, [])
  const clearGhe = (event) => {
    connection.invoke('huyDat', userLogin.taiKhoan, id)
  }

  const renderSeat = () => {
    return chiTietPhongVe.danhSachGhe?.map((ghe, index) => {
      let classGheVip = ghe.loaiGhe === 'Vip' ? 'gheVip' : ''
      let classGheDaDat = ghe.daDat === true ? 'gheDaDat' : ''
      let classGheDangDat = ''
      let indexGheDD = danhSachGheDangDat.findIndex(gheDD => gheDD.maGhe === ghe.maGhe)
      let classGheDaDuocDat = ''

      if (userLogin.taiKhoan === ghe.taiKhoanNguoiDat) {
        classGheDaDuocDat = 'gheDaDuocDat'
      }
      if (indexGheDD != -1) {
        classGheDaDat = 'gheDangDat'
      }
      let classGheKhachDat = ''
      let indexGheKD = danhSachGheKhachDat.findIndex(gheKD => gheKD.maGhe === ghe.maGhe)
      if (indexGheKD != -1) {
        classGheKhachDat = 'gheKhachDat'
      }
      return (<Fragment key={index}>
        <button
          onClick={() => {
            dispatch(datGheAction(ghe, id))
          }}
          disabled={ghe.daDat || classGheKhachDat != ''}
          className={`
        ${style[`ghe`]} 
        ${style[`${classGheVip}`]} 
        ${style[`${classGheDaDat}`]}
        ${style[`${classGheDangDat}`]}
        ${style[`${classGheDaDuocDat}`]}
        ${style[`${classGheKhachDat}`]}
        `}>
          {ghe.daDat ? classGheDaDuocDat != '' ? <UserOutlined /> : <CloseOutlined /> : classGheKhachDat !== '' ? <SmileOutlined /> : ghe.stt}
        </button>
        {(index + 1) % 16 === 0 ? <br /> : ''}
      </Fragment>)
    })
  }
  return (
    <div className='container mx-auto' style={{ minHeight: '100vh' }}>

      <div className='grid grid-cols-12'>
        <div className='col-span-8 mr-5'>
          <div className='flex flex-col justify-center mt-5'>
            <div className='bg-black w-[100%] h-2'>
            </div>
            <div id={style.trapezoid} style={{ textAlign: 'center', color: "black", fontWeight: "bold" }}>
              Màn hình
            </div>
            <div>
              {renderSeat()}
            </div>
          </div>
          <div className='mt-5 flex justify-center'>
            <table className='table-auto min-w-full' style={{ border: 'none' }}>
              <thead className='bg-gray-50 divide-y divide-stone-400'>
                <tr>
                  <th>Ghế chưa đặt</th>
                  <th>Ghế đang đặt</th>
                  <th>Ghế đã đặt</th>
                  <th>Ghế vip</th>
                  <th>Ghế khách đang đặt</th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-stone-400'>
                <tr>
                  <td style={{ textAlign: 'center' }}><button className={`${style[`ghe`]} text-center`}>00</button></td>
                  <td style={{ textAlign: 'center' }}><button className={`${style[`ghe`]} ${style[`gheDangDat`]} text-center`}><CheckOutlined /></button></td>
                  <td style={{ textAlign: 'center' }}><button className={`${style[`ghe`]} ${style[`gheDaDat`]} text-center`}><CheckOutlined /></button></td>
                  <td style={{ textAlign: 'center' }}><button className={`${style[`ghe`]} ${style[`gheVip`]} text-center`}><CheckOutlined /></button></td>
                  <td style={{ textAlign: 'center' }}><button className={`${style[`ghe`]} ${style[`gheKhachDat`]} text-center`}><CheckOutlined /></button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className='col-span-4'>
          <h3 className='text-green-400 text-center'>Chọn ghế</h3>
          <hr />
          <h3 className='text-xl'>{chiTietPhongVe?.thongTinPhim?.tenPhim}</h3>
          <p>Địa điểm: {chiTietPhongVe?.thongTinPhim?.diaChi}</p>
          <p>Ngày chiếu: {chiTietPhongVe?.thongTinPhim?.ngayChieu} - {chiTietPhongVe?.thongTinPhim?.gioChieu} {chiTietPhongVe?.thongTinPhim?.tenRap}</p>
          <hr />
          <div className='flex flex-row justify-between'>
            <div className='col-span-1'>
              <span className='text-red-400 text-xl'>Ghế </span>

              {_.sortBy(danhSachGheDangDat, ['stt']).map((gheDD, index) => {
                return <span key={index} className='text-xl text-green-500'>
                  {gheDD.stt} <span> </span>
                </span>
              })}
            </div>
            <div className='text-right text-green-800 col-span-1'>
              <span>
                {danhSachGheDangDat.reduce((tongTien, ghe, index) => {
                  return tongTien += ghe.giaVe
                }, 0)}
              </span>
            </div>
          </div>
          <hr />
          <div className='my-5'>
            <i>Email</i><br />
            {userLogin.email}
          </div>
          <hr />
          <div className='my-5'>
            <i>Phone</i><br />
            {userLogin.soDT}
          </div>
          <hr />
          <div className='mb-0 my-5 h-full flex items-end'>
            <div type='button' className='bg-green-500 text-white py-2 w-full font-bold text-center btn cursor-pointer' onClick={() => {
              const thongTinDatVe = new ThongTinDatVe()
              thongTinDatVe.maLichChieu = props.match.params.id
              thongTinDatVe.danhSachVe = danhSachGheDangDat
              dispatch(
                datVeAction(thongTinDatVe)
              )
            }}>
              ĐẶT VÉ
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


//KẾT QUẢ ĐẶT VÉ
function KetQuaDatVe(props) {
  const { thongTinNguoiDung, userLogin } = useSelector(state => state.QuanLyNguoiDungReducer)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(layThongTinNguoiDungAction())
  }, [])
  const renderTicketItem = () => {
    return thongTinNguoiDung?.thongTinDatVe?.map((ticket, index) => {
      return <div key={index} className="p-2 lg:w-1/3 md:w-1/2 w-full">
        <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
          <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src={ticket.hinhAnh} />
          <div className="flex-grow">
            <h2 className="text-gray-900 title-font font-medium">{ticket.tenPhim}</h2>
            <p className="text-gray-500">{moment(ticket.ngayDat).format('hh:mm A - DD - MM - YYYY')} Ngày chiếu : {moment(ticket.ngayDat).format(
              'DD - MM - YYYY '
            )}</p>
            <p className="text-gray-500">Địa điểm : {_.first(ticket.danhSachGhe).tenHeThongRap}</p>
            <p>Tên rạp: {_.first(ticket.danhSachGhe).tenRap}  Ghế :  {_.first(ticket.danhSachGhe).tenGhe}</p>
          </div>
        </div>
      </div>
    })
  }
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Lịch sử đặt vé khách hàng</h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Hãy xem thông tin địa chỉ và thời gian để xem phim vui vẻ bạn nhé</p>
        </div>
        <div className="flex flex-wrap -m-2">
          {renderTicketItem()}
        </div>
      </div>
    </section>
  )
}




export default function Demo(props) {
  useEffect(()=>{
    dispatch({
      type:CHANGE_TAB_ACTIVE,
      number:'1'
    })
  },[])
  const { tabActive } = useSelector(state => state.QuanLyDatVeReducer)
  const dispatch = useDispatch()
  const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer)

  const OperationsSlot = <Fragment>{!_.isEmpty(userLogin) ? <div style={{display:'flex',alignItems:'center'}}>
    <button onClick={() => {
      history.push('/profile')
    }}><div style={{ width: '50px', height: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center' }} className='rounded-full bg-red-200 text-xl'>{userLogin.taiKhoan.substr(0, 1)}</div></button>
    <button style={{marginLeft:'10px',border:'1px solid red'}} className='rounded-md p-2' onClick={()=>{
      localStorage.removeItem('userLogin')
      localStorage.removeItem('TOKEN')
      history.push('/home')
      window.location.reload()
    }} >Đăng xuất</button>
  </div> : ''}</Fragment>;
  return <Tabs
    tabBarExtraContent={OperationsSlot}
    defaultActiveKey={`1`}
    activeKey={`${tabActive}`}
    style={{ padding: '20px' }}
    items={[
      {

        label: <div onClick={() => {
          dispatch({
            type: CHANGE_TAB_ACTIVE,
            number: 1
          })
        }}>01.Chọn ghế và thanh toán</div>,
        key: '1',
        children: <div>
          {CheckOut({ ...props })}
        </div>,

      },
      {
        label: <div onClick={() => {
          dispatch({
            type: CHANGE_TAB_ACTIVE,
            number: 2
          })
        }}>02.Kết quả đặt vé</div>,
        key: '2',
        children: <div>
          {KetQuaDatVe({ ...props })}
        </div>,
      },
      {
        label: <div className='text-xl' onClick={() => {
          history.push('/home')
        }}><HomeOutlined /></div>,
        key: '3',
        children: <div>
          
        </div>,
      }
    ]}

  />
}


