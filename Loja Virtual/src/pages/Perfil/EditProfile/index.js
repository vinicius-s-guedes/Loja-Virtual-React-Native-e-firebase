import React,{useState} from 'react'
//import { YellowBox } from 'react-native';
//import _ from 'lodash';
import {Alert}  from 'react-native';

import firebase from '../../../services/firebase'

import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons'; 

import {Container,ContainerInput,Text_primary, Image, Input,
	ScrollView,Btn,TouchableHighlight,ButtonOption}  from './styles';
	import Button from '../../../components/Button'


	const Login=({navigation})=> {

		const [downloadUrl, setDownloadUrl] = useState();
		const [imageUrl, setImageUrl] = useState(firebase.auth().currentUser.photoURL);
		const [nome, setNome] = useState(firebase.auth().currentUser.displayName);

		const [CPF, setCPF] = useState();
		const [Genero, setGenero] = useState();

		const uriToBlob = (uri) => {

			return new Promise((resolve, reject) => {
				const xhr = new XMLHttpRequest();
				xhr.onload = function() {
        // return the blob
        resolve(xhr.response);
    };
    xhr.onerror = function() {
        // something went wrong
        reject(new Error('uriToBlob failed'));
    };
      // this helps us get a blob
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);

  });

		}

		const uploadToFirebase = (blob) => {
			return new Promise((resolve, reject)=>{

				var storageRef = firebase.storage().ref();
				storageRef.child(`user/${firebase.auth().currentUser.uid}`).put(blob, {
					contentType: 'image/jpeg'
				}).then((snapshot)=>{
					blob.close();

					resolve(snapshot);
				}).catch((error)=>{
					reject(error);
				});

			});


		}      

		const handleImageFs=  () => {

			uriToBlob(imageUrl)
			.then((blob)=>{
				return  uploadToFirebase(blob);
			}).then((snapshot)=>{

				snapshot.ref.getDownloadURL().then(function(downloadUrl) {
					console.log("Upload sucess: ", downloadUrl);
				user.updateProfile({
				displayName: nome,
				photoURL: downloadUrl,
			}).then(function(docRef) {
				alert('Update successful.')
			})

				});

			}).catch((error)=>{
				throw console.log('error');
			});
		}  





		const _pickImage = async () => {

			await ImagePicker.launchImageLibraryAsync({ 
				mediaTypes: "Images",
				allowsEditing: true,
				aspect: [3, 3.5],
				quality: 1,
			}).then((result)=>{ 
				if (!result.cancelled) {
        // User picked an image
        const {height, width, type, uri} = result;
        return setImageUrl(uri)
    }
}).catch((error)=>{
	throw console.log('error');
});
};

var user = firebase.auth().currentUser;






return (
	<ScrollView>

	<Container>

	<ContainerInput>
	<TouchableHighlight onPress={_pickImage}>
	{imageUrl
		?  <Image source={{ uri: imageUrl }} style={{ width: 200, height: 200 }}/>
		:  <Btn>Escolha uma imagem</Btn>
	}
	</TouchableHighlight>


	<Input
	name="Nome"
	onChangeText={(text) => { setNome(text) }}
	value={nome}
	autoCapitalize="none"
	placeholder="Nome"
	/>
	<Input
	name="CPF/CNPJ"
	onChangeText={(text) => { setCPF(text) }}
	autoCapitalize="none"
	placeholder="CPF/CNPJ"
	/>
	</ContainerInput>

	<Button style='outline' onPress={handleImageFs}><Text_primary>Salvar Alterações</Text_primary></Button>

	</Container >

	<ButtonOption   onPress={()=> navigation.navigate('Email')}>
	<Text_primary>Mudar Email
	</Text_primary>
	</ButtonOption>

	<ButtonOption  onPress="">
	<Text_primary>Adicionar/Mudar Telefone</Text_primary>
	</ButtonOption>

	<ButtonOption   onPress={()=> navigation.navigate('Senha')}>
	<Text_primary>Alterar Senha</Text_primary>
	</ButtonOption>


	</ScrollView>

	);
}

export default Login;
