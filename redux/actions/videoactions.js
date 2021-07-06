import axios from 'axios';
import {
    JOIN_CHAT,
    ADD_STREAM,
    MY_STREAM,
    ADD_REMOTE_STREAM,
} from '../actiontypes/authactiontypes';
import io from 'socket.io-client';
import { gettoken,storetoken,removetoken } from '../../hooks/token';
import {Server,Server1,Port,IOServer} from '../../constants';
import Peer from 'react-native-peerjs';


 














export const joinRoom = (stream,roomid) => async (dispatch) => {
 try{

    window.navigator.userAgent = "react-native"; // for some versions of socketio this is needed also in React Native
// note the /dist/ subdirectory (socket.io-client v.2.1.1)!

const connectionConfig = {
 jsonp: false,
 reconnection: true,
 reconnectionDelay: 100,
 reconnectionAttempts: 5,
 transports: ['websocket'], // you need to explicitly tell it to use websockets
};

const socket = io('http://192.168.1.5:3030', connectionConfig);


socket.on('connect', function(){
 console.log('Socket connected!');
});
   
    const peerServer = new Peer(undefined,{
        host:'192.168.1.5',
        port:'8878',
        secure:false,
        path:'/mypeer',
        config: { 'iceServers': [
            { url: 'stun:stun01.sipphone.com' },
            { url: 'stun:stun.ekiga.net' },
        { url: 'stun:stunserver.org' },
        { url: 'stun:stun.softjoys.com' },
        { url: 'stun:stun.voiparound.com' },
        { url: 'stun:stun.voipbuster.com' },
        { url: 'stun:stun.voipstunt.com' },
        { url: 'stun:stun.voxgratia.org' },
        { url: 'stun:stun.xten.com' },]},
    })
    
    peerServer.on('error',console.log)








const roomId = roomid;
dispatch({type:MY_STREAM,payload:stream});



peerServer.on('open',(userId) => {
    console.log("join-room")
socket.emit('join-room',{userId,roomId});

})

socket.on('user-connected',(userId) => {
    console.log('user-connected')
    console.log("connected")
    const call = peerServer.call(userId,stream);
     
     call.on('stream',(videostream) => {
         if(videostream)
         {
             console.log('stream started')
             dispatch({type:ADD_REMOTE_STREAM,payload:{videostream,call}});
         }
     })

    
})






peerServer.on('call', (call) => {
    console.log("got call");
    call.answer(stream);
    call.on('stream', (stream) => {
        console.log('stream started')
        dispatch({type:ADD_STREAM,payload:stream});
    })
    
})






    }
    catch(error)
    {
        console.log(error);
    } 

}




