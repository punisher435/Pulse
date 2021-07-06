import React,{useState} from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/core'

import Button from '../components/Button'
import AppText from '../components/Text';
import TextInput from "../components/TextInput";
import AppModal from '../components/AppModal';




const Createcall = () => {
    const navigation = useNavigation();
    const [roomid,setroomid] = useState('');
    const [modalVisible,setModalVisible] = useState(false);

    const generateid = () => {
        const id =  Math.random().toString(36).slice(2);
        setroomid(id);
        console.log(id);
        setModalVisible(true);
        
    }

    const joinRoom = () => {
        navigation.navigate('Call',{
            roomid:roomid,
        })
    }

    return (<>
    <View style={styles.container}>
        <AppModal text={`Your meeting id is ${roomid}`} setModalVisible={setModalVisible} modalVisible={modalVisible}/>
        <View style={styles.Button1}>
            <Button title="Start a meeting" onPress={generateid}/>
        </View>
        <View style={styles.input}>
        <TextInput
            autoCorrect={false}
            
            width="62%"
            keyboardType="default"
            value={roomid}
            placeholder="Room id"
        
        onChangeText={(e) => { setroomid(e); }}
        
      />
      </View>
 <View style={styles.Button2}>
        <Button title="Join a meeting" onPress={joinRoom}/>
        </View>
        </View>
        </>
    )
}

export default Createcall

const styles = StyleSheet.create({
    Button1:{
paddingHorizontal:50,
    },
    Button2:{
        paddingHorizontal:50,
    },
    container:{
        paddingTop:10,
    },
    input:{

    },
})
