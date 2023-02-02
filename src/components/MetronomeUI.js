import { Button } from "react-bootstrap";

import { useRef } from "react";

import MetronomeEngine from "../MetronomeEngine";

export default function Metronome() {
	let metronomeEngine = useRef(new MetronomeEngine());

	const startStop = () => {
		metronomeEngine.current.startStop();
	};

	const changeTempo = (event) => {
		metronomeEngine.current.tempo += Number(event.target.value);
		console.log(metronomeEngine.current.tempo);
	};

	return (
		<div className="container-fluid text-center mt-5">
			<p>
				BPM: <span id="tempo">{metronomeEngine.tempo}</span>
			</p>
			<div id="controls d-flex justify-content-evenly">
				<Button onClick={changeTempo} value={-5}>
					-5
				</Button>
				<Button onClick={changeTempo} value={-1}>
					-
				</Button>
				<Button onClick={startStop}>Start</Button>
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
