import axios from 'axios';


import {Server} from '../constants';
import Api from './endpoints';



export const updateprofile = async (token,data) => {
   
    if(token)
    {
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'Authorization': `JWT ${token}`,
              
            }
        };
     
       
        return  await axios.post(`${Server}/${Api.updateprofile}`,data, config)
    }
    else{
        return 'error';
    }
   

};


export const loadchats = async (token,receiver,page) => {
  
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
                page:page,
            },
            
        };
        
     
       
        return  await axios.get(`${Server}/${Api.loadchats}`, config)
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

