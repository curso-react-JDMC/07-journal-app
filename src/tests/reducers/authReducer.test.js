import { authReducer } from "../../reducers/authReducer";
import { types } from "../../types/types";

describe("pruebas en authReducer", () => {
  test("debe realizar el login", () => {
    const initState = {};
    const action = {
      type: types.login,
      payload: {
        uid: "abc",
        displayName: "Juan David",
      },
    };
    const state = authReducer(initState, action);
    expect(state).toEqual({uid:'abc',name:'Juan David'})    
  });

  test("debe realizar el logout", () => {
    const initState = {
        uid:'3456789',
        name:'Juan David',
    };
    const action = {
      type: types.logout,
    };
    const state = authReducer(initState, action);
    expect(state).toEqual({});   
  });

  test("debe retornar el initState", () => {
    const initState = {
        uid:'3456789',
        name:'Juan David',
    };
    const action = {
      type: 'No exists type',
    };
    const state = authReducer(initState, action);
    expect(state).toEqual(initState);   
  });

});


