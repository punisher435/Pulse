import React,{useEffect,useState} from 'react'
import { StyleSheet, View,Image,ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import { Audio } from 'expo-av';


import AppText from '../components/Text';
import TextInput from "../components/TextInput";
import Colors from '../config/colors';
import { loadchats } from '../api/profile';
import { sendmessage ,seenchats} from '../api/chats';
import IconButton from "../components/IconButton";
import Recording from '../components/recording';
import Message from '../components/Message';
import Fullimage from '../components/Fullimage';


const ChatScreen = ({token,user,route}) => {
    const navigation = useNavigation();
    const [recording, setRecording] = React.useState(false);
    

    const [chats,setchats] = useState([]);
    const [page,setpage] = useState(1);
    const [flag,setflag] = useState(0);
    const scrollViewRef = React.useRef()

    const {id,chat} = route.params;
    
  
    
    const [message,setmessage] = useState({
        text:'',
        image:null,
        audio:null,
    })

    const fetchchats = async () => {
        try {
            const res = await loadchats(token,id,page);
           console.log('executed')
            setchats(res.data);
            seenchats(token,id);
            
        } catch (error) {
            console.log(error);
        }
        
      
    }

    

   

 

    const onsend = async () => {
       
    
        let formData=new FormData();
        formData.append('text',message.text);
       
        
        try {

          
           
            const res = await sendmessage(token,formData,id);
          console.log('success')
        
          fetchchats();
         
          
        
         
        } catch (error) {
         console.log(error)
        }
        setmessage({
          text:'',
          image:null,
          audio:null,
      })
      }


      const onsendimage = async (image) => {
       
    
        let formData=new FormData();
        formData.append('text',message.text);
        if(image)
        {formData.append('image',{
          name: "image" + 0+'.jpeg',
          type: "image/jpeg",
          uri: image,
        });}

        
        try {

          
           
            const res = await sendmessage(token,formData,id);
          console.log('success')
         
          fetchchats();
         
          
        
         
        } catch (error) {
         console.log(error)
        }
        setmessage({
          text:'',
          image:null,
          audio:null,
      })
      }


      const onsendaudio = async (audio) => {
       
    
        let formData=new FormData();
        formData.append('text',message.text);
        if(audio)
        {formData.append('image',{
          name: "audio" +'.m4a',
          type: "audio/m4a",
          uri: audio,
        });}

        
        try {

          
           
            const res = await sendmessage(token,formData,id);
          console.log('success')
        
          fetchchats();
         
          
        
         
        } catch (error) {
         console.log(error)
        }
        setmessage({
          text:'',
          image:null,
          audio:null,
      })
      }

    const onvoice = () => {
        startRecording();
    }
    const onshare = () => {
        requestPermission();
        
    }

    async function startRecording() {
        try {
            if(!recording)
          {console.log('Requesting permissions..');
          await Audio.requestPermissionsAsync();
          await Audio.setAudioModeAsync({
            allowsRecordingIOS: true,
            playsInSilentModeIOS: true,
          }); 
          console.log('Starting recording..');
          const recording = new Audio.Recording();
          try {
            await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
            await recording.startAsync();
            // You are now recording!
          } catch (error) {
            // An error occurred!
            console.log(error);
          }
         
          setRecording(recording);
          console.log('Recording started');
        }
        else{
            stopRecording();
            
        }
        }
         catch (err) {
          console.error('Failed to start recording', err);
        }

      }
    
      async function stopRecording() {
        console.log('Stopping recording..');
         
            try{await recording.stopAndUnloadAsync();
            const uri = recording.getURI(); 
            console.log("audio",uri)
            
            setRecording(false);
            onsendaudio(uri);
          }
            catch(error)
            {
                console.log(error);
            }
      }


    const requestPermission = async () => {
        const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!granted) alert("You need to enable permission to access the library.");
        if(granted)
        {
            handlePress();
        }
      };
    
      const handlePress = () => {
        selectImage();
        
      };
    
      const selectImage = async () => {
        try {
          const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.5,
          });
          if (!result.cancelled){ onsendimage(result.uri);}
        } catch (error) {
          console.log("Error reading an image", error);
        }
      };


      
      const handleScroll = (event) => {
      
        if(event.nativeEvent.contentOffset.y==0)
        {
         
          setpage(page+1);

        }
       };

     

    
      if(chats && id){
        useEffect(() => {
          if(flag<2)
          {scrollViewRef.current.scrollToEnd({ animated: true });
        setflag(flag+1);
        }
        },[chats])
    
        useEffect(() => {
            if(id)
            {fetchchats();}
            
            
        },[id,page])
        setTimeout(fetchchats, 30000);

        
    return (
        <>
        <Recording visible={recording} onClick={stopRecording}/>
        <View style={styles.container}>
            <View style={styles.info}>
            {chat ?
                    chat.image ?  
                    <Fullimage imagestyle={styles.image} image={chat.image} /> :
                    <Image style={styles.image} source={ require('../assets/user.png')} /> : require('../assets/user.png')
                }
                
               
            </View>

            <ScrollView style={styles.messages} 
           ref={scrollViewRef}
           onScroll={handleScroll}
            >
            {
            chats.map(chat => (
                <Message key={chat._id} message={chat}/>
            ))
        }
        {
          chats.length>0 ? chats[chats.length-1].seen ? <View style={styles.seen}><AppText style={styles.seentext}>Seen</AppText></View> : null : null
        }
         </ScrollView>



            <View style={styles.input}>
            <TextInput
            autoCorrect={false}
            
            width="62%"
            keyboardType="default"
            value={message.text}
            placeholder="Message"
        
        onChangeText={(e) => { setmessage({...message,text:e}); }}
        
      />

       

      <View style={styles.iconcontainer}>
      <View style={styles.icon1}><IconButton name="share" onPress={onshare} backgroundColor={Colors.theme}/></View>
      <View style={styles.icon2}><IconButton name="keyboard-voice" materialicons={true} onPress={onvoice} backgroundColor={Colors.theme}/></View> 
      <View style={styles.icon3}><IconButton name="send" onPress={onsend} backgroundColor={Colors.theme}/></View> 
      </View>
            </View>
           
        </View>
        </>
    )
      }
      else{
          return <View></View>;
      }
}

const mapStateToProps = state => ({
    token: state.authreducers.token,
    user: state.authreducers.user,
})

export default connect(mapStateToProps, )(ChatScreen);



const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:Colors.white,
     
    },
    image:{
        width:40,
        height:40,
        borderRadius:50,
    },
    header:{
       
    },  
    info:{
        paddingLeft:10,
        paddingTop:10,
     
        height:40,
    },
    iconcontainer:{
        flexDirection:'row',
        marginVertical: 14,
    },
    icon1:{
       paddingRight:4,
    },
    icon2:{
        paddingRight:4,
    },
    icon3:{

    },
    input:{
       flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'flex-end',
        width:'100%',
    },
    messages:{
      marginTop:10,
        height:460,
    },
    seen:{
      alignItems:'flex-end',
      marginRight:4,
    },
    seentext:{
      fontSize:13,
      color:Colors.grey,
    }
    

})
