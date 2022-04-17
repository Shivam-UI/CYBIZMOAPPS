import React from 'react';
import { TouchableOpacity, View, Image, } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
// add bottom navigation 
// import DrawerNavigator from './drawerNavigation';
// add bottom navigation 
// import HomeRoutes from './home.custom.route';
// bottom Navigation    
import BottomTabNavigator from './bottomHomeTabsNavigation';
// HomeScreen
// import HomeScreen from '../apps/screen/HomeScreen';
// Screens Paths 
import SplashScreen from '../apps/screens/SplashScreen';
import LoginScreen from '../apps/screens/LoginScreen';
import RegisterScreen from '../apps/screens/RegisterScreen';
import ForgetPasswordScreen from '../apps/screens/ForgetPassword';
import VerificationPasswordScreen from '../apps/screens/VerificationScreen';
import ChangePasswordScreen from '../apps/screens/ChangePassword';
import CategorySinglePage from '../apps/screens/CategorySinglePage';
import ProductCategoryScreen from '../apps/screens/ProductCategoryScreen';
import ProductSingleScreen from '../apps/screens/ProductSingleScreen';
import MessageListOfUser from '../apps/screens/MessageScreen';
import SingleMessageScreen from '../apps/screens/SingleMessageScreen';
import NotifictionScreen from '../apps/screens/NotificationScreen';
import BusinessServices from '../apps/screens/BusinessServices';
import AutomotiveServices from '../apps/screens/AutomativeServices';
import InnerSingleServices from '../apps/screens/InnerServiceScreen';
import InnerCategoryScreen from '../apps/screens/InnerCategoryScreen';
import ListYourProductScreen from '../apps/screens/ListYourProductScreen';
import ListYourBusiness from '../apps/screens/ListYourBusinessScreen';
import ServiceCategorySinglePage from '../apps/screens/ServiceCategorySubScreen';
import ServiceSubCategoryScreen from '../apps/screens/ServicesSubSingleScreen';
import MapLocationScreen from '../apps/screens/MapLocationChooseScreen';
import MyAddressListScreen from '../apps/screens/MyAddressListScreen';
import AddNewAddressScreen from '../apps/screens/AddNewAddressScreen';
import MyJobsListScreen from '../apps/screens/JobListScreens';
import MyProductsScreens from '../apps/screens/MyProductsScreens';
import MyBusinessScreens from '../apps/screens/MyBusinessScreens';
import AddAJobsScreen from '../apps/screens/PostAJobScreen';
import GlobalProfileScreen from '../apps/screens/GlobalProfileScreen';
import BlogSingleScreen from '../apps/screens/BlogSingleScreen';
import DashboardScreen from '../apps/screens/DashboardScreen';
import JobSingleDetailsScreens from '../apps/screens/JobDetailsScreen';
import MyWishListScreen from '../apps/screens/MyWishListScreen';
import ProductAdManager from '../apps/screens/AddProductScreen';
import ServiceAdManager from '../apps/screens/AddServiceScreen';
import JobAdManager from '../apps/screens/JobAdsManager';
import MyReviewScreen from '../apps/screens/MyReviewScreen';
import ViewFollowerScreen from '../apps/screens/ViewFollowingScreen';
import MyFollowerScreen from '../apps/screens/MyFollowerScreen';
import MyWalletScreen from '../apps/screens/MyWalletScreen';
import ContactToAdministratorScreen from '../apps/screens/ContactToAdministrator';
import AdminMessageReply from '../apps/screens/AdminMessageReply';
import PasswordScreen from '../apps/screens/ChangePasswordScreen';
import EditProfileScreen from '../apps/screens/EditProfileScreen';
import SearchSingleScreen from '../apps/screens/SingleSearchScreen';
import ViewAdministratorMessage from '../apps/screens/ViewAdministratorMessageScreen'

const RootStack = createStackNavigator();

const Auth = () => {
    // Stack Navigator for Login and Sign up Screen
    return (
        <RootStack.Navigator initialRouteName="LoginScreen">
            <RootStack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{ headerShown: false }}
            />
        </RootStack.Navigator>
    );
};

