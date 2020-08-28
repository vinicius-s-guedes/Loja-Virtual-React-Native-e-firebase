import React,{useState} from 'react'
//import { YellowBox } from 'react-native';
//import _ from 'lodash';
import {Alert}  from 'react-native';

import firebase from '../../../services/firebase'

import * as ImagePicker from 'expo-image-picker';

import {Container,ContainerInput,Text_primary, Image, Input,
	Container_item, ScrollView,Picker,Btn,TouchableHighlight}  from './styles';
	import Button from '../../../components/Button'


	const Login=({navigation})=> {

		const [downloadUrl, setDownloadUrl] = useState();
		const [imageUrl, setImageUrl] = useState();
		const [titulo, setTitulo] = useState();

		const [descricao, setDescricao] = useState();
		const [categoria, setCategoria] = useState();

		const [cep, setCep] = useState();
		const [preco, setPreco] = useState();

		const [telefone, setTelefone] = useState();
		const [uso, setUso] = useState();

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
				storageRef.child(`image/${uuidv4()}`).put(blob, {
					contentType: 'image/jpeg'
				}).then((snapshot)=>{
					blob.close();

					resolve(snapshot);
				}).catch((error)=>{
					reject(error);
				});

			});


		}      
var db = firebase.firestore();

		const handleImageFs=  () => {

			uriToBlob(imageUrl)
			.then((blob)=>{
				return  uploadToFirebase(blob);
			}).then((snapshot)=>{

				snapshot.ref.getDownloadURL().then(function(downloadUrl) {
					console.log("Upload sucess: ", downloadUrl);
					db.collection(`produtos`).add({
						titulo, descricao,categoria,cep,preco,telefone,uso, downloadUrl, uiduser:firebase.auth().currentUser.uid
					})
					.then(function(docRef) {
						console.log('produto cadastrado com sucesso')
						console.log("Document written with ID: ", docRef.id);
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
	name="titulo"
	onChangeText={(text) => { setTitulo(text) }}
	autoCapitalize="none"
	placeholder="Titulo"
	/>
	<Input
	name="descricao"
	onChangeText={(text) => { setDescricao(text) }}
	autoCapitalize="none"
	placeholder="Descricão"
	/>
	<Picker
	selectedValue={categoria}
	placeholder="Categoria"
	onValueChange={(itemValue, itemIndex) => setCategoria(itemValue)}
	>
	<Picker.Item label="Categoria"  color="#C4C4C4"  value="Categoria" />

	<Picker.Item label="Roupas" value="Roupas" />
	<Picker.Item label="Computadores" value="Computadores" />

	</Picker>          
	<Input
	name="cep"
	keyboardType="number-pad"
	onChangeText={(text) => { setCep(text) }}
	autoCapitalize="none"
	placeholder="CEP"
	/>
	<Input
	name="preco"
	keyboardType="decimal-pad"
	onChangeText={(text) => { setPreco(text) }}
	autoCapitalize="none"
	placeholder="Preço"
	/>
	<Input
	name="telefone"
	keyboardType="phone-pad"
	onChangeText={(text) => { setTelefone(text) }}
	placeholder="Telefone de contato"
	/>
	<Picker
	selectedValue={uso}
	placeholder="tempo de uso"
	onValueChange={(itemValue, itemIndex) => setUso(itemValue)}
	>
	<Picker.Item label="Tempo de uso" color="#C4C4C4"    value="Tempo de uso" />
	<Picker.Item label="novo" value="novo" />
	<Picker.Item label="usado" value="usado" />
	</Picker>  
	</ContainerInput>

	<Button style='outline' onPress={handleImageFs}><Text_primary>Cadastrar</Text_primary></Button>
	</Container >
	</ScrollView>

	);
}

export default Login;
