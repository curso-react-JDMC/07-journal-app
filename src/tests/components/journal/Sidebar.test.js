import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { login, logout, startLogout } from "../../../actions/auth";
import { startNewNote } from "../../../actions/notes";
import { Sidebar } from "../../../components/journal/Sidebar";


jest.mock("../../../actions/auth", () => ({
  login: jest.fn(),
  startLogout: jest.fn(),
}));

jest.mock("../../../actions/notes", () => ({
    startNewNote: jest.fn(),
  }));
  


const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {
  auth: {
      uid:"1",
      name:'juan david'
  },
  ui: {
    loading: false,
    msgError: null,
  },
  notes:{
      active:null,
      notes:[]
  }
};
let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={store}>
        <Sidebar />
    </Provider>
  );

describe('pruebas en Sidebar', () => { 

    test('debe mostrarse correctamente', () => { 
        //snapshot
        expect(wrapper).toMatchSnapshot();
    })
    
    test('debe llamar el logout', () => { 
        wrapper.find('.btn').prop('onClick')();
        expect(startLogout).toHaveBeenCalled();
    })
    
    test('debe llamar la accion de startNewNote', () => { 
        wrapper.find('.journal__new-entry').prop('onClick')();
        expect(startNewNote).toHaveBeenCalled();
    })
    
    
})