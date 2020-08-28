import React from 'react';


import { Entypo,MaterialCommunityIcons,AntDesign,FontAwesome5 } from '@expo/vector-icons'; 

import { ScrollView,Container, AreaIcon, AreaOffer, AreaTitle, Title } from './styles';

import Recomendations from '../Recomendation';

export default function Offers( {navigation} ) {
    return (
        <>
            <Container>
<ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <AreaOffer>
                    <AreaIcon>
<AntDesign name="qrcode" size={24} color="#7B7B81"  />
                    </AreaIcon>

                    <AreaTitle>
                        <Title>Pagar com PicPay</Title>
                    </AreaTitle>
                </AreaOffer>

                <AreaOffer>
                    <AreaIcon>
<Entypo name="price-tag" size={24} color="#7B7B81" />   

                    </AreaIcon>

                    <AreaTitle>
                        <Title>Ofertas</Title>
                    </AreaTitle>
                </AreaOffer>

                <AreaOffer>
                    <AreaIcon>
<MaterialCommunityIcons name="food-apple" size={24}color="#7B7B81" />
                    </AreaIcon>

                    <AreaTitle>
                        <Title>Alimentos</Title>
                    </AreaTitle>
                </AreaOffer>

                <AreaOffer>
                    <AreaIcon>
                        <Entypo name="drink" size={24} color="#7B7B81" />
                    </AreaIcon>

                    <AreaTitle style={{ width: '100%', maxWidth: 78 }}>
                        <Title>Bebidas</Title>
                    </AreaTitle>
                </AreaOffer>
                
                <AreaOffer>
                    <AreaIcon>
<FontAwesome5 name="drumstick-bite" size={24}  color="#7B7B81"/>   
                 </AreaIcon>

                    <AreaTitle>
                        <Title>Carne</Title>
                    </AreaTitle>
                </AreaOffer>

                   <AreaOffer>
                    <AreaIcon>
<FontAwesome5 name="candy-cane" size={24} color="#7B7B81" />
                    </AreaIcon>

                    <AreaTitle>
                        <Title>Doces</Title>
                    </AreaTitle>
                </AreaOffer>

                </ScrollView>
            </Container>

            <Recomendations  navigation={navigation} />
        </>
    );
}
