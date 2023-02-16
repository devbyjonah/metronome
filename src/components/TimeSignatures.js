import { Button, ButtonGroup } from "react-bootstrap";

export default function TimeSignatures({ changeSignature }) {
	return (
		<div className="w-50 m-1 d-flex flex-column">
			<label htmlFor="timeSignature"></label>
			<ButtonGroup name="timeSignature">
				<Button onClick={changeSignature} value={4} variant="dark">
					<div>
						<span>4</span>
						<hr className="my-0" />
						<span>4</span>
					</div>
				</Button>
				<Button onClick={changeSignature} value={3} variant="dark">
					<div>
						<span>3</span>
						<hr className="my-0" />
						<span>4</span>
					</div>
				</Button>
				<Button onClick={changeSignature} value={2} variant="dark">
					<div>
						<span>2</span>
						<hr className="my-0" />
						<span>4</span>
					</div>
				</Button>
				<Button onClick={changeSignature} value={5} variant="dark">
					<div>
						<span>5</span>
						<hr className="my-0" />
						<span>4</span>
					</div>
				</Button>
			</ButtonGroup>
		</div>
	);
}
