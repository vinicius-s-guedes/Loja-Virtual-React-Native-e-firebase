import React from 'react'
import Logo from '../../../assets/logo.png'
import { Container,Image, Text,Text_white } from './styles';


import styles from './styles'
import Button from '../../components/Button'
 const Home=({navigation})=> {
    return (
        <Container>
            <Image source={Logo}/>
            <Button style='outline' onPress={()=> navigation.navigate('Login')}><Text>ENTRAR</Text></Button>
            <Button  onPress={()=> navigation.navigate('Signup')}><Text_white >CRIAR CONTA</Text_white></Button>
        </Container >
    );
}

export default Home;