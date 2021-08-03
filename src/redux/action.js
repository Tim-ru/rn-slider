import { NEXT_SLIDE, PREV_SLIDE, SWITCH_SOURCE, SET_REMOTE, SET_REMOTE_AUDIO } from "./actionTypes";

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

function setRemoteAudio(audio) {
    return {
        type: SET_REMOTE_AUDIO,
        payload: audio
    }
}

export const actions = {
    nextSlide,
    prevSlide,
    switchSource,
    setRemote,
    setRemoteAudio,
}