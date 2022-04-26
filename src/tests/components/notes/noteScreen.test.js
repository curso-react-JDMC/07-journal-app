import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { activeNote } from "../../../actions/notes";
import { Sidebar } from "../../../components/journal/Sidebar";
import { NoteScreen } from "../../../components/notes/NoteScreen";

jest.mock("../../../actions/notes", () => ({
  activeNote: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {
  auth: {
    uid: "1",
    name: "juan david",
  },
  ui: {
    loading: false,
    msgError: null,
  },
  notes: {
    active: {
      id: "stG0b3GuokUXPJO8ZcrN",
      title: "title",
      body: "mundo",
    },
    notes: [],
  },
};
let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <NoteScreen />
  </Provider>
);

describe("pruebas en noteScreen", () => {
  test("debe mostrarse correctamente", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("debe disparar el activeNore", () => {
    wrapper.find('input[name="title"]').simulate("change", {
      target: {
        name: "title",
        value: "Hola",
      },
    });

    expect(activeNote).toHaveBeenLastCalledWith("stG0b3GuokUXPJO8ZcrN", {
      body: "mundo",
      id: "stG0b3GuokUXPJO8ZcrN",
      title: "Hola",
    });
  });
});
