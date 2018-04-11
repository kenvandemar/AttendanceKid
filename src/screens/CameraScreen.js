import React, { Component } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity,
  AsyncStorage
} from "react-native";

import Camera from "react-native-camera";
import CaptureIcon from "react-native-vector-icons/Ionicons";
import CloseIcon from "react-native-vector-icons/FontAwesome";

import { CameraStyles } from "../styles/styles.camera";

let api = 'attendance';
let schoolName = 'schoolName'
let appName = 'Beelives'
let kidImgKey = api + '_' + schoolName + '_' + appName;

class CameraScreen extends Component {
  static navigatorStyle = {
    navBarHidden: true
  };
  constructor(props) {
    super(props);
    this.pushScreen = this.pushScreen.bind(this);
  }
  componentDidMount() {
    Camera.checkDeviceAuthorizationStatus()
      .then(success => {
        console.log("TAKE ME A PICTURE", success);
      })
      .catch(err => {
        console.log("GET OUT OF HERE");
      });

    Camera.checkVideoAuthorizationStatus()
      .then(success => {
        console.log("LETS GO", success);
      })
      .catch(err => {
        console.log("SOMETHING WRONG", err);
      });

    Camera.checkAudioAuthorizationStatus()
      .then(success => {
        console.log("WE CAN HEAR FROM NOW");
      })
      .catch(err => {
        "WE CANNOT HERE", err;
      });
  }

  pushScreen(screenName, title, imageData) {
   
    this.props.navigator.push({
      screen: screenName,
      title: title,
      passProps: {
        kidImage: imageData,
        onBackScreen: ()=> this.props.onBackScreen()
      }
    });

  }
  dissmissCameraModal() {
    this.props.navigator.dismissModal({
        animationType: 'slide-down'
    });
  }

  takePicture() {
    const options = {};
    this.camera
      .capture({ metadata: options })
      .then(data => {

        // AsyncStorage.getItem(kidImgKey).then((kidImgData) => {
        //   if(kidImgData === null) {
        //     AsyncStorage.setItem(kidImgKey, JSON.stringify(data));
        //   } else {
        //     let kidImgDataLocal = [];
        //     kidImgDataLocal.push(JSON.parse(kidImgData));
        //     console.log('CHECK KID LOCAL', kidImgDataLocal.concat(data));
        //     // AsyncStorage.setItem(kidImgKey, JSON.stringify(kidImgDataLocal.concat(data)));
        //   }
        
        // })
       

        this.pushScreen("app.PreviewScreen", "", data);
        
      })
      .catch(err => console.error("TELL ME ERRR", err));
  }

  render() {
    return (
        <Camera
          captureTarget={Camera.constants.CaptureTarget.disk}
          ref={cam => {
            this.camera = cam;
          }}
          style={CameraStyles.cameraView}
          aspect={Camera.constants.Aspect.fill}
          type={Camera.constants.Type.front}
          onFocusChanged={nativeEvent => {
            console.log("NATIVE EVENT");
          }}
          orientation={Camera.constants.Orientation.landscapeLeft}
        >
          <TouchableOpacity
            style={CameraStyles.closeIconView}
            onPress={() => {
              this.dissmissCameraModal();
            }}
          >
            <CloseIcon name="close" style={CameraStyles.closeIcon} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.takePicture()}
            style={CameraStyles.captureIconView}
          >
            <CaptureIcon
              name="ios-radio-button-on"
              style={CameraStyles.captureIcon}
            />
          </TouchableOpacity>
        </Camera>
    );
  }
}
export default CameraScreen;
