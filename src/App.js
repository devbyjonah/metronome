import Metronome from "./components/metronome/Metronome";
import Header from "./components/Header";

import { useContext, useEffect } from "react";

import { DarkModeContext } from "./context/DarkModeContext";

export default function App() {
  useEffect(() => {
    // fetch profile details from express api
    (async () => {
      try {
        const response = await fetch("/user/profile");
        const user = await response.json();
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);
  // set body element to match theme
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
