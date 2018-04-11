import React, { Component } from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
  AsyncStorage
} from "react-native";
import RNFetchBlob from "react-native-fetch-blob";
import { GCResize } from "NativeModules";
import Rx from "rxjs";
import { ajax } from "rxjs/observable/dom/ajax";

import { PreviewStyle } from "../styles/styles.preview";
import { textString as langLib} from '../common/lang';

let queue = new Rx.Subject();
let api = "attendance";
let schoolName = "schoolName";
let appName = "Beelives";
let kidImgKey = api + "_" + schoolName + "_" + appName;


class PreviewScreen extends Component {
  static navigatorStyle = {
    navBarHidden: true
  };
  constructor(props) {
    super(props);
    this.state = {
      imagePath: "",
      resizedImage: ""
    };
  }

  componentDidMount() {
    if (this.props.kidImage !== undefined && this.props.kidImage !== null) {
      this.setState({
        imagePath: this.props.kidImage.path
      });

      GCResize.path(
        {
          image: this.props.kidImage.path,
          width: 512,
          height: 390
        },
        resizedImage => {
          this.setState({
            resizedImage: resizedImage
          });
        }
      );
    }
  }
  popScreen() {
    RNFetchBlob.fs
      .exists(this.props.kidImage.path)
      .then(exists => {
        RNFetchBlob.fs
          .unlink(this.props.kidImage.path)
          .then(success => {
            this.props.navigator.pop();
          })
          .catch(err => {
            console.log("CANNOT REMOVE");
          });
      })
      .catch(err => {
        console.log("NOT EXIST", err);
      });
  }
  pushScreen(screenName, title, imageFinalData) {
    this.props.navigator.push({
      screen: screenName,
      title: title ? "CHECK-IN" : "CHECK-OUT",
      passProps: {
        kidImageFinal: imageFinalData,
        onBackScreen: ()=> this.props.onBackScreen()
      },
      animated: false
    });
  }
  addToQueue(url) {
    queue.next([url, subject]);
    return queue.asObservable;
  }
  processUploadImage(image) {
    let date = new Date();
    let dayRemoveSlash = date.toLocaleDateString();
    dayRemoveSlash = dayRemoveSlash.replace(/\//g, "");

    let attIndicate = global.isCheckIn ? "I" : "O";
    let classCode = global.studentSelected.Code;
    let imageUploadName = `${classCode}-${dayRemoveSlash}${attIndicate}`;

    let kidImageUrl = 
      global.defaultSettings.common.serviceBaseUrl +
      global.defaultSettings.common.api +
      "Attendance/CheckInUpload";
    RNFetchBlob.fetch(
      "POST",
      kidImageUrl,
      {
        "Content-Type": "multipart/form-data"
      },
      [
        {
          name: imageUploadName,
          filename: imageUploadName,
          data: RNFetchBlob.wrap(image)
        }
      ]
    )
      .uploadProgress({ interval: 250 }, (written, total) => {
        console.log("WRITTEN...", written / total);
      })
      .progress({ count: 10 }, (received, total) => {
        console.log("PROGRESS...", received / total);
      })
      .then(resp => {
        console.log("UPLOAD SUCCESS FULL", resp);
      })
      .catch(err => {
        console.log("SOMETHING OCCURS", err);
      });
  }

  processUploadAttendanceInfo() {
    let date = new Date();
    //SIGN IN TIME
    let signInHour = date.getHours();
    let signInMinute = date.getMinutes();
    let signInSecond = date.getSeconds();
    let signInOutTimeUpload = signInHour + ":" + signInMinute + ":" + signInSecond;

    // ATTENDANCE DATE
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
    let attendanceDateUpload = year + "-" + month + "-" + day;

    let attendanceInfoBody = global.isCheckIn ? {
      StudentCode: global.studentSelected.Code,
      AttendanceDate: attendanceDateUpload,
      SignInTime: signInOutTimeUpload
    } : {
      "StudentCode": global.studentSelected.Code,
      "AttendanceDate": attendanceDateUpload,
      "SignOutTime": signInOutTimeUpload
    };

    let serviceBaseUrl = global.defaultSettings.common.serviceBaseUrl;
    let commonApi = global.defaultSettings.common.api;
    let baseUrl = `${serviceBaseUrl}${commonApi}`;
    let checkInUrl = `${serviceBaseUrl}${commonApi}Attendance/CheckIn`;
    let checkOutUrl = `${serviceBaseUrl}${commonApi}Attendance/CheckOut`;

    let inOutUrl = global.isCheckIn ? checkInUrl : checkOutUrl;
    
    ajax
      .post(inOutUrl, attendanceInfoBody, {
        "Content-Type": "application/json"
      })
      .toPromise()
      .then(success => {
        console.log("UPLOAD INFO SUCCESS", success);
        this.processUploadImage(this.state.resizedImage);
      })
      .catch(err => {
        console.log("UPLOAD INFO FAIL", err);
      });
  }

  renderImage() {
    if (this.state.imagePath.length === 0) {
      return <ActivityIndicator animating={true} size={"small"} />;
    } else if (this.state.imagePath.length > 0) {
      return (
        <ImageBackground
          source={{ uri: this.state.imagePath }}
          style={PreviewStyle.ImageStyle}
        >
          <View style={PreviewStyle.actionBtnView}>
            <TouchableOpacity
              style={[PreviewStyle.actionBtn, PreviewStyle.actionReturn]}
              onPress={() => {
                this.popScreen();
              }}
            >
              <Text style={PreviewStyle.actionText}>{langLib.capture}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[PreviewStyle.actionBtn, PreviewStyle.actionChoose]}
              onPress={() => {
                this.pushScreen(
                  "app.FinalScreen",
                  global.isCheckIn,
                  this.state.imagePath
                );
                this.processUploadAttendanceInfo();
              }}
            >
              <Text style={PreviewStyle.actionText}>{langLib.choose}</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      );
    }
  }
  render() {
    return <View style={PreviewStyle.container}>{this.renderImage()}</View>;
  }
}

export default PreviewScreen;
