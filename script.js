import NotesAPI from './notes-api.js';
import DOMAPI, { notesListElem } from './dom-api.js';

// NotesAPI.addNewNode({
//   title: 'This is my second note',
//   body: 'This is not thing over here',
// });

// NotesAPI.deleteAllNotes();

let notes = NotesAPI.loadAllNotes();
DOMAPI.displayNoteList(notes);

function refreshNote() {
  notes = NotesAPI.loadAllNotes();
  DOMAPI.displayNoteList(notes);
}

function saveCurrentNote() {
  const currentNote = DOMAPI.getCurrentNote();
  if (!(currentNote.title === '' || currentNote.body === '')) {
    console.log('Luu note', currentNote, 'vao storage');
    NotesAPI.addNewNode({
      id: currentNote.id,
      title: currentNote.title,
      body: currentNote.body,
    });

    refreshNote();
  } else {
    console.log('Khong luu note hien tai vi khong co noi dung');
  }
}

const addNewButton = document.querySelector('.notes__add');

addNewButton.addEventListener('click', () => {
  saveCurrentNote();

  DOMAPI.createNewNote();
});

notesListElem.addEventListener('click', (e) => {
  const notePreview = e.target.closest('.notes__list-item');

  if (e.target.closest('.notes__remove')) {
    const noteId = notePreview.dataset.noteId;
    console.log('Dang xoa note co id', noteId);
    NotesAPI.deleteNote(noteId);
    refreshNote();
    return;
  }

  if (!notePreview) {
    return;
  }

  const id = notePreview.dataset.noteId;
  const index = notes.findIndex((note) => note.id == id);

  if (index != -1) {
    console.log('Note da duoc luu trong storage');
    // TODO: save note data before switch
    saveCurrentNote();

    const note = notes[index];
    DOMAPI.selectNote(note);
  }
});
