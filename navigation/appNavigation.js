import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import OnBoardingScreen from '../screens/OnBoardingScreen';
import {getItem} from '../utils/asyncStorage';

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  const [showOnboarding, setShowOnboarding] = useState(null);
  useEffect(() => {
    checkIfAlreadyOnboarded();
  }, []);

  const checkIfAlreadyOnboarded = async () => {
    let onboarded = await getItem('onboarded');
    if (onboarded == 1) {
      setShowOnboarding(false);
    } else {
      setShowOnboarding(true);
    }
  };

  if (showOnboarding == null) {
    return null;
  }

  if (showOnboarding) {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="OnBoarding"
          screenOptions={{
            contentStyle: {
              backgroundColor: '#FFFFFF',
            },
          }}>
          <Stack.Screen
            options={{headerShown: false, animation: 'slide_from_right'}}
            name="OnBoarding"
            component={OnBoardingScreen}
          />
          <Stack.Screen
            options={{headerShown: false, animation: 'slide_from_right'}}
            name="Home"
            component={HomeScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            contentStyle: {
              backgroundColor: '#FFFFFF',
            },
          }}>
          <Stack.Screen
            options={{headerShown: false, animation: 'slide_from_right'}}
            name="OnBoarding"
            component={OnBoardingScreen}
          />
          <Stack.Screen
            options={{headerShown: false, animation: 'slide_from_right'}}
            name="Home"
            component={HomeScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
