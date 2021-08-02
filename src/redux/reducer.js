import { NEXT_SLIDE, PREV_SLIDE, SWITCH_SOURCE, SET_REMOTE } from "./actionTypes";

const initialState = {
    images: [],
    slideId: 0,
    remote: false,
    remoteImages: [],
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case NEXT_SLIDE:
            return { ...state, slideId: action.payload }
        case PREV_SLIDE:
            return { ...state, slideId: action.payload }
        case SWITCH_SOURCE:
            return { ...state, remote: action.payload }
        case SET_REMOTE:
            return { ...state, remoteImages: action.payload }
        default:
            return state
    }
}