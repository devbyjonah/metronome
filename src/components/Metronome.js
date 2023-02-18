import { useRef, useState } from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";

import MetronomeScreen from "./MetronomeScreen";
// import TempoControls from "./TempoControls";
import ToggleButton from "./ToggleButton";
import MetronomeEngine from "../MetronomeEngine";
import Sliders from "./Sliders";
import Subdivisions from "./Subdivisions";
import TimeSignatures from "./TimeSignatures";
import TempoButton from "./TempoButton";

import "../css/Metronome.css";

export default function Metronome() {
	// store new metronome as a ref
	// ref.current allows changes without re-rendering and persists after re-renders
	let metronomeEngine = useRef(new MetronomeEngine());
	// creating state for values that interact with the UI
	let [playing, setPlaying] = useState(metronomeEngine.current.playing);
	let [tempo, setTempo] = useState(metronomeEngine.current.getTempo());
	// handler functions for interacting with metronomeEngine
	const startStop = () => {
		metronomeEngine.current.startStop();
		setPlaying(!playing);
	};

	const changeTempo = (event) => {
		let bpmDiff = Number(event.currentTarget.value);
		metronomeEngine.current.setTempo(
			metronomeEngine.current.getTempo() + bpmDiff
		);
		setTempo(metronomeEngine.current.getTempo());
	};

	const changeVolume = (event) => {
		metronomeEngine.current.setVolume(+event.currentTarget.value);
	};

	const changePitch = (event) => {
		metronomeEngine.current.setPitch(+event.currentTarget.value);
	};

	const changeSubdivision = (event) => {
		metronomeEngine.current.setSubdivision(+event.currentTarget.value);
	};

	const changeSignature = (event) => {
		metronomeEngine.current.setBeatsPerBar(+event.currentTarget.value);
	};

	return (
		<div className="metronome">
			<div className="h-50 d-flex align-items-end justify-content-evenly">
				<ButtonGroup>
					<TempoButton changeTempo={changeTempo} value={-5} />
					<TempoButton changeTempo={changeTempo} value={-1} />
				</ButtonGroup>
				<Sliders
					changeVolume={changeVolume}
					changePitch={changePitch}
				/>
				<div className="d-flex flex-column">
					<MetronomeScreen tempo={tempo} />
					<ToggleButton startStop={startStop} playing={playing} />
				</div>
				<ButtonGroup>
					<TempoButton changeTempo={changeTempo} value={1} />
					<TempoButton changeTempo={changeTempo} value={5} />
				</ButtonGroup>
			</div>
			<div className="h-25 d-flex mt-3">
				<Subdivisions changeSubdivision={changeSubdivision} />
				<TimeSignatures changeSignature={changeSignature} />
			</div>
		</div>
	);
}
