import GlobalStyles from './styles.global'
import { StyleSheet } from 'react-native';


export const PreviewStyle = StyleSheet.create({
    container: {
        flex: 1,  
    },
    ImageStyle: {
        height:'100%', 
        width: '100%'
    },  
    actionBtnView: {
        flex: 1,
        flexDirection: 'row', 
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginBottom: 20
    },
    actionBtn: {
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 25,
        shadowColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        borderRadius: 5
    },
    actionReturn: {
        backgroundColor: 'rgb(255, 105, 90)',
        marginRight: 30,
        width: 130,
        
    },
    actionChoose: {
        backgroundColor: '#56BBFF',
        width: 100,
    },
    actionText: {
        color: '#fff',
        fontSize: 25,
        fontWeight: '600'
    }
});