import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Image, AsyncStorage } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {

    const navigation = useNavigation();
    const [animating, setAnimating] = useState(false);

    useEffect(() => {
        async function checkUserLoginOrNot() {
            const value = await AsyncStorage.getItem('@MySuperStore:key');
            if (value) {
                setTimeout(() => {
                    setAnimating(false);
                    navigation.replace('HomeScreen');
                }, 2000);
            } else {
                setTimeout(() => {
                    setAnimating(false);
                    navigation.replace('Auth');
                }, 2000);
            }
        }
        checkUserLoginOrNot();
    }, [false]);

    return (
        <View>
            <Image style={{ resizeMode: 'cover', width: '100%', height: '100%' }} source={require('../../../assets/images/splash_icon.png')} />
        </View>
    )
}

export default SplashScreen;