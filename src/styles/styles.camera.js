import GlobalStyles from './styles.global'
import { StyleSheet } from 'react-native';


export const CameraStyles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row'
    },
      cameraView: {
        flex: 1,
        justifyContent: 'space-between'
      },
      closeIconView: {
        marginTop: 10,
        backgroundColor: 'rgba(0,0,0,0)',
        marginLeft: 10,
        width: 50,
        height: 20
      },
      closeIcon: {
        color: '#fff', 
        fontWeight: '900',
        fontSize: 50,
      },
      captureIconView: {
        backgroundColor: 'rgba(0,0,0,0)',
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignSelf: 'center'
      },
      captureIcon: {
        fontSize: 80, 
        color: "#fff",
        textAlign: 'center'
      }
})