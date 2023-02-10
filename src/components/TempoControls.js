import { Button } from "react-bootstrap";

export default function TempoControls({ changeTempo }) {
	return (
		<div className="d-flex justify-content-evenly" id="controls">
			<Button onClick={changeTempo} value={-5}>
				-5
			</Button>
			<Button onClick={changeTempo} value={-1}>
				-
			</Button>
			<Button onClick={changeTempo} value={1}>
				+
			</Button>
			<Button onClick={changeTempo} value={5}>
				+5
			</Button>
		</div>
	);
}
