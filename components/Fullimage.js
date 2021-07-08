import React from 'react'
import { StyleSheet,  View,Image ,TouchableOpacity} from 'react-native'
import { useNavigation } from '@react-navigation/native';



export default function Fullimage({image,imagestyle}) {
    const navigation = useNavigation();

    const onClick = () => {
        navigation.navigate("Full Image",{
            image:image,
        })
    }
 
    return (
        <View>
            <TouchableOpacity onPress={onClick}>
            <Image style={imagestyle} source={{uri:image}} /> 
            </TouchableOpacity>
        </View>
    )
    
}

const styles = StyleSheet.create({})
