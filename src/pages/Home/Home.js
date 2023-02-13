import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import MultipleRowSlick from '../../components/RSlick/MultipleRowSlick'
import { layDanhSachPhimAction } from '../../redux/actions/QuanLyPhimAction'
import { layDanhSachCumRapAction } from '../../redux/actions/QuanLyRapAction'
import HomeMenu from './HomeMenu/HomeMenu'
import CarouselHome from '../../templates/HomeTemplate/Carousel/Carousel'
export default function Home(props) {
  const { arrPhim } = useSelector(state => state.QuanLyPhimReducer)
  const { heThongRapChieu } = useSelector(state => state.QuanLyRapReducer)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(layDanhSachPhimAction())
    dispatch(layDanhSachCumRapAction())
  }, [])
  return (
    <div className='container m-auto'>
      <CarouselHome />
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-12 mx-auto">
          <div className="">
            <MultipleRowSlick arrPhim={arrPhim} />
          </div>
        </div>
      </section>
      <HomeMenu heThongRapChieu={heThongRapChieu} />
    </div>
  )
}
