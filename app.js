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
    Image
} from 'react-native';

const ds = new ListView.DataSource({//创建ListView.DataSource数据源
    rowHasChanged: (r1, r2) => r1 !== r2
});
const circleSize = 8;
const circleMargin = 5;

export default class app extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 0,
            searchText: '',
            advertisements: [
                {
                    url: require('./images/1.png'),
                },
                {
                    url: require('./images/2.png'),
                },
                {
                    url: require('./images/3.png'),
                },
                {
                    url: require('./images/4.png'),
                }
            ],
            dataSource: ds.cloneWithRows([
                {
                    image: require('./images/flag.jpg'),
                    title: '活动1',
                    subTitle: '描述1'
                },
                {
                    image: require('./images/flag.jpg'),
                    title: '活动2',
                    subTitle: '描述2'
                },
                {
                    image: require('./images/flag.jpg'),
                    title: '活动3',
                    subTitle: '描述3'
                },
                {
                    image: require('./images/flag.jpg'),
                    title: '活动4',
                    subTitle: '描述4'
                },
                {
                    image: require('./images/flag.jpg'),
                    title: '活动5',
                    subTitle: '描述5'
                },
                {
                    image: require('./images/flag.jpg'),
                    title: '活动6',
                    subTitle: '描述6'
                },
                {
                    image: require('./images/flag.jpg'),
                    title: '活动7',
                    subTitle: '描述7'
                },
                {
                    image: require('./images/flag.jpg'),
                    title: '活动8',
                    subTitle: '描述8'
                },
                {
                    image: require('./images/flag.jpg'),
                    title: '活动9',
                    subTitle: '描述9'
                },
                {
                    image: require('./images/flag.jpg'),
                    title: '活动10',
                    subTitle: '描述10'
                }
            ])
        };

    }

    render() {
        const advertisementCount = this.state.advertisements.length;//指示器圆点的个数
        const indicatorWidth = circleSize * advertisementCount + circleMargin * advertisementCount * 2;//计算指示器的宽度
        const left = (Dimensions.get('window').width - indicatorWidth) / 2;//计算指示器最左边的坐标位置
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor={'#ff2c45'} barStyle={'default'} networkActivityIndicatorVisible={true}/>
                <View style={styles.searchbar}>
                    <TextInput style={styles.input} placeholder='搜索' underlineColorAndroid='#ffffff'
                               onChangeText={(text) => {
                                   this.setState({searchText: text});
                                   console.log('搜索内容' + this.state.searchText);
                               }} inlineImageLeft=''/>
                    <Button style={styles.button} title='搜索'
                            onPress={() => Alert.alert('搜索内容' + this.state.searchText, '是的',
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
                                            <Image style={styles.advertisementContent} source={advertisement.url}/>
                                        </TouchableHighlight>
                                    );
                                }
                            )
                        }
                    </ScrollView>

                    <View style={[styles.indicator, {left: left}]}>
                        {
                            this.state.advertisements.map((advertisement, index) => {
                                return (
                                    <View key={index}
                                          style={(index === this.state.currentPage) ? styles.circleSelected : styles.circle}/>
                                );
                            })
                        }
                    </View>
                </View>
                <View style={styles.products}>
                    <ListView dataSource={this.state.dataSource} renderRow={this._renderRow} renderSeparator={this._renderSeperator}/>
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
                    <Image source={rowData.image} style={styles.productImage}/>
                    <View style={styles.productText}>
                        <Text style={styles.productTitle}>{rowData.title}</Text>
                        <Text style={styles.productSubTitle}>{rowData.subTitle}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }

    _renderSeperator(sectionID,rowID,adjacentRowHighLighted){
        return(
            <View key={'${sectionID}-${rowID}'} style={styles.divider}/>
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
        borderColor: '#281f18',
        borderWidth: 2,
        borderRadius: 10
    },
    button: {
        flex: 1
    },
    advertisement: {},
    advertisementContent: {
        width: Dimensions.get('window').width,
        height: 180,
    },
    indicator: {
        position: 'absolute',
        top: 160,
        flexDirection: 'row'
    },
    circle: {
        width: circleSize,
        height: circleSize,
        borderRadius: circleSize / 2,
        backgroundColor: '#3f4444',
        marginHorizontal: circleMargin
    },
    circleSelected: {
        width: circleSize,
        height: circleSize,
        borderRadius: circleSize / 2,
        backgroundColor: '#fff',
        marginHorizontal: circleMargin
    },
    products: {
        flex: 1
    },
    row: {
        height: 60,
        flexDirection: 'row',
    },
    productImage: {
        marginLeft: 10,
        marginRight: 10,
        alignSelf: 'center',
        width: 40,
        height: 30
    },
    productText: {
        flex: 1,
        marginTop: 10,
        marginBottom: 10
    },
    productTitle: {
        flex: 3,
        fontSize: 16
    },
    productSubTitle: {
        flex: 2,
        fontSize: 14,
        color: '#7d918d'
    },
    divider:{
        height:1,
        width:Dimensions.get('window').width - 10,
        marginLeft:5,
        backgroundColor:'#7d918d'
    }
});
