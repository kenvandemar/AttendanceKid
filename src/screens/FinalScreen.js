import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Easing,
  Animated,
  FlatList,
  Modal,
  ImageBackground
} from "react-native";
import { BlurView, VibrancyView } from "react-native-blur";
import { ScreenVisibilityListener as RNNScreenVisibilityListener } from "react-native-navigation";
import StarIcon from "react-native-vector-icons/FontAwesome";
import { textString as langLib} from '../common/lang';


import GlobalStyles from "../styles/styles.global";
import {
  FinalScreenStyle as styles,
  FinalScreenStyle
} from "../styles/styles.finalscreen";
import honeyJarSmall from "../assets/images/achievements/achivementssmall/honey.png";
import honeyJarBig from "../assets/images/achievements/honey.png";
import plusSign from "../assets/images/achievements/plus.png";
import pikachuPng from "../assets/images/achievements/puzzles/Pikachu.png";


let checkInText = "Check in";
let checkOutText = "Check out";

class FinalScreen extends Component {
  static navigatorStyle = {
    navBarBackgroundColor: GlobalStyles.checkinNavColor,
    navBarTextColor: "#fff",
    navBarTextFontSize: 20
  };
  static navigatorButtons = {
    leftButtons: [
      {
        title: ""
      }
    ]
  };

  constructor(props) {
    super(props);
    this.state = {
      imageFinalPath: "",
      isShowPuzzle: false,
      isShowBigHoneyJar: true,
      isShowBackHomeBtn: false,
      starSize: -10,
      modalBlur: 40
    };
    this.scaleValue = new Animated.Value(0);

    this.y_translate = new Animated.Value(0);

    this.blurAnimatate = new Animated.Value(0);

    this.blurAnimatate.addListener((value) => {
      this.setState({
        modalBlur: value.value
      });
    });
  }

  
  componentWillMount() {
    this.props.navigator.setStyle({
      navBarBackgroundColor: global.isCheckIn
        ? GlobalStyles.checkinNavColor
        : GlobalStyles.checkoutNavColor
    });
  }
  componentWillUnmount(){
    this.props.onBackScreen();
  }
  componentDidMount() {
    // console.log("CHECK GLOBAL STUDENT", global.studentSelected);
    if (
      this.props.kidImageFinal !== undefined &&
      this.props.kidImageFinal !== null
    ) {
      this.setState({
        imageFinalPath: this.props.kidImageFinal
      });
    }
    this.scaleHoney();
    setTimeout(() => {
      this.setState({
        isShowBigHoneyJar: false
      });
    }, 2300);

    // setTimeout(() => {
    //   this.setState({
    //     isShowPuzzle: true
    //   });
    // }, 2500);

    setTimeout(() => {
      this.setState({
        isShowPuzzle: false,
        isShowBackHomeBtn: true
      });
    }, 2500);
  }

  adjustBlurAmount() {
    this.blurAnimatate.setValue(40);
    Animated.timing(this.blurAnimatate, {
      toValue: 0,
      duration: 1000,
    }).start();
  }

  starFly() {
    this.y_translate.setValue(40);
    Animated.timing(this.y_translate, {
      toValue: 5,
      duration: 350
    }).start()
  }

  starDisappear() {
      this.y_translate.setValue(0);
      Animated.timing(this.y_translate, {
        toValue: -300,
        duration: 200
      }).start
  }





  /**
   *
   * Animation for big Jar Honey when kid enters the Final Screen Start
   * @memberof FinalScreen
   */
  scaleHoney() {
    this.scaleValue.setValue(0);
    Animated.timing(this.scaleValue, {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear
    }).start();
  }

