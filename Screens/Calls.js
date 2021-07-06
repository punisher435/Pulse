import React,{useEffect,useState} from 'react'
import { StyleSheet, Text, View,ScrollView,BackHandler } from 'react-native'
import {
   
    mediaDevices
    ,RTCView,
  } from 'react-native-webrtc';
  import {
    JOIN_CHAT,
    ADD_STREAM,
    MY_STREAM,
    ADD_REMOTE_STREAM,
} from '../redux/actiontypes/authactiontypes';
import {joinRoom} from '../redux/actions/videoactions';
import { connect } from 'react-redux';
import IconButton from '../components/IconButton';
import { useNavigation } from '@react-navigation/core'
import { call } from 'react-native-reanimated';

function Calls(props) {
  const navigation = useNavigation();
  const {roomid} = props.route.params;

  const [audio,setaudio] = useState(true)
  const [audio1,setaudio1] = useState(true)

    useEffect(() => {
     
        let isFront = audio;
        mediaDevices.enumerateDevices().then(sourceInfos => {
          
          let videoSourceId;
          for (let i = 0; i < sourceInfos.length; i++) {
            const sourceInfo = sourceInfos[i];
            if(sourceInfo.kind == "videoinput" && sourceInfo.facing == (isFront ? "front" : "environment")) {
              videoSourceId = sourceInfo.deviceId;
            }
          }
          mediaDevices.getUserMedia({
            audio: audio1,
            video: {
              width: 640,
              height: 480,
              frameRate: 30,
              facingMode: (isFront ? "user" : "environment"),
              deviceId: videoSourceId
            }
          })
          .then(stream => {
            console.log("getting stream")
            props.joinRoom(stream,roomid);
           
          })
          .catch(error => {
            console.log(error);
          });
        });
        
        
    },[audio,audio1])

    

    return (
        <View style={styles.container}>
            <ScrollView horizontal style={styles.stream}>
              {
                
                  props.streams.map((stream,index) => (
                      <RTCView key={index} streamURL={stream.toURL()}
                      style={{width:500,height:'100%',}}/>
                  ))
           
              }
               

              {
                    props.remoteStreams.map((stream,index) => (
                        <RTCView key={index} streamURL={stream.toURL()}
                        style={{width:500,height:'100%',}}/>
                    ))
                }

            

            </ScrollView>

            <View style={styles.iconcontainer1}>
            <View style={styles.iconcontainer}>
            <View style={{marginRight:10,}}>
                <IconButton name="close" onPress={() => {console.log(props.myStream); props.myStream.getTracks().forEach(t => t.stop());
props.myStream.release();if(props.call){console.log(props.call);props.call.close()}navigation.navigate('Chats')} } />
                </View>
                <View style={{marginLeft:10,}}>
                  {
                    audio1 ? <IconButton name="volume-up" onPress={() => {setaudio1(!audio1);}} materialicons/> : 
                    <IconButton name="volume-mute" onPress={() => {setaudio1(!audio1);}} />
                  }
                
                </View>

                <View style={{marginLeft:10,}}>
                  {
                    audio ? <IconButton name="rotate-left" onPress={() => {setaudio(!audio);}} materialicons/> : 
                    <IconButton name="rotate-left" onPress={() => {setaudio(!audio);}} materialicons/>
                  }
                
                </View>
            </View>
            </View>

            <View style={styles.mystreamcontainer}>
            <View style={styles.mystream}>
                {
                    props.myStream ? props.myStream ? (
                        <RTCView streamURL={props.myStream.toURL()}
                        style={{width:'100%',height:'100%',alignItems:'center'}}/>
                    ) : null : null
                }
            </View>
            </View>
        </View>
    )
}

const mapStateToProps = state => ({
  
    myStream:state.authreducers.myStream,
    streams:state.authreducers.streams,
    remoteStreams:state.authreducers.remoteStreams,
    call:state.authreducers.call,
  });
  
export default connect(mapStateToProps,{joinRoom})(Calls);

const styles = StyleSheet.create({
    container:{
        flex:1,
      
    },
    iconcontainer:{
      flexDirection:'row',
      flex:1,
      justifyContent:'center',
      alignItems:'center',
      
    },
    iconcontainer1:{
     width:'100%',
     height:50,
     backgroundColor:'black'
      
    },
    stream:{
        flex:1,
        backgroundColor:'black',
    },
    mystream:{
    
       alignItems:'center',
       justifyContent:'center',
      
    },
    mystreamcontainer:{
      backgroundColor:'black',
     
      width:'100%',
      height:100,
    },
})
