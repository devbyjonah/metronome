import Button from "react-bootstrap/Button";

export default function ToggleButton({ startStop, playing }) {
	return (
		<Button variant="dark" onClick={startStop}>
			{playing ? "Stop" : "Start"}
		</Button>
	);
}
