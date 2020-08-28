import React, { useState } from 'react';
import {Container,ContainerInput,Text_primary, Image, Input}  from './styles';
import Button from '../../components/Button'

import logo from '../../../assets/logo.png'

import firebase from '../../services/firebase'
import {Alert}  from 'react-native';

export default function Signup({navigation}) {

    const [user, setUser] = useState()
    const [pass, setPass] = useState()
    const [name, setName] = useState()


    function handleSignup() {

        if (user, pass,name) {

            firebase.auth().createUserWithEmailAndPassword(user, pass)
            .then((response) => {
                                var user = firebase.auth().currentUser;
                user.updateProfile({
                    displayName: name,
                   //photoURL: "https://example.com/jane-q-user/profile.jpg"
                }).then(function() {
                     Alert.alert('Ok', 'Usuário criado')

                     navigation.navigate('Index')
                })
            })
            .catch((erro) => {
                switch (erro.code) {
                    case 'auth/operation-not-allowed':
                    console.log('erro:' +' O provedor de login dado está desativado para este projeto Firebase. Habilite-o no console Firebase, sob a guia de método de login da seção Auth.')
                    break;
                    case 'auth/email-already-in-use':
                    Alert.alert('Ops', 'Esse email já está em uso')
                    break;
                    case 'auth/invalid-email':
                    Alert.alert('Ops', 'Esse inválido')
                    break;
                    case 'auth/weak-password':
                    Alert.alert('Ops', 'A senha deve ter 6 caracteres de comprimento ou mais');
                    break;
                    default:
                    console.log(erro.code)
                    Alert.alert('Ops', 'Erro não localizado')
                }


            })



        } else {
            Alert.alert('Erro', 'Preenche email e senha')
        }

    }
//firebase.auth().currentUser.
//recuperar usuario logado

    return (
        <Container>
        <Image source={logo} />
        <ContainerInput>
        <Input
        name="name"
        autoCapitalize="none"
        placeholder="Nome"
        onChangeText={(text) => { setName(text) }}
        />
        <Input
        name="user"
        keyboardType="email-address"
        autoCapitalize="none"
        placeholder="Email"
        onChangeText={(text) => { setUser(text) }}
        />
        <Input
        name="user"
        autoCapitalize="none"
        secureTextEntry={true}
        onChangeText={(text) => { setPass(text) }}
        placeholder="Senha"
        />
        </ContainerInput>
        <Button style="outline" onPress={handleSignup}><Text_primary>ENTRAR</Text_primary></Button>
        </Container>
        );
}
