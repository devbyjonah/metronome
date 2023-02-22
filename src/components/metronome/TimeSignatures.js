import { Button, ButtonGroup } from "react-bootstrap";
import { useContext } from "react";
import { DarkModeContext } from "../../context/DarkModeContext";

export default function TimeSignatures({ changeSignature }) {
	const { darkMode } = useContext(DarkModeContext);
	let variant = darkMode ? "dark" : "light";

	return (
		<div className="w-50 m-1 d-flex flex-column">
			<label htmlFor="timeSignature"></label>
			<ButtonGroup name="timeSignature" style={{ height: 80 + "px" }}>
				<Button onClick={changeSignature} value={4} variant={variant}>
					<div className="fs-4">
						<span>4</span>
						<hr className="my-0" />
						<span>4</span>
					</div>
				</Button>
				<Button onClick={changeSignature} value={3} variant={variant}>
					<div className="fs-4">
						<span>3</span>
						<hr className="my-0" />
						<span>4</span>
					</div>
				</Button>
				<Button onClick={changeSignature} value={2} variant={variant}>
					<div className="fs-4">
						<span>2</span>
						<hr className="my-0" />
						<span>4</span>
					</div>
				</Button>
				<Button onClick={changeSignature} value={5} variant={variant}>
					<div className="fs-4">
						<span>5</span>
						<hr className="my-0" />
						<span>4</span>
					</div>
				</Button>
			</ButtonGroup>
		</div>
	);
}
