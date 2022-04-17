import * as React from 'react';
import { Image, View, Platform, } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// other screen 
import HomeRoutes from './home.custom.route';
import MyProfileScreen from '../apps/screens/MyProfileScreen';
import ServiceScreen from '../apps/screens/ServiceScreen';
import SellScreen from '../apps/screens/SellScreen';
import ProductMainScreen from '../apps/screens/ProductMainScreen';
// HomeScreen
// import HomeScreen from '../apps/screens/HomeScreen';
const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    if (route.name === 'Home') {
                        return <View style={{ marginTop: Platform.OS === 'ios' ? 5 : 0, width: focused ? 30 : 25, height: focused ? 30 : 25, }}>
                            <Image
                                source={require('../assets/images/icons/home.png')}
                                style={{ width: focused ? 29 : 27, height: focused ? 29 : 27, tintColor: focused ? color : color, marginLeft: 0, resizeMode: 'contain' }} />
                        </View>
                    }
                    if (route.name === 'Product') {
                        return <View style={{ marginTop: Platform.OS === 'ios' ? 5 : 0, width: focused ? 30 : 25, height: focused ? 30 : 25, }}>
                            <Image
                                source={require('../assets/images/icons/product.png')}
                                style={{ width: focused ? 29 : 27, height: focused ? 29 : 27, tintColor: focused ? color : color, marginLeft: 0, resizeMode: 'contain' }} />
                        </View>
                    }
                    if (route.name === 'Sell') {
                        return <View style={{ marginTop: Platform.OS === 'ios' ? 5 : 0, width: focused ? 30 : 25, height: focused ? 30 : 25, }}>
                            <Image
                                source={require('../assets/images/icons/sell.png')}
                                style={{ width: focused ? 29 : 27, height: focused ? 29 : 27, tintColor: focused ? color : color, marginLeft: 0, resizeMode: 'contain' }} />
                        </View>
                    }
                    if (route.name === 'Services') {
                        return <View style={{ marginTop: Platform.OS === 'ios' ? 5 : 0, width: focused ? 30 : 25, height: focused ? 30 : 25, }}>
                            <Image
                                source={require('../assets/images/icons/service.png')}
                                style={{ width: focused ? 29 : 27, height: focused ? 29 : 27, tintColor: focused ? color : color, marginLeft: 0, resizeMode: 'contain' }} />
                        </View>
                    }
                    if (route.name === 'MyAccount') {
                        return <View style={{ marginTop: Platform.OS === 'ios' ? 5 : 0, width: focused ? 30 : 25, height: focused ? 30 : 25, }}>
                            <Image
                                source={require('../assets/images/icons/my_acc.png')}
                                style={{ width: focused ? 29 : 27, height: focused ? 29 : 27, tintColor: focused ? color : color, marginLeft: 0, resizeMode: 'contain' }} />
                        </View>
                    }
                }
            }
            )}
            tabBarOptions={{
                activeTintColor: '#00CCFF',
                inactiveTintColor: 'gray',
                showLabel: true,
                labelStyle: {
                    marginTop: 0,
                    alignContent: 'center',
                    marginLeft: 0
                }
            }} >
            <Tab.Screen name="Home"
                component={HomeRoutes}
                options={{ title: 'Home' }}
            />
            <Tab.Screen name="Product"
                component={ProductMainScreen}
                options={{ title: 'Product' }}
            />
            <Tab.Screen name="Sell"
                component={SellScreen}
                options={{ title: 'Sell' }}
            />
            <Tab.Screen name="Services"
                component={ServiceScreen}
                options={{ title: 'Service' }}
            />
            <Tab.Screen name="MyAccount"
                component={MyProfileScreen}
                options={{ title: 'My Account' }}
            />
        </Tab.Navigator>
    );
}

export default BottomTabNavigator;