import { Button, ButtonGroup } from "react-bootstrap";

export default function TimeSignatures({ changeSignature }) {
	return (
		<div className="d-flex flex-column align-items-center justify-content-end text-center">
			<label htmlFor="timeSignature">Time Signature</label>
			<ButtonGroup name="timeSignature">
				<Button onClick={changeSignature} value={4} variant="dark">
					4/4
				</Button>
				<Button onClick={changeSignature} value={3} variant="dark">
					3/4
				</Button>
				<Button onClick={changeSignature} value={2} variant="dark">
					2/4
				</Button>
				<Button onClick={changeSignature} value={5} variant="dark">
					5/4
				</Button>
			</ButtonGroup>
		</div>
	);
}
