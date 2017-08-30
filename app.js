/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    Navigator
} from 'react-native-deprecated-custom-components';//react-native 0.43不支持从react-native中获取Navigator
import Home from './home';

export default class app extends Component {
    render() {
        return (
            <Navigator initialRoute={{name: 'home', component: Home}}
                       configureScene={(route) => {
                           return Navigator.SceneConfigs.FloatFromRight;
                       }}
                       renderScene={(route, navigator) => {
                           const Component = route.component;
                           return <Component {...route.params} navigator={navigator}/>
                       }}
            />
        );
    }
}
