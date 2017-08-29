/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    Button,
    ScrollView,
    ListView,
    View,
    Alert,
    Dimensions,//用于获取屏幕的宽高
    Platform,//用于判断是ios还是Android
    TouchableHighlight,//按下高亮控件
    StatusBar,//状态栏控件
} from 'react-native';

const ds = new ListView.DataSource({//创建ListView.DataSource数据源
    rowHasChanged: (r1, r2) => r1 !== r2
});

export default class app extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 0,
            searchText: '',
            advertisements: [
                {
                    title: '广告1',
                    backgroundColor: '#72fffd'
                },
                {
                    title: '广告2',
                    backgroundColor: '#cc56ff'
                },
                {
                    title: '广告3',
                    backgroundColor: '#ff7aab'
                },
                {
                    title: '广告4',
                    backgroundColor: '#ff3253'
                }
            ],
            dataSource: ds.cloneWithRows([
                '活动1',
                '活动2',
                '活动3',
                '活动4',
                '活动5',
                '活动6',
                '活动7',
                '活动8',
                '活动9',
                '活动10'
            ])
        };

    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor={'green'} barStyle={'default'} networkActivityIndicatorVisible={true}/>
                <View style={styles.searchbar}>
                    <TextInput style={styles.input} placeholder='搜索' underlineColorAndroid='#ffffff'
                               onChangeText={(text)=>{this.setState({searchText:text});
                               console.log('搜索内容'+this.state.searchText);
                               }} inlineImageLeft=''/>
                    <Button style={styles.button} title='搜索' onPress={() => Alert.alert('搜索内容'+this.state.searchText, '是的',
                        [
                            {text: '稍后询问', onPress: () => console.log('稍后询问')},
                            {text: '取消', onPress: () => console.log('取消'), style: 'cancel'},
                            {text: '确定', onPress: () => console.log('确定')},
                        ],
                        {cancelable: false})}//点击对话框外是否允许关闭
                    />
                </View>
                <View style={styles.advertisement}>
                    <ScrollView ref="scrollView"
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                pagingEnabled={true}>
                        {
                            this.state.advertisements.map((advertisement, index) => {
                                    return (
                                        <TouchableHighlight key={index} onPress={() => Alert.alert('你单击了轮播图', null, null)}>
                                            <Text
                                                style={[styles.advertisementContent, {backgroundColor: advertisement.backgroundColor}]}>{advertisement.title}</Text>
                                        </TouchableHighlight>
                                    );
                                }
                            )
                        }

                    </ScrollView>
                </View>
                <View style={styles.products}>
                    <ListView dataSource={this.state.dataSource} renderRow={this._renderRow}/>
                </View>
            </View>
        );
    }

    componentDidMount() {
        this._startTimer();
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    _startTimer() {
        this.interval = setInterval(() => {//使用setInterval()创建定时器
            nextPage = this.state.currentPage + 1;
            if (nextPage >= 4) {
                nextPage = 0;//如果已经最后一页，下次返回到第一页
            }
            this.setState({currentPage: nextPage});//更新this.state中currentPage的值
            const offSetX = nextPage * Dimensions.get('window').width;
            this.refs.scrollView.scrollResponderScrollTo({x: offSetX, y: 0, animated: true});
        }, 2000);
    }

    _renderRow = (rowData, sectionID, rowID) => {
        return (
            <TouchableHighlight onPress={() => Alert.alert('你单击了活动列表', null, null)} underlayColor={'yellow'}>
                <View style={styles.row}>
                    <Text>{rowData}</Text>
                </View>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    searchbar: {
        marginTop: Platform.OS === 'ios' ? 20 : 0,
        height: 40,
        backgroundColor: '#ffffff',
        flexDirection: 'row'
    },
    input: {
        flex: 1,
        borderColor: '#ffffff',
        borderWidth: 2
    },
    button: {
        flex: 1
    },
    advertisement: {},
    advertisementContent: {
        width: Dimensions.get('window').width,
        height: 180,
    },
    products: {
        flex: 1
    },
    row: {
        height: 60,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
