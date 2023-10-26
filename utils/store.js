import { configureStore } from "@reduxjs/toolkit";

import darkModeReducer from "./darkModeSlice";
import fontReducer from "./fontSlice";

export const store = configureStore({
  reducer: {
    darkMode: darkModeReducer,
    font: fontReducer,
  },
});
