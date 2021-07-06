import axios from 'axios';


import {Server} from '../constants';
import Api from './endpoints';



export const loadrecentchats = async (token) => {
 
    if(token)
    {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${token}`,
                'Accept': 'application/json',
            }
        };
       
        return  await axios.get(`${Server}/${Api.load_recent_chats}`, config)
    }
    else{
        return 'error';
    }
   

};


export const seenchats = async (token,receiver) => {
  
    if(token)
    {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${token}`,
                'Accept': 'application/json',
            },
            params:{
                recid:receiver,
            },
        };
       
        return  await axios.get(`${Server}/${Api.seenmessage}`, config)
    }
    else{
        return 'error';
    }
   

};

export const sendmessage = async (token,data,receiver) => {
  
    if(token)
    {
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'Authorization': `JWT ${token}`,
              
            },
            params:{
                recid:receiver,
            }
        };
     
       
        return  await axios.post(`${Server}/${Api.sendmessage}`,data, config)
    }
    else{
        return 'error';
    }
   

};



export const addcontact =async ({phone,country_code,token}) => {
    if(token)
    {
       
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${token}`,
                'Accept': 'application/json',
            }
        }
    
        const body = JSON.stringify({phone,country_code}); 
    
            return await axios.post(`${Server}/${Api.addcontact}`, body, config)
    }
    else{
        return 'no token'
    }
    
       
};

