import React,{useState} from 'react'
//import { YellowBox } from 'react-native';
//import _ from 'lodash';
import {Alert}  from 'react-native';

import firebase from '../../../services/firebase'

import * as ImagePicker from 'expo-image-picker';

import {Container,ContainerInput,Text_primary, Image, Input,
	Container_item, ScrollView,Picker,Btn,TouchableHighlight}  from './styles';
import Button from '../../../components/Button'


	const Login=({ navigation, route })=> {
	let produto=route.params.produto

		const [downloadUrl, setDownloadUrl] = useState();
		const [imageUrl, setImageUrl] = useState(produto.result.downloadUrl);
		const [titulo, setTitulo] = useState(produto.result.cep);

		const [descricao, setDescricao] = useState(produto.result.descricao);
		const [categoria, setCategoria] = useState(produto.result.categoria);

		const [cep, setCep] = useState(produto.result.cep);
		const [preco, setPreco] = useState(produto.result.preco);

		const [telefone, setTelefone] = useState(produto.result.telefone);
		const [uso, setUso] = useState(produto.result.uso);


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
		storageRef.child(`produtos/photo.jpg`).put(blob, {
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

var db = firebase.firestore();

const handleCad = async () => {
	console.log(produto.id)

 handleImageFs()

if(downloadUrl){

 db.collection('produtos').doc(produto.id).update({
titulo, descricao,categoria,cep,preco,telefone,uso, downloadUrl
})
.then(function(docRef) {
	console.log('produto cadastrado com sucesso')
    console.log("Document written with ID: ");
})
.catch(function(error) {
    console.error("Error adding document: ", error);
    console.log('ouve um erro durante o cadastro')

});



}else{
Alert('adicione uma imagem para continuar')
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
	name="titulo"
	value={titulo}
	onChangeText={(text) => { setTitulo(text) }}
	autoCapitalize="none"
	placeholder="Titulo"
	/>
	<Input
	name="descricao"
	value={descricao}
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
		value={cep}

	keyboardType="number-pad"
	onChangeText={(text) => { setCep(text) }}
	autoCapitalize="none"
	placeholder="CEP"
	/>
	<Input
	name="preco"
		value={preco}

	keyboardType="decimal-pad"
	onChangeText={(text) => { setPreco(text) }}
	autoCapitalize="none"
	placeholder="Preço"
	/>
	<Input
	name="telefone"
		value={telefone}

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

	<Button style='outline' onPress={handleCad}><Text_primary>Cadastrar</Text_primary></Button>
	</Container >
	</ScrollView>

	);
}

export default Login;
