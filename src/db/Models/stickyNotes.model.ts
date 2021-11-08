/* eslint-disable linebreak-style */
import mongoose, { Types } from 'mongoose';
import {collections} from '../collections';
import db from '../db';

const schemaNotes = new mongoose.Schema(
  {
    id: {
        type: String,
        required: true,
        unique: true,
    },
    userId: {
        type: String,
        required: true,
    },
    top: {
        type: Number,
        required: true,
    },
    left: {
        type: Number,
        required: true,
    },
    content: {
        type: String,
    },
    title: {
        type: String,
    },
    color: {
        type: String,
    },
  },
);

const NOTES_DOC = db.model(collections.notes, schemaNotes, collections.notes);

export default NOTES_DOC;
