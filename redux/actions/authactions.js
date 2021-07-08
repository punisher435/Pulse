import axios from 'axios';
import {
   
    LOGOUT,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    AUTHENTICATED_FAIL,
    AUTHENTICATED_SUCCESS
} from '../actiontypes/authactiontypes';

import { gettoken } from '../../hooks/token';
import {Server} from '../../constants';

/* axios.defaults.xsrfHeaderName = `${process.env.REACT_APP_XSRF_COOKIE}`;
axios.defaults.xsrfCookieName = `${process.env.REACT_APP_CSRF_COOKIE}`; */

export const checkAuthenticated = () => async dispatch => {
   
    var token=null;
    await gettoken('access_token')
    .then((res) => {
        
        token=res;
        
    }).catch((err) => {
        console.log('error');
    })
    
    
    if (typeof window == 'undefined') {
        dispatch({
            type: AUTHENTICATED_FAIL
        });
    }
    if (token) {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Authorization': `JWT ${token}`,
                'Content-Type': 'application/json'
            }
        };
    
        try {
            const res = await axios.get(`${Server}/auth/jwt/verify/`,config);

          
            dispatch({
                type: AUTHENTICATED_SUCCESS,
                payload:{user:res.data,token:token},
            });
            return res.data;
        } catch (err) {
            dispatch({
                type: AUTHENTICATED_FAIL
            });
        }
       
    } else {
        dispatch({
            type: AUTHENTICATED_FAIL
        });
    }
};


export const user_load =async () => {
   
    var token=null;
    await gettoken('access_token')
    .then((res) => {
      
        token=res;
        
    }).catch((err) => {
        console.log('error');
    })
    
    
   
    if (token) {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Authorization': `JWT ${token}`,
                'Content-Type': 'application/json'
            }
        };
    
       
        return await axios.get(`${Server}/auth/jwt/verify/`,config);
    }
     return 'error';      
       
};

export const load_user = () => async dispatch => {
    const token = gettoken('access_token')
    if (token) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${token}`,
                'Accept': 'application/json'
            }
        };

        try {
            const res = await axios.get(`${Server}/auth/jwt/verify`, config);

            dispatch({
                type: USER_LOADED_SUCCESS,
                payload: res.data
            });
        } catch (err) {
           
            dispatch({
                type: USER_LOADED_FAIL
            });
        }
    } else {

        dispatch({
            type: USER_LOADED_FAIL
        });
    }
};

export const login = async ({phone,hash,otp,country_code,retry}) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    };


    const body = JSON.stringify({phone,hash,otp,country_code,retry});

   
       return  await axios.post(`${Server}/auth/otp/verify-and-signin`, body, config)
       

           
         

        
    
};

export const signup = async ({phone,hash,otp,country_code,retry}) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    }

    const body = JSON.stringify({ phone,hash,otp,country_code ,retry}); 

   
        
        return await axios.post(`${Server}/auth/otp/verify-and-signup`, body, config)
        

        
    
};

export const sendotp = ({phone,country_code}) => async dispatch => {
    console.log("all good")
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    }

    const body = JSON.stringify({phone,country_code}); 

        return await axios.post(`${Server}/auth/otp/send`, body, config)
       
};



export const logout = () => dispatch => {
    dispatch({ type: LOGOUT });
};