import React, { Component } from 'react';
import { 
    View, 
    Text,
    TextInput
} from 'react-native';
import {SearchClassStyles as styles} from '../../../styles/styles.module.class';
// import { runApplication } from '../../actions/appActions';

export default class SearchClass extends Component {

    constructor(props){
        super(props);
    }

    componentDidMount() {
    }
    
    render () {
        return (
            <View style={styles.component}>
                <TextInput 
                    clearButtonMode={'always'}
                    style={styles.inputComponent} 
                    placeholder='Tìm kiếm theo tên, mã lớp...'
                    // keyboardType='web-search'
                    returnKeyType='search'
                    onChangeText={(text)=>{this.props.filterClass(text)}}
                    // onEndEditing={()=>{
                    //     if(this.props.end)
                    // }}
                />
            </View>
        )
    }
}

// export default connect(mapStateToProps, mapDispatchToProps)(ListClass);