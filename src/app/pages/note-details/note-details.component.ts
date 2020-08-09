import { NotesService } from './../../shared/notes.service';
import { Note } from './../../shared/Note.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.scss'],
})
export class NoteDetailsComponent implements OnInit {
  note: Note;
  noteId: number;
  new = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private noteService: NotesService
  ) {}

  ngOnInit(): void {
    this.note = new Note(null, null);
    this.route.params.subscribe((params: Params) => {
      if (params.id) {
        this.note = this.noteService.get(params.id);
        this.noteId = Number(params.id);
        this.new = false;
      } else {
        this.new = true;
      }
    });
  }

  onSubmit(form: NgForm): void {
    if (this.new) {
      this.noteService.add(form.value);
    } else {
      const { title, body } = form.value;
      this.noteService.update(this.noteId, title, body);
    }
    this.router.navigate(['/']);
  }

  onCancel(): void {
    this.router.navigate(['/']);
  }
}
