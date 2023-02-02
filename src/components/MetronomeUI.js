import { Button } from "react-bootstrap";

import { useRef } from "react";

import MetronomeEngine from "../MetronomeEngine";

export default function Metronome() {
	let metronomeEngine = useRef(new MetronomeEngine());

	const startStop = () => {
		console.log("ran");
		metronomeEngine.current.startStop();
	};

	return (
		<div className="container-fluid text-center mt-5">
			<p>
				BPM: <span id="tempo">120</span>
			</p>
			<div id="controls d-flex justify-content-evenly">
				<Button>-</Button>
				<Button onClick={startStop}>Start</Button>
				<Button>+</Button>
			</div>
		</div>
	);
}
