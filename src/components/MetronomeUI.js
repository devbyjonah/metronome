import { useRef, useState } from "react";
import { Button } from "react-bootstrap";

import MetronomeEngine from "../MetronomeEngine";

export default function Metronome() {
	// create new metronome engine instance as a ref
	// use ref allows changes without re-render and persists after re-renders
	let metronomeEngine = useRef(new MetronomeEngine());
	// create two state variables for tempo and playing values that effect the UI
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
			<p>
				BPM: <span id="tempo">{tempo}</span>
			</p>
			<div className="d-flex justify-content-evenly" id="controls">
				<Button onClick={changeTempo} value={-5}>
					-5
				</Button>
				<Button onClick={changeTempo} value={-1}>
					-
				</Button>
				<Button onClick={startStop}>
					{playing ? "Stop" : "Start"}
				</Button>
				<Button onClick={changeTempo} value={1}>
					+
				</Button>
				<Button onClick={changeTempo} value={5}>
					+5
				</Button>
			</div>
		</div>
	);
}
