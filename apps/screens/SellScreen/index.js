import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, Image, ScrollView, FlatList, StyleSheet } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';


const SellScreen = () => {

    const navigation = useNavigation();
    const routes = useRoute();
    console.log(routes.params);


    return (
        <SafeAreaView>
            <View>
                <View style={{ flexDirection: 'row', height: 55, alignItems: 'center', backgroundColor: '#00CCff' }}>
                    <TouchableOpacity style={{ marginLeft: 15 }} onPress={() => navigation.openDrawer()}>
                        <Image source={require('../../../assets/images/hamburger_menu.png')} style={{ width: 25, height: 25, marginRight: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                    </TouchableOpacity>
                    <View style={{ flex: 1 }}>
                        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 15, color: '#FFFFFF' }}>Sell</Text>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('SearchSingle')}>
                        <Image source={require('../../../assets/images/search_icon.png')} style={{ width: 25, height: 25, marginRight: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{}} onPress={() => navigation.navigate('NotifictionScreen')} >
                        <Image source={require('../../../assets/images/bell_icon.png')} style={{ width: 25, height: 25, marginRight: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                    </TouchableOpacity>
                </View>
                <View style={{ padding: 15, backgroundColor: '#FFFFFF', height: '100%' }}>
                    <TouchableOpacity onPress={() => navigation.navigate('ListYourProduct')} style={{ flexDirection: 'row', alignItems: 'center', padding: 20, borderColor: '#AAAAAA', borderWidth: 1, marginBottom: 10, borderRadius: 10 }}>
                        <Image style={{ width: 50, height: 50, resizeMode: 'contain', tintColor: '#00CCFF', marginRight: 20, }} source={require('../../../assets/images/icons/product.png')} />
                        <Text style={{ fontWeight: 'bold' }}>List Your Product</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('ListYourBusiness')} style={{ flexDirection: 'row', alignItems: 'center', padding: 20, borderColor: '#AAAAAA', borderWidth: 1, marginBottom: 10, borderRadius: 10 }}>
                        <Image style={{ width: 50, height: 50, resizeMode: 'contain', tintColor: '#00CCFF', marginRight: 20 }} source={require('../../../assets/images/icons/business_services.png')} />
                        <Text style={{ fontWeight: 'bold' }}>List Your Business Services</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('AddAJobs')} style={{ flexDirection: 'row', alignItems: 'center', padding: 20, borderColor: '#AAAAAA', borderWidth: 1, marginBottom: 10, borderRadius: 10 }}>
                        <Image style={{ width: 50, height: 50, resizeMode: 'contain', tintColor: '#00CCFF', marginRight: 20 }} source={require('../../../assets/images/icons/job.png')} />
                        <Text style={{ fontWeight: 'bold' }}>Post A Job</Text>
                    </TouchableOpacity>
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

export default SellScreen;