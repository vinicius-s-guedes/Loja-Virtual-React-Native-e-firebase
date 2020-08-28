import React,{useState} from 'react'
//import { YellowBox } from 'react-native';
//import _ from 'lodash';
import {Alert}  from 'react-native';

import firebase from '../../../services/firebase'

import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons'; 

import {Container,ContainerInput,Text_primary, Image, Input,
	ScrollView,Picker,Btn,TouchableHighlight,ButtonOption}  from './styles';
	import Button from '../../../components/Button'


	const Login=({navigation})=> {

		const [downloadUrl, setDownloadUrl] = useState();
		const [imageUrl, setImageUrl] = useState();
		const [nome, setNome] = useState();

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

				snapshot.ref.getDownloadURL().then(function(downloadURL) {
					console.log("Upload sucess: ", downloadURL);
					setDownloadUrl(downloadURL)
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

const handleCad = async () => {

	var user = firebase.auth().currentUser;

	handleImageFs().then(function() {})

		if(downloadUrl){
			user.updateProfile({
				displayName: nome,
				photoURL: downloadUrl,
			}).then(function(sucess) {
				console.log('Update successful.')
			}).catch(function(error) {
				console.log('An error happened.')
			});

		}else{
			alert('adicione uma imagem para continuar')
		}



	}





	return (
		<ScrollView>

		<Container>

		<ContainerInput>
		<TouchableHighlight onPress={_pickImage}>
		{imageUrl
			?  <Image source={{ uri: imageUrl }} style={{ width: 200, height: 200 }}/>
			:  <Btn>Escolha uma imagem para seu produto</Btn>
		}
		</TouchableHighlight>


		<Input
		name="Nome"
		onChangeText={(text) => { setNome(text) }}
		autoCapitalize="none"
		placeholder="Nome"
		/>
		<Input
		name="CPF/CNPJ"
		onChangeText={(text) => { setCPF(text) }}
		autoCapitalize="none"
		placeholder="CPF/CNPJ"
		/>
		<Picker
		selectedValue={Genero}
		placeholder="Genero"
		color="#C4C4C4"
		onValueChange={(itemValue, itemIndex) => setGenero(itemValue)}
		>
		<Picker.Item label="Genero"  color="#C4C4C4" />
		<Picker.Item label="Não Informal" color="#000"  value="Not" />
		<Picker.Item label="Masculino" color="#0000FF" value="Roupas" />
		<Picker.Item label="Feminino"  color="#FC0FC0" value="Computadores" />

		</Picker>          

		</ContainerInput>

		<Button style='outline' onPress={()=>handleCad()}><Text_primary>Salvar Alterações</Text_primary></Button>

		</Container >

		<ButtonOption  onPress="">
		<Text_primary>Email
		<Ionicons name="ios-arrow-forward" size={24} color="black" />
		</Text_primary>
		</ButtonOption>
		<ButtonOption  onPress="">
		<Text_primary>Telefone</Text_primary>
		<Ionicons name="ios-arrow-forward" size={24} color="black" />
		</ButtonOption>
		<ButtonOption  onPress="">
		<Text_primary>Conectar com o facebook</Text_primary>
		<Ionicons name="ios-arrow-forward" size={24} color="black" />
		</ButtonOption>
		<ButtonOption  onPress="">
		<Text_primary>Alterar Senha</Text_primary>
		<Ionicons name="ios-arrow-forward" size={24} color="black" />
		</ButtonOption>
		<ButtonOption  onPress="">
		<Text_primary>Sair da Conta</Text_primary>
		<Ionicons name="ios-arrow-forward" size={24} color="black" />
		</ButtonOption>

		</ScrollView>

		);
}

export default Login;
