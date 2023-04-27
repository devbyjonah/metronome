import Metronome from "./components/metronome/Metronome";
import Header from "./components/Header";
import "./css/App.css";

import { useContext, useEffect, useState } from "react";

import { DarkModeContext } from "./context/DarkModeContext";

export default function App() {
  const [user, setUser] = useState({});
  useEffect(() => {
    // fetch profile details from express api
    (async () => {
      try {
        const response = await fetch("/user/profile");
        const user = await response.json();
        setUser(user);
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
      <Header user={user} />
      <div className="metronome-container">
        <Metronome />
      </div>
    </>
  );
}
