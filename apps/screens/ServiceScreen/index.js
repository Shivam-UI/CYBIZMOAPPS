import React from 'react';
import { SafeAreaView, View, Text, FlatList, Dimensions, Image, ScrollView, TouchableOpacity, StyleSheet, StatusBar, AsyncStorage } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { HOME_SERVICE_VIEW } from '../../../configApi';
import Carousel from 'react-native-banner-carousel';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const BannerWidth = Dimensions.get('window').width - 20;
const BannerHeight = 200;

const DATADUMMYCATEGORY = [
    {
        id: 4,
        icon: require('../../../assets/images/icons/business_services.png'),
        categoryName: 'Business Services',
        clickEvent: 'BusinessServices',
    }, {
        id: 4,
        icon: require('../../../assets/images/icons/rentals.png'),
        categoryName: 'Rentals',
        clickEvent: 'BusinessServices',
    }, {
        id: 4,
        icon: require('../../../assets/images/icons/events.png'),
        categoryName: 'Community Events',
        clickEvent: 'BusinessServices',
    }
];

const PRODUCTLIST = [
    {
        id: 1,
        image: require('../../../assets/images/1.jpg'),
        name: 'Title Goes Here',
        price: '45',
    }, {
        id: 1,
        image: require('../../../assets/images/3.jpg'),
        name: 'Title Goes Here',
        price: '45',
    }, {
        id: 1,
        image: require('../../../assets/images/4.jpg'),
        name: 'Title Goes Here',
        price: '45',
    }
];


