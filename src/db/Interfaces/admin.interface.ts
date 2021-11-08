import { Document } from 'mongoose';

export interface Admin extends Document{
    name: string;
    email: string;
    password: string;
    isActive: string;
}