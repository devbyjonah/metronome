import Button from "react-bootstrap/Button";
import { useContext } from "react";
import { DarkModeContext } from "../../context/DarkModeContext";

export default function TempoButton({ changeTempo, value }) {
	const { darkMode } = useContext(DarkModeContext);
	let label;
	if (value === -1) {
		label = "-";
	} else if (value === 1) {
		label = "+";
	} else {
		label = value > 0 ? "+" + value : "-" + Math.abs(value);
	}

	return (
		<Button
			className="btn-lg"
			variant={darkMode ? "dark" : "light"}
			onClick={changeTempo}
			value={value}
		>
			{label}
		</Button>
	);
}
