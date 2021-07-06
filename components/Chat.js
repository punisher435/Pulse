import React from 'react'
import { StyleSheet,  View ,Image,TouchableOpacity} from 'react-native'
import { connect } from 'react-redux';

import Colors from '../config/colors';
import AppText from '../components/Text';
import Fullimage from './Fullimage';

function Chat({chat,onPress,user}) {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
        <View style={styles.container}>
            <View style={styles.content}>
                {
                    chat.image ?  
                    <Fullimage imagestyle={styles.image} image={chat.image} /> :
                    <Image style={styles.image} source={ require('../assets/user.png')} />
                }
            
            <View style={styles.textcontent}>
            <AppText style={styles.header}>
                {chat.name}
            </AppText>
            <AppText style={styles.recentchat} numberOfLines={1}>
                {chat.message ? chat.message.message ? chat.message.message : chat.message.image ? 'Image' : chat.message.audio ? 'Audio' : null : null}
            </AppText>
            </View>
          
            </View>
            {
                chat.senderid!==user._id && !chat.seen ? <View style={styles.seen}>
                <View style={styles.seendot}>

                </View>
            </View> : null
            }
            
            
        </View>
        </TouchableOpacity>
    )
}

const mapStateToProps = state => ({
    user: state.authreducers.user,
   
  });
  
  export default connect(mapStateToProps)(Chat);

const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:80,
        backgroundColor:Colors.white,
        borderBottomColor:Colors.grey,
        borderBottomWidth:0.2,
        flexDirection:'row',
    
    },
   
    content:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        paddingLeft:20,
    },
    header:{
        fontSize:16,
    },
    image:{
        width:50,
        height:50,
        borderRadius:50,

    },
    recentchat:{
        fontSize:14,
        color:Colors.grey,
    },
    seen:{
alignItems:'flex-end',
justifyContent:'center',
marginRight:15,

borderRadius:50,

    },
    seendot:{
        backgroundColor:Colors.theme,
        width:10,
        height:10,
        borderRadius:50,
        justifyContent:'center',
       
      
    },
    textcontent:{
        paddingLeft:15,
    },

})
