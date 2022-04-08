import { types } from "../../types/types";

describe("pruebas en types", () => {
  test("debe retornar los types correctos", () => {
    const typesTest = {
      login: "[Auth] Login",
      logout: "[Auth] Logout",

      uiSetError: "[UI] set error",
      uiRemoveError: "[UI] remove error",
      uiStartLoading: "[UI] start loading",
      uiFinishLoading: "[UI] finish loading",

      notesAddNew: "[Notes] New note",
      notesActive: "[Notes] Set active note",
      notesLoad: "[Notes] Load notes",
      notesUpdated: "[Notes] Update note",
      notesFileUrl: "[Notes] Update image url",
      notesDelete: "[Notes] Delete note",
      notesLogoutCleaning: "[Notes] Logout cleaning note",
    };

    expect(types).toStrictEqual(typesTest);
  });
});
