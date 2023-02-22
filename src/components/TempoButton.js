import Button from "react-bootstrap/Button";
export default function TempoButton({ changeTempo, value }) {
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
			variant="dark"
			onClick={changeTempo}
			value={value}
		>
			{label}
		</Button>
	);
}
