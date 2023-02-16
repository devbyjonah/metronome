import { Button, ButtonGroup } from "react-bootstrap";

export default function Subdivisions({ changeSubdivision }) {
	return (
		<div className="h-25 d-flex flex-column align-items-center justify-content-end text-center">
			<label htmlFor="subdivisions">Subdivisions</label>
			<ButtonGroup name="subdivisions">
				<Button onClick={changeSubdivision} value="1" variant="dark">
					1
				</Button>
				<Button onClick={changeSubdivision} value="2" variant="dark">
					2
				</Button>
				<Button onClick={changeSubdivision} value="3" variant="dark">
					3
				</Button>
				<Button onClick={changeSubdivision} value="4" variant="dark">
					4
				</Button>
			</ButtonGroup>
		</div>
	);
}
