import {
  uiFinishLoading,
  uiRemoveError,
  uiSetError,
  uiStartLoading,
} from "../../actions/ui";
import { types } from "../../types/types";

describe("pruebas en ui-actions", () => {
  test("todas las acciones deben funcionar", () => {
    const action = uiSetError("Help!");
    expect(action).toEqual({
      type: types.uiSetError,
      payload: "Help!",
    });

    const removeErrorAction = uiRemoveError();
    const startLoadingAction = uiStartLoading();
    const finishLoadingAction = uiFinishLoading();

    expect(removeErrorAction).toEqual({
        type: types.uiRemoveError,
    })
    expect(startLoadingAction).toEqual({
        type: types.uiStartLoading
    })
    expect(finishLoadingAction).toEqual({
        type: types.uiFinishLoading
    })
  });
});
