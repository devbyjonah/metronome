import { Button, ButtonGroup } from "react-bootstrap";
import { useContext } from "react";
import { DarkModeContext } from "../../context/DarkModeContext";

export default function Subdivisions({ changeSubdivision }) {
	const { darkMode } = useContext(DarkModeContext);
	let variant = darkMode ? "dark" : "light";
	let theme = darkMode
		? { filter: "invert(0%)" }
		: { filter: "invert(100%)" };

	return (
		<div className="w-50 m-1 d-flex flex-column">
			<label htmlFor="subdivisions"></label>
			<ButtonGroup style={{ height: 80 + "px" }} name="subdivisions">
				<Button
					className="p-0"
					onClick={changeSubdivision}
					value="1"
					variant={variant}
				>
					<img
						width={61}
						src="./icons/quarter.svg"
						alt="quarter note"
						style={theme}
					/>
				</Button>
				<Button
					className="p-0"
					onClick={changeSubdivision}
					value="2"
					variant={variant}
				>
					<img
						width={61}
						src="./icons/eighth.svg"
						alt="quarter note"
						style={theme}
					/>
				</Button>
				<Button
					className="p-0"
					onClick={changeSubdivision}
					value="3"
					variant={variant}
				>
					<img
						width={61}
						src="./icons/triplet.svg"
						alt="quarter note"
						style={theme}
					/>
				</Button>
				<Button
					className="p-0"
					onClick={changeSubdivision}
					value="4"
					variant={variant}
				>
					<img
						width={61}
						src="./icons/sixteenth.svg"
						alt="quarter note"
						style={theme}
					/>
				</Button>
			</ButtonGroup>
		</div>
	);
}
