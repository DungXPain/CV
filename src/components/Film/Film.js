import React from 'react'

export default function Film(props) {
    const { film } = props
    return (
        <div className="p-2" >
            <div className="h-[502px] bg-gray-100 bg-opacity-75 px-8 pt-4 pb-24 rounded-lg overflow-hidden text-center relative">
                <img src={film.hinhAnh} alt={`${film.hinhAnh}`} style={{height:"276px",margin:'auto',width:'100%'}} />
                <h1 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">{film.tenPhim.slice(0, 30)}</h1>
               
                <p className="leading-relaxed mb-3">{film.moTa.slice(0,120) + '...'}</p>
                 <button className=' px-3 py-1 hover:border-white hover:bg-blue-400 duration-500 ease-in-out hover:text-white absolute bottom-7' style={{borderRadius: '5px' , border:'1px solid blue',width:'50%',transform:'translateX(-50%)'}}>Đặt vé</button>
            </div>
        </div>
    )
}
