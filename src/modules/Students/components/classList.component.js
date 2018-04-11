import React, { Component } from 'react';
import { 
    View, 
    Text, 
    ScrollView,
    TouchableOpacity,
    AsyncStorage,
    FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import {ClassComponentStyles as styles} from '../../../styles/styles.module.student';
import {CachedImage} from "react-native-img-cache";

export default class ClassListComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            listClass: [],
            listClassOnScroll: {
                contentOffset: {
                    x: 0
                }
            },
            nextArrow: true,
            backArrow: true
        }
        this.listClassComp;
        this.listClassOnScroll;
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
        if(this.props.classIndex <= 1){
            this.setState({backArrow: false})
        }
    }
    // componentWillReceiveProps(nextProps){
    //     console.log('check');
    //     if(this.props.classCode != nextProps.classCode){
    //         this.setState({classCode: nextProps.classCode});
    //         console.log(nextProps.classCode);
    //     }
    // }
    renderItem(item) {
        if(item.Name)
            return (
                <TouchableOpacity 
                    style={[styles.itemComponent, (this.props.classCode === item.Code) && styles.activeClassComponent]}
                    onPress={()=>{
                        this.setState({classCode: item.Code});
                        this.props.onPressItem(item.Code);
                    }}
                >
                    <View style={[styles.imgThumb, (this.props.classCode === item.Code) && styles.activeClassThumb]}>
                        <CachedImage
                            style={{width: '100%', height:'100%', borderRadius: 8, opacity: (this.props.classCode === item.Code)?1:0.5}} 
                            resizeMode="cover"
                            source={{uri: global.defaultSettings.common.serviceBaseUrl + global.defaultSettings.common.api + 'ClassResource/' + item.Avatar}}
                        />
                    </View>
                    
                    <Text style={[styles.className, (this.props.classCode === item.Code) && styles.activeClassName]}>{item.Name}</Text>
                </TouchableOpacity>
            );
    }

    getItemLayout = (data, index) => (
        { length: 130, offset: 130 * index, index }
      )
    keyExtractor = (item, index) => index;
    render () {
        return (
           <View style={styles.component}>
               <TouchableOpacity
                disabled={!this.state.backArrow}
                onPress={()=>{
                    let offsetIndex = this.state.listClassOnScroll.contentOffset.x - 400;
                    this.listClassComp.scrollToOffset({offset: offsetIndex});
                }}>
                    <Icon name="chevron-thin-left" size={50} color={!this.state.backArrow?'#E8E8E8':'#8C8C8C'} />
               </TouchableOpacity>
                <FlatList 
                    ref={ref => this.listClassComp = ref}
                    onScroll={({nativeEvent}) => {
                        this.setState({listClassOnScroll: nativeEvent})
                        let scrollIndex = nativeEvent.contentOffset.x + nativeEvent.layoutMeasurement.width;
                        if(scrollIndex >= nativeEvent.contentSize.width){
                            let offsetIndex = nativeEvent.contentSize.width - nativeEvent.layoutMeasurement.width;
                            this.listClassComp.scrollToOffset({offset: offsetIndex, animated: false});
                            this.setState({nextArrow: false});
                        }
                        else{
                            this.setState({nextArrow: true});
                        }
                        if(nativeEvent.contentOffset.x <= 0){
                            this.listClassComp.scrollToOffset({offset: 0, animated: false});
                            this.setState({backArrow: false});
                        }
                        else{
                            this.setState({backArrow: true});
                        }
                    }}
                    style={{flex:1}}
                    data={this.state.listClass}
                    extraData={this.state}
                    keyExtractor={this.keyExtractor}
                    horizontal={true}
                    initialScrollIndex={this.props.classIndex > 0?(this.props.classIndex-1):0}
                    renderItem={({ item }) => this.renderItem(item)}
                    getItemLayout={this.getItemLayout}
                    initialListSize={this.state.listClass.length}
                />
               <TouchableOpacity
                disabled={!this.state.nextArrow}
                onPress={()=>{
                    let offsetIndex = this.state.listClassOnScroll.contentOffset.x + 400;
                    this.listClassComp.scrollToOffset({offset: offsetIndex});
                }}>
                    <Icon name="chevron-thin-right" size={50} color={!this.state.nextArrow?'#E8E8E8':'#8C8C8C'} />
               </TouchableOpacity>
           </View>
        )
    }
}
