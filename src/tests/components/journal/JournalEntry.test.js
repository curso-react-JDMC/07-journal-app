import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { login, logout, startLogout } from "../../../actions/auth";
import { startNewNote } from "../../../actions/notes";
import { JournalEntry } from "../../../components/journal/JournalEntry";
import { Sidebar } from "../../../components/journal/Sidebar";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {};
let store = mockStore(initState);
store.dispatch = jest.fn();

const nota = {
  id: 10,
  date: 0,
  title: "Hola",
  body: "Mundo",
  url: "http://localhost:80",
};
const wrapper = mount(
  <Provider store={store}>
    <JournalEntry {...nota} />
  </Provider>
);

describe("pruebas en journalEntry", () => {
  test("debe mostrarse correctamente", () => {
    expect(wrapper).toMatchSnapshot();
  });
  test("debe activar la nota", () => {
    wrapper.find(".journal__entry").prop("onClick")();
    expect(store.dispatch).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith({
      payload: {
        body: "Mundo",
        date: 0,
        id: 10,
        title: "Hola",
        url: "http://localhost:80",
      },
      type: "[Notes] Set active note",
    });
  });
});
