import { createContext } from 'react';
import { userStore } from '@/app/store/userData';
import { holidaysStore } from './../store/holidaysData';

export const UserContext = createContext({ userStore });
export const HolidaysContext = createContext({ holidaysStore });