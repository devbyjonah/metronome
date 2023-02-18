import { Button, ButtonGroup } from "react-bootstrap";

export default function Subdivisions({ changeSubdivision }) {
	return (
		<div className="w-50 m-1 d-flex flex-column">
			<label htmlFor="subdivisions"></label>
			<ButtonGroup style={{ height: 80 + "px" }} name="subdivisions">
				<Button
					className="p-0"
					onClick={changeSubdivision}
					value="1"
					variant="dark"
				>
					<img
						width={61}
						src="./icons/quarter.svg"
						alt="quarter note"
					/>
				</Button>
				<Button
					className="p-0"
					onClick={changeSubdivision}
					value="2"
					variant="dark"
				>
					<img
						width={61}
						src="./icons/eighth.svg"
						alt="quarter note"
					/>
				</Button>
				<Button
					className="p-0"
					onClick={changeSubdivision}
					value="3"
					variant="dark"
				>
					<img
						width={61}
						src="./icons/triplet.svg"
						alt="quarter note"
					/>
				</Button>
				<Button
					className="p-0"
					onClick={changeSubdivision}
					value="4"
					variant="dark"
				>
					<img
						width={61}
						src="./icons/sixteenth.svg"
						alt="quarter note"
					/>
				</Button>
			</ButtonGroup>
		</div>
	);
}
