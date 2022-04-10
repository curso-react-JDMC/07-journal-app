/** * @jest-environment node */
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { startLoadingNotes, startNewNote, startSaveNote } from "../../actions/notes";
import { db } from "../../firebase/firebaseConfig";
import { types } from "../../types/types";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {
  auth: {
    uid: "TESTING",
  },
};
let store = mockStore(initState);

describe("pruebas con las acciones de notes", () => {
  beforeEach(() => {
    store = mockStore(initState);
  });

  test("debe crear una nueva nota startNewNote", async () => {
    await store.dispatch(startNewNote());
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: types.notesActive,
      payload: {
        body: "",
        date: expect.any(Number),
        id: expect.any(String),
        title: "",
      },
    });

    expect(actions[1]).toEqual({
      type: types.notesAddNew,
      payload: {
        body: "",
        date: expect.any(Number),
        id: expect.any(String),
        title: "",
      },
    });

    const docId = actions[0].payload.id;
    await db.doc(`/TESTING/journal/notes/${docId}`).delete();
  });
  test("startLoadingNotes debe cargar las notas", async () => {
    jest.useRealTimers();
    await store.dispatch(startLoadingNotes("TESTING"));
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: types.notesLoad,
      payload: expect.any(Array),
    });
    const expected = {
      id: expect.any(String),
      title: expect.any(String),
      body: expect.any(String),
      date: expect.any(Number),
    };
    expect(actions[0].payload[0]).toMatchObject(expected);
  });

  test('startSaveNote debe actualizar la nota', async () => { 
    const note = {
        id: 'stG0b3GuokUXPJO8ZcrN',
        title: 'TESTNote',
        body: 'NoteTest',
      };

      await store.dispatch(startSaveNote(note));
      const actions = store.getActions();
      expect(actions[0].type).toBe(types.notesUpdated);
      expect(actions[0].payload.note).toMatchObject(note);
      const docRef = await db.doc(`/TESTING/journal/notes/${note.id}`).get();
      expect(docRef.data().title).toBe(note.title);
      expect(docRef.data().body).toBe(note.body);
     
  })
});
