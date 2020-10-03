import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, FlatList, Text } from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import Animated, { Easing } from 'react-native-reanimated';
import { Feather } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-community/async-storage';

import Header from '../../components/Header';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

import styles from './styles';
import Select from '../../components/Select';
import api from '../../services/api';

const TeacherList: React.FC = () => {
  const headerHeight  = useRef(new Animated.Value(1)).current;
  
  const [teachers, setTeachers] = useState([]);
  const [favorites, setFavorites] = useState<number[]>([]);

  const [isFiltersVisible, setIsFiltersVisible] = useState(true);

  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedWeekDay, setSelectedWeekDay] = useState('');
  const [time, setTime] = useState('');
  const [showTime, setShowTime] = useState(new Date());

  const [viewDatePicker, setViewDatePicker] = useState(false);

  function handleDatePickerVisible() {
    setViewDatePicker(!viewDatePicker);
  }

  function handleToggleFiltersVisible() {
    Animated.timing(headerHeight, {
      toValue: isFiltersVisible ? 0 : 1,
      duration: 300,
      easing: Easing.sin,
    }).start(() => {
      setIsFiltersVisible(!isFiltersVisible);
    });
  }

  function changeTimeState(event: any, selectedTime: any) {    
    handleDatePickerVisible();
    setShowTime(selectedTime || showTime);
    setTime(selectedTime ? selectedTime.toLocaleTimeString().split(':').splice(0,2).join(':').toString() : time);
  }

  const loadFavorites = useCallback(() => {
    AsyncStorage.getItem('favorites').then((response) => {
      if (response) {
        const favoritedTeachers = JSON.parse(response).map((teacher: Teacher) => teacher.id);

        setFavorites(favoritedTeachers);
      }
    });
  }, []);

  const handleFiltersSubmit = useCallback((isActive) => {
    loadFavorites();
    if (selectedSubject && selectedWeekDay && time) {
      api.get('/classes', {
        params: {
          week_day: Number(selectedWeekDay),
          subject: selectedSubject,
          time
        }
      }).then((response) => {
        if (isActive) {
          setTeachers(response.data);
          handleToggleFiltersVisible();
        }
      });
    }
  }, [selectedSubject, selectedWeekDay, time]);

  useEffect(() => {
    let isActive = true;

    handleFiltersSubmit(isActive);

    return () => {
      isActive = false;
    }
  }, [handleFiltersSubmit, selectedSubject, selectedWeekDay, time]);

  return (
    <View style={styles.container}>
      <Header 
        title="Proffys disponíveis" 
        headerHeight={headerHeight}
        headerRight={(
          <BorderlessButton onPress={handleToggleFiltersVisible}>
            <Feather name="filter" size={20} color="#FFF" />
          </BorderlessButton>
        )}
      >
        <Animated.View 
          style={[
            styles.searchForm, {
              opacity: headerHeight.interpolate({
                inputRange: [0, 0.4, 0.6, 0.8, 1],
                outputRange: [0, 0.2, 0.4, 0.6, 1]
              })
            }
          ]}
        >
          <Text style={styles.label}>Matéria</Text>
          
          <Select 
            title="Selecione uma matéria"
            value={selectedSubject}
            options={[
              { value: 'Artes', label: 'Artes' },
              { value: 'Biologia', label: 'Biologia' },
              { value: 'Ciencias', label: 'Ciências' },
              { value: 'Fisica', label: 'Física' },
              { value: 'Geografia', label: 'Geografia' },
              { value: 'Ingles', label: 'Inglês' },
              { value: 'Matematica', label: 'Matemática' },
              { value: 'Portugues', label: 'Português' },
              { value: 'Quimica', label: 'Química' },
            ]}
            handleChangeSelectedValue={(value: string) => setSelectedSubject(value)}
          />

          <View style={styles.selectGroup}>
            <View style={styles.selectBlock}>
              <Text style={styles.label}>Dia da semana</Text>
              <Select 
                title="Selecione um dia"
                value={selectedWeekDay}
                options={[
                  { value: '0', label: 'Domingo' },
                  { value: '1', label: 'Segunda-feira' },
                  { value: '2', label: 'Terça-feira' },
                  { value: '3', label: 'Quarta-feira' },
                  { value: '4', label: 'Quinta-feira' },
                  { value: '5', label: 'Sexta-feira' },
                  { value: '6', label: 'Sábado' },
                ]}
                handleChangeSelectedValue={(value: string) => setSelectedWeekDay(value)}
              />
            </View>

            <View style={styles.selectBlock}>
              <Text style={styles.label}>Horário</Text>
              <View style={styles.datePickerView}>
                <RectButton 
                  style={styles.datePickerButton} 
                  onPress={handleDatePickerVisible}
                >
                  <Text style={styles.datePickerText}>{time || '00:00'}</Text>
                </RectButton>
                {viewDatePicker && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={showTime}
                    mode="time"
                    is24Hour={true}
                    display="default"
                    onChange={changeTimeState}
                  />
                )}
              </View>
            </View>
          </View>
        </Animated.View>
      </Header>

      <FlatList 
        data={teachers}
        style={styles.teacherList} 
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
        keyExtractor={(item: Teacher) => String(item.id)}
        renderItem={({ item }) => <TeacherItem teacher={item} favorited={favorites.includes(item.id)}/>}
      />
    </View>
  );
}

export default TeacherList;
