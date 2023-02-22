import Button from "react-bootstrap/Button";

import { useContext } from "react";
import { DarkModeContext } from "../../context/DarkModeContext";

export default function ToggleButton({ startStop, playing }) {
	const { darkMode } = useContext(DarkModeContext);

	return (
		<Button
			className="btn-lg"
			variant={darkMode ? "dark" : "light"}
			onClick={startStop}
		>
			{playing ? "Stop" : "Start"}
		</Button>
	);
}
