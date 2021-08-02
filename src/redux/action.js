import { NEXT_SLIDE, PREV_SLIDE, SWITCH_SOURCE, SET_REMOTE } from "./actionTypes";

function nextSlide(value) {
    return {
        type: NEXT_SLIDE,
        payload: value
    }
}

function prevSlide(value) {
    return {
        type: PREV_SLIDE,
        payload: value
    }
}

function switchSource(remote) {
    return {
        type: SWITCH_SOURCE,
        payload: remote
    }
}

function setRemote(images) {
    return {
        type: SET_REMOTE,
        payload: images
    }
}

export const actions = {
    nextSlide,
    prevSlide,
    switchSource,
    setRemote,
}