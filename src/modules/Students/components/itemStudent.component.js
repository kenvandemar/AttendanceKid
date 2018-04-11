import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  AsyncStorage,
  FlatList,
  Image
} from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import { ItemStudentComponentStyles as styles } from "../../../styles/styles.module.student";
import {CachedImage} from "react-native-img-cache";

export default class ItemStudentComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      isListStyle: true,
      checkinDisable: true
    };
  }
  componentDidMount() {
    if (this.props.isListStyle){
      this.setState({ isListStyle: this.props.isListStyle });
    }
    this.checkDisableCamera();
  }
  componentWillReceiveProps(nextProps) {
    if(this.props.item.SignInTime != nextProps.item.SignInTime || this.props.item.SignOutTime != nextProps.item.SignOutTime) {
      this.checkDisableCamera(nextProps.item.SignInTime, nextProps.item.SignOutTime);
    }
  }
  checkDisableCamera(SignInTime = this.props.item.SignInTime, SignOutTime = this.props.item.SignOutTime) {
    if (global.isCheckIn){
      if(SignInTime === null && SignOutTime === null){
        this.setState({checkinDisable: false});
      }
      else this.setState({checkinDisable: true});
    }
    else {
      if(SignOutTime === null){
        this.setState({checkinDisable: false});
      }
      else this.setState({checkinDisable: true});
    }
  }
  renderAchieve(){
    return (
      <View>
        <Text>Điểm thưởng</Text>
      </View>
    )
  }
  render() {
    if(this.props.item.isNull) return <View style={{flex:1, marginHorizontal: 18}}/>;
    return (
      <TouchableOpacity
        disabled={this.state.checkinDisable}
        style={[
          this.props.isListStyle && styles.listComponent,
          !this.props.isListStyle && styles.gridComponent
        ]}
        onPress={() => this.props.onPressItem(this.props.item)}
      >
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start'
        }}>
          <CachedImage
            style={{ width: 92, height: 90, borderRadius: 8, marginRight: this.props.isListStyle?36:27, marginBottom: 10, marginTop: this.props.isListStyle?0:10, marginLeft: this.props.isListStyle?0:10 }}
            resizeMode="cover"
            source={{
              uri:
                global.defaultSettings.common.serviceBaseUrl + global.defaultSettings.common.api + 'StudentResource/' +
                this.props.item.Avatar
            }}
          />
          <View style={{flex:1}}>
            {this.props.isListStyle?
              <Text style={styles.studentName}>
                {this.props.item.Surname +
                  " " +
                  this.props.item.MidleName +
                  " " +
                  this.props.item.LastName}{" "}
                <Text>({this.props.item.Nickname})</Text>
              </Text>
            :null}
            <View style={[{flexDirection: "row"}, !this.props.isListStyle && styles.InOutComponent]}>
              {this.props.item.SignInTime === null ? null : (
                <Text style={styles.checkValue}>
                  <Text style={styles.checkIn}>IN</Text>{" "}
                  {this.props.item.SignInTime.substring(0, 5)}
                </Text>
              )}
              {this.props.item.SignOutTime === null ? null : (
                <Text style={styles.checkValue}>
                  <Text style={styles.checkOut}>OUT</Text>{" "}
                  {this.props.item.SignOutTime.substring(0, 5)}
                </Text>
              )}
            </View>
            {!this.props.isListStyle?
              <View style={[styles.achieveComponent,{marginRight: 10}]}>{this.renderAchieve()}</View>
            :null}
          </View>
          {this.props.isListStyle?
            <View style={styles.achieveComponent}>{this.renderAchieve()}</View>
          :null}
        </View>
        {!this.props.isListStyle?
          <Text style={[styles.studentName,{marginLeft: 10}]}>
            {this.props.item.Surname +
              " " +
              this.props.item.MidleName +
              " " +
              this.props.item.LastName}{" "}
            <Text>({this.props.item.Nickname})</Text>
          </Text>
          :null}
      </TouchableOpacity>
    );
  }
}
