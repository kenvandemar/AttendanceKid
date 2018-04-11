import GlobalStyles from '../styles/styles.global';
import { StyleSheet } from 'react-native';
// const isTablet = DeviceInfo.isTablet();

export const ClassStyles = StyleSheet.create({
    component: {
        flex: 1,
        alignItems: 'center'
    },
    classContainer: {
        flex:1, 
        width: '100%',
        maxWidth: 715,
        marginTop: 25
    }
});
export const SearchClassStyles = StyleSheet.create({
    component: {
        marginBottom: 30,
        marginHorizontal: 17
    },
    inputComponent: {
        height: 42,
        paddingLeft: 10,
        borderRadius: 10,
        backgroundColor: '#F1F1F2'
    }
});
export const ItemClassStyles = StyleSheet.create({
    component: {
        flex:1,
        margin: 17
    },
    itemThumb: {
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 1,
        marginBottom: 10
    },
    itemTitle: {
        backgroundColor:'transparent',
        textAlign: 'center',
         color: '#545454',
         fontSize: 20,
         fontWeight: '200'
    }
});