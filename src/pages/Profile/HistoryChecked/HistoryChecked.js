import React from 'react'
import { List } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import moment from 'moment';

export default function HistoryChecked(props) {

    return (
        <div>
            <InfiniteScroll
                dataLength={props?.data.length}>
                <List
                    itemLayout="horizontal"
                    dataSource={props.data}
                    renderItem={(item) => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<img onError={(e) => {
                                    e.target.src = 'https://picsum.photos/200/300'
                                }} src={item.hinhAnh} alt={item.hinhAnh} style={{ width: '40px' }} />}
                                title={<span>Mã vé: {item.maVe}</span>}
                                description={`Tên phim: ${item.tenPhim} - Thời lượng: ${item.thoiLuongPhim} phút - Ngày đặt: ${moment(item.ngayDat).format('DD/MM/YYYY')}`}
                                
                            />
                        </List.Item>
                    )}
                />
            </InfiniteScroll>
        </div>
    )
}
