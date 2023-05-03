import { useRef, useState } from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";

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
	const metronomeEngine = useRef(new MetronomeEngine());
	// creating state for values that interact with the UI
	const [playing, setPlaying] = useState(
		metronomeEngine.current.getPlaying()
	);
	const [tempo, setTempo] = useState(metronomeEngine.current.getTempo());
	const [currentBeat, setCurrentBeat] = useState(
		metronomeEngine.current.getCurrentBeat()
	);
	// passing state functions and metronomeEngine ref into handler functions
	const {
		startStop,
		changeTempo,
		changeVolume,
		changePitch,
		changeSignature,
		changeSubdivision,
	} = metronomeHandlers(setTempo, setPlaying, metronomeEngine);

	// beater animation callback function
	const animationCallback = (beatNumber, secondsPerBeat) => {
		setCurrentBeat(beatNumber);
		const beater = document.querySelector(".beater");
		beater.style.transition = `transform ${secondsPerBeat}s linear`;
		beater.style.transform = `rotate(${
			beater.style.transform === "rotate(30deg)" ? "-30deg" : "30deg"
		})`;
	};
	metronomeEngine.current.setAnimationCallback(animationCallback);

	// drag and drop slider
	let previousY = 0,
		currentY = 0;

	let startDrag = (e) => {
		previousY = e.clientY;
		document
			.querySelector(".metronomeBase")
			.addEventListener("mousemove", dragSlider);
		window.addEventListener("mouseup", endDrag);
	};

	let endDrag = (e) => {
		document
			.querySelector(".metronomeBase")
			.removeEventListener("mousemove", dragSlider);
	};

	let dragSlider = (e) => {
		currentY = e.clientY;
		let diff = currentY - previousY;
		let percentage = diff / 788.5; // refactor to use current height of sliderContainer + slider
		let newTempo = tempo - Math.round(percentage * 180);
		changeTempo(newTempo);
	};

	return (
		<div className="metronomeBase">
			<div className="beater"></div>
			<div className="beater-fixed">
				<div className="sliderContainer">
					<div
						className="slider"
						onMouseDown={startDrag}
						style={{ bottom: ((tempo - 40) / 180) * 100 + "%" }}
					>
						{tempo}
					</div>
				</div>
			</div>
			<MetronomeButton
				label={playing ? "Stop" : "Start"}
				onClick={startStop}
				className="startStop"
			/>
		</div>
	);
}
