import React, { useEffect } from 'react'
import { Carousel } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import { getCarousel } from '../../../redux/actions/CarouselReducerAction';
export default function CarouselHome() {
  const contentStyle = {
    with: '100%',
    margin: 0,
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat'
  };
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getCarousel())
  }, [])

  const { arrCarousel } = useSelector(state => state.CarouselReducer)
  const renderCarousel = () => {
    return arrCarousel?.map((item, index) => {
      return (
        <div key={index} style={{ ...contentStyle, backgroundImg: `url(${item.hinhAnh})` }}>
          <img src={`${item.hinhAnh}`} alt={`${item.hinhAnh}`} style={{ width: '100%', height: '100%' }} />
        </div>
      )
    })
  }
  return (
    <Carousel className='relative'>
      {renderCarousel()}
    </Carousel>
  )
}
