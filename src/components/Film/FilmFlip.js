import React from 'react'
import { NavLink } from 'react-router-dom'
import './FilmFlip.css'
export default function FilmFlip(props) {
    const { film } = props
    return (
        <div className="flip-card">
            <div className="flip-card-inner">
                <div className="flip-card-front">
                    <img src={film.hinhAnh} alt={`${film.hinhAnh}`} style={{ height: "276px", margin: 'auto', width: '100%' }} />
                </div>
                <div className="flip-card-back">
                    <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">{film.tenPhim.slice(0, 30)}</h2>

                    <p className="leading-relaxed mb-3">{film.moTa.slice(0, 80) + '...'}</p>
                    <NavLink to={`/detail/${film.maPhim}`} className='btn px-3 py-1 hover:border-white hover:bg-blue-400 duration-500 ease-in-out hover:text-black absolute bottom-7' style={{ borderRadius: '5px', border: '1px solid blue', width: '50%', transform: 'translateX(-50%)' }}>Đặt vé</NavLink>
                </div>
            </div>
        </div>

    )
}
