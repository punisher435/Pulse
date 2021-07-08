import React,{useState,useEffect} from 'react'
import { StyleSheet,  View } from 'react-native'
import { connect } from 'react-redux';

import Chat from '../components/Chat';
import { loadrecentchats } from '../api/chats';
import useNotifications from "../hooks/useNotifications";





const Screen = ({navigation,token,user}) => {

    const [chats,setchats] = useState([]);

    useNotifications();

    const fetchchats = async () => {
        try {
            const res = await loadrecentchats(token);
         
           
            let result=[];
           
            res.data.map((chat) => {
                var temp={id:chat.contact._id,name:chat.contact.name ? chat.contact.name : chat.contact.phone,
                message:chat.recentmessage,image:chat.contact.img ? chat.contact.img : null,senderid:chat.recentmessage ? chat.recentmessage.senderid : user._id,
                seen:chat.recentmessage ? chat.recentmessage.seen : true,created:chat.recentmessage ? chat.recentmessage.createdDate : Date.now(),}
                result.push(temp);
            })
            const sortedresult = result.sort((a, b) => b.created > a.created ? 1: -1);
            setchats(sortedresult);
        } catch (error) {
            console.log(error);
        }
        
        
    }

  

   

    if(chats && token)
  
    {
        useEffect(() => {
            if(token)
            {fetchchats();}
        },[])
        setTimeout(fetchchats, 30000);
        return (
            <View>
                {
                    chats.map(chat => (
                        <Chat chat={chat} key={chat.id} onPress={() => {console.log('Click');navigation.navigate("Chat Screen",{id:chat.id,chat:chat,});}}/>
                    ))
                }
               
            </View>
        )
    }
    else{
        <View></View>
    }
    
}

const mapStateToProps = state => ({
    isAuthenticated: state.authreducers.isAuthenticated,
    token:state.authreducers.token,
    user:state.authreducers.user,
  });
  
export default connect(mapStateToProps)(Screen);

const styles = StyleSheet.create({})
