import { useRef, useState } from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";

import MetronomeScreen from "./MetronomeScreen";
import MetronomeEngine from "../../MetronomeEngine";
import Sliders from "./Sliders";
import MetronomeButton from "./MetronomeButton";

import "../../css/Metronome.css";

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
				<ButtonGroup className="w-50 mx-1">
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
				<ButtonGroup className="w-50 mx-1">
					<MetronomeButton
						onClick={changeSignature}
						value="4"
						label="4/4"
					/>
					<MetronomeButton
						onClick={changeSignature}
						value="3"
						label="3/4"
					/>
					<MetronomeButton
						onClick={changeSignature}
						value="2"
						label="2/4"
					/>
					<MetronomeButton
						onClick={changeSignature}
						value="5"
						label="5/4"
					/>
				</ButtonGroup>
			</div>
		</div>
	);
}
