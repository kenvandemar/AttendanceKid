import React, { Component } from 'react';
import { 
    View, 
    Text, 
    ScrollView,
    TouchableOpacity,
    Dimensions,
    FlatList,
    AsyncStorage
} from 'react-native';
// import { connect} from 'react-redux';
import Helper from '../../common/helper';
import {ajax} from 'rxjs/observable/dom/ajax';
import SearchClass from './components/searchclass.component';
import FooterComponent from '../../components/footer.Component';
import ItemClass from './components/itemListClass.component';
import {ClassStyles as styles, SearchClassStyles} from '../../styles/styles.module.class';
// import { runApplication } from '../../actions/appActions';

export default class ListClass extends Component {
    constructor(props){
        super(props);
        this.window = Dimensions.get('window');
        this.state = {
            searchText: '',
            listClass: []
        }
        this.column = 4;
    }
    componentWillMount() {
        AsyncStorage.getItem('@Class:listCalss')
        .then((result)=>{
            if(result != null){
                this.setState({listClass: JSON.parse(result)})
            }
        });
    }
    componentDidMount() {
        this.getListClass();
    }
    getListClass() {
        let url = global.defaultSettings.common.serviceBaseUrl+global.defaultSettings.common.api+'class/?code='+global.defaultSettings.common.schoolCode;
        fetch(url)
        .then((response) => response.json())
        .then((responseData) => {
            let listClass = this.formatListClass(responseData, this.column);
            this.setState({listClass: listClass});
            AsyncStorage.setItem('@Class:listCalss',JSON.stringify(responseData));
        });
    }
    formatListClass(list, column){
        let listClass = list;
        let n = list.length % column;
        if(n != 0){
            for(let i = 0; i<(column - n); i++){
                listClass.push({isNull: true});
            }
        }
        return listClass;
    }
    onPressItemClass(code, index) {
        this.props.navigator.push({
            screen: 'app.StudentsScreen',
            title: global.isCheckIn ? "CHECK-IN" : "CHECK-OUT",
            passProps: {
                classIndex: index,
                classCode: code
            },
            backButtonTitle: "Back"
        });
    }
    filterClass(text){
        let searchText = Helper.formatVietNamText(text);
        let data = this.state.listClass;
        let searchResult = data.filter((item)=>{
            if(item.Name)
                return Helper.formatVietNamText(item.Name+' '+item.Code).indexOf(searchText) >= 0;
        });
        //searchResult = this.formatListClass(searchResult, 3);
        this.setState({searchText: searchText, searchResult: this.formatListClass(searchResult, this.column)});
    }
    keyExtractor = (item, index) => index;
    render () {
        return (
           <ScrollView>
            <View style={styles.component}>
                <View style={[styles.classContainer,{minHeight: this.window.height - 150}]}>
                    {/* <SearchClass filterClass={(text)=>this.filterClass(text)}/> */}
                    <FlatList 
                        data={(this.state.searchText !== '' && this.state.searchResult)?this.state.searchResult:this.state.listClass}
                        extraData={this.state}
                        keyExtractor={this.keyExtractor}
                        numColumns={this.column}
                        renderItem={({ item, index }) => <ItemClass item={item} index={index} onPressItem={(code, index)=>this.onPressItemClass(code, index)} />}
                        initialListSize={this.state.listClass.length}
                    />
                </View>
            </View>
            <FooterComponent />
           </ScrollView>
        )
    }
}

// const mapStateToProps = (state, ownProps) => {
//     return {
//         prop: state.prop
//     }
// }

// const mapDispatchToProps = (dispatch, ownProps) => {
//     return {
//         runApp: () => {
//             dispatch(runApplication())
//         }
//     }
// }
// export default connect(mapStateToProps, mapDispatchToProps)(ListClass);