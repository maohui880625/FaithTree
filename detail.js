/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';

export default class detail extends Component {
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this._pressBackButton.bind(this)}>
                    <Text style={styles.back}>返回</Text>
                </TouchableOpacity>
                <Text style={styles.text}>{this.props.productTitle}</Text>
            </View>
        );
    }

    _pressBackButton(){
        const {navigator}=this.props;
        if(navigator){
            navigator.pop();
        }
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e8ffd8',
    },
    text: {
        fontSize: 20
    },
    back:{
      fontSize:20,
      color:'#0f10ff'
    }
});