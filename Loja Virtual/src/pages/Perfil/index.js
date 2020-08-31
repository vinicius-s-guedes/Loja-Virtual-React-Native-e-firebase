import React from 'react';
import { Image,Text,ScrollView,Option } from './styles';
    const firebase = require("firebase");
import { AntDesign,Ionicons,EvilIcons } from "@expo/vector-icons";


export default function Perfil({ navigation }) { 

                function handlesignOut(){
                    firebase.auth().signOut().then(function() {
                        console.log('Sign-out successful.')
                        navigation.navigate('Home')

                    }).catch(function(error) {
                        console.log('An error happened.')
                    });
                }
	return(
		<ScrollView>
		                {firebase.auth().currentUser.photoURL != null
                    ?(
		<Image source={{uri:`${firebase.auth().currentUser.photoURL}`}} />
                        ):(
                        <EvilIcons name="user" size={300} color="black" />)}
		<Option  onPress={()=>navigation.navigate('EditProfile')}><Text>Editar perfil</Text></Option>
		<Option onPress={()=>navigation.navigate('Cart')}><Text>Favoritos</Text></Option>
		<Option  onPress={()=>navigation.navigate('Security')}><Text>Segurança da Conta</Text></Option>
		<Option onPress={()=>handlesignOut()}><Text>Sair da Conta</Text></Option>

		</ScrollView>
		)}
