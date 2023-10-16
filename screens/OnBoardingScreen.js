import {
  View,
  Text,
  Image,
  Button,
  TouchableOpacity,
  TouchableHighlight,
  StatusBar,
} from 'react-native';
import React from 'react';
import ScreenWrapper from '../components/ScreenWrapper';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import Onboarding from 'react-native-onboarding-swiper';
import LottieView from 'lottie-react-native';
import {setItem} from '../utils/asyncStorage';

export default function OnBoardingScreen() {
  const navigation = useNavigation();

  const handleDone = () => {
    navigation.navigate('Home');
    setItem('onboarded', '1');
  };
  const doneButton = ({...props}) => {
    return (
      <TouchableOpacity
        {...props}
        activeOpacity={0.7}
        className=" py-2 px-4 flex items-center justify-center">
        <Text className="text-black text-center">Done</Text>
      </TouchableOpacity>
    );
  };
  return (
    // <ScreenWrapper>
    <View style={{flex: 1, backgroundColor: 'white'}} className={'pb-4'}>
      {/* <View className="flex flex-row items-center ml-6 mt-6">
          <View className="p-[6px] border border-orange-500 rounded-full">
            <View className="bg-black h-12 w-12 flex items-center justify-center rounded-full">
              <Icon name="play-outline" size={26} color="white" />
            </View>
          </View>
          <View>
            <Text className="ml-2 text-[20px] font-medium text-zinc-700">
              How it <Text className="text-orange-500">works</Text>
            </Text>
          </View>
        </View> */}
      <StatusBar backgroundColor={'white'} barStyle="dark-content" />
      <Onboarding
        DoneButtonComponent={doneButton}
        bottomBarHighlight={false}
        onDone={handleDone}
        onSkip={handleDone}
        pages={[
          {
            backgroundColor: '#fff',
            image: (
              <View className="mx-auto mt-16 flex flex-col items-center justify-center">
                {/* <Image
                  className="h-72 w-72"
                  source={require('../assets/images/todolist.png')}
                /> */}
                <LottieView
                  style={{width: 300, height: 300}}
                  source={require('../assets/animations/animationTwo.json')}
                  autoPlay
                  loop
                />
                <Text className="text-[28px] mx-8 mt-2 mb-1 leading-10 font-extrabold text-black text-center">
                  Begin Your Productive Journey
                </Text>
                <Text className="text-center leading-6 mx-4 text-[16px] text-gray-500">
                  Begin your productive journey with our user-friendly to-do
                  app.
                </Text>
              </View>
            ),
            title: '',
            subtitle: '',
          },
          {
            backgroundColor: '#fff',
            image: (
              <View className="mx-auto mt-16 flex flex-col items-center justify-center">
                <LottieView
                  style={{width: 300, height: 300}}
                  source={require('../assets/animations/animationThree.json')}
                  autoPlay
                  loop
                />
                <Text className="text-[28px] mx-8 mt-2 mb-1 leading-10 font-extrabold text-black text-center">
                  Simplified Task Management
                </Text>
                <Text className="text-center leading-6 mx-10 text-[16px] text-gray-500">
                  Organize tasks, set priorities, and regain control of your
                  daily routine with ease using our app.
                </Text>
              </View>
            ),
            title: '',
            subtitle: '',
          },
          {
            backgroundColor: '#fff',
            image: (
              <View className="mx-auto mt-16 flex flex-col items-center justify-center">
                <LottieView
                  style={{width: 300, height: 300}}
                  source={require('../assets/animations/animationOne.json')}
                  autoPlay
                  // loop
                />
                <Text className="text-[28px] mx-8 mt-2 mb-1 leading-10 font-extrabold text-black text-center">
                  Stay Organized and Efficient
                </Text>
                <Text className="text-center leading-6 mx-10 text-[16px] text-gray-500">
                  With friendly reminders and easy task management, our app
                  keeps you in control and boosts productivity.
                </Text>
                <TouchableOpacity
                  onPress={handleDone}
                  activeOpacity={0.7}
                  className="mt-6 bg-orange-500 py-3 px-10 shadow-xl shadow-gray-600 rounded-full flex items-center justify-center">
                  <Text className="text-white text-[18px] text-center">
                    Get Started
                  </Text>
                </TouchableOpacity>
              </View>
            ),
            title: '',
            subtitle: '',
          },
        ]}
      />
      {/* <View className="mx-auto mt-16 flex flex-col items-center justify-center">
          <Image
            className="h-72 w-72"
            source={require('../assets/images/todolist.png')}
          />
          <Text className="text-[28px] mx-8 mt-2 mb-1 leading-10 font-extrabold text-black text-center">
            Begin Your Productive Journey
          </Text>
          <Text className="text-center leading-6 mx-4 text-[16px] text-gray-500">
            Begin your productive journey with our user-friendly to-do app.
          </Text>
        </View> */}
    </View>
    // {/* </ScreenWrapper> */}
  );
}

{
  /* <TouchableOpacity
            activeOpacity={0.7}
            className="mt-6 bg-orange-500 py-3 px-10 shadow-xl shadow-gray-600 rounded-full flex items-center justify-center">
            <Text className="text-white text-[18px] text-center">
              Get Started
            </Text>
          </TouchableOpacity> */
}
