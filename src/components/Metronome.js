import { useRef, useState } from "react";

import MetronomeScreen from "./MetronomeScreen";
import TempoControls from "./TempoControls";
import ToggleButton from "./ToggleButton";
import MetronomeEngine from "../MetronomeEngine";

export default function Metronome() {
	// create new metronome engine instance as a ref
	// useRef hook creates a ref object with current property
	// ref.current allows changes without re-rendering and persists after re-renders
	let metronomeEngine = useRef(new MetronomeEngine());
	// creating state for values that interact with the UI
	let [playing, setPlaying] = useState(metronomeEngine.current.playing);
	let [tempo, setTempo] = useState(metronomeEngine.current.tempo);
	// toggle metronome
	const startStop = () => {
		metronomeEngine.current.startStop();
		setPlaying(!playing);
	};
	// change tempo based on value of clicked button
	// !!!!!!!!!!(refactor to not use values changeable from DOM)!!!!!!!!!!!!!!
	const changeTempo = (event) => {
		metronomeEngine.current.tempo += Number(event.target.value);
		setTempo(metronomeEngine.current.tempo);
	};

	return (
		<div className="container text-center mt-5">
			<MetronomeScreen tempo={tempo} />
			<ToggleButton startStop={startStop} playing={playing} />
			<TempoControls changeTempo={changeTempo} />
		</div>
	);
}