const ServiceScreen = () => {

    const navigation = useNavigation();
    const [isLodingDone, setLoadingDone] = React.useState(false);
    const [SliderList, setSliderList] = React.useState([]);
    const [CategoryList, setCategoryList] = React.useState([]);
    const [TrendingServices, setTrendingServices] = React.useState([]);
    const [FeaturedServices, setFeaturedServices] = React.useState([]);
    const [LatestServices, setLatestServices] = React.useState([]);

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setLoadingDone(true);
            getCategoryData();
        });
        return unsubscribe;
    }, [navigation]);

    async function getCategoryData() {
        setLoadingDone(true);
        const LocationRadiouskey = await AsyncStorage.getItem('@MySuperStore:LocationRadiouskey');
        const SkipType = await AsyncStorage.getItem('@MySuperStore:SkipType');
        const location = await AsyncStorage.getItem('@MySuperStore:Locationkey');

        if (!location) {
            navigation.navigate('MapLocationChoose');
        }

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

            console.log('SERVICE_SCREEN_API', JSON.stringify(body))


            axios({
                method: "POST",
                url: HOME_SERVICE_VIEW,
                data: body,
                headers: {
                    'x-api-key': '$2y$10$sSVsoEEO5gz6EYzD3wtrbexWtR3sdzv/OFKAC.UPFoGUekAb8jjB2',
                }
            })
                .then(function (response) {
                    console.log('response_services: ', JSON.stringify(response.data));
                    if (response.data.status === true) {
                        console.log('response: ', JSON.stringify(response.data));
                        setSliderList(response.data.slider_list);
                        setCategoryList(response.data.category_list);
                        setTrendingServices(response.data.trending_services);
                        setFeaturedServices(response.data.featured_services);
                        setLatestServices(response.data.latest_services);
                        setLoadingDone(false);
                    } else {
                        Alert.alert(response.data.message);
                        setLoadingDone(false);
                    }
                })
                .catch(function (error) {
                    setLoadingDone(false);
                    console.log('error: ', error);
                });
        }

    }

    const renderPage = (image, index) => {
        return (
            <View key={index}>
                <Image style={{ width: BannerWidth, height: BannerHeight, borderRadius: 0 }} source={image.images} />
            </View>
        );
    }

    const renderCategorys = (items) => {

        console.log('renderCategorys', items)

        return (
            <TouchableOpacity style={{ width: Dimensions.get('screen').width / 4 - 4 }} onPress={() => navigation.navigate('ServiceCateSinglePage', items)} >
                <View style={{ height: 80, flexDirection: 'column', padding: 20, alignItems: 'center', alignSelf: 'center', borderWidth: 1, margin: 5, borderColor: '#AAAAAA', borderRadius: 4 }}>
                    <Image style={{ width: 40, height: 40, overflow: 'hidden', resizeMode: 'contain', alignSelf: 'center', alignItems: 'center' }} source={{ uri: items.android_image }} />
                </View>
                <View style={{ backgroundColor: '#ffffff', }}>
                    <Text style={styles.title} >{items.category_name}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    const slides = [
        {
            id: '1',
            images: require('../../../assets/images/img.jpg')
        }, {
            id: '2',
            images: require('../../../assets/images/26.jpg')
        }, {
            id: '3',
            images: require('../../../assets/images/17.jpg')
        }
    ];

    const renderBannerSingle = (items) => {

        console.log('renderBannerSingle: ', items)

        return (
            <TouchableOpacity style={{ alignContent: 'center', padding: 5 }} onPress={() => navigation.navigate('ServiceSubCategory', items)} >
                <Image style={{ width: 140, height: 140, resizeMode: 'cover', borderRadius: 0 }} source={{ uri: items.android_image === '' ? 'https://howandwhat.net/wp-content/uploads/2017/08/Service.jpg' : '' }} />
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ marginTop: 10 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 15 }}>{items.business_name}</Text>
                    </View>
                    {/* <View>
                        <Text style={{ fontWeight: 'bold', fontSize: 26, }}>${items.price}</Text>
                    </View> */}
                </View>
            </TouchableOpacity>
        )
    }

    const renderBlog = (items) => {

        return (
            <TouchableOpacity style={{ alignContent: 'center', padding: 5 }}>
                <Image style={{ width: 140, height: 140, resizeMode: 'cover', borderRadius: 0 }} source={items.image} />
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ marginTop: 5 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 14 }}>{items.name}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView>
            <StatusBar barStyle={'dark-content'} backgroundColor={'#00CCFF'} />
            <Spinner
                visible={isLodingDone}
                textContent={'Loading...'}
                textStyle={{ color: '#FFF' }}
            />
            <View style={{ flexDirection: 'row', height: 55, alignItems: 'center', backgroundColor: '#00CCff' }}>
                <TouchableOpacity onPress={() => navigation.openDrawer()} style={{ marginLeft: 15 }}>
                    <Image source={require('../../../assets/images/hamburger_menu.png')} style={{ width: 25, height: 25, marginRight: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                </TouchableOpacity>
                <View style={{ flex: 1 }}>
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 15, color: '#FFFFFF' }}>Service</Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('SearchSingle')}>
                    <Image source={require('../../../assets/images/search_icon.png')} style={{ width: 25, height: 25, marginRight: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                </TouchableOpacity>
                <TouchableOpacity style={{}} onPress={() => navigation.navigate('NotifictionScreen')} >
                    <Image source={require('../../../assets/images/bell_icon.png')} style={{ width: 25, height: 25, marginRight: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                </TouchableOpacity>
            </View>
            <ScrollView contentInsetAdjustmentBehavior="automatic" >
                <View style={{ backgroundColor: '#FFFFFF', flex: 0 }}>
                    <View style={{ padding: 10 }}>
                        <Carousel
                            autoplay
                            autoplayTimeout={50000}
                            loop
                            index={0}
                            pageSize={BannerWidth} >
                            {slides.map((image, index) => renderPage(image, index))}
                        </Carousel>
                    </View >
                    <View style={{ justifyContent: 'center', marginTop: 0, padding: 10 }}>
                        <FlatList
                            data={CategoryList}
                            numColumns={4}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => renderCategorys(item)}
                        />
                    </View>
                    <View style={{ flexDirection: 'column', backgroundColor: '#fbfbfb', padding: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontWeight: 'bold' }}>Trending Service Provider</Text>
                            <View style={{ flex: 1 }}></View>
                            <Image style={{ width: 25, height: 25 }} source={require('../../../assets/images/icons/right_arrow.png')} />
                        </View>
                        <FlatList
                            horizontal
                            data={PRODUCTLIST}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => renderBannerSingle(item)}
                        />
                    </View>
                    <View style={{ flexDirection: 'column', backgroundColor: '#ffffff', padding: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontWeight: 'bold' }}>Featured Service Provider</Text>
                            <View style={{ flex: 1 }}></View>
                            <Image style={{ width: 25, height: 25 }} source={require('../../../assets/images/icons/right_arrow.png')} />
                        </View>
                        <FlatList
                            horizontal
                            data={PRODUCTLIST}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => renderBannerSingle(item)}
                        />
                    </View>
                    <View style={{ flexDirection: 'column', backgroundColor: '#ffffff', padding: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontWeight: 'bold' }}>Latest Service</Text>
                            <View style={{ flex: 1 }}></View>
                            <Image style={{ width: 25, height: 25 }} source={require('../../../assets/images/icons/right_arrow.png')} />
                        </View>
                        <FlatList
                            horizontal
                            data={LatestServices}
                            keyExtractor={item => item.tbl_business_services_id}
                            renderItem={({ item }) => renderBannerSingle(item)}
                        />
                    </View>
                    <View style={{ flexDirection: 'column', backgroundColor: '#ffffff', padding: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontWeight: 'bold' }}>Recently Added Service</Text>
                            <View style={{ flex: 1 }}></View>
                            <Image style={{ width: 25, height: 25 }} source={require('../../../assets/images/icons/right_arrow.png')} />
                        </View>
                        <FlatList
                            horizontal
                            data={PRODUCTLIST}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => renderBannerSingle(item)}
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

export default ServiceScreen;