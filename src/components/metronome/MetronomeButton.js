import Button from "react-bootstrap/Button";
import { useContext } from "react";
import { DarkModeContext } from "../../context/DarkModeContext";

export default function MetronomeButton({ label, onClick, value, className }) {
	let { darkMode } = useContext(DarkModeContext);
	let buttonLabel;
	if (label.endsWith(".svg")) {
		let theme = darkMode
			? { filter: "invert(0%)" }
			: { filter: "invert(100%)" };
		buttonLabel = (
			<img
				width={61}
				src={"./icons/" + label}
				alt="subdivision icon"
				style={theme}
			/>
		);
	} else if (label.length === 3) {
		buttonLabel = (
			<div>
				<span>{label[0]}</span>
				<hr className="my-0" />
				<span>{label[2]}</span>
			</div>
		);
	} else {
		buttonLabel = label;
	}

	return (
		<Button
			variant={darkMode ? "dark" : "light"}
			onClick={onClick}
			value={value}
			className={className + " btn-lg"}
		>
			{buttonLabel}
		</Button>
	);
}
