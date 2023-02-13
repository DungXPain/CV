import Slider from "react-slick";
import React, { useState } from 'react'
import FilmFlip from "../Film/FilmFlip";
import { useDispatch } from "react-redux";
import { SET_DANH_SACH_PHIM_DANG_CHIEU, SET_DANH_SACH_PHIM_SAP_CHIEU } from "../../redux/types/DanhSachPhimType";
import './MultipleRowSlick.css'
export default function MultipleRowSlick(props) {
    const dispatch = useDispatch()
    const settings = {
        className: "center variable-width p-2",
        centerMode: true,
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 2,
        speed: 500,
        rows: 1,
        slidesPerRow: 2,
    };
    const [actvieFilm, setActiveFilm] = useState(true)
    const [actvieFilmSC, setActiveFilmSC] = useState(false)
    const { arrPhim } = props
    const renderFilm = () => {
        return arrPhim.map((item, index) => {
            return <div key={index} className='h-[308px] p-2'><FilmFlip film={item} /></div>
        })
    }
    let activeClass = actvieFilm ? 'active_Film' : 'non-active-Film'
    let activeClassSC = actvieFilmSC ? 'active_Film' : 'non-active-Film'
    return (
        <div>
            <button className={`text-center py-3 px-8 font-semibold rounded-full ${activeClass}`} onClick={() => {
                dispatch({
                    type: SET_DANH_SACH_PHIM_DANG_CHIEU,
                    arrPhim: arrPhim
                })
                if (actvieFilm === true) {
                    setActiveFilm(false)
                    setActiveFilmSC(true)
                } else {
                    setActiveFilm(true)
                    setActiveFilmSC(false)
                }
            }}> Phim đang chiếu</button>

            <button className={`text-center py-3 px-8 ml-5 font-semibold rounded-full ${activeClassSC}`} onClick={() => {
                dispatch({
                    type: SET_DANH_SACH_PHIM_SAP_CHIEU,
                    arrPhim: arrPhim
                })
                if (actvieFilmSC === false) {
                    setActiveFilmSC(true)
                    setActiveFilm(false)
                } else {
                    setActiveFilmSC(false)
                    setActiveFilm(true)
                }
            }}> Phim sắp chiếu</button>
            <Slider {...settings}>
                {renderFilm()}
            </Slider>
        </div>
    )
}
