import { createSlice } from "@reduxjs/toolkit";

export const fontSlice = createSlice({
  name: "font",
  initialState: {
    value: "Inter",
  },
  reducers: {
    setFont: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setFont } = fontSlice.actions;

export const selectFont = (state) => state.font.value;

export default fontSlice.reducer;
