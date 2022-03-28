import { types } from "../types/types";


export const uiSetError = (error)=> ({
    type: types.uiSetError,
    payload:error
})


export const uiRemoveError = ()=> ({
    type: types.uiRemoveError
})

export const uiStartLoading = ()=> ({
    type: types.uiStartLoading,
})

export const uiFinishLoading = ()=> ({
    type: types.uiFinishLoading,
})