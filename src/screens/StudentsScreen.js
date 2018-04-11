import React, { Component } from 'react';
import { 
    View, 
    Text, 
    ScrollView,
    TouchableOpacity
} from 'react-native';

import GlobalStyles from '../styles/styles.global';
import ListStudent from '../modules/Students/Students';

class StudentsScreen extends Component {
    // static navigatorStyle = {
    //     navBarBackgroundColor: GlobalStyles.checkinNavColor
    // };
    // static navigatorButtons = {
    //     leftButtons: [
    //       {
    //         icon: require('../assets/icons/back.png'),
    //         id: 'back'
    //       }
    //     ]
    //   };
    constructor(props) {
        super(props);
        // this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }
    // onNavigatorEvent(event) {
    //     if (event.type === 'NavBarButtonPress') { 
    //       if (event.id === 'back') {
    //         this.props.navigator.pop();
    //       }
    //     } 
    //   }
    componentWillMount(){
        this.props.navigator.setStyle({
            navBarBackgroundColor: global.isCheckIn?GlobalStyles.checkinNavColor:GlobalStyles.checkoutNavColor
        });
    }

    render () {
        return (
            <ListStudent 
                navigator={this.props.navigator}
                classCode={this.props.classCode}
                classIndex={this.props.classIndex}
            />   
        );
    }
}

export default StudentsScreen;