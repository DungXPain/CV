import { GET_DATA_BANNER } from "../types/CarouselReducerType"

const initialState = {
    arrCarousel: []
}

const CarouselReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DATA_BANNER: {
            state.arrCarousel = action.arrCarousel
            return { ...state }
        }
        default:
            return state
    }
}
export default CarouselReducer