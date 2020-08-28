import React from 'react';
import { Image,Text,ScrollView,Option } from './styles';
    const firebase = require("firebase");
import { AntDesign,Ionicons,EvilIcons } from "@expo/vector-icons";


export default function Perfil({ navigation }) { 
	return(
		<ScrollView>
		                {firebase.auth().currentUser.photoURL != null
                    ?(
		<Image source={{uri:`${firebase.auth().currentUser.photoURL}`}} />
                        ):(
                        <EvilIcons name="user" size={60} color="black" />)}
		<Option  onPress={()=>navigation.navigate('EditProfile')}><Text>Editar perfil</Text></Option>
		<Option onPress={()=>navigation.navigate('Cart')}><Text>Favoritos</Text></Option>
		<Option><Text>Segurança da Conta</Text></Option>
		<Option><Text>Configuração de Comunicação</Text></Option>

		</ScrollView>
		)}
