import { createSlice } from "@reduxjs/toolkit";

export const darkModeSlice = createSlice({
  name: "darkMode",
  initialState: {
    value: false,
  },
  reducers: {
    toggleDarkMode: (state) => {
      state.value = !state.value;
      state.value
        ? document.documentElement.classList.add("dark")
        : document.documentElement.classList.remove("dark");
    },
  },
});

export const { toggleDarkMode } = darkModeSlice.actions;

export const selectDarkMode = (state) => state.darkMode.value;

export default darkModeSlice.reducer;