const Router = (props) => {

    console.log('Navigation_props: ', props);

    return (
        <RootStack.Navigator initialRouteName="SplashScreen" >
            <RootStack.Screen
                name='SplashScreen'
                component={SplashScreen}
                options={{
                    headerShown: false
                }}
            />
            <RootStack.Screen
                name='Auth'
                component={Auth}
                options={{
                    headerShown: false
                }}
            />
            <RootStack.Screen
                name='HomeScreen'
                component={BottomTabNavigator}
                options={{
                    headerShown: false,
                }}
            />
            <RootStack.Screen
                name='RegisterScreen'
                component={RegisterScreen}
                options={{
                    headerShown: false,
                }}
            />
            <RootStack.Screen
                name='ForgetScreen'
                component={ForgetPasswordScreen}
                options={{
                    headerShown: false,
                }}
            />
            <RootStack.Screen
                name='JobAdManager'
                component={JobAdManager}
                options={{
                    headerShown: false,
                }}
            />
            <RootStack.Screen
                name='ProductAdManager'
                component={ProductAdManager}
                options={{
                    headerShown: false,
                }}
            />
            <RootStack.Screen
                name='ServiceAdManager'
                component={ServiceAdManager}
                options={{
                    headerShown: false,
                }}
            />
            <RootStack.Screen
                name='MyReviewScreen'
                component={MyReviewScreen}
                options={{
                    headerShown: false,
                }}
            />
            <RootStack.Screen
                name='ViewFollowerScreen'
                component={ViewFollowerScreen}
                options={{
                    headerShown: false,
                }}
            />
            <RootStack.Screen
                name='SearchSingle'
                component={SearchSingleScreen}
                options={{
                    headerShown: false,
                }}
            />
            <RootStack.Screen
                name='MyFollowerScreen'
                component={MyFollowerScreen}
                options={{
                    headerShown: false,
                }}
            />
            <RootStack.Screen
                name='MyWalletScreen'
                component={MyWalletScreen}
                options={{
                    headerShown: false,
                }}
            />
            <RootStack.Screen
                name='ContactToAdministrator'
                component={ContactToAdministratorScreen}
                options={{
                    headerShown: false,
                }}
            />
            <RootStack.Screen
                name='AdminMessageReply'
                component={AdminMessageReply}
                options={{
                    headerShown: false,
                }}
            />
            <RootStack.Screen
                name='PasswordScreen'
                component={PasswordScreen}
                options={{
                    headerShown: false,
                }}
            />
            <RootStack.Screen
                name='EditProfileScreen'
                component={EditProfileScreen}
                options={{
                    headerShown: false,
                }}
            />
            <RootStack.Screen
                name='VerificationScreen'
                component={VerificationPasswordScreen}
                options={{
                    headerShown: false,
                }}
            />
            <RootStack.Screen
                name='ChangePassword'
                component={ChangePasswordScreen}
                options={{
                    headerShown: false,
                }}
            />
            <RootStack.Screen
                name='BusinessServices'
                component={BusinessServices}
                options={{
                    headerShown: false,
                }}
            />
            <RootStack.Screen
                name='AutomotiveServices'
                component={AutomotiveServices}
                options={{
                    headerShown: false,
                }}
            />
            <RootStack.Screen
                name='GlobalProfile'
                component={GlobalProfileScreen}
                options={{
                    headerShown: false,
                }}
            />
            <RootStack.Screen
                name='InnerSingleServices'
                component={InnerSingleServices}
                options={{
                    headerShown: false,
                }}
            />
            <RootStack.Screen
                name='BlogSingle'
                component={BlogSingleScreen}
                options={{
                    headerShown: false,
                }}
            />
            <RootStack.Screen
                name='MapLocationChoose'
                component={MapLocationScreen}
                options={{
                    headerShown: false,
                }}
            />
            <RootStack.Screen
                name='DashboardScreen'
                component={DashboardScreen}
                options={{
                    headerShown: false,
                }}
            />
            <RootStack.Screen
                name='JobSingleDetails'
                component={JobSingleDetailsScreens}
                options={{
                    headerShown: false,
                }}
            />
            <RootStack.Screen
                name='ViewAdministratorMessage'
                component={ViewAdministratorMessage}
                options={{
                    headerShown: false,
                }}
            />
            <RootStack.Screen
                name='WishListScreen'
                component={MyWishListScreen}
                options={{
                    headerShown: false,
                }}
            />
            <RootStack.Screen
                name='CategorySingle'
                component={CategorySinglePage}
                options={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: '#00CCFF', //Set Header color
                    },
                    headerTintColor: 'white', //Set Header text color
                    headerRight: () =>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity onPress={{}}>
                                <Image source={require('../assets/images/search_icon.png')} style={{ width: 25, height: 25, marginRight: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                            </TouchableOpacity>
                            <TouchableOpacity >
                                <Image source={require('../assets/images/bell_icon.png')} style={{ width: 25, height: 25, marginRight: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                            </TouchableOpacity>
                        </View>,
                    headerLeft: () =>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => console.log('going back')} >
                                <Image source={require('../assets/images/hamburger_menu.png')} style={{ width: 25, height: 25, marginLeft: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                            </TouchableOpacity>
                        </View>
                }}
            />
            <RootStack.Screen
                name='ProductCategory'
                component={ProductCategoryScreen}
                options={{
                    headerShown: false,
                    headerStyle: {
                        backgroundColor: '#00CCFF', // Set Header color
                    },
                    headerTintColor: 'white', // Set Header text color
                    headerRight: () =>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity >
                                <Image source={require('../assets/images/search_icon.png')} style={{ width: 25, height: 25, marginRight: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                            </TouchableOpacity>
                            <TouchableOpacity >
                                <Image source={require('../assets/images/bell_icon.png')} style={{ width: 25, height: 25, marginRight: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                            </TouchableOpacity>
                        </View>,
                    headerLeft: () =>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => console.log('going back')} >
                                <Image source={require('../assets/images/hamburger_menu.png')} style={{ width: 25, height: 25, marginLeft: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                            </TouchableOpacity>
                        </View>
                }}
            />
            <RootStack.Screen
                name='ProductSingle'
                component={ProductSingleScreen}
                options={{
                    headerShown: false,
                    headerStyle: {
                        backgroundColor: '#00CCFF', //Set Header color
                    },
                    headerTintColor: 'white', //Set Header text color
                    headerRight: () =>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity >
                                <Image source={require('../assets/images/search_icon.png')} style={{ width: 25, height: 25, marginRight: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                            </TouchableOpacity>
                            <TouchableOpacity >
                                <Image source={require('../assets/images/bell_icon.png')} style={{ width: 25, height: 25, marginRight: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                            </TouchableOpacity>
                        </View>,
                    headerLeft: () =>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => console.log('going back')} >
                                <Image source={require('../assets/images/hamburger_menu.png')} style={{ width: 25, height: 25, marginLeft: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                            </TouchableOpacity>
                        </View>
                }}
            />
            <RootStack.Screen
                name='MessageListUser'
                component={MessageListOfUser}
                options={{
                    headerShown: false,
                    headerStyle: {
                        backgroundColor: '#00CCFF', //Set Header color
                    },
                    headerTintColor: 'white', //Set Header text color
                    headerRight: () =>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity >
                                <Image source={require('../assets/images/search_icon.png')} style={{ width: 25, height: 25, marginRight: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                            </TouchableOpacity>
                            <TouchableOpacity >
                                <Image source={require('../assets/images/bell_icon.png')} style={{ width: 25, height: 25, marginRight: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                            </TouchableOpacity>
                        </View>,
                    headerLeft: () =>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => console.log('going back')} >
                                <Image source={require('../assets/images/hamburger_menu.png')} style={{ width: 25, height: 25, marginLeft: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                            </TouchableOpacity>
                        </View>
                }}
            />
            <RootStack.Screen
                name='SingleMessageScreen'
                component={SingleMessageScreen}
                options={{
                    headerShown: false,
                    headerStyle: {
                        backgroundColor: '#00CCFF', //Set Header color
                    },
                    headerTintColor: 'white', //Set Header text color
                    headerRight: () =>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity >
                                <Image source={require('../assets/images/search_icon.png')} style={{ width: 25, height: 25, marginRight: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                            </TouchableOpacity>
                            <TouchableOpacity >
                                <Image source={require('../assets/images/bell_icon.png')} style={{ width: 25, height: 25, marginRight: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                            </TouchableOpacity>
                        </View>,
                    headerLeft: () =>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => console.log('going back')} >
                                <Image source={require('../assets/images/hamburger_menu.png')} style={{ width: 25, height: 25, marginLeft: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                            </TouchableOpacity>
                        </View>
                }}
            />
            <RootStack.Screen
                name='NotifictionScreen'
                component={NotifictionScreen}
                options={{
                    headerShown: false,
                    headerStyle: {
                        backgroundColor: '#00CCFF', //Set Header color
                    },
                    headerTintColor: 'white', //Set Header text color
                    headerRight: () =>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity >
                                <Image source={require('../assets/images/search_icon.png')} style={{ width: 25, height: 25, marginRight: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                            </TouchableOpacity>
                            <TouchableOpacity >
                                <Image source={require('../assets/images/bell_icon.png')} style={{ width: 25, height: 25, marginRight: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                            </TouchableOpacity>
                        </View>,
                    headerLeft: () =>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => console.log('going back')} >
                                <Image
                                    source={require('../assets/images/hamburger_menu.png')}
                                    style={{ width: 25, height: 25, marginLeft: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                            </TouchableOpacity>
                        </View>
                }}
            />
            <RootStack.Screen
                name='InnerCategory'
                component={InnerCategoryScreen}
                options={{
                    headerStyle: {
                        backgroundColor: '#00CCFF', //Set Header color
                    },
                    headerShown: false,
                    headerTintColor: 'white', //Set Header text color
                    // headerRight: () =>
                    //     <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    //         <TouchableOpacity >
                    //             <Image source={require('../assets/images/search_icon.png')} style={{ width: 25, height: 25, marginRight: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                    //         </TouchableOpacity>
                    //         <TouchableOpacity >
                    //             <Image source={require('../assets/images/bell_icon.png')} style={{ width: 25, height: 25, marginRight: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                    //         </TouchableOpacity>
                    //     </View>,
                    // headerLeft: () =>
                    //     <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    //         <TouchableOpacity onPress={() => console.log('going back')} >
                    //             <Image source={require('../assets/images/hamburger_menu.png')} style={{ width: 25, height: 25, marginLeft: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                    //         </TouchableOpacity>
                    //     </View>
                }}
            />
            <RootStack.Screen
                name='ListYourProduct'
                component={ListYourProductScreen}
                options={{
                    headerShown: false,
                    headerStyle: {
                        backgroundColor: '#00CCFF', //Set Header color
                    },
                    headerTintColor: 'white', //Set Header text color
                    headerRight: () =>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity >
                                <Image source={require('../assets/images/search_icon.png')} style={{ width: 25, height: 25, marginRight: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                            </TouchableOpacity>
                            <TouchableOpacity >
                                <Image source={require('../assets/images/bell_icon.png')} style={{ width: 25, height: 25, marginRight: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                            </TouchableOpacity>
                        </View>,
                    headerLeft: () =>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => console.log('going back')} >
                                <Image source={require('../assets/images/hamburger_menu.png')} style={{ width: 25, height: 25, marginLeft: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                            </TouchableOpacity>
                        </View>
                }}
            />
            <RootStack.Screen
                name='ListYourBusiness'
                component={ListYourBusiness}
                options={{
                    headerShown: false,
                    headerStyle: {
                        backgroundColor: '#00CCFF', //Set Header color
                    },
                    headerTintColor: 'white', //Set Header text color
                    headerRight: () =>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity >
                                <Image source={require('../assets/images/search_icon.png')} style={{ width: 25, height: 25, marginRight: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                            </TouchableOpacity>
                            <TouchableOpacity >
                                <Image source={require('../assets/images/bell_icon.png')} style={{ width: 25, height: 25, marginRight: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                            </TouchableOpacity>
                        </View>,
                    headerLeft: () =>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('HomeScreen')} >
                                <Image source={require('../assets/images/hamburger_menu.png')} style={{ width: 25, height: 25, marginLeft: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                            </TouchableOpacity>
                        </View>
                }}
            />
            <RootStack.Screen
                name='ServiceCateSinglePage'
                component={ServiceCategorySinglePage}
                options={{
                    headerShown: false,
                    headerStyle: {
                        backgroundColor: '#00CCFF', //Set Header color
                    },
                    headerTintColor: 'white', //Set Header text color
                    headerRight: () =>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity >
                                <Image source={require('../assets/images/search_icon.png')} style={{ width: 25, height: 25, marginRight: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                            </TouchableOpacity>
                            <TouchableOpacity >
                                <Image source={require('../assets/images/bell_icon.png')} style={{ width: 25, height: 25, marginRight: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                            </TouchableOpacity>
                        </View>,
                    headerLeft: () =>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => console.log('going back')} >
                                <Image source={require('../assets/images/hamburger_menu.png')} style={{ width: 25, height: 25, marginLeft: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                            </TouchableOpacity>
                        </View>
                }}
            />
            <RootStack.Screen
                name='ServiceSubCategory'
                component={ServiceSubCategoryScreen}
                options={{
                    headerShown: false,
                    headerStyle: {
                        backgroundColor: '#00CCFF', //Set Header color
                    },
                    headerTintColor: 'white', //Set Header text color
                    headerRight: () =>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity >
                                <Image source={require('../assets/images/search_icon.png')} style={{ width: 25, height: 25, marginRight: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                            </TouchableOpacity>
                            <TouchableOpacity >
                                <Image source={require('../assets/images/bell_icon.png')} style={{ width: 25, height: 25, marginRight: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                            </TouchableOpacity>
                        </View>,
                    headerLeft: () =>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => console.log('going back')} >
                                <Image source={require('../assets/images/hamburger_menu.png')} style={{ width: 25, height: 25, marginLeft: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                            </TouchableOpacity>
                        </View>
                }}
            />
            <RootStack.Screen
                name='AddressListScreen'
                component={MyAddressListScreen}
                options={{
                    headerShown: false,
                    headerStyle: {
                        backgroundColor: '#00CCFF', //Set Header color
                    },
                    headerTintColor: 'white', //Set Header text color
                    headerRight: () =>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity >
                                <Image source={require('../assets/images/search_icon.png')} style={{ width: 25, height: 25, marginRight: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                            </TouchableOpacity>
                            <TouchableOpacity >
                                <Image source={require('../assets/images/bell_icon.png')} style={{ width: 25, height: 25, marginRight: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                            </TouchableOpacity>
                        </View>,
                    headerLeft: () =>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => console.log('going back')} >
                                <Image source={require('../assets/images/hamburger_menu.png')} style={{ width: 25, height: 25, marginLeft: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                            </TouchableOpacity>
                        </View>
                }}
            />
            <RootStack.Screen
                name='NewAddressScreen'
                component={AddNewAddressScreen}
                options={{
                    headerShown: false,
                    headerStyle: {
                        backgroundColor: '#00CCFF', //Set Header color
                    },
                    headerTintColor: 'white', //Set Header text color
                    headerRight: () =>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity >
                                <Image source={require('../assets/images/search_icon.png')} style={{ width: 25, height: 25, marginRight: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                            </TouchableOpacity>
                            <TouchableOpacity >
                                <Image source={require('../assets/images/bell_icon.png')} style={{ width: 25, height: 25, marginRight: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                            </TouchableOpacity>
                        </View>,
                    headerLeft: () =>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity >
                                <Image source={require('../assets/images/hamburger_menu.png')} style={{ width: 25, height: 25, marginLeft: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                            </TouchableOpacity>
                        </View>
                }}
            />
            <RootStack.Screen
                name='Jobs'
                component={MyJobsListScreen}
                options={{
                    headerShown: false,
                    headerStyle: {
                        backgroundColor: '#00CCFF', //Set Header color
                    },
                    headerTintColor: 'white', //Set Header text color
                    headerRight: () =>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity >
                                <Image source={require('../assets/images/search_icon.png')} style={{ width: 25, height: 25, marginRight: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                            </TouchableOpacity>
                            <TouchableOpacity >
                                <Image source={require('../assets/images/bell_icon.png')} style={{ width: 25, height: 25, marginRight: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                            </TouchableOpacity>
                        </View>,
                    headerLeft: () =>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => console.log('going back')} >
                                <Image source={require('../assets/images/hamburger_menu.png')} style={{ width: 25, height: 25, marginLeft: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                            </TouchableOpacity>
                        </View>
                }}
            />
            <RootStack.Screen
                name='MyProducts'
                component={MyProductsScreens}
                options={{
                    headerShown: false,
                    headerStyle: {
                        backgroundColor: '#00CCFF', //Set Header color
                    },
                    headerTintColor: 'white', //Set Header text color
                    headerRight: () =>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity >
                                <Image source={require('../assets/images/search_icon.png')} style={{ width: 25, height: 25, marginRight: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                            </TouchableOpacity>
                            <TouchableOpacity >
                                <Image source={require('../assets/images/bell_icon.png')} style={{ width: 25, height: 25, marginRight: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                            </TouchableOpacity>
                        </View>,
                    headerLeft: () =>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => console.log('going back')} >
                                <Image source={require('../assets/images/hamburger_menu.png')} style={{ width: 25, height: 25, marginLeft: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                            </TouchableOpacity>
                        </View>
                }}
            />
            <RootStack.Screen
                name='MyBusiness'
                component={MyBusinessScreens}
                options={{
                    headerShown: false,
                    headerStyle: {
                        backgroundColor: '#00CCFF', //Set Header color
                    },
                    headerTintColor: 'white', //Set Header text color
                    headerRight: () =>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity >
                                <Image source={require('../assets/images/search_icon.png')} style={{ width: 25, height: 25, marginRight: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                            </TouchableOpacity>
                            <TouchableOpacity >
                                <Image source={require('../assets/images/bell_icon.png')} style={{ width: 25, height: 25, marginRight: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                            </TouchableOpacity>
                        </View>,
                    headerLeft: () =>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => console.log('going back')} >
                                <Image source={require('../assets/images/hamburger_menu.png')} style={{ width: 25, height: 25, marginLeft: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                            </TouchableOpacity>
                        </View>
                }}
            />
            <RootStack.Screen
                name='AddAJobs'
                component={AddAJobsScreen}
                options={{
                    headerShown: false,
                    headerStyle: {
                        backgroundColor: '#00CCFF', //Set Header color
                    },
                    headerTintColor: 'white', //Set Header text color
                    headerRight: () =>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity >
                                <Image source={require('../assets/images/search_icon.png')} style={{ width: 25, height: 25, marginRight: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                            </TouchableOpacity>
                            <TouchableOpacity >
                                <Image source={require('../assets/images/bell_icon.png')} style={{ width: 25, height: 25, marginRight: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                            </TouchableOpacity>
                        </View>,
                    headerLeft: () =>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => console.log('going back')} >
                                <Image source={require('../assets/images/hamburger_menu.png')} style={{ width: 25, height: 25, marginLeft: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                            </TouchableOpacity>
                        </View>
                }}
            />
        </RootStack.Navigator>
    )
}

// add new screens here  
export default Router;