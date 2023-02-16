import { Button, ButtonGroup } from "react-bootstrap";

export default function Subdivisions({ changeSubdivision }) {
	return (
		<div className="w-50 m-1 d-flex flex-column h-100">
			<label htmlFor="subdivisions"></label>
			<ButtonGroup name="subdivisions">
				<Button
					className="p-0"
					onClick={changeSubdivision}
					value="1"
					variant="dark"
				>
					<img width={61} src="./quarter.svg" alt="quarter note" />
				</Button>
				<Button
					className="p-0"
					onClick={changeSubdivision}
					value="2"
					variant="dark"
				>
					<img width={61} src="./eighth.svg" alt="quarter note" />
				</Button>
				<Button
					className="p-0"
					onClick={changeSubdivision}
					value="3"
					variant="dark"
				>
					<img width={61} src="./triplet.svg" alt="quarter note" />
				</Button>
				<Button
					className="p-0"
					onClick={changeSubdivision}
					value="4"
					variant="dark"
				>
					<img width={61} src="./sixteenth.svg" alt="quarter note" />
				</Button>
			</ButtonGroup>
		</div>
	);
}
