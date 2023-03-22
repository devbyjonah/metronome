import { ButtonGroup } from "react-bootstrap";
import MetronomeButton from "./MetronomeButton";

export default function TimeSignatureButtons({ changeSignature }) {
	return (
		<ButtonGroup className="signatures">
			<MetronomeButton
				className="py-0"
				onClick={changeSignature}
				value="4"
				label="4/4"
			/>
			<MetronomeButton
				className="py-0"
				onClick={changeSignature}
				value="3"
				label="3/4"
			/>
			<MetronomeButton
				className="py-0"
				onClick={changeSignature}
				value="2"
				label="2/4"
			/>
			<MetronomeButton
				className="py-0"
				onClick={changeSignature}
				value="5"
				label="5/4"
			/>
		</ButtonGroup>
	);
}
