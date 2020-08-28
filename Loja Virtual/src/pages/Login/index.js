import React from 'react';
import {Button,Text,Container,ContainerInput,Text_primary, Image, Input, RedefinePass}  from './styles';

import { Formik } from 'formik';
import * as yup from 'yup';

import {Alert,ActivityIndicator} from 'react-native';
import Logo from '../../../assets/logo.png'
import firebase from '../../services/firebase'


const validationSchema = yup.object().shape({
    email: yup
    .string()
    .label('Email')
    .email ("e-mail inválido")
    .required ("E-mail é preciso"),
    password: yup
    .string()
    .label('Password')
    .required()
    .min(6, 'A senha deve ter no minimo 6 Caracteres')
});

const Login=({navigation})=> {


    function handleSignIn(user, pass) {

        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(function() {
            return firebase.auth().signInWithEmailAndPassword(user, pass)
            .then((response) => {
                console.log('entrou');
                navigation.navigate('Index')

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
    return(
        <>
        <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={(values, actions) => {
            let a=JSON.stringify(values);
            a=JSON.parse(a);
            handleSignIn(a.email, a.password)
            setTimeout(() => {
                actions.setSubmitting(false);
            }, 1000);
        }}
        validationSchema={validationSchema}
        >
        {formikProps => (
            <Container>
            <Image source={Logo}/>
            <ContainerInput>
            <Input
            placeholder="Email:"
            onChangeText={formikProps.handleChange('email')}
            onBlur={formikProps.handleBlur('email')}
            autoFocus
            />
            <Text style={{ color: 'red' }}>
            {formikProps.touched.email && formikProps.errors.email}
            </Text>

            <Input
            placeholder="Senha:"
            onChangeText={formikProps.handleChange('password')}
            onBlur={formikProps.handleBlur('password')}
            secureTextEntry
            />
            <Text style={{ color: 'red' }}>
            {formikProps.touched.password && formikProps.errors.password}
            </Text>
            </ContainerInput>
            {formikProps.isSubmitting ? (
                <ActivityIndicator />
                ) : (
                <Button title="Submit" 
                onPress={formikProps.handleSubmit}
                  >


                <Text_primary>ENTRAR</Text_primary>
                </Button>
                )}

                <RedefinePass onPress={()=> navigation.navigate('RedefinePass')}><Text_primary>Esqueceu a senha</Text_primary></RedefinePass>

                </Container>
                )}
        </Formik>
        </>
        ) }

        export default Login;