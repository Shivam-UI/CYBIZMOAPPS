import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, Image, ScrollView, Dimensions, StyleSheet } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

const DATAUSERS = [
    {
        id: 1,
        name: 'Alex',
        userImages: require('../../../assets/images/27.jpeg'),
        messages: 'Lorem ipsum dolor sit amet, elit',
        time: 'just now',
        isOnline: true,
    }, {
        id: 2,
        name: 'Ronald',
        userImages: require('../../../assets/images/27.jpeg'),
        messages: 'Lorem ipsum dolor sit amet, adipiscing elit',
        time: 'just now',
        isOnline: false,
    }, {
        id: 3,
        name: 'Allie',
        userImages: require('../../../assets/images/27.jpeg'),
        messages: 'Lorem ipsum dolor sit amet, consectetur adipiscing.',
        time: 'just now',
        isOnline: true,
    }, {
        id: 4,
        name: 'Olive',
        userImages: require('../../../assets/images/27.jpeg'),
        messages: 'Lorem ipsum dolor sit amet, consectetur.',
        time: 'just now',
        isOnline: false,
    }
];

const BusinessServices = () => {

    const navigation = useNavigation();
    const routes = useRoute();
    console.log(routes.params);

    const renderCategorys = (items) => {

        return (
            <TouchableOpacity onPress={() => navigation.navigate('SingleMessageScreen', items.name)} style={{ flexDirection: 'row', backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderColor: '#AAA', padding: 10, alignItems: 'center' }} >
                <View style={{ flexDirection: 'column', alignItems: 'center', alignSelf: 'center', }}>
                    <Image style={{ width: 80, height: 80, resizeMode: 'cover', alignSelf: 'center', alignItems: 'center', borderRadius: 60 }} source={items.userImages} />
                    <View style={{ position: 'absolute', right: 0, top: 65, width: 20, height: 20, backgroundColor: '#FFFFFF', borderRadius: 60 }}>
                        <View style={{ width: 15, height: 15, borderRadius: 60, backgroundColor: items.isOnline ? 'green' : 'grey', marginTop: 2.5, marginLeft: 2.5 }}></View>
                    </View>
                </View>
                <View style={{ backgroundColor: '#ffffff', flex: 1, padding: 15 }}>
                    <Text style={styles.title} >{items.name}</Text>
                    <Text style={[styles.title, { color: '#AAAAAA' }]} >{items.messages}</Text>
                </View>
                <View style={{ marginRight: 10 }}>
                    <Text style={{ color: '#AAAAAA' }}>{items.time}</Text>
                </View>
            </TouchableOpacity>
        )
    }

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
                <ScrollView style={{ padding: 15, backgroundColor: '#FFFFFF', height: '100%' }}>    
                    <TouchableOpacity onPress={() => navigation.navigate('AutomotiveServices', 'Automative Service')} style={{ paddingBottom: 15, marginTop: 10, borderBottomWidth: 1, borderColor: '#AAAAAA' }}>
                        <Text>Automative Service</Text>
                    </TouchableOpacity>
                    <View style={{ paddingBottom: 15, marginTop: 10, borderBottomWidth: 1, borderColor: '#AAAAAA' }}>
                        <Text>Beauty & Salon Services</Text>
                    </View>
                    <View style={{ paddingBottom: 15, marginTop: 10, borderBottomWidth: 1, borderColor: '#AAAAAA' }}>
                        <Text>Caragivers & Baby Sitting</Text>
                    </View>
                    <View style={{ paddingBottom: 15, marginTop: 10, borderBottomWidth: 1, borderColor: '#AAAAAA' }}>
                        <Text>Cleaning Service</Text>
                    </View>
                    <View style={{ paddingBottom: 15, marginTop: 10, borderBottomWidth: 1, borderColor: '#AAAAAA' }}>
                        <Text>Construction & Remodeling</Text>
                    </View>
                    <View style={{ paddingBottom: 15, marginTop: 10, borderBottomWidth: 1, borderColor: '#AAAAAA' }}>
                        <Text>Financial Service</Text>
                    </View>
                    <View style={{ paddingBottom: 15, marginTop: 10, borderBottomWidth: 1, borderColor: '#AAAAAA' }}>
                        <Text>Health & Wellness</Text>
                    </View>
                    <View style={{ paddingBottom: 15, marginTop: 10, borderBottomWidth: 1, borderColor: '#AAAAAA' }}>
                        <Text>Home Service</Text>
                    </View>
                    <View style={{ paddingBottom: 15, marginTop: 10, borderBottomWidth: 1, borderColor: '#AAAAAA' }}>
                        <Text>Insurance</Text>
                    </View>
                    <View style={{ paddingBottom: 15, marginTop: 10, borderBottomWidth: 1, borderColor: '#AAAAAA' }}>
                        <Text>Legal Services</Text>
                    </View>
                    <View style={{ paddingBottom: 15, marginTop: 10, borderBottomWidth: 1, borderColor: '#AAAAAA' }}>
                        <Text>Marketing Services</Text>
                    </View>
                    <View style={{ paddingBottom: 15, marginTop: 10, borderBottomWidth: 1, borderColor: '#AAAAAA' }}>
                        <Text>Moving & Storage</Text>
                    </View>
                    <View style={{ paddingBottom: 15, marginTop: 10, borderBottomWidth: 1, borderColor: '#AAAAAA' }}>
                        <Text>Office Services</Text>
                    </View>
                    <View style={{ paddingBottom: 15, marginTop: 10, borderBottomWidth: 1, borderColor: '#AAAAAA' }}>
                        <Text>Pet Services & Stores</Text>
                    </View>
                    <View style={{ paddingBottom: 15, marginTop: 10, borderBottomWidth: 1, borderColor: '#AAAAAA' }}>
                        <Text>Real Estate & Services</Text>
                    </View>
                </ScrollView>
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

export default BusinessServices;