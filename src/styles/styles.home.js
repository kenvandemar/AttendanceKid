import GlobalStyles from '../styles/styles.global';
import { StyleSheet } from 'react-native';
// const isTablet = DeviceInfo.isTablet();

export const HomeStyles = StyleSheet.create({
    component: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    checkButton: {
        width: 282,
        height: 130,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        margin: 35,
        backgroundColor: GlobalStyles.checkDisableColor
    },
    checkText: {
        color: "#fff",
        fontSize: 40,
        fontWeight: '100'

    },
    checkContainer: {
        height: 200,
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkInActive: {
        backgroundColor: GlobalStyles.checkinNavColor, 
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 25
    },
    checkOutActive: {
        backgroundColor: GlobalStyles.checkoutNavColor, 
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 25
    },
    schoolContainer: {
        flex:1,
        paddingTop: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    schoolLogo: {
        height: 160,
        resizeMode: 'contain'
    },
    schoolName: {
        fontSize: 36,
        fontWeight: '100',
        letterSpacing: 2.8
    },
    clockContainer: {
        flex:1,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    clock: {
        flex:1,
        fontSize: 100,
        fontWeight: '400'
    },
    footerContainer: {
        flex: 8.5,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
       
    },
  
    footerLogo: {
        height: 53,
        width: 53
    },
    footerText: {
        fontSize: 20,
        fontWeight: '100',
        letterSpacing: 1.25,
    },
    beforeFooter: {
        flex: 1.5
    },

    // LANGUAGE FIELD
    touchableEnglish: {
        flexDirection: 'row',
    },
    touchableVi: {
        flexDirection: 'row', 
        marginTop: 10,
    },

    langFieldView: {
        flexDirection: 'row',
        marginBottom: 10, 
        flexWrap: 'nowrap'
    },
    langView: {
        flex: 1,
        flexDirection: 'column',
        marginTop: 50,
        marginRight: 40,
        marginBottom: 20
    },
    flagSize: {
        width: 30, height: 30
    },
    langTextView: {
        justifyContent: 'center', 
        alignItems: 'center', 
        paddingLeft: 5
    }
});