export default function metronomeHandlers(
	setTempo,
	setPlaying,
	metronomeEngine
) {
	return {
		startStop: () => {
			metronomeEngine.current.startStop();
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
