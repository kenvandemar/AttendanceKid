import React, { Component } from 'react';
import { 
    View, 
    Text,
    Image,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';

// import { connect } from 'react-redux';
// import { Provider } from 'react-redux';
// import createStore from '../store/configureStore';
// styles
import {HomeStyles as styles} from '../styles/styles.home';
import GlobalStyles from '../styles/styles.global';

// img
import schoolLogo from '../assets/images/logo-school.png';
import footerLogo from '../assets/images/logo.png';
import viFlag from '../assets/images/lang/vietnamese.png';
import enFlag from '../assets/images/lang/english.png';

import { textString } from '../common/lang';

// const store = createStore();

let langStorage = 'BeeLang'+'_Attendance';

export default class HomeScreen extends Component {
    static navigatorStyle = {
        navBarHidden: true
    };

    constructor(props) {
        super(props);
        this.state = {
            timeConfig: 12,
            checkinActive: true,
            timeInterval: 1000,
            hour: 0,
            minutes: 0,
            isShowEnFlag: 'none',
            isShowViFlag: 'none'
        }
        this.timeIntervalFunc;
    }
    componentDidMount(){
        AsyncStorage.getItem(langStorage).then((result) => {
            let currentLang = JSON.parse(result);
           
            if (currentLang === 'ENG') {
                textString.setLanguage('eng');
                this.setState({
                    isShowEnFlag: 'flex',
                    isShowViFlag: 'none'
                });
                this.forceUpdate();
               
            } else if (currentLang === 'VI') {
                textString.setLanguage('vi');
                this.setState({
                    isShowEnFlag: 'none',
                    isShowViFlag: 'flex'
                });
                this.forceUpdate();
            }
        })
    
       this.setTimeInterval();
    }
    componentDidUpdate(prevProps, prevState){
        if(prevState.timeInterval != this.state.timeInterval){
            this.setTimeInterval(this.state.timeInterval);
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        return (this.state.timeInterval !== nextState.timeInterval 
            || this.state.hour != nextState.hour
            || this.state.minutes != nextState.minutes);
    }
    setCheckInActive(hour){
        let status = true;
        if(hour > this.state.timeConfig){
            status = false;
        }
        this.setState({checkinActive: status});
    }
    setTimeInterval(timeInterval = this.state.timeInterval){
        this.setTime();
        clearInterval(this.timeIntervalFunc);
        this.timeIntervalFunc = setInterval(()=>{
            this.setTime();
        },timeInterval);
    }
    setTime(){
        let hour = new Date().getHours();
        let minutes = new Date().getMinutes();
        let second = new Date().getSeconds();
        this.setState({hour: hour, minutes: minutes, timeInterval: 60000 - second*1000});
        this.setCheckInActive(hour);
    }
    pushScreen(screenName, title, isCheckIn){
        clearInterval(this.timeIntervalFunc);
        global.isCheckIn = isCheckIn;
        this.props.navigator.push({
            screen: screenName,
            title: title,
            passProps: {
                onBackScreen: () => this.setTimeInterval()
            },
            backButtonTitle: "Back"
        });
    }
    showEnFlag() {
    if (this.state.isShowViFlag === 'flex') {
        this.setState({
            isShowEnFlag: 'flex',
            isShowViFlag: 'none'
         });
       textString.setLanguage('eng');
       AsyncStorage.setItem(langStorage, JSON.stringify('ENG'));
    } else if (this.state.isShowViFlag === 'none') {
            this.setState({
                isShowEnFlag: 'flex',
                isShowViFlag: 'flex'
            });
      }
    }
    showViFlag() {
        if (this.state.isShowEnFlag === 'none') {
            this.setState({
                isShowEnFlag: 'flex',
                isShowViFlag: 'flex'
            });
            textString.setLanguage('vi');
            AsyncStorage.setItem(langStorage, JSON.stringify('VI'));
        } else if (this.state.isShowEnFlag === 'flex') {
            this.setState({
                isShowEnFlag: 'none',
                isShowViFlag: 'flex'
            });
            textString.setLanguage('vi');
            AsyncStorage.setItem(langStorage, JSON.stringify('VI'));
        }
    }
    render () {
        return (
            // <Provider store={store}>
                <View style={styles.component}>
                    <View style={styles.schoolContainer}>
                        <Image style={styles.schoolLogo} source={schoolLogo} />
                        <Text style={styles.schoolName}>Trường Beelives</Text>
                    </View>
                    <View style={styles.checkContainer}>
                        <TouchableOpacity
                            style={[styles.checkButton, this.state.checkinActive && styles.checkInActive]}
                            onPress={()=> this.pushScreen('app.ClassScreen', 'CHECK-IN', true)}
                        >
                            <Text style={styles.checkText}>Check-in</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.checkButton, !this.state.checkinActive && styles.checkOutActive]}
                            onPress={()=> this.pushScreen('app.ClassScreen', 'CHECK-OUT', false)}
                        >
                            <Text style={styles.checkText}>Check-out</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.clockContainer}>
                        <Text style={[styles.clock,{color: this.state.checkinActive?GlobalStyles.checkinNavColor:GlobalStyles.checkoutNavColor}]}>{(this.state.hour>9)?this.state.hour:'0'+this.state.hour}:{(this.state.minutes>9)?this.state.minutes:'0'+this.state.minutes}</Text>
                    </View>
                    
                    <View style={styles.langFieldView}> 
                    <View style={styles.beforeFooter}/>
                         <View style={styles.footerContainer}>
                            <Image style={styles.footerLogo} source={footerLogo} />
                            <Text style={styles.footerText}>Powered by Beelives</Text>
                         </View>

                        <View style={styles.langView}>
                            <TouchableOpacity 
                                style={[styles.touchableEnglish, [{display: this.state.isShowEnFlag}]]}
                                onPress={() => {
                                    this.showEnFlag();
                                    this.forceUpdate();
                                }}
                            >
                                <Image source={enFlag} style={styles.flagSize}/>
                                <View style={styles.langTextView}>
                                    <Text>English</Text>
                                </View>
                                
                            </TouchableOpacity>

                            <TouchableOpacity 
                                style={[styles.touchableVi, [{ display: this.state.isShowViFlag}]]}
                                onPress={() =>{
                                  this.showViFlag();
                                  this.forceUpdate();
                              }}
                            >
                                <Image source={viFlag} style={styles.flagSize}/>
                                <View style={styles.langTextView}>
                                    <Text>Tiếng Việt</Text>
                                </View>  
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            // </Provider>
        )
    }
}