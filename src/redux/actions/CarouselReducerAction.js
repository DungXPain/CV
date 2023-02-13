import axios from "axios"
import { quanLyPhimService } from "../../service/QuanLyPhimService"
import { DOMAIN } from "../../util/settings/config"
import { GET_DATA_BANNER } from "../types/CarouselReducerType"

export const getCarousel = () => {
    return async (dispatch) => {
        try {
            const result = await quanLyPhimService.layDanhSachBanner()
            dispatch({
                type: GET_DATA_BANNER,
                arrCarousel: result.data.content
            })
        } catch (error) {
            console.log(error)
        }
    }
}
