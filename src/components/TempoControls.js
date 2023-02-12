import { Button, ButtonGroup } from "react-bootstrap";

export default function TempoControls({ changeTempo }) {
	return (
		<ButtonGroup id="controls">
			<Button variant="dark" onClick={changeTempo} value={-5}>
				-5
			</Button>
			<Button variant="dark" onClick={changeTempo} value={-1}>
				-
			</Button>
			<Button>BPM</Button>
			<Button variant="dark" onClick={changeTempo} value={1}>
				+
			</Button>
			<Button variant="dark" onClick={changeTempo} value={5}>
				+5
			</Button>
		</ButtonGroup>
	);
}
