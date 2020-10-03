import React, { useState, useCallback, FormEvent } from 'react';

import Header from '../../components/Header';
import Input from '../../components/Input';
import Select from '../../components/Select';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import api from '../../services/api';

import './styles.css';

const TeacherList: React.FC = () => {
  const [subject, setSubject] = useState('');
  const [weekDay, setWeekDay] = useState('');
  const [time, setTime] = useState('');

  const [teachers, setTeachers] = useState([]);

  const searchTeacher = useCallback((event: FormEvent) => {
    event.preventDefault();
    
    if (subject && weekDay && time) {
      api.get('/classes', {
        params: {
          week_day: weekDay,
          subject,
          time,
        }
      }).then((response) => {
        setTeachers(response.data);
      })
    }
  }, [subject, time, weekDay]);

  return (
    <div id="page-teacher-list" className="container">
      <Header title="Estes são os proffys disponíveis.">
        <form id="search-teachers">
          <Select 
            title="Selecione uma matéria"
            label="Matéria" 
            name="subject" 
            value={subject}
            onChange={(event) => {
              setSubject(event.target.value);
              searchTeacher(event);
            }}
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
          />
          <Select 
            title="Selecione um dia"
            label="Dia da semana" 
            name="week-day" 
            value={weekDay}
            onChange={(event) => {
              setWeekDay(event.target.value);
              searchTeacher(event);
            }}
            options={[
              { value: '0', label: 'Domingo' },
              { value: '1', label: 'Segunda-feira' },
              { value: '2', label: 'Terça-feira' },
              { value: '3', label: 'Quarta-feira' },
              { value: '4', label: 'Quinta-feira' },
              { value: '5', label: 'Sexta-feira' },
              { value: '6', label: 'Sábado' },
            ]}
            onBlur={searchTeacher}
          />
          <Input 
            label="Hora" 
            name="time" 
            type="time"
            value={time}
            onChange={(event) => setTime(event.target.value)}
            onBlur={searchTeacher}
          />
        </form>
      </Header>

      <main>
        {teachers.map((teacher: Teacher) => <TeacherItem key={teacher.id} teacher={teacher} />)}
      </main>
    </div>
  );
}

export default TeacherList;