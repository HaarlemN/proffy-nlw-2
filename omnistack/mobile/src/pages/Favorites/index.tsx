import React, { useState } from 'react';
import { FlatList, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import Header from '../../components/Header';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

import styles from './styles';

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState([]);

  useFocusEffect(() => {
    let isActive = true;

    AsyncStorage.getItem('favorites').then((response) => {
      if (isActive) {
        if (response) {
          const favoritedTeachers = JSON.parse(response);
  
          setFavorites(favoritedTeachers);
        }
      }
    });

    return () => {
      isActive = false;
    }
  });
  
  return (
    <View style={styles.container}>
      <Header title="Meus Proffys favoritos" />
      
      <FlatList 
        data={favorites}
        style={styles.teacherList} 
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
        keyExtractor={(item: Teacher) => String(item.id)}
        renderItem={({ item }) => <TeacherItem teacher={item} favorited/>}
      />
    </View>
  );
}

export default Favorites;
