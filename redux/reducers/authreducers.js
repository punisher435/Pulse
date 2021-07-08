import {
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    AUTHENTICATED_FAIL,
    AUTHENTICATED_SUCCESS,
    USER_LOADED_SUCCESS,
    UPDATE_USER,
    USER_LOADED_FAIL,
    MY_STREAM,
    ADD_STREAM,
    ADD_REMOTE_STREAM,
} from '../actiontypes/authactiontypes';

import { storetoken,removetoken } from '../../hooks/token';

const initialState = {
    token: null,
    isAuthenticated: null,
    user: null,
    myStream:null,
    streams:[],
    remoteStreams:[],
    call:null,
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case AUTHENTICATED_SUCCESS:
            return {
                ...state,
                token:payload.token,
                user:payload.user,
                isAuthenticated: true,
            }
        case UPDATE_USER:
            return {
                ...state,
                token:payload.token,
                user:payload.user,
                isAuthenticated: true,
            }
        case MY_STREAM:{
            return {
                ...state,
                myStream:payload,
            }
        }
        case ADD_STREAM:{
            return {
                ...state,
                streams:[...state.streams,payload],
            }
        }
        case ADD_REMOTE_STREAM:{
            return {
                ...state,
                remoteStreams:[...state.remoteStreams,payload.videostream],
                call:payload.call,
            }
        }
        case LOGIN_SUCCESS:
            storetoken('access_token',payload.token);
            return {
                ...state,
                user:payload.user,
                isAuthenticated: true,
                token: payload.token,
            }
        case USER_LOADED_SUCCESS:
            return {
                ...state,
                user: payload
            }
        case SIGNUP_SUCCESS:
            
            storetoken('access_token',payload.token);
            return {
                ...state,
                user:payload.user,
                isAuthenticated: true,
                token: payload.token,
            }
        case AUTHENTICATED_FAIL:
           
            return {
                ...state,
                token:null,
                user:null,
                isAuthenticated: false,
            }
        case USER_LOADED_FAIL:
           
            return {
                ...state,
                token:null,
                user:null,
                isAuthenticated: false,
            }
        case SIGNUP_FAIL:
        case LOGIN_FAIL:
        case LOGOUT:
            removetoken('access_token')
            return {
                ...state,
                token:null,
                isAuthenticated: false,
                user: null
            }
        default:
            return state
    }
}