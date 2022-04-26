import {
  login,
  logout,
  startLoginEmail,
  startLogout,
} from "../../actions/auth";
import { types } from "../../types/types";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {};
let store = mockStore(initState);

describe("pruebas con las acciones de auth", () => {
  beforeEach(() => {
    store = mockStore(initState);
  });

  test("login y logout deben crear la accion respectiva", () => {
    const uid = "abc";
    const displayName = "juan";
    const loginAction = login(uid, displayName);
    const logoutAction = logout();

    expect(loginAction).toEqual({
      type: types.login,
      payload: {
        uid,
        displayName,
      },
    });

    expect(logoutAction).toEqual({ type: types.logout });
  });

  test("debe realizar el startLogout", async () => {
    await store.dispatch(startLogout());
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: types.logout,
    });
    expect(actions[1]).toEqual({ type: types.notesLogoutCleaning });
  });

  test("debe iniciar el startLoginEmail", async () => {
    await store.dispatch(startLoginEmail("test@testing.com", "123456"));
    const actions = store.getActions();
    expect(actions[1]).toEqual({
      type: types.login,
      payload: { uid: "17T2TJ4wqnaXDow9OPaThcr3HBW2", displayName: null },
    });
  });
});
