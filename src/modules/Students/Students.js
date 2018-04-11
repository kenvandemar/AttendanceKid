import React, { Component } from 'react';
import { 
    View, 
    Text, 
    ScrollView,
    TouchableOpacity,
    FlatList,
    TextInput,
    Image,
    AsyncStorage
} from 'react-native';

import { ajax } from "rxjs/observable/dom/ajax";

// import { connect} from 'react-redux';
import ClassListComponent from './components/classList.component';
import ItemStudentComponent from './components/itemStudent.component';
import FooterComponent from '../../components/footer.Component';
import {StudentStyles as styles} from '../../styles/styles.module.student';
import Helper from '../../common/helper';
import { textString as langLib } from '../../common/lang';

// import { runApplication } from '../../actions/appActions';

class ListStudent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            searchResult: null,
            students: [],
            isListStyle: true,
            classCode: null
        }
        this.showCameraModal = this.showCameraModal.bind(this);
    }
    componentDidMount() {
        if(this.props.classCode) this.setState({classCode: this.props.classCode})
        this.getListStudent(this.props.classCode);
    }

    getListStudent(code) {
        this.getLocalStudentData(code);
        let year = new Date().getFullYear();
        let month = new Date().getMonth() + 1;
        let day = new Date().getDate();
        if(month<10) month = '0'+month;
        if(day<10) day = '0'+day;
        let today = year + '-' + month + '-' + day;

        let url = global.defaultSettings.common.serviceBaseUrl+global.defaultSettings.common.api+'Attendance/GetStudentList';
        let body = {
            ClassCode: code, 
            Date: today
        }
        ajax.post(url,body,{ "Content-Type": "application/json" })
        .toPromise().then(success => {
            this.setState({students: this.formatListStudent(success.response)});
            AsyncStorage.setItem('@Student@'+code+':listStudent',JSON.stringify(responseData));
          })
          .catch(err => {
            console.log("SOMETHING NOT TRUE", err);
          });
    }
    getLocalStudentData(classCode){
        AsyncStorage.getItem('@Student@'+classCode+':listStudent')
        .then((result)=>{
            if(result != null){
                this.setState({students: JSON.parse(result)})
            }
        });
    }
    showCameraModal(screenName, title) {
        this.props.navigator.showModal({
            screen: screenName,
            title: title,
            animationType: 'slide-up',
            passProps: {
                onBackScreen: ()=> this.getListStudent(this.state.classCode)
            }
        });
    }
    onPressItem(item) {
        global.studentSelected = item;
        this.showCameraModal('app.CameraScreen', '')
    }
    filterStudent(text) {
        let searchText = Helper.formatVietNamText(text);
        let data = this.state.students;
        let searchResult = data.filter((item)=>{
            if(item.LastName)
                return Helper.formatVietNamText(item.Surname + ' ' + item.MidleName + ' ' + item.LastName + ' ' + item.Nickname + ' ' + item.Code).indexOf(searchText) >= 0;
        });
        //searchResult = this.formatListClass(searchResult, 3);
        this.setState({searchText: searchText, searchResult: this.formatListStudent(searchResult)});
    }
    formatListStudent(list, isListStyle = this.state.isListStyle){
        let listStudent = list;
        let column = isListStyle?1:2;
        let n = list.length % column;
        if(n != 0){
            for(let i = 0; i<(column - n); i++){
                listStudent.push({isNull: true});
            }
        }
        return listStudent;
    }
    formatDateFull(){
        let year = new Date().getFullYear();
        let month = new Date().getMonth() + 1;
        let day = new Date().getDate();
        if(month<10) month = '0'+month;
        if(day<10) day = '0'+day;
        return day+'/'+month+'/'+year;
    }
    onPressClass(code) {
        this.setState({classCode: code, searchText: '', searchResult: null,});
        this.getListStudent(code);
    }
    keyExtractor = (item, index) => index;
    render () {
        return (
            <View style={styles.component}>
                <ClassListComponent classCode={this.state.classCode} classIndex={this.props.classIndex} onPressItem={(code)=>this.onPressClass(code)}/>
                <View style={styles.controllContainer}>
                    <Text style={styles.currentDateText}>{this.formatDateFull()}</Text>
                    <TextInput 
                        clearButtonMode={'always'}
                        style={styles.searchInputComponent} 
                        placeholder={langLib.search}
                        // keyboardType='web-search'
                        returnKeyType='search'
                        onChangeText={(text)=>{this.filterStudent(text)}}
                        // onEndEditing={()=>{
                        //     if(this.props.end)
                        // }}
                    />
                    <TouchableOpacity
                        onPress={()=>this.setState({isListStyle: true})}
                    >
                        <Image style={{width: 27, height: 27, marginRight: 20, opacity: this.state.isListStyle?1:0.5}} source={require('../../assets/icons/list.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={()=>{
                            this.setState({
                                isListStyle: false, 
                                students: this.formatListStudent(this.state.students, false), 
                                searchResult: this.state.searchResult === null?null:this.formatListStudent(this.state.searchResult, false)
                            });
                        }}
                    >
                        <Image style={{width: 27, height: 27, opacity: !this.state.isListStyle?1:0.5}} source={require('../../assets/icons/grid.png')} />
                    </TouchableOpacity>
                </View>
                <View style={styles.listStudentStyle}>
                    <FlatList 
                        style={{flex:1}}
                        data={(this.state.searchText !== '' && this.state.searchResult)?this.state.searchResult:this.state.students}
                        extraData={this.state}
                        keyExtractor={this.keyExtractor}
                        key = {this.state.isListStyle ? 0 : 1 }
                        numColumns={this.state.isListStyle?1:2}
                        renderItem={({ item }) => <ItemStudentComponent item={item} isListStyle={this.state.isListStyle} onPressItem={this.onPressItem.bind(this)}/>}
                    />
                </View>
            <FooterComponent />
            </View>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        prop: state.prop
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        runApp: () => {
            dispatch(runApplication())
        }
    }
}
export default ListStudent;
// export default connect(mapStateToProps, mapDispatchToProps)(ListClass);