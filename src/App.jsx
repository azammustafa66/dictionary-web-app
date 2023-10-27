import { Provider, useSelector } from "react-redux";

import Body from "./layout/Body";
import Header from "./layout/Header";
import { selectDarkMode } from "../utils/darkModeSlice";
import { selectFont } from "../utils/fontSlice";
import { store } from "../utils/store";

function MainContent() {
  const isDarkMode = useSelector(selectDarkMode);
  const font = useSelector(selectFont);

  const bgColorClass = isDarkMode ? "bg-[#050505]" : "";

  return (
    <div className={`mx-auto min-h-screen ${bgColorClass} font-${font}`}>
      <Header />
      <Body />
    </div>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <MainContent />
    </Provider>
  );
}
