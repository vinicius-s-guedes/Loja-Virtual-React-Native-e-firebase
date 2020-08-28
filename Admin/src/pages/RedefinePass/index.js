import React,{useState} from 'react'
import Logo from '../../../assets/logo.png'

import firebase from '../../services/firebase'
import {Alert}  from 'react-native';

import {Container,ContainerInput,Text_primary, Image, Input}  from './styles';
import Button from '../../components/Button'


 const RedefinePass=({navigation})=> {

         const [user, setUser] = useState()

    function handlesignOut(){
                firebase.auth().languageCode="pt_br"

         firebase.auth().sendPasswordResetEmail(user).then(function() {
           Alert.alert('Ok','Redefinição de senha E-mail enviado!')
            navigation.navigate('Login')

        }).catch(function(error) {
            switch (erro.code) {
                case 'auth/operation-not-allowed':
                console.log('erro:' +' O provedor de login dado está desativado para este projeto Firebase. Habilite-o no console Firebase, sob a guia de método de login da seção Auth.')
                break;
                case 'auth/userNotFound':
                Alert.alert('Ops', 'Usuário não existe')
                break;
                case 'auth/invalidRecipientEmail':
                Alert.alert('Ops', 'e-mail de destinatário inválido foi enviado na solicitação')
                break;
                case 'auth/invalidEmail':
                Alert.alert('Ops', 'Email inválido')
                break;
                case 'auth/invalidSender':
                Alert.alert('Ops', 'e-mail de remetente inválido está definido no console para esta ação.');
                break; 
                case 'auth/invalidMessagePayload':
                Alert.alert('Ops', 'e-mail inválido para enviar e-mails de atualizaçã');
                break;
                default:
                console.log(erro.code)
                Alert.alert('Ops', 'Erro não localizado')
            }
        });
    }

    return (
        <Container>
            <Image source={Logo}/>
            <ContainerInput>
            <Input
            name="user"
            keyboardType="email-address"
    onChangeText={(text) => { setUser(text) }}
            autoCapitalize="none"
            placeholder="Email"
            />            

            </ContainerInput>
            <Button style='outline' onPress={handlesignOut}><Text_primary>ENTRAR</Text_primary></Button>
       </Container >
    );
}

export default RedefinePass;