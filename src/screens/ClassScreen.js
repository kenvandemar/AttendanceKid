import React, { Component } from "react";
// import {
//     View,
//     Text,
//     ScrollView
// } from 'react-native';

import GlobalStyles from "../styles/styles.global";
import ListClass from "../modules/Class/Class";

class ClassScreen extends Component {
  // static navigatorStyle = {
  //     navBarBackgroundColor: global.isCheckIn?GlobalStyles.checkinNavColor:GlobalStyles.checkoutNavColor
  // };
  static navigatorStyle = {
    navBarTextColor: "#fff",
    navBarTextFontSize: 20
  };
  // static navigatorButtons = {
  //   leftButtons: [
  //     {
  //       icon: require("../assets/icons/back.png"),
  //       id: "back"
  //     }
  //   ]
  // };
  constructor(props) {
    super(props);
    // this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  // onNavigatorEvent(event) {
  //   if (event.type == "NavBarButtonPress") {
  //     if (event.id == "back") {
  //       this.props.navigator.pop();
  //       this.props.onBackScreen();
  //     }
  //   }
  // }
  componentWillMount() {
    this.props.navigator.setStyle({
      navBarBackgroundColor: global.isCheckIn
        ? GlobalStyles.checkinNavColor
        : GlobalStyles.checkoutNavColor
    });
  }
  // componentDidMount() {}
  componentWillUnmount() {
    this.props.onBackScreen();
  }
  render() {
    return <ListClass navigator={this.props.navigator} />;
  }
}

export default ClassScreen;
