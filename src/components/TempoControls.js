import Button from "react-bootstrap/Button";

export default function TempoControls({ changeTempo }) {
	return (
		<>
			<Button
				className="order-0"
				variant="dark"
				onClick={changeTempo}
				value={-5}
			>
				-5
			</Button>
			<Button
				className="order-0"
				variant="dark"
				onClick={changeTempo}
				value={-1}
			>
				-
			</Button>
			<Button
				className="order-2"
				variant="dark"
				onClick={changeTempo}
				value={1}
			>
				+
			</Button>
			<Button
				className="order-2"
				variant="dark"
				onClick={changeTempo}
				value={5}
			>
				+5
			</Button>
		</>
	);
}
