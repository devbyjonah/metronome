/*
	MetronomeEngine Class controls all the logic for the metronome itself.
	setInterval is used to call the scheduler method based every _lookahead ms
	the scheduler will continue to schedule notes into the queue until exceeding the _scheduleAheadTime property limit
*/

export default class MetronomeEngine {
	constructor(animationCallback) {
		this._audioContext = null; // reference to _audioContext from web audio API
		this._noteQueue = []; // stores all notes played/scheduled for debugging
		this._currentBeat = 0;
		this._beatsPerBar = 4;
		this._tempo = 120;
		this._lookahead = 25; // how often to call scheduler in ms
		this._scheduleAheadTime = 0.1; // how far ahead to schedule audio in sec
		this._nextNoteTime = 0.0; // when next note should play
		this._playing = false;
		this._intervalId = null; // reference to the setInterval making calls to scheduler
		this._volume = 1;
		this._pitch = 1000;
		this._subdivision = 1; // number of subdivisions per beat
		this._animationCallback = animationCallback;
	}

	setSubdivision(subdivision) {
		if (
			typeof subdivision === "number" &&
			subdivision > 0 &&
			subdivision < 5 &&
			Math.floor(subdivision) === subdivision
		) {
			this._subdivision = subdivision;
		}
	}

	getPitch() {
		return this._pitch;
	}

	setPitch(pitch) {
		if (typeof pitch === "number" && pitch > 99 && pitch < 3001) {
			this._pitch = pitch;
		}
	}

	getVolume() {
		return this._volume;
	}

	setVolume(volume) {
		if (typeof volume === "number" && volume > -1 && volume < 3) {
			this._volume = volume;
		}
	}

	getTempo() {
		return this._tempo;
	}

	setTempo(tempo) {
		if (typeof tempo === "number" && tempo > 0 && tempo < 500) {
			this._tempo = tempo;
		}
	}

	setBeatsPerBar(beatsPerBar) {
		if (
			typeof beatsPerBar === "number" &&
			beatsPerBar > 0 &&
			beatsPerBar < 6
		) {
			this._beatsPerBar = beatsPerBar;
		}
	}

	_nextBeat() {
		// move current note/time forward by a quarter note
		let secondsPerBeat = 60.0 / this._tempo;
		this._nextNoteTime += secondsPerBeat;
		// increment beat number, set to 0 if end of bar
		this._currentBeat++;
		if (this._currentBeat >= this._beatsPerBar) {
			this._currentBeat = 0;
		}
	}
	_scheduleNote(beatNumber, time, onBeat) {
		// push not to queue for tracking
		this._noteQueue.push({ note: beatNumber, time: time });

		// create sound source (try switching to buffer ?)
		const osc = this._audioContext.createOscillator();
		const envelope = this._audioContext.createGain();
		const gainNode = new GainNode(this._audioContext);

		gainNode.gain.value = this._volume;
		// assign higher frequency for downbeats only
		let pitch = beatNumber === 0 ? this._pitch * 1.2 : this._pitch;

		osc.frequency.value = onBeat ? pitch : this._pitch * 0.8;
		//beatNumber % this._beatsPerBar === 0 ? this._pitch : this._pitch * 0.8;
		envelope.gain.value = 1;
		envelope.gain.exponentialRampToValueAtTime(1, time + 0.001);
		envelope.gain.exponentialRampToValueAtTime(0.001, time + 0.02);

		osc.connect(envelope);
		envelope.connect(gainNode).connect(this._audioContext.destination);

		this._animationCallback(beatNumber);
		osc.start(time);
		osc.stop(time + 0.03);
	}
	_scheduler() {
		// continue scheduling notes as long as we are within the schedule ahead range
		while (
			this._nextNoteTime <
			this._audioContext.currentTime + this._scheduleAheadTime
		) {
			// find length of each subdivision
			let secondsPerBeat = 60.0 / this._tempo;
			let secondsPerSubdivision = secondsPerBeat / this._subdivision;
			// schedule a note for each subdivision of the beat
			for (let i = 0; i < this._subdivision; i++) {
				this._scheduleNote(
					this._currentBeat,
					this._nextNoteTime + secondsPerSubdivision * i,
					i === 0
				);
			}
			// move on to next beat
			this._nextBeat();
		}
	}
	_start() {
		if (this._playing) return;

		if (this._audioContext === null) {
			this._audioContext = new (window.AudioContext ||
				window.webkitAudioContext)();
		}

		this._playing = true;

		this._currentBeat = 0;
		this._nextNoteTime = this._audioContext.currentTime + 0.05;

		this._intervalId = setInterval(
			() => this._scheduler(),
			this._lookahead
		);
	}
	_stop() {
		this._playing = false;
		clearInterval(this._intervalId);
	}
	startStop() {
		if (this._playing) {
			this._stop();
		} else {
			this._start();
		}
	}
}
