import React, { Component } from 'react';
import { 
    View, 
    Text,
    Image,
} from 'react-native';
import logo from '../assets/images/logo.png';
import {FooterStyles as styles} from '../styles/styles.components';
export default class FooterComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkinActive: true
        }
    }
    render () {
        return (
            <View style={styles.container}>
                <Image style={styles.logo} source={logo} />
                <Text style={styles.footerText}>Powered by Beelives</Text>
            </View>
        )
    }
}