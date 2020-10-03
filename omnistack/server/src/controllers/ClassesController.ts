import { Request, Response } from 'express';
import knex from '../database/connection';
import convertHourToMinutes from '../utils/convertHourToMinutes';

interface ScheduleItem {
  week_day: number;
  from: string;
  to: string;
};

interface Filters extends ScheduleItem {
  subject: string;
  time: string;
};

class ClassesController {
  async index(request: Request, response: Response) {
    const filters = request.query as unknown as Filters;

    if (!filters.week_day || !filters.subject || !filters.time) {
      return response.status(400).json({
        error: 'Missing filters to search classes'
      });
    }

    const timeInMinutes = convertHourToMinutes(filters.time);

    const classes = await knex('classes')
      .whereExists(function () {
        this.select('class_schedules.*')
          .from('class_schedules')
          .whereRaw('class_schedules.class_id = classes.id')
          .whereRaw('class_schedules.week_day = ??', [Number(filters.week_day)])
          .whereRaw('class_schedules.from <= ??', [timeInMinutes])
          .whereRaw('class_schedules.to > ??', [timeInMinutes]);
      })
      .where('classes.subject', '=', filters.subject)
      .join('users', 'classes.user_id', '=', 'users.id')
      .select(['classes.*', 'users.*']);

    response.json(classes);
  }

  async store(request: Request, response: Response) {
    const {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost,
      schedule,
    } = request.body;
  
    const trx = await knex.transaction();
  
    try {
      const user = {
        name,
        avatar,
        whatsapp,
        bio,
      };
    
      const insertedUser = await trx('users').insert(user).returning('id');
    
      const user_id = insertedUser[0];
    
      const classes = {
        subject,
        cost,
        user_id,
      };
    
      const insertedClasses = await trx('classes').insert(classes).returning('id');
    
      const class_id = insertedClasses[0];
    
      const classSchedule = schedule.map((sch: ScheduleItem) => {
        return {
          week_day: sch.week_day,
          from: convertHourToMinutes(sch.from),
          to: convertHourToMinutes(sch.to),
          class_id
        };
      });
    
      await trx('class_schedules').insert(classSchedule);
    
      await trx.commit();
    
      return response.status(201).send();
    } catch (error) {
      await trx.rollback();
  
      return response.status(error.status).json({
        error: 'Unexpected error while creating new class'
      });
    }
  }
}

export default ClassesController;
