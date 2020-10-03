import React, { useState, useCallback, FormEvent } from 'react';

import Header from '../../components/Header';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';

import warningIcon from '../../assets/images/icons/warning.svg';

import './styles.css';
import Select from '../../components/Select';
import api from '../../services/api';
import { useHistory } from 'react-router-dom';

const TeacherForm: React.FC = () => {
  const history = useHistory();

  const[name, setName] = useState('');
  const[avatar, setAvatar] = useState('');
  const[whatsapp, setWhatsapp] = useState('');
  const[bio, setBio] = useState('');

  const [subject, setSubject] = useState('');
  const [cost, setCost] = useState('');

  const [scheduleItems, setScheduleItems] = useState([
    { week_day: 0, from: '', to: '' }
  ]);

  const addNewScheduleItem = useCallback(() => {
    setScheduleItems((old) => [...old, {
      week_day: 0, 
      from: '', 
      to: '',
    }])
  }, []);

  const handleCreateClass = useCallback((event: FormEvent) => {
    event.preventDefault();

    api.post('/classes', {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost: Number(cost),
      schedule: scheduleItems
    }).then(() => {
      alert('Cadastro realizado com sucesso.');
      history.push('/');
    }).catch(() => {
      alert('Erro no cadastro.');
    });
  },[avatar, bio, cost, history, name, scheduleItems, subject, whatsapp]);

  const setScheduleItemValue = useCallback((position: number, field: string, value: string) => {
    const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
      if (index === position) {
        return {
          ...scheduleItem,
          [field]: field === 'week_day' ? Number(value) : value,
        };
      }

      return scheduleItem;
    });

    setScheduleItems(updatedScheduleItems);
  }, [scheduleItems]);

  return (
    <div id="page-teacher-form" className="container">
      <Header 
        title="Que incrível que você quer dar aulas."
        description="O primeiro passo é preencher esse formulário de inscrição"
      />

      <form onSubmit={handleCreateClass}>
        <fieldset>
          <legend>Seus dados</legend>

          <Input 
            label="Nome completo" 
            name="name" 
            type="text" 
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <Input 
            label="Avatar" 
            name="avatar" 
            type="text" 
            value={avatar}
            onChange={(event) => setAvatar(event.target.value)}
          />
          <Input 
            label="WhatsApp" 
            name="whatsapp" 
            type="text" 
            value={whatsapp}
            onChange={(event) => setWhatsapp(event.target.value)}
          />
          <Textarea 
            label="Biografia" 
            name="bio" 
            value={bio}
            onChange={(event) => setBio(event.target.value)}
          />

        </fieldset>

        <fieldset>
          <legend>Sobre a aula</legend>

          <Select 
            title="Selecione uma matéria"
            label="Matéria" 
            name="subject" 
            value={subject}
            onChange={(event) => setSubject(event.target.value)}
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
          <Input 
            label="Custo da sua hora por aula" 
            name="cost" 
            type="text" 
            value={cost}
            onChange={(event) => setCost(event.target.value)}
          />
          
        </fieldset>

        <fieldset>
          <legend>
            Horários disponíveis
            <button type="button" onClick={addNewScheduleItem}>+ Novo horário</button>
          </legend>
          
          {scheduleItems.map((scheduleItem, index) => {
            return (
              <div key={scheduleItem.week_day} className="schedule-item">
                <Select 
                  title="Selecione um dia"
                  label="Dia da semana" 
                  name="week_day" 
                  value={scheduleItem.week_day}
                  onChange={(event) => setScheduleItemValue(index, 'week_day', event.target.value)}
                  options={[
                    { value: '0', label: 'Domingo' },
                    { value: '1', label: 'Segunda-feira' },
                    { value: '2', label: 'Terça-feira' },
                    { value: '3', label: 'Quarta-feira' },
                    { value: '4', label: 'Quinta-feira' },
                    { value: '5', label: 'Sexta-feira' },
                    { value: '6', label: 'Sábado' },
                  ]}
                />
                <Input 
                  label="Das" 
                  name="from" 
                  type="time" 
                  value={scheduleItem.from}
                  onChange={(event) => setScheduleItemValue(index, 'from', event.target.value)}
                />
                <Input 
                  label="Até" 
                  name="to" 
                  type="time" 
                  value={scheduleItem.to}
                  onChange={(event) => setScheduleItemValue(index, 'to', event.target.value)}
                />
              </div>
            );
          })}
          
        </fieldset>

        <footer>
          <p>
            <img src={warningIcon} alt="Aviso importante"/>
            Importante! <br/>
            Preencha todos os dados
          </p>

          <button type="submit">Salvar cadastro</button>
        </footer>
      </form>
    </div>
  );
}

export default TeacherForm;