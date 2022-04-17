import React from 'react';
import {
    SafeAreaView, View, Text, FlatList, Dimensions, Image,
    ScrollView, TouchableOpacity, StyleSheet, StatusBar, AsyncStorage
} from 'react-native';
import Carousel from 'react-native-banner-carousel';
import Spinner from 'react-native-loading-spinner-overlay';
import { useNavigation } from '@react-navigation/native';
import { HOME_VIEW_API, BLOG_CATEGORY_LIST } from '../../../configApi';
import axios from 'axios';

const BannerWidth = Dimensions.get('window').width - 20;
const BannerHeight = 200;

const HomeScreen = () => {

    const navigation = useNavigation();
    const [isLodingDone, setLoadingDone] = React.useState(false);
    const [CategoryData, setCategoryData] = React.useState([]);
    const [SliderData, setSliderData] = React.useState([]);
    const [TerndingData, setTerndingData] = React.useState([]);
    const [FeaturedData, setFeaturedData] = React.useState([]);
    const [FleaData, setFleaData] = React.useState([]);
    const [ServiceData, setServiceData] = React.useState([]);
    const [BlogListData, setBlogsCategoryData] = React.useState([]);

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setLoadingDone(true);
            getCategoryData();
            getBlogCategorys();
        });
        return unsubscribe;
    }, [navigation]);

    async function getBlogCategorys() {

        if (true) {
            axios({
                method: "GET",
                url: BLOG_CATEGORY_LIST,
                // data: body,
                headers: {
                    'x-api-key': '$2y$10$sSVsoEEO5gz6EYzD3wtrbexWtR3sdzv/OFKAC.UPFoGUekAb8jjB2',
                }
            })
                .then(function (response) {
                    //handle success
                    if (response.data.status === true) {
                        // console.log('BLOG_CATEGORY_LIST: ', JSON.stringify(response.data));
                        setBlogsCategoryData(response.data.data)
                        setLoadingDone(false);
                    } else {
                        Alert.alert(response.data.message);
                        setLoadingDone(false);
                    }
                })
                .catch(function (error) {
                    setLoadingDone(false);
                    console.log('error: ', error);
                }
                );
        }
    }

    async function getCategoryData() {

        const LocationRadiouskey = await AsyncStorage.getItem('@MySuperStore:LocationRadiouskey');
        const SkipType = await AsyncStorage.getItem('@MySuperStore:SkipType');
        const location = await AsyncStorage.getItem('@MySuperStore:Locationkey');

        if (!location) {
            navigation.navigate('MapLocationChoose');
        }

        setLoadingDone(true);

        const value = await AsyncStorage.getItem('@MySuperStore:key');
        
        if (true) {
            var body = new FormData();
            if (SkipType === 'Location') {
                body.append('latitude', '26.8467088');
                body.append('longitude', '80.9461592');
                body.append('radius', '' + LocationRadiouskey);
            }
            if (SkipType === 'City') {
                body.append('userid', '' + value);
                body.append('city', '' + location);
            }
            if (SkipType === 'Pincode') {
                body.append('pincode', '' + location);
            }

            console.log('HOME_VIEW_API', JSON.stringify(body))

            axios({
                method: "POST",
                url: HOME_VIEW_API,
                data: body,
                headers: {
                    'x-api-key': '$2y$10$sSVsoEEO5gz6EYzD3wtrbexWtR3sdzv/OFKAC.UPFoGUekAb8jjB2',
                }
            })
                .then(function (response) {
                    if (response.data.status === true) {
                        console.log('home_response: ', JSON.stringify(response));
                        setSliderData(response.data.slider_list);
                        setCategoryData(response.data.category_list);
                        setTerndingData(response.data.trending_products);
                        setFeaturedData(response.data.featured_products);
                        setFleaData(response.data.latest_in_flea);
                        setServiceData(response.data.service_provider);
                        setLoadingDone(false);
                    } else {
                        Alert.alert(response.data.message);
                        setLoadingDone(false);
                    }
                })
                .catch(function (error) {
                    setLoadingDone(false);
                    // console.log('error: ', error);
                });
        }

    }

    const renderPage = (image, index) => {

        // console.log(image);

        return (
            <View key={index}>
                <Image style={{ width: BannerWidth, height: BannerHeight, borderRadius: 0 }} source={{ uri: image.android_image }} />
            </View>
        );
    }

    const renderCategorys = (items) => {

        return (
            <TouchableOpacity
                style={{ width: Dimensions.get('screen').width / 4 - 4 }}
                onPress={() => navigation.navigate('InnerCategory', items)} >
                <View style={{ height: 80, flexDirection: 'column', padding: 20, alignItems: 'center', alignSelf: 'center', borderWidth: 1, margin: 5, borderColor: '#AAAAAA', borderRadius: 4 }}>
                    <Image style={{ width: 40, height: 40, overflow: 'hidden', resizeMode: 'contain', alignSelf: 'center', alignItems: 'center' }} source={{ uri: items.android_image }} />
                </View>
                <View style={{ backgroundColor: '#ffffff', }}>
                    <Text style={styles.title} numberOfLines={1} >{items.category_name}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    const renderBannerSingle = (items) => {

        return (
            <TouchableOpacity
                onPress={() => navigation.navigate('ProductSingle', items)}
                style={{
                    alignSelf: 'center', padding: 5, shadowColor: "#aaaaaa",
                    shadowOpacity: 0.8,
                    shadowRadius: 2,
                    shadowOffset: {
                        height: 1,
                        width: 1
                    },
                    backgroundColor: '#ffffff',
                    margin: 4,
                }}>
                <Image
                    style={{ width: 140, height: 140, resizeMode: 'cover', borderRadius: 0 }}
                    source={{ uri: items.android_image }} />
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: 80, marginTop: 5 }}>
                        <Text numberOfLines={1} style={{ fontWeight: 'bold', fontSize: 15, textTransform: 'capitalize' }}>{items.product_name.substring(0, 25)}</Text>
                    </View>
                    <View>
                        <Text numberOfLines={1} style={{ fontWeight: 'bold', fontSize: 24 }}>${items.price}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    const renderBlog = (items) => {

        return (
            <TouchableOpacity onPress={() => navigation.navigate('BlogSingle', items)} style={{
                alignContent: 'center', padding: 5, shadowColor: "#aaaaaa",
                shadowOpacity: 0.8,
                shadowRadius: 2,
                shadowOffset: {
                    height: 1,
                    width: 1
                },
                backgroundColor: '#ffffff',
                margin: 4,
            }}>
                <Image style={{ width: 140, height: 140, resizeMode: 'cover', borderRadius: 0 }} source={{ uri: items.android_image }} />
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ marginTop: 5 }}>
                        <Text numberOfLines={1} style={{ fontWeight: 'bold', fontSize: 14, textTransform: 'capitalize' }}>{items.category_name}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    
    return (
        <SafeAreaView>
            <StatusBar barStyle={'dark-content'} backgroundColor={'#00CCFF'} />
            <ScrollView contentInsetAdjustmentBehavior="automatic" >
                <Spinner
                    visible={isLodingDone}
                    textContent={'Loading...'}
                    textStyle={{ color: '#FFF' }}
                />
                <View style={{ backgroundColor: '#FFFFFF', flex: 0 }}>
                    <View style={{ padding: 10 }}>
                        <Carousel
                            autoplay
                            autoplayTimeout={50000}
                            loop
                            index={0}
                            pageSize={BannerWidth} >
                            {SliderData.map((image, index) => renderPage(image, index))}
                        </Carousel>
                    </View >
                    <View style={{ justifyContent: 'center', marginTop: 0, padding: 10 }}>
                        <FlatList
                            data={CategoryData}
                            numColumns={4}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => renderCategorys(item)}
                        />
                    </View>
                    <View style={{ flexDirection: 'column', backgroundColor: '#fbfbfb', padding: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontWeight: 'bold' }}>Trending Products</Text>
                            <View style={{ flex: 1 }}></View>
                            <Image style={{ width: 25, height: 25 }} source={require('../../../assets/images/icons/right_arrow.png')} />
                        </View>
                        <FlatList
                            horizontal
                            data={TerndingData}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => renderBannerSingle(item)}
                        />
                    </View>
                    <View style={{ flexDirection: 'column', backgroundColor: '#ffffff', padding: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontWeight: 'bold' }}>Featured Products</Text>
                            <View style={{ flex: 1 }}></View>
                            <Image style={{ width: 25, height: 25 }} source={require('../../../assets/images/icons/right_arrow.png')} />
                        </View>
                        <FlatList
                            horizontal
                            data={FeaturedData}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => renderBannerSingle(item)}
                        />
                    </View>
                    <View style={{ flexDirection: 'column', backgroundColor: '#fbfbfb', padding: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontWeight: 'bold' }}>Latest Articles / Blog</Text>
                            <View style={{ flex: 1 }}></View>
                            <Image style={{ width: 25, height: 25 }} source={require('../../../assets/images/icons/right_arrow.png')} />
                        </View>
                        <FlatList
                            horizontal
                            data={BlogListData}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => renderBlog(item)}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    headingText: {
        fontWeight: 'bold',
        textAlign: 'left',
        color: '#AAA',
        marginTop: 15,
        fontSize: 16
    }, boxWithShadow: {
        flex: 1 / 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 1,
        elevation: 5,
        padding: 10,
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
        margin: 5,
        borderRadius: 10,
    }, title: {
        width: 90,
        fontSize: 12,
        fontWeight: '600',
        textTransform: 'capitalize',
        marginTop: 10,
        textAlign: 'center',
        marginBottom: 5,
        flex: 1
    }
});

export default HomeScreen;