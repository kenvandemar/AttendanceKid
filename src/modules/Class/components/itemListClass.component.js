import React, { Component } from 'react';
import { 
    View, 
    Text,
    TextInput,
    TouchableOpacity
} from 'react-native';
import {ItemClassStyles as styles} from '../../../styles/styles.module.class';
// import { runApplication } from '../../actions/appActions';
import {CachedImage} from "react-native-img-cache";

export default class ItemClass extends Component {

    constructor(props){
        super(props);
        this.state = {
            widthItem: null,
        }
    }

    componentDidMount() {
    }
    
    render () {
        if(!this.props.item.isNull)
            return (
                <TouchableOpacity 
                    style={styles.component}
                    onPress={()=>this.props.onPressItem(this.props.item.Code, this.props.index)}
                    onLayout={(event) => {
                        // console.log(event.nativeEvent.layout);
                        this.setState({widthItem: event.nativeEvent.layout.width});
                        // var {x, y, width, height} = event.nativeEvent.layout;
                    }}>
                    <View style={[styles.itemThumb,{width: this.state.widthItem, height: this.state.widthItem}]} >
                        <CachedImage
                            style={{width: this.state.widthItem, height:this.state.widthItem, borderRadius: 8}} 
                            resizeMode="cover"
                            source={{uri: global.defaultSettings.common.serviceBaseUrl + global.defaultSettings.common.api + 'ClassResource/' + this.props.item.Avatar}}
                        />
                    </View> 
                    <Text style={styles.itemTitle}>{this.props.item.Name}</Text>
                </TouchableOpacity>
            )
        else
            return (
                <View style={styles.component} 
                    onLayout={(event) => {
                        // console.log(event.nativeEvent.layout);
                        this.setState({widthItem: event.nativeEvent.layout.width});
                        // var {x, y, width, height} = event.nativeEvent.layout;
                    }}>
                    <View style={{width: this.state.widthItem, height: this.state.widthItem}} />
                </View>
            )
    }
}

// export default connect(mapStateToProps, mapDispatchToProps)(ListClass);