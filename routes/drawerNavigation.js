import React from "react";
// 
import { SafeAreaView, ScrollView, View, Text, Image, TouchableOpacity, AsyncStorage, Alert } from 'react-native';
import { createDrawerNavigator, DrawerItemList } from "@react-navigation/drawer";

// import { useNavigation } from '@react-navigation/native';
// 
// BottomTabNavigator
import BottomTabNavigator from './bottomHomeTabsNavigation';

const Drawer = createDrawerNavigator();
// const navigation = useNavigation();
// 
const onPressLogout = () => {
    Alert.alert(
        'Sign Out',
        'Are you sure',
        [
            {
                text: 'Cancel',
                onPress: () => console.log('cancel'),
                style: 'cancel',
            },
            { text: 'Continue', onPress: () => signOut() },
        ]
    );
}
// 
signOut = async () => {
    await AsyncStorage.removeItem('@MySuperStore:key');
    navigation.replace('Auth');
};
// 
const CustomComponent = (props) => (
    <SafeAreaView style={{ height: '100%' }}>
        <View style={{ height: '100%' }}>
            <View style={{ height: 150, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center' }}>
                <Image style={{ height: 120, width: 120, borderRadius: 60, resizeMode: 'contain', padding: 5 }} source={{ uri: 'https://rtmprime.com/infinitap/uploads/users_image/default.png' }} />
            </View>
            <ScrollView style={{ height: '100%' }}>
                <DrawerItemList {...props} />
            </ScrollView>
            <View style={{ alignItems: 'center', position: 'absolute', alignSelf: 'center', bottom: 10 }}>
                <TouchableOpacity style={{ height: 30, width: 130, backgroundColor: '#000', padding: 10, borderRadius: 10 }}>
                    <Text style={{ color: '#FFF', textAlign: 'center' }}>Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
    </SafeAreaView>
)
// Old DrawerNavigator
// const DrawerNavigator = () => {
//     return (
//         <Drawer.Navigator
//             drawerContent={CustomComponent}
//             initialRouteName="Home"
//             drawerPosition='left'
//             drawerStyle={{
//                 backgroundColor: '#f1f1f1',
//             }}
//             drawerContentOptions={{
//                 activeTintColor: 'black',
//                 inactiveTintColor: 'black',
//                 activeBackgroundColor: '#f1f1f1',
//                 itemStyle: { marginVertical: 5 },
//             }} >
//             <Drawer.Screen name="Home" component={BottomTabNavigator} />
//             <Drawer.Screen name="About Us" component={BottomTabNavigator} />
//             <Drawer.Screen name="Privacy Policy" component={BottomTabNavigator} />
//             <Drawer.Screen name="Refund Policy" component={BottomTabNavigator} />
//             <Drawer.Screen name="Term & Condition" component={BottomTabNavigator} />
//             <Drawer.Screen name="Contact Us" component={BottomTabNavigator} />
//         </Drawer.Navigator >
//     );
// }

// New DrawerNavigator
const DrawerNavigator = () => {
    return (
        <Drawer.Navigator
            drawerContent={CustomComponent}
            initialRouteName="Home"
            drawerPosition='left' >
            <Drawer.Screen
                name="Home"
                component={BottomTabNavigator}
                options={{
                    title: "Home", icon: <Image source={require('../assets/images/user_icon.png')}
                        style={{ width: 30, height: 30, resizeMode: 'contain' }} />
                }}
            />
        </Drawer.Navigator >
    );
}
//
export default DrawerNavigator;