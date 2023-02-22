import Button from "react-bootstrap/Button";

export default function ToggleButton({ startStop, playing }) {
	return (
		<Button className="btn-lg" variant="dark" onClick={startStop}>
			{playing ? "Stop" : "Start"}
		</Button>
	);
}
