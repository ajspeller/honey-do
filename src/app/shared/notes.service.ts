import { Injectable } from '@angular/core';
import { Note } from './Note.model';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  notes: Note[] = [];
  constructor() {}

  getAll(): Note[] {
    return this.notes;
  }

  get(id: number): Note {
    return this.notes[id];
  }

  getId(note: Note): number {
    return this.notes.indexOf(note);
  }

  add(note: Note): number {
    return this.notes.push(note) - 1;
  }

  update(id: number, title: string, body: string): void {
    this.notes[id].title = title;
    this.notes[id].body = body;
  }

  delete(id: number): void {
    this.notes.splice(id, 1);
  }
}
