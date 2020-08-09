import { ANIMATION_ARRAY } from './animation.array';
import { Note } from './../../shared/Note.model';
import { NotesService } from './../../shared/notes.service';
import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from '@angular/core';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss'],
  animations: ANIMATION_ARRAY,
})
export class NotesListComponent implements OnInit {
  @ViewChild('filterInput', { static: false })
  filterInputElementRef: ElementRef<HTMLInputElement>;
  notes: Note[] = [];
  filteredNotes: Note[] = [];

  constructor(private noteService: NotesService) {}

  ngOnInit(): void {
    this.getNotes();
  }

  getNotes(): void {
    this.notes = this.noteService.getAll();
    this.filter('');
  }

  onDelete(note: Note): void {
    const noteId = this.noteService.getId(note);
    this.noteService.delete(noteId);
    this.filter(this.filterInputElementRef.nativeElement.value);
  }

  generateNoteUrl(note: Note): number {
    const noteId = this.noteService.getId(note);
    return noteId;
  }

  filter(query: string): void {
    query = query.toLowerCase().trim();
    const allResults = [];
    let terms = query.split(' ');
    terms = this.removeDuplicates(terms);
    terms.forEach((term) => {
      const results = this.relevantNotes(term);
      allResults.push(...results);
    });

    const uniqueResults = this.removeDuplicates(allResults);
    this.filteredNotes = uniqueResults;
    this.sortByRelevancy(allResults);
  }

  removeDuplicates(arr: any[]): any[] {
    const uniqueResults = new Set<any>();
    arr.forEach((item) => {
      uniqueResults.add(item);
    });
    return Array.from(uniqueResults);
  }

  relevantNotes(query: string): Note[] {
    query = query.toLowerCase().trim();
    const relevantNotes = this.notes.filter(
      (note) =>
        note.body.toLowerCase().trim().includes(query) ||
        note.title.toLowerCase().trim().includes(query)
    );
    return relevantNotes;
  }

  sortByRelevancy(searchResults: Note[]): void {
    const noteCountObject = {};
    searchResults.forEach((note) => {
      const noteId = this.noteService.getId(note);
      if (noteCountObject[noteId]) {
        noteCountObject[noteId] += 1;
      } else {
        noteCountObject[noteId] = 1;
      }
    });
    this.filteredNotes = this.filteredNotes.sort((a: Note, b: Note) => {
      const aId = this.noteService.getId(a);
      const bId = this.noteService.getId(b);
      const aCount = noteCountObject[aId];
      const bCount = noteCountObject[bId];
      return bCount - aCount;
    });
  }
}
