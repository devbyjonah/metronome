// eslint-disable-next-line no-unused-vars
export default class MetronomeEngine {
	constructor() {
		this.audioContext = null; // reference to audioContext from web audio API
		this.noteQueue = []; // stores all notes played/scheduled for debugging
		this.currentBeat = 0; // current beat in the bar
		this.beatsPerBar = 4; // total beats per bar
		this.tempo = 120;
		this.lookahead = 25; // how often to call scheduler in ms
		this.scheduleAheadTime = 0.1; // how far ahead to schedule audio in sec
		this.nextNoteTime = 0.0; // when next note should play
		this.playing = false;
		this.intervalId = null; // reference to the setInterval making calls to scheduler
	}

	nextNote() {
		// move current note/time forward by a quarter note
		let secondsPerBeat = 60.0 / this.tempo;
		this.nextNoteTime += secondsPerBeat;
		// increment beat number, set to 0 if end of bar
		this.currentBeat++;
		if (this.currentBeat === this.beatsPerBar) {
			this.currentBeat = 0;
		}
	}
	scheduleNote(beatNumber, time) {
		console.log("ran class");
		// push not to queue for tracking
		this.noteQueue.push({ note: beatNumber, time: time });

		// create sound source (try switching to buffer ?)
		const osc = this.audioContext.createOscillator();
		const envelope = this.audioContext.createGain();

		osc.frequency.value = beatNumber % this.beatsPerBar === 0 ? 1000 : 800;
		envelope.gain.value = 1;
		envelope.gain.exponentialRampToValueAtTime(1, time + 0.001);
		envelope.gain.exponentialRampToValueAtTime(0.001, time + 0.02);

		osc.connect(envelope);
		envelope.connect(this.audioContext.destination);

		osc.start(time);
		osc.stop(time + 0.03);
	}
	scheduler() {
		console.log(
			this.nextNoteTime,
			this.audioContext.currentTime,
			this.nextNoteTime <
				this.audioContext.curentTime + this.scheduleAheadTime
		);
		while (
			this.nextNoteTime <
			this.audioContext.currentTime + this.scheduleAheadTime
		) {
			this.scheduleNote(this.currentBeat, this.nextNoteTime);
			this.nextNote();
		}
	}
	start() {
		if (this.playing) return;

		if (this.audioContext === null) {
			this.audioContext = new (window.AudioContext ||
				window.webkitAudioContext)();
		}

		this.playing = true;

		this.currentBeat = 0;
		this.nextNoteTime = this.audioContext.currentTime + 0.05;

		this.intervalId = setInterval(() => this.scheduler(), this.lookahead);
	}
	stop() {
		this.playing = false;
		clearInterval(this.intervalId);
	}
	startStop() {
		if (this.playing) {
			this.stop();
		} else {
			this.start();
		}
	}
}
