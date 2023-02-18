import { useRef, useState } from "react";

import MetronomeScreen from "./MetronomeScreen";
import TempoControls from "./TempoControls";
import ToggleButton from "./ToggleButton";
import MetronomeEngine from "../MetronomeEngine";
import Sliders from "./Sliders";
import Subdivisions from "./Subdivisions";
import TimeSignatures from "./TimeSignatures";

import "../css/Metronome.css";

export default function Metronome() {
	// store new metronome as a ref
	// ref.current allows changes without re-rendering and persists after re-renders
	let metronomeEngine = useRef(new MetronomeEngine());
	// creating state for values that interact with the UI
	let [playing, setPlaying] = useState(metronomeEngine.current.playing);
	let [tempo, setTempo] = useState(metronomeEngine.current.tempo);
	// handler functions for interacting with metronomeEngine
	const startStop = () => {
		metronomeEngine.current.startStop();
		setPlaying(!playing);
	};

	const changeTempo = (event) => {
		metronomeEngine.current.tempo += Number(event.target.value);
		setTempo(metronomeEngine.current.tempo);
	};

	const changeVolume = (event) => {
		metronomeEngine.current.volume = Number(event.target.value);
	};

	const changePitch = (event) => {
		metronomeEngine.current.pitch = Number(event.target.value);
	};

	const changeSubdivision = (event) => {
		metronomeEngine.current.subdivision = Number(event.currentTarget.value);
	};

	const changeSignature = (event) => {
		metronomeEngine.current.setBeatsPerBar(+event.currentTarget.value);
	};

	return (
		<div className="metronome container">
			<div className="row h-25"></div>
			<div className="h-25 mt-5 center-strip">
				<div className="mx-auto row order-1 d-flex flex-column">
					<MetronomeScreen tempo={tempo} />
					<ToggleButton startStop={startStop} playing={playing} />
				</div>
				<TempoControls className="fs-1" changeTempo={changeTempo} />
				<Sliders
					changeVolume={changeVolume}
					changePitch={changePitch}
				/>
			</div>
			<div className="d-flex">
				<Subdivisions changeSubdivision={changeSubdivision} />
				<TimeSignatures changeSignature={changeSignature} />
			</div>
		</div>
	);
}
