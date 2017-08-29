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
    Dimensions,//用于获取屏幕的宽高
    Platform,//用于判断是ios还是Android
} from 'react-native';

const ds = new ListView.DataSource({//创建ListView.DataSource数据源
    rowHasChanged: (r1, r2) => r1 !== r2
});

export default class app extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 0,
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
                <View style={styles.searchbar}>
                    <TextInput style={styles.input} placeholder='搜索' underlineColorAndroid='#ffffff'
                               inlineImageLeft=''/>
                    <Button style={styles.button} title='搜索'/>
                </View>
                <View style={styles.advertisement}>
                    <ScrollView ref="scrollView" horizontal={true} showsHorizontalScrollIndicator={false}
                                pagingEnabled={true}>
                        <Text style={{
                            width: Dimensions.get('window').width,
                            height: 180,
                            backgroundColor: 'gray'
                        }}>广告1</Text>
                        <Text style={{width: Dimensions.get('window').width, height: 180, backgroundColor: 'orange'}}>广告2</Text>
                        <Text style={{width: Dimensions.get('window').width, height: 180, backgroundColor: 'yellow'}}>广告3</Text>
                    </ScrollView>
                </View>
                <View style={styles.products}>
                    <ListView dataSource={this.state.dataSource} renderRow={this._renderRow}/>
                </View>
            </View>
        );
    }


    componentDidMount(){
        this._startTimer();
    }

    componentWillUnmount(){
        clearInterval(this.interval);
    }

    _startTimer(){
        this.interval = setInterval(()=>{//使用setInterval()创建定时器
            nextPage = this.state.currentPage + 1;
            if(nextPage>=3){
                nextPage=0;//如果已经最后一页，下次返回到第一页
            }
            this.setState({currentPage:nextPage});//更新this.state中currentPage的值
            const offSetX = nextPage *Dimensions.get('window').width;
            this.refs.scrollView.scrollResponderScrollTo({x:offSetX,y:0,animated:true});
        },2000);
    }

    _renderRow = (rowData, sectionID, rowID) => {
        return (
            <View style={styles.row}>
                <Text>{rowData}</Text>
            </View>
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
    advertisement: {
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
