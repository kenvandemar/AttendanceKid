import GlobalStyles from '../styles/styles.global';
import { StyleSheet } from 'react-native';
// const isTablet = DeviceInfo.isTablet();

export const StudentStyles = StyleSheet.create({
    component: {
        flex: 1,
        alignItems: 'center'
    },
    listStudentStyle: {
        flex: 1,
        width: '90%',
        maxWidth: 800,
        borderRadius: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.10,
        shadowRadius: 20,
        elevation: 1,
    },
    controllContainer: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        width: '80%',
        maxWidth: 750,
        marginTop: 9,
        marginBottom: 20
    },
    currentDateText: {
        fontSize: 20,
        color: '#7A7A7A'
    },
    searchInputComponent: {
        flex: 1,
        height: 42,
        marginHorizontal: 25,
        paddingLeft: 10,
        borderRadius: 10,
        backgroundColor: '#F1F1F2'
    }
});

export const ClassComponentStyles = StyleSheet.create({
    component: {
        marginHorizontal: 44,
        marginTop: 11,
        flexDirection: 'row',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center'
    },
    itemComponent: {
        width: 110, 
        height: 140, 
        marginHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imgThumb: {
        width: 75, 
        height: 75,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.15,
        shadowRadius: 5,
        elevation: 1,
        marginBottom: 10,

    },
    className: {
        fontSize: 10,
        color: '#C5C5C5'
    },
    activeClassThumb: {
        width: 96, 
        height: 96,
        shadowOpacity: 0.25,
    },
    activeClassName: {
        fontSize: 12,
        color: '#545454'
    },
    activeClassComponent: {
        // opacity: 1
    }
});

export const ItemStudentComponentStyles = StyleSheet.create({
    listComponent: {
        flex:1,
        marginHorizontal: 33,
        marginTop: 11,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderBottomWidth: 1,
        borderBottomColor: '#D5D5D5'
    },
    gridComponent: {
        flex:1,
        marginHorizontal: 18,
        marginTop: 11,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#D5D5D5',
        borderRadius: 4
    },
    studentName: {
        color: '#7A7A7A',
        fontSize: 20,
        fontWeight: '400',
        marginBottom: 5
    },
    checkIn: {
        color: '#56BBFF',
        fontWeight: '500'
    },
    checkOut: {
        color: '#FF6C56',
        fontWeight: '500'
    },
    checkValue: {
        color: '#B3B3B3',
        fontSize: 17,
        fontWeight: '200',
        marginRight: 14
    },
    achieveComponent: {
        flex:1, 
        alignItems: 'flex-end'
    },
    InOutComponent: {
        flex:1,
        alignItems: 'flex-end'
    }

});
