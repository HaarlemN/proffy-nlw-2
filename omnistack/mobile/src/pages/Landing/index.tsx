import React, { useState } from 'react';
import { View, Image, Text } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';

import styles from './styles';
import api from '../../services/api';

import landingImage from '../../assets/images/landing.png';
import studyIcon from '../../assets/images/icons/study.png';
import giveClassesIcon from '../../assets/images/icons/give-classes.png';
import heart from '../../assets/images/icons/heart.png';

interface Connections {
  data: {
    total: string;
  };
}

const Landing: React.FC = () => {
  const { navigate } = useNavigation();

  const [totalConnections, setTotalConnections] = useState(0);

  function handleNavigateToGiveClassesPage() {
    navigate('give-classes');
  }

  function handleNavigateToStudyPages() {
    navigate('study');
  }

  useFocusEffect(() => {
    let isActive = true;

    api.get('connections').then((response: Connections) => {
      const { total } = response.data;

      if (isActive) {
        setTotalConnections(Number(total));
      }
    });

    return () => {
      isActive = false;
    }
  });

  return (
    <View style={styles.container}>
      <Image source={landingImage} style={styles.banner} />

      <Text style={styles.title}>
        Seja bem-vindo, {'\n'}
        <Text style={styles.titleBold}>O que deseja fazer?</Text>
      </Text>

      <View style={styles.buttonsContainer}>
        <RectButton style={[styles.button, styles.buttonPrimary]} onPress={handleNavigateToStudyPages}>
          <Image source={studyIcon} />
          <Text style={styles.buttonText}>Estudar</Text>
        </RectButton>

        <RectButton style={[styles.button, styles.buttonSecondary]} onPress={handleNavigateToGiveClassesPage}>
          <Image source={giveClassesIcon} />
          <Text style={styles.buttonText}>Dar aulas</Text>
        </RectButton>
      </View>

      <Text style={styles.totalConnections}>
        Total de {totalConnections} conexões já realizadas {' '}
        <Image source={heart} />
      </Text>
    </View>
  );
}

export default Landing;
