import Metronome from "./components/metronome/Metronome";
import Header from "./components/Header";

import { useEffect, useContext } from "react";

import { DarkModeContext } from "./context/DarkModeContext";

export default function App() {
  const { darkMode } = useContext(DarkModeContext);
  const theme = darkMode ? "text-bg-dark" : "text-bg-light";
  document.body.className = theme + " overflow-hidden";

  return (
    <>
      <Header />
      <Metronome />
    </>
  );
}
