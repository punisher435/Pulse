import axios from 'axios';


import {Server} from '../constants';
import { gettoken} from '../hooks/token';
import Api from './endpoints';






const register =async (pushtoken) => {
  
  var token=null;
    await gettoken('access_token')
    .then((res) => {
        
        token=res;
        
    }).catch((err) => {
        console.log('error');
    })
  if(token)
  {
      console.log("all good")
      const config = {
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `JWT ${token}`,
              'Accept': 'application/json',
          }
      }
  
      const body = JSON.stringify({pushtoken}); 
  
          return await axios.post(`${Server}/${Api.pushtoken}`, body, config)
  }
  else{
      return 'no token'
  }
  
     
};

export default {
  register,
};
