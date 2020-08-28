import styled from 'styled-components';

export const Container = styled.View`
flex: 1;
padding-top: 50px;
background-color: #eee;
`;

export const Title = styled.Text`
text-align: center;
margin-bottom: 30px;
font-size: 20px;
color: #7B7B81;
`;

export const Description = styled.Text`
text-align: center;
font-size: 16px;
color: #7B7B81;
`;

export const ProdContainer = styled.View`
height: 80px;
borderWidth: 1px;
borderColor: #ccc;
marginBottom: 10px;
flexDirection:row;
justifyContent: space-between;
`;



export const Prodimage = styled.Image`
height: 80px;
width: 100px;
`;

export const Proddescription = styled.View`
flex: 2;
padding: 10px;
`;

export const ProdTitle = styled.Text`
fontWeight: bold;
fontSize: 18px;
`;



export const ProdtitleName = styled.Text`
color: gray;

`;

export const ProdBtn = styled.TouchableOpacity`
width: 50px;
justifyContent: center;
alignItems: center;
`;

export const FlatList = styled.FlatList`
`;
export const Text = styled.Text`
`;


