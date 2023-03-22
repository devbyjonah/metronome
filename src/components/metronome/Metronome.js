import { useRef, useState } from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";

import MetronomeScreen from "./MetronomeScreen";
import Sliders from "./Sliders";
import MetronomeButton from "./MetronomeButton";
import TimeSignatureButtons from "./TimeSignatureButtons";
import SubdivisionButtons from "./SubdivisionButtons";

import MetronomeEngine from "../../MetronomeEngine";
import metronomeHandlers from "./metronomeHandlers";

import "../../css/Metronome.css";

export default function Metronome() {
	// store new metronome as a ref
	// ref.current allows changes without re-rendering and persists after re-renders
	let metronomeEngine = useRef(new MetronomeEngine());
	// creating state for values that interact with the UI
	let [playing, setPlaying] = useState(metronomeEngine.current.playing);
	let [tempo, setTempo] = useState(metronomeEngine.current.getTempo());
	// passing state functions and metronomeEngine ref into handler functions
	let {
		startStop,
		changeTempo,
		changeVolume,
		changePitch,
		changeSignature,
		changeSubdivision,
	} = metronomeHandlers(setTempo, setPlaying, metronomeEngine);

	return (
		<div className="metronome">
			<Sliders changeVolume={changeVolume} changePitch={changePitch} />
			<div className="my-3 mt-md-5 d-flex flex-wrap align-items-center justify-content-evenly">
				<ButtonGroup>
					<MetronomeButton
						onClick={changeTempo}
						value={-5}
						label="-5"
					/>
					<MetronomeButton
						onClick={changeTempo}
						value={-1}
						label="-"
					/>
				</ButtonGroup>
				<MetronomeScreen tempo={tempo} />
				<MetronomeButton
					className="order-1 order-sm-0 order-md-0 flex-wrap flex-sm-nowrap"
					onClick={startStop}
					label={playing ? "Stop" : "Start"}
				/>
				<ButtonGroup>
					<MetronomeButton
						onClick={changeTempo}
						value={1}
						label="+"
					/>
					<MetronomeButton
						onClick={changeTempo}
						value={5}
						label="+5"
					/>
				</ButtonGroup>
			</div>
			<div className="gap-1 d-flex flex-column align-items-center align-items-md-stretch flex-md-row mt-3">
				<TimeSignatureButtons changeSignature={changeSignature} />
				<SubdivisionButtons changeSubdivision={changeSubdivision} />
			</div>
		</div>
	);
}
