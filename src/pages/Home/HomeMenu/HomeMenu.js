import { Tabs } from 'antd'
import moment from 'moment'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

export default function HomeMenu(props) {
    const { heThongRapChieu } = props

    return (
        <div>  <Tabs
            tabPosition={'left'}
            items={heThongRapChieu?.map((cumRap, index) => {
                const id = String(index + 1);
                return {
                    label: <img style={{ width: '40px' }} src={cumRap.logo} alt={cumRap.logo} />,
                    key: id,
                    children: <div>
                        <Tabs
                            tabPosition='left'
                            items={cumRap.lstCumRap?.map((infoRap, index) => {
                                const id = String(index + 1);
                                return {
                                    label: <div className='flex flex-row'>
                                        <div className='basis-1/2'>
                                            <img style={{ width: '40px' }} src={infoRap.hinhAnh} alt={infoRap.hinhAnh} />
                                        </div>
                                        <div className='basis-1/2 ml-1'>
                                            <p style={{ marginBottom: '2px' }}>{infoRap.tenCumRap}</p>
                                            <p>{infoRap.diaChi}</p>
                                        </div>
                                    </div>,
                                    key: id,
                                    children: <div>
                                        {infoRap.danhSachPhim.slice(1, 5)?.map((listPhim, index) => {
                                            return (
                                                <div key={index} className='flex mx-4'>
                                                    <img style={{ width: '150px', height: '150px' }} src={listPhim.hinhAnh} alt={listPhim.hinhAnh} onError={(e) => {
                                                        e.target.src = 'https://picsum.photos/200/300'
                                                    }} />
                                                    <div className='mx-5'>
                                                        <h1>{listPhim.tenPhim}</h1>
                                                        <div className='grid grid-cols-6'>
                                                            {listPhim.lstLichChieuTheoPhim?.map((lichChieu, index) => {
                                                                return (
                                                                    <NavLink to={`/checkout/${lichChieu.maLichChieu}`} key={index}>
                                                                        {moment(lichChieu.ngayChieuGioChieu).format('MMMM Do YYYY, h:mm:ss a')}
                                                                    </NavLink>
                                                                )
                                                            })}
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                }
                            })}
                        />
                    </div>,
                };
            })}
        />
        </div>
    )
}