  scaleHoneyBigJar() {
    const nearFar = this.scaleValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [1, 4, 1]
    });
    if (this.state.isShowBigHoneyJar === true) {
      return (
        <View style={FinalScreenStyle.bigJarView}>
          <Animated.Image
            style={[
              FinalScreenStyle.plusSign,
              [
                {
                  transform: [{ scale: nearFar }]
                }
              ]
            ]}
            source={plusSign}
          />
          <Animated.Image
            style={{ transform: [{ scale: nearFar }] }}
            source={honeyJarBig}
          />
        </View>
      );
    } else {
      return null;
    }
  }

  /**
   * Render
   *
   * @returns
   * @memberof FinalScreen
   */

  RenderImageFinal() {
    return (
      <View style={styles.imageFinalView}>
        <Image
          source={{ uri: this.props.kidImageFinal }}
          style={styles.imageFinal}
        />
      </View>
    );
  }

  renderPuzzlePiece(item) {
    //console.log("CHECK INDEX", item);
    const star_moveY = this.y_translate.interpolate({
      inputRange: [1, 300],
      outputRange: [0, 100]
    });

    if (item.index !== 8) {
      return (
        <VibrancyView blurType="light" blurAmount={this.state.modalBlur}>
          <View style={styles.puzzlePieceView} />
      </VibrancyView>
      );
    } else {
      return (
        <View 
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Animated.View
            style={{
              position: 'absolute',
              zIndex: 999999999999,
              alignSelf: 'center',
              transform: [{ scale: star_moveY }],
              backgroundColor: 'rgba(0,0,0,0)'
            }}
            
          >
          
              <StarIcon 
              name='star'
              style={{
                fontSize: this.state.starSize,
                color: 'rgb(254, 216, 83)',
                transform: [{ rotate: '45deg'}]
              }}
            />
          
      </Animated.View>
          <View style={styles.puzzlePieceView} />
         
        </View>
        
      )
    }
  }

  RenderPuzzle() {
    const puzzleArr = [];
    for (var i = 0; i <= 10; i++) {
      puzzleArr.push(i);
    }

    if (this.state.isShowPuzzle === true) {
      return (
        <View
          style={{
            height: 318,
            width: 327,
            marginTop: 20,
            borderStyle: "solid",
            borderWidth: 1,
            borderColor: "rgb(251, 140, 67)"
          }}
        >
          <ImageBackground
            source={pikachuPng}
            style={{
              position: "absolute",
              top: 0.5,
              left: 0,
              bottom: 0,
              right: 0,
              width: 325,
              height: 315,
            }}
            
          >
            <FlatList
              data={puzzleArr}
              numColumns={4}
              renderItem={item => this.renderPuzzlePiece(item)}
              inverted
              keyExtractor={(item, index) => `key-${item}-keys`}
              
            />
          </ImageBackground>
        </View>
      );
    } else {
      return null;
    }
  }
  dismissAllModal() {
    global.isFinalScreen = true;
    this.props.navigator.dismissModal({
      animationType: "slide-down"
    });
  }
  BackToStudent() {
    if (this.state.isShowBackHomeBtn === true) {
      return (
        <TouchableOpacity
          style={styles.backBtnView}
          onPress={() => {
            this.dismissAllModal();
          }}
        >
          <Text style={styles.backBtnText}>{langLib.back}</Text>
        </TouchableOpacity>
      );
    }
  }
  RenderAttendanceInfo() {
    let studFullName =
      global.studentSelected.Surname +
      " " +
      global.studentSelected.MidleName +
      " " +
      global.studentSelected.LastName +
      " (" +
      global.studentSelected.Nickname +
      ")";
    let date = new Date();
    let time = date
      .toTimeString()
      .split(" ")[0]
      .split(":");
    let hourInfo = time[0] + ":" + time[1];
    return (
      <View style={styles.kidInfo}>
        <Text style={styles.kidNameText}>{studFullName}</Text>
        <View style={styles.checkInView}>
          <Text
            style={[
              styles.checkInText,
              [
                {
                  color: global.isCheckIn
                    ? GlobalStyles.checkinNavColor
                    : GlobalStyles.checkoutNavColor
                }
              ]
            ]}
          >
            {global.isCheckIn ? checkInText : checkOutText}
          </Text>
          <Text style={styles.checkInTimeText}>{hourInfo}</Text>
        </View>

        <View style={styles.achievementView}>
          <Text style={styles.achievementText}>{langLib.achievement}:</Text>
          <Text style={styles.achievementImage}>5 x </Text>
          <Image source={honeyJarSmall} />

          <TouchableOpacity
            style={{
              marginLeft: 10,
              padding: 5,
              borderStyle: 'solid',
              borderWidth: 1,
              borderColor: 'orange',
              borderRadius: 5
            }}
            onPress={() => {
              this.starFly();
              this.setState({
                starSize: 50
              });
              this.adjustBlurAmount();
            }}
          >
            <Text>START STAR</Text>
          </TouchableOpacity>
        </View>
        {this.scaleHoneyBigJar()}
        {this.RenderPuzzle()}
        {this.BackToStudent()}
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1 }} />
        {this.RenderImageFinal()}
        <View style={{ flex: 0.5 }} />
        {this.RenderAttendanceInfo()}
        <View style={{ flex: 1 }} />
      </View>
    );
  }
}

export default FinalScreen;
