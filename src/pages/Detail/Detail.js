import React, { useEffect } from 'react'
import '@tsamantanis/react-glassmorphism/dist/index.css'
import { CustomCard } from '@tsamantanis/react-glassmorphism'
import '../../assets/style/Circle.css'
import { Tabs, Rate } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { layThongTinChiTietPhim } from '../../redux/actions/QuanLyRapAction';
import { NavLink } from 'react-router-dom';

export default function Detail(props) {
    let FilmDetail = useSelector(state => state.QuanLyPhimReducer.FilmDetail)
    const dispatch = useDispatch()
    useEffect(() => {
        let { id } = props.match.params
        dispatch(layThongTinChiTietPhim(id))
    }, [])
    return (
        <div style={{ backgroundImage: `url(${FilmDetail.hinhAnh})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', minHeight: '100vh', backgroundSize: 'cover' }}>
            <CustomCard
                style={{ minHeight: '100vh' }}
                effectColor="#C780FF"
                color="white"
                blur={10}
                borderRadius={0}
            >
                <div className='grid grid-cols-12'>
                    <div className='col-span-4 col-start-4'>
                        <div className='grid grid-cols-2'>
                            <img src={FilmDetail.hinhAnh} alt={FilmDetail.hinhAnh} style={{ width: '200px', height: '350px' }} className='rounded-md' />
                            <div className=' ml-2'>
                                <div>
                                    <p>Ngày chiếu: {FilmDetail.ngayKhoiChieu}</p>
                                    <p className='font-bold text-2xl'>{FilmDetail.tenPhim}</p>
                                    <p className='font-sm'>Mô tả: {FilmDetail.moTa}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-span-6 col-start-9'>
                        <div className='text-center'>Đánh giá</div>
                        <div className='flex justify-center'><Rate /></div>
                        <div className={`c100 p${FilmDetail.danhGia * 10} dark big center green`}>
                            <span>{FilmDetail.danhGia * 10}%</span>
                            <div className="slice"><div className="bar"></div><div className="fill"></div></div>
                        </div>
                    </div>
                </div>
                <div className='mt-5 text-white bg-white'>
                    <Tabs
                        defaultActiveKey="1"
                        style={{ margin: "10px" }}
                        centered
                        items={[
                            {
                                label: `Lịch chiếu`,
                                key: '1',
                                children: <Tabs
                                    tabPosition={'left'}
                                    style={{ margin: "10px" }}
                                    items={FilmDetail.heThongRapChieu?.map((htr, i) => {
                                        const id = String(i + 1);
                                        return {
                                            label: <img style={{ width: '40px' }} src={`${htr.logo}`} alt={`${htr.logo}`} />,
                                            key: id,
                                            children: <div>
                                                <div>{htr.cumRapChieu?.map((cumRap, index) => {
                                                    return <div key={index} >
                                                        <div className='flex flex-row mt-4'>
                                                            <img src={cumRap.hinhAnh} alt='...' style={{ width: '50px' }} />
                                                            <div className='ml-4'>
                                                                <p className='text-[20px] font-bold leading-1'>{cumRap.tenCumRap}</p>
                                                                <p>{cumRap.diaChi}</p>
                                                            </div>
                                                        </div>
                                                        <div className='thong-tin-lich-chieu grid grid-cols-6'>
                                                            {cumRap.lichChieuPhim?.map((lichChieu, index) => {
                                                                return <NavLink to={`/checkout/${lichChieu.maLichChieu}`} key={index} className='col-span-1 font-bold'>
                                                                    {moment(lichChieu.ngayChieuGioChieu).format('hh:mm A')}
                                                                </NavLink>
                                                            })}
                                                        </div>
                                                    </div>
                                                })}</div>
                                            </div>,
                                        };
                                    })}
                                />,
                            },
                            {
                                label: `Thông tin`,
                                key: '2',
                                children: `Content of Tab Pane 2`,
                            },
                            {
                                label: `Đánh giá `,
                                key: '3',
                                children: `Content of Tab Pane 3`,
                            },
                        ]}
                    />

                </div>
            </CustomCard>
        </div>
    )
}


