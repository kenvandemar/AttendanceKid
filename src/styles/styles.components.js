import GlobalStyles from '../styles/styles.global';
import { StyleSheet } from 'react-native';
// const isTablet = DeviceInfo.isTablet();

export const FooterStyles = StyleSheet.create({
    container: {
        height: 30,
        flexDirection: 'row',
        justifyContent: 'center', 
        alignItems: 'center',
        margin: 14
    },
    logo: {
        width: 36,
        height: 28,
        resizeMode: 'contain',
        marginRight: 17
    },
    footerText: {
        backgroundColor: 'transparent',
        fontSize: 20,
        fontWeight: '100',
        letterSpacing: 1.25
    }
});