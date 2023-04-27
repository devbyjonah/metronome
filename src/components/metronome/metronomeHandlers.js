// metronomeHandlers is a function used to build the metronome handler functions
// that will be attached to various inputs on the metronome
// the function accepts 3 parameters for references to state setter functions and the metronomeEngine ref
export default function metronomeHandlers(
	setTempo,
	setPlaying,
	metronomeEngine
) {
	return {
		startStop: () => {
			metronomeEngine.current.startStop();
			let beater = document.querySelector(".beater");
			beater.style.transform = "rotate(0deg)";
			setPlaying((current) => !current);
		},
		changeTempo: (event) => {
			let bpmDiff = Number(event.currentTarget.value);
			metronomeEngine.current.setTempo(
				metronomeEngine.current.getTempo() + bpmDiff
			);
			setTempo(metronomeEngine.current.getTempo());
		},
		changeVolume: (event) => {
			metronomeEngine.current.setVolume(+event.currentTarget.value);
		},
		changePitch: (event) => {
			metronomeEngine.current.setPitch(+event.currentTarget.value);
		},
		changeSubdivision: (event) => {
			metronomeEngine.current.setSubdivision(+event.currentTarget.value);
		},
		changeSignature: (event) => {
			metronomeEngine.current.setBeatsPerBar(+event.currentTarget.value);
		},
	};
}
