class NotesAPI {
  static loadAllNotes() {
    const notes = JSON.parse(localStorage.getItem('notesapp-note')) || [];

    return notes;
  }

  static addNewNode(note) {
    const notes = this.loadAllNotes();

    const existed = notes.find((n) => note.id == n.id);
    note.updated = new Date().toISOString();

    if (existed) {
      // Update
      console.log('Dang update mot note co san trong storage');
      existed.title = note.title;
      existed.body = note.body;
      console.log('Before', existed.updated);
      existed.updated = note.updated;
      console.log('After', existed.updated);
    } else {
      // Save
      note.id = Math.floor(Math.random() * 100000);
      notes.push(note);
    }

    localStorage.setItem('notesapp-note', JSON.stringify(notes));
  }

  static deleteNote(id) {
    let notes = this.loadAllNotes();
    notes = notes.filter((note) => note.id != id);

    localStorage.setItem('notesapp-note', JSON.stringify(notes));
  }

  static deleteAllNotes() {
    localStorage.removeItem('notesapp-note');
  }
}
export default NotesAPI;
