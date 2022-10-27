export const notesListElem = document.querySelector('.notes__list');
const noteTitleElem = document.querySelector('.notes__title');
const noteBodyElem = document.querySelector('.notes__body');

function createNotePreview(note) {
  const MAX_BODY_LENGTH = 60;
  const html = `
          <div class="notes__small-title">${note.title}</div>
          <div class="notes__small-body">${note.body.slice(
            0,
            MAX_BODY_LENGTH
          )}</div>
          <div class="notes__small-updated">${new Date(
            note.updated
          ).toDateString()}</div>
          <button class='notes__remove'>
            <i class='fa-regular fa-trash-can'></i>
          </button>
  `;
  const noteElem = document.createElement('div');
  noteElem.classList.add('notes__list-item');
  noteElem.innerHTML = html;

  noteElem.dataset.noteId = note.id;

  return noteElem;
}

function deselectNote() {
  const selected = document.querySelector('.notes__list-item--selected');
  if (selected) {
    selected.classList.remove('notes__list-item--selected');
  }
}

export default class DOMAPI {
  static displayNoteList(notes) {
    notesListElem.innerHTML = '';
    notes.forEach((note) => notesListElem.appendChild(createNotePreview(note)));
  }

  static displayNote(note) {
    noteTitleElem.value = note.title;
    noteBodyElem.value = note.body;
  }

  static getCurrentNote() {
    const selected = notesListElem.querySelector('.notes__list-item--selected');
    const id = selected ? selected.dataset.noteId : null;
    const note = {
      id,
      title: noteTitleElem.value.trim(),
      body: noteBodyElem.value.trim(),
    };

    return note;
  }

  static selectNote(note) {
    deselectNote();

    const noteElem = notesListElem.querySelector(
      `.notes__list-item[data-note-id="${note.id}"]`
    );

    noteElem.classList.add('notes__list-item--selected');

    this.displayNote(note);
  }

  static createNewNote() {
    deselectNote();

    noteTitleElem.value = '';
    noteBodyElem.value = '';
  }
}
