import React from 'react';
import { View, ImageBackground, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import styles from './styles';

import giveClassesBgImage from '../../assets/images/give-classes-background.png';

const GiveClasses: React.FC = () => {
  function handleNavigateToWebPlatform() {

  }

  return (
    <View style={styles.container}>
      <ImageBackground resizeMode="contain" source={giveClassesBgImage} style={styles.content}>
        <Text style={styles.title}>
          Quer ser um Proffy?
        </Text>
        <Text style={styles.description}>
          Para começar, você precisa se cadastrar na nossa plataforma web.
        </Text>
      </ImageBackground>

      <RectButton style={styles.button} onPress={handleNavigateToWebPlatform}>
        <Text style={styles.buttonText}>Ir para plataforma Web</Text>
      </RectButton>
    </View>
  );
}

export default GiveClasses;
