import React from 'react'
import { StyleSheet, View } from 'react-native'
import { connect } from 'react-redux';
import { Audio } from 'expo-av';

import AppText from './Text';
import Colors from '../config/colors';
import Fullimage from './Fullimage';
import IconButton from './IconButton';


const Send = ({message}) => {
    const [sound, setSound] = React.useState();
    const [playing, setplaying] = React.useState(false);
    const play = async () => {
        const sound = new Audio.Sound();
        try {
            await sound.loadAsync({uri:message.audio});
            await sound.playAsync();
            setSound(sound);
            setplaying(true);
            // Your sound is playing!
          
            // Don't forget to unload the sound from memory
            // when you are done using the Sound object
           
           
          } catch (error) {
            // An error occurred!
            console.log(error);
          }
    }

    const stop = async () => {
        
        try {
           
            await sound.unloadAsync();
            setplaying(false);
          } catch (error) {
            // An error occurred!
          }
    }
    return (
        <View style={styles.scontainer}>
            {
                message.message ? <AppText style={styles.stext}>{message.message}</AppText> : null
            }

            {
                message.image ? 
                <Fullimage imagestyle={styles.image} image={message.image} /> 
                : null
            }

            {
                message.audio ? <View style={styles.audiocontainer}><View style={styles.audio}>
                    {
                        !playing ? <IconButton name="play" onPress={play}/> : <IconButton name="stop" onPress={stop}/>
                    }
                    </View></View> 
                    : null
            }
        
    </View>
    );
}



const Recieve = ({message}) => {
    const [sound, setSound] = React.useState();
    const [playing, setplaying] = React.useState(false);
    const play = async () => {
        const sound = new Audio.Sound();
        try {
            await sound.loadAsync({uri:message.audio});
            await sound.playAsync();
            setSound(sound);
            setplaying(true);
            // Your sound is playing!
          
            // Don't forget to unload the sound from memory
            // when you are done using the Sound object
           
           
          } catch (error) {
            // An error occurred!
            console.log(error);
          }
    }

    const stop = async () => {
        
        try {
           
            await sound.unloadAsync();
            setplaying(false);
          } catch (error) {
            // An error occurred!
          }
    }
    return (
        <View style={styles.rcontainer}>
            {
                message.message ? <AppText style={styles.rtext}>{message.message}</AppText> : null
            }

            {
                message.image ?  <Fullimage imagestyle={styles.image} image={message.image} />  : null
            }

            {
                message.audio ? <View style={styles.audiocontainer}><View style={styles.audio}>
                    {
                        !playing ? <IconButton name="play" onPress={play}/> : <IconButton name="stop" onPress={stop}/>
                    }
                    </View></View> 
                    : null
            }
        
    </View>
    );
}





function Message({message,user}) {
   
    return (
        <>
        {
            user ? user._id===message.senderid ? <Send message={message}/> : <Recieve message={message}/> : null 
        }
       </>
    )
}

const mapStateToProps = state => ({
    token: state.authreducers.token,
    user: state.authreducers.user,
})

export default connect(mapStateToProps, )(Message);

const styles = StyleSheet.create({
    audio:{
        borderRadius:10,
       
        padding:10,
    },
    audiocontainer:{
        backgroundColor:Colors.sendermessages,
        margin:4,
        borderRadius:10,
    },
    image:{
        width:100,
        height:100,
        borderRadius:10,
        margin:4,
    },
    scontainer:{
        alignItems:'flex-end',
       
        width:'100%',
    },
    rtext:{
        backgroundColor:Colors.receivermessages,
        margin:4,
        padding:10,
        borderRadius:10,
    },

    stext:{
        backgroundColor:Colors.sendermessages,
        margin:4,
        padding:10,
        borderRadius:10,
    },
    
    rcontainer:{
        alignItems:'flex-start',
        width:'100%',
    },
})
