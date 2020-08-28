import React,{useState} from 'react'
import {Alert}  from 'react-native';

import firebase from '../../../services/firebase'

import {Container,ContainerInput,Text_primary, Input, RedefinePass}  from './styles';
import Button from '../../../components/Button'
const Login=({navigation})=> {

	const [user, setUser] = useState()
	const [pass, setPass] = useState()

	const [newPassword, setNewPassword] = useState()
	const [confirmaSenha, setConfirmaSenha] = useState()


	function handleSignIn() {
		firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
		.then(function() {
			return firebase.auth().signInWithEmailAndPassword(user, pass)
			.then((response) => {
				let user=firebase.auth().currentUser
				user.updatePassword(newPassword).then(function() {
					Alert.alert('Update successful.')
				}).catch(function(error) {
					console.log(error)
				});
			})
		})
		.catch(function(erro) {
			switch (erro.code) {
				case 'auth/operation-not-allowed':
				console.log('erro:' +' O provedor de login dado está desativado para este projeto Firebase. Habilite-o no console Firebase, sob a guia de método de login da seção Auth.')
				break;
				case 'auth/user-disabled':
				Alert.alert('Ops', 'Usuário desabilitado pelo administrador')
				break;
				case 'auth/invalid-email':
				Alert.alert('Ops', 'Email inválido')
				break;
				case 'auth/wrong-password':
				Alert.alert('Ops', 'senha incorreta');
				break;
				default:
				console.log(erro.code)
				Alert.alert('Ops', 'Erro não localizado')
			}
		});

	}
//firebase.auth().currentUser.
//recuperar usuario logado
return (
	<Container>
	<ContainerInput>
	<Input
	name="user"
	keyboardType="email-address"
	onChangeText={(text) => { setUser(text) }}
	autoCapitalize="none"
	placeholder="Email"
	/>            
	<Input
	name="user"
	onChangeText={(text) => { setPass(text) }}
	autoCapitalize="none"
	placeholder="Senha"
	/>
	<Input
	name="NovaSenha"
	onChangeText={(text) => { setNewPassword(text) }}
	autoCapitalize="none"
	placeholder="Nova Senha"
	/>            
	<Input
	name="ConfirmaSenha"
	onChangeText={(text) => { setConfirmaSenha(text) }}
	autoCapitalize="none"
	placeholder="Confirmar nova Senha"
	/>
	</ContainerInput>
	<Button style='outline' onPress={handleSignIn}><Text_primary>ENTRAR</Text_primary></Button>
	<RedefinePass onPress={()=> navigation.navigate('RedefinePass')}><Text_primary>Redefinir senha pelo email</Text_primary></RedefinePass>
	</Container >
	);
}

export default Login;