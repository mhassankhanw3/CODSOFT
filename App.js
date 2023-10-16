import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import AppNavigation from './navigation/appNavigation';

function App() {
  return <AppNavigation />;
}

export default App;
