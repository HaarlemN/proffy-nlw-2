import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Image } from 'react-native';

import backIcon from '../assets/images/icons/back.png';
import logoIcon from '../assets/images/logo.png';

import Landing from '../pages/Landing';
import GiveClasses from '../pages/GiveClasses';
import StudyTabs from './StudyTabs';

const { Navigator, Screen } = createStackNavigator();

const AppStack: React.FC = () => {
  return (
    <Navigator 
      screenOptions={
        { cardStyle: 
          {
            backgroundColor: '#8257E5',
          },
          headerTitle: '',
          headerBackTitleVisible: false,
          headerStyle: {
            elevation: 0,
            borderWidth: 0,
            shadowOffset: { width: 0, height: 0 },
            backgroundColor: 'transparent',
          },
          headerLeftContainerStyle: {
            paddingHorizontal: 16,
          },
          headerBackImage: () => (
            <Image
              source={backIcon}
            />
          ),
          headerRightContainerStyle: {
            paddingRight: 20,
          },
          headerRight: () => (
            <Image
              source={logoIcon}
              resizeMode="contain"
            />
          )
        }
      }
    >
      <Screen 
        name="landing" 
        component={Landing} 
        options={{
          headerShown: false,
        }}
      />
      <Screen 
        name="give-classes" 
        component={GiveClasses}
      />
      <Screen
        name="study"
        component={StudyTabs}
      />
    </Navigator>
  );
}

export default AppStack;
