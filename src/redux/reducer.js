import { NEXT_SLIDE, PREV_SLIDE, SWITCH_SOURCE, SET_REMOTE, SET_REMOTE_AUDIO } from "./actionTypes";

const initialState = {
    images: [],
    slideId: 0,
    remote: false,
    remoteImages: [],

    remoteAudio: []
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
        case SET_REMOTE_AUDIO:
            return { ...state, remoteAudio: action.payload }
        default:
            return state
    }
}