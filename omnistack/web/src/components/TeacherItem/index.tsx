import React, { useCallback } from 'react';

import whatsAppIcon from '../../assets/images/icons/whatsapp.svg';
import api from '../../services/api';

import './styles.css';

export interface Teacher {
  id: number;
  name: string;
  avatar: string;
  subject: string;
  bio: string;
  cost: number;
  whatsapp: string;
}

interface Props {
  teacher: Teacher;
}

const TeacherItem: React.FC<Props> = ({ teacher }) => {
  const createNewConnection = useCallback(() => {
    api.post('/connections', {
      user_id: teacher.id,
    })
  }, [teacher]);

  return (
    <article className="teacher-item">
      <header>
        <img src={teacher.avatar} alt="Haarlem"/>
        <div>
          <strong>{teacher.name}</strong>
          <span>{teacher.subject}</span>
        </div>
      </header>

      <p>
        {teacher.bio}
      </p>

      <footer>
        <p>
          Preço/hora
          <strong>R$ {teacher.cost}</strong>
        </p>
        <a target="blank" onClick={createNewConnection} href={`https://wa.me/${teacher.whatsapp}`}>
          <img src={whatsAppIcon} alt="WhatsApp"/>
          Entrar em contato
        </a>
      </footer>
    </article>
  );
}

export default TeacherItem;