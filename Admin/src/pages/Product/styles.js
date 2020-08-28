import styled from 'styled-components';

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: white;
`;

export const Title = styled.Text`
    text-align: center;
    margin-bottom: 30px;
    font-size: 20px;
    color: #7B7B81;
`;


export const Content = styled.View`
    flex: 1;
`;
export const Image = styled.Image`
    width: 100%;
    height: 40%;
    resizeMode: cover;
`;
export const Text = styled.Text`
`;

export const Button = styled.TouchableOpacity`
       border-width:1px;
       align-items:center;
              top: 30px;
       border-color:#5ca935;
       left: 10px;

       justify-content:center;
       position: absolute;                                          
       background-color:#fff;
       border-radius:100px;
`;

export const Button2 = styled.TouchableOpacity`
       border-width:1px;
       align-items:center;
       border-color:#5ca935;
     bottom: 10px;
         height:70px;
         width:70px;
                 width: 100%;
       justify-content:center;
       position: absolute;                                          
       background-color:#fff;
`;
export const Button3 = styled.TouchableOpacity`
       align-items:center;
              top: 30px;
       right: 10px;
       justify-content:center;
       position: absolute;                                          
`;
export const ScrollView = styled.ScrollView`
        padding-left: 40px;
        padding-right: 40px;
`;
export const View = styled.View`
    margin-top: 140px;

`;
