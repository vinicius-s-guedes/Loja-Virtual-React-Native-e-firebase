import React,{useState} from 'react';
import {Button,Text,Container,ContainerInput,Text_primary, Image, Input, RedefinePass}  from './styles';

import { Formik } from 'formik';
import * as yup from 'yup';

import {Alert,ActivityIndicator} from 'react-native';
import Logo from '../../../assets/logo.png'
import firebase from '../../services/firebase'

export default function Signup({navigation}) {
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
    .min(6, 'A senha deve ter no minimo 6 Caracteres'),
     name: yup
    .string()
    .label('name')
    .required()
});


    const [user, setUser] = useState()
    const [pass, setPass] = useState()
    const [name, setName] = useState()


    function handleSignup(user, pass,name) {
            firebase.auth().createUserWithEmailAndPassword(user, pass)
            .then((response) => {
                                var user = firebase.auth().currentUser;
                user.updateProfile({
                    displayName: name,
                }).then(function() {
                     Alert.alert('Seja Bem-Vindo')

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

    }


  return(
        <>
        <Formik
        initialValues={{ email: '', password: '' , name:''}}
        onSubmit={(values, actions) => {
            let a=JSON.stringify(values);
            a=JSON.parse(a);
            handleSignup(a.email, a.password, a.name)
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
            placeholder="Name:"
            onChangeText={formikProps.handleChange('name')}
            onBlur={formikProps.handleBlur('name')}
            />
            <Text style={{ color: 'red' }}>
            {formikProps.touched.name && formikProps.errors.name}
            </Text>

            <Input
            placeholder="Email:"
            onChangeText={formikProps.handleChange('email')}
            onBlur={formikProps.handleBlur('email')}
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

                </Container>
                )}
        </Formik>
        </>
        ) }

