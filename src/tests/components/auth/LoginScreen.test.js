import { LoginScreen } from "../../../components/auth/LoginScreen";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { MemoryRouter } from "react-router-dom";
import { startGoogleLogin, startLoginEmail } from "../../../actions/auth";

jest.mock("../../../actions/auth", () => ({
  startGoogleLogin: jest.fn(),
  startLoginEmail: jest.fn()
  
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {
  auth: {},
  ui: {
    loading: false,
    msgError: null,
  },
};
let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <MemoryRouter>
      <LoginScreen />
    </MemoryRouter>
  </Provider>
);

describe("pruebas en loginScreen", () => {
  beforeEach(() => {
    store = mockStore(initState);
    jest.clearAllMocks();
  });
  test("debe mostrarse correctamente", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("debe disparar la accion de startLoginScreen", () => {
    wrapper.find(".google-btn").prop("onClick")();
    expect(startGoogleLogin).toHaveBeenCalled();
  });

  test("debe disparar el startLogin con los respectivos argumentos", () => {
    wrapper.find("form").prop("onSubmit")({ preventDefault() {} });
    expect(startLoginEmail).toHaveBeenCalledWith('correo@mail.com','123456')
  });
});
