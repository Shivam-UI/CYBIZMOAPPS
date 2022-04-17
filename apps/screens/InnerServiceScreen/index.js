import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, Image, ScrollView, FlatList, StyleSheet, Dimensions } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

const DATAUSERS = [
    {
        id: 1,
        name: 'Best Repair Services',
        logo: require('../../../assets/images/32.jpg'),
        like: require('../../../assets/images/icons/like.png'),
        categoryTitle: 'Company Name Goes Here',
        reviewed: '10 Reviewd',
        visited: '10K Visited',
        categoryName: 'Category Goes Here',
        location: 'Los Angeles, California',
        isOnline: true,
    }, {
        id: 1,
        name: 'Best Repair Services',
        logo: require('../../../assets/images/33.png'),
        like: require('../../../assets/images/icons/like.png'),
        categoryTitle: 'Company Name Goes Here',
        reviewed: '10 Reviewd',
        visited: '10K Visited',
        categoryName: 'Category Goes Here',
        location: 'Los Angeles, California',
        isOnline: true,
    }, {
        id: 1,
        name: 'Best Repair Services',
        logo: require('../../../assets/images/34.jpg'),
        like: require('../../../assets/images/icons/like.png'),
        categoryTitle: 'Company Name Goes Here',
        reviewed: '10 Reviewd',
        visited: '10K Visited',
        categoryName: 'Category Goes Here',
        location: 'Los Angeles, California',
        isOnline: true,
    }, {
        id: 1,
        name: 'Best Repair Services',
        logo: require('../../../assets/images/35.jpg'),
        like: require('../../../assets/images/icons/like.png'),
        categoryTitle: 'Company Name Goes Here',
        reviewed: '10 Reviewd',
        visited: '10K Visited',
        categoryName: 'Category Goes Here',
        location: 'Los Angeles, California',
        isOnline: true,
    }
];

const InnerSingleServices = () => {

    const navigation = useNavigation();
    const routes = useRoute();
    console.log(routes.params);


    return (
        <SafeAreaView>
            <View>
                <View style={{ flexDirection: 'row', height: 55, alignItems: 'center', backgroundColor: '#00CCff' }}>
                    <TouchableOpacity style={{ marginLeft: 15 }} onPress={() => navigation.goBack()}>
                        <Image source={require('../../../assets/images/hamburger_menu.png')} style={{ width: 25, height: 25, marginRight: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                    </TouchableOpacity>
                    <View style={{ flex: 1 }}>
                        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 15, color: '#FFFFFF' }}>{routes.params.categoryName}</Text>
                    </View>
                    <TouchableOpacity >
                        <Image source={require('../../../assets/images/search_icon.png')} style={{ width: 25, height: 25, marginRight: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{}} onPress={() => navigation.navigate('NotifictionScreen')} >
                        <Image source={require('../../../assets/images/bell_icon.png')} style={{ width: 25, height: 25, marginRight: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                    </TouchableOpacity>
                </View>
                <View style={{ padding: 15, backgroundColor: '#FFFFFF', height: '100%' }}>
                    <View style={{ flexDirection: 'row', backgroundColor: '#FFFFFF', padding: 10, alignItems: 'center' }} >
                        <View style={{ flexDirection: 'column', alignItems: 'center', alignSelf: 'center', }}>
                            <Image style={{ width: 110, height: 110, resizeMode: 'cover', alignSelf: 'center', alignItems: 'center', borderRadius: 60 }} source={routes.params.logo} />
                        </View>
                        <View style={{ backgroundColor: '#ffffff', flex: 1, padding: 15 }}>
                            <Text style={[styles.title, { color: '#00CCFF' }]} >{routes.params.categoryTitle}</Text>
                            <Text style={[styles.title, { color: '#000000', fontWeight: 'bold', fontSize: 15 }]} >{routes.params.categoryTitle}</Text>
                            <View style={{ flexDirection: 'row', }}>
                                <Image style={{ width: 45, height: 20, resizeMode: 'contain', alignSelf: 'flex-end', alignItems: 'center', tintColor: '#00CCFF', marginRight: 5 }} source={require('../../../assets/images/icons/review.png')} />
                                <Text style={[styles.title, { color: '#AAAAAA' }]} >{routes.params.reviewed}</Text>
                            </View>
                            <Text style={[styles.title, { color: '#AAAAAA' }]} >{routes.params.categoryName}</Text>
                            <View style={{ flexDirection: 'row', }}>
                                <Image style={{ width: 20, height: 20, resizeMode: 'contain', alignSelf: 'flex-end', alignItems: 'center', marginBottom: 20, tintColor: '#00CCFF' }} source={require('../../../assets/images/pin_icon.png')} />
                                <Text style={[styles.title, { color: '#AAAAAA' }]} >{routes.params.location}</Text>
                            </View>
                        </View>
                        <View style={{ marginRight: 10 }}>
                            <Image style={{ width: 30, height: 30, resizeMode: 'contain', alignSelf: 'flex-end', alignItems: 'center', marginBottom: 20 }} source={routes.params.like} />
                            <View style={{ flexDirection: 'row', }}>
                                <Image style={{ width: 20, height: 20, resizeMode: 'contain', alignItems: 'center', marginRight: 5 }} source={require('../../../assets/images/icons/eyes_icon.png')} />
                                <Text style={{ color: '#AAAAAA', fontWeight: 'bold' }}>{routes.params.visited}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                        <View style={{ width: Dimensions.get('screen').width / 3, alignItems: 'center' }}>
                            <Text style={{ fontWeight: 'bold', color: '#AAAAAA' }}>200 people</Text>
                        </View>
                        <View style={{ width: Dimensions.get('screen').width / 3, alignItems: 'center' }}>
                            <Text style={{ fontWeight: 'bold', color: '#AAAAAA' }}>200 Following</Text>
                        </View>
                        <View style={{ width: Dimensions.get('screen').width / 3, alignItems: 'center' }}>
                            <Text style={{ fontWeight: 'bold', color: '#AAAAAA' }}>200 Followers</Text>
                        </View>
                    </View>
                    <View>
                        <TouchableOpacity style={{ backgroundColor: '#00CCFF', padding: 20, alignItems: 'center', marginTop: 20 }}>
                            <Text style={{ fontWeight: 'bold', alignItems: 'center', color: '#FFFFFF', fontSize: 15, letterSpacing: 3 }}>FOLLOW</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
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
        fontSize: 12,
        fontWeight: '600',
        textTransform: 'capitalize',
        marginBottom: 5,
        flex: 1
    }
});

export default InnerSingleServices;