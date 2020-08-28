import styled from 'styled-components';

export const Container = styled.View`
    flex: 1;
`;

export const Text_results = styled.Text`
        margin-top: 20px;
        margin-horizontal: 10px;
`;

export const Container_item = styled.SafeAreaView`
        flex-direction: row;
`;

export const Picture = styled.Image`
        width: 80px;
        height: 80px;
        margin-right: 30px;
`;
export const Item_container = styled.TouchableOpacity`
        padding: 20px;
        margin-vertical: 8px;
        border-bottom-width: 1px;
        border-bottom-color: #CDCDCD;
        flex-direction: row;
        align-items: center;
`;

export const Item_title = styled.Text`
        font-size: 16px;
`;

export const Item_price = styled.Text`
            font-size: 16px;

`;
export const Item_subdivision = styled.Text`
    flex: 1;
`;
export const Item_subdivision_detach = styled.Text`
        font-size: 12px;
        color: #00a650;
        `;

export const View = styled.View``;

export const Item_condition = styled.Text``;
export const FlatList = styled.FlatList``;
