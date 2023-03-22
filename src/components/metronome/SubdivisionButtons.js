import { ButtonGroup } from "react-bootstrap";
import MetronomeButton from "./MetronomeButton";

export default function SubdivisionButtons({ changeSubdivision }) {
	return (
		<ButtonGroup className="subdivisions">
			<MetronomeButton
				onClick={changeSubdivision}
				value="1"
				label="quarter.svg"
				className="p-0"
			/>
			<MetronomeButton
				onClick={changeSubdivision}
				value="2"
				label="eighth.svg"
				className="p-0"
			/>
			<MetronomeButton
				onClick={changeSubdivision}
				value="3"
				label="triplet.svg"
				className="p-0"
			/>
			<MetronomeButton
				onClick={changeSubdivision}
				value="4"
				label="sixteenth.svg"
				className="p-0"
			/>
		</ButtonGroup>
	);
}
