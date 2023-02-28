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
			<div className="h-50 d-flex align-items-end justify-content-evenly">
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
				<Sliders
					changeVolume={changeVolume}
					changePitch={changePitch}
				/>
				<div className="d-flex flex-column">
					<MetronomeScreen tempo={tempo} />
					<MetronomeButton
						onClick={startStop}
						label={playing ? "Stop" : "Start"}
					/>
				</div>
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
			<div className="d-flex mt-3">
				<SubdivisionButtons changeSubdivision={changeSubdivision} />
				<TimeSignatureButtons changeSignature={changeSignature} />
			</div>
		</div>
	);
}
