import Button from "react-bootstrap/Button";
import { useContext } from "react";
import { DarkModeContext } from "../../context/DarkModeContext";

export default function MetronomeButton({ label, onClick, value, className }) {
	let { darkMode } = useContext(DarkModeContext);

	return (
		<Button
			variant={darkMode ? "light" : "dark"}
			onClick={onClick}
			value={value}
			className={className + " btn-lg"}
		>
			{label}
		</Button>
	);
}
