import React from 'react'

import Products from '../../../components/Main/Products'

import {View} from './styles'


const Main = ( {navigation} ) =>{
	return( 
		<View>
		<Products  navigation={navigation} />
		</View>

		);
	}


	export default Main;

