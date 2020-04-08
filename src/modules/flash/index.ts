import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "rootReducer";

type FlashType = 'base' | 'success' | 'error';

interface FlashState {
  message: string
  type: FlashType
  visible: boolean
}

interface SetFlashPayload {
  message: string
  type: FlashType
}

const initialState: FlashState = {
  message: '',
  type: 'base',
  visible: false
}

const slice = createSlice({
  name: 'flash',
  initialState: initialState,
  reducers: {
    setFlash: (state, { payload: { message, type }}: PayloadAction<SetFlashPayload>) => {
      state.message = message;
      state.type = type;
      state.visible = true;
    }
  }
})

export const selector = (state: RootState) => state.flash

export const { 
  setFlash,
} = slice.actions
export default slice.reducer;