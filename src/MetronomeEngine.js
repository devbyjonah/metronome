/*
	MetronomeEngine Class controls all the logic for the metronome itself.
	setInterval is used to call the scheduler method based every lookahead ms
	the scheduler will continue to schedule notes into the queue until exceeding the scheduleAheadTime property limit
*/

export default class MetronomeEngine {
	constructor() {
		this.audioContext = null; // reference to audioContext from web audio API
		this.noteQueue = []; // stores all notes played/scheduled for debugging
		this.currentBeat = 0;
		this.beatsPerBar = 4;
		this.tempo = 120;
		this.lookahead = 25; // how often to call scheduler in ms
		this.scheduleAheadTime = 0.1; // how far ahead to schedule audio in sec
		this.nextNoteTime = 0.0; // when next note should play
		this.playing = false;
		this.intervalId = null; // reference to the setInterval making calls to scheduler
		this.volume = 1;
		this.pitch = 1000;
		this.subdivision = 1; // number of subdivisions per beat
	}

	nextBeat() {
		// move current note/time forward by a quarter note
		let secondsPerBeat = 60.0 / this.tempo;
		this.nextNoteTime += secondsPerBeat;
		// increment beat number, set to 0 if end of bar
		this.currentBeat++;
		if (this.currentBeat >= this.beatsPerBar) {
			this.currentBeat = 0;
		}
	}
	scheduleNote(beatNumber, time, onBeat) {
		// push not to queue for tracking
		this.noteQueue.push({ note: beatNumber, time: time });

		// create sound source (try switching to buffer ?)
		const osc = this.audioContext.createOscillator();
		const envelope = this.audioContext.createGain();
		const gainNode = new GainNode(this.audioContext);

		gainNode.gain.value = this.volume;
		// assign higher frequency for downbeats only
		let pitch;
		if (beatNumber === 0) {
			pitch = this.pitch * 1.2;
		} else {
			pitch = this.pitch;
		}
		osc.frequency.value = onBeat ? pitch : this.pitch * 0.8;
		//beatNumber % this.beatsPerBar === 0 ? this.pitch : this.pitch * 0.8;
		envelope.gain.value = 1;
		envelope.gain.exponentialRampToValueAtTime(1, time + 0.001);
		envelope.gain.exponentialRampToValueAtTime(0.001, time + 0.02);

		osc.connect(envelope);
		envelope.connect(gainNode).connect(this.audioContext.destination);

		osc.start(time);
		osc.stop(time + 0.03);
	}
	scheduler() {
		// continue scheduling notes as long as we are within the schedule ahead range
		while (
			this.nextNoteTime <
			this.audioContext.currentTime + this.scheduleAheadTime
		) {
			// find length of each subdivision
			let secondsPerBeat = 60.0 / this.tempo;
			let secondsPerSubdivision = secondsPerBeat / this.subdivision;
			// schedule a note for each subdivision of the beat
			for (let i = 0; i < this.subdivision; i++) {
				this.scheduleNote(
					this.currentBeat,
					this.nextNoteTime + secondsPerSubdivision * i,
					i === 0
				);
			}
			// move on to next beat
			this.nextBeat();
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
