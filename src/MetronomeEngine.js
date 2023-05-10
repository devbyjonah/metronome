/*
	MetronomeEngine Class controls all the logic for the metronome itself.
	setInterval is used to call the scheduler method based every _lookahead ms
	the scheduler will continue to schedule notes into the queue until exceeding the _scheduleAheadTime property limit
*/
export default class MetronomeEngine {
	constructor() {
		this._audioContext = null; // reference to _audioContext from web audio API
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
		this._animationCallback = null; // ***refactor animation callback to be an array of callbacks for more flexibility***
		this._tapDifferenceArray = []; // stores most recent intervals between taps
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

		osc.start(time);
		osc.stop(time + 0.03);

		if (onBeat) {
			this._animationCallback(beatNumber, 60.0 / this._tempo);
		}
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
	// surface level methods for use in the metronome react component
	startStop() {
		if (this._playing) {
			this._stop();
		} else {
			this._start();
		}
	}

	getPlaying() {
		return this._playing;
	}

	getCurrentBeat() {
		return this._currentBeat;
	}

	setAnimationCallback(callback) {
		this._animationCallback = callback;
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
		if (typeof tempo === "number" && tempo >= 40 && tempo <= 220) {
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
	/*
	 	update method keeps tapDifferenceArray length at 5 and clears array if latest diff
		is 50% greater or less than the average.
	*/
	_updateTapDifferenceArray(diff) {
		const average =
			this._tapDifferenceArray.reduce((a, b) => a + b, 0) /
			this._tapDifferenceArray.length;
		if (average >= diff * 1.5 || average <= diff * 0.5) {
			this._tapDifferenceArray = [];
		}
		if (this._tapDifferenceArray.length >= 5) {
			this._tapDifferenceArray.shift();
		}
		this._tapDifferenceArray.push(diff);
		return average;
	}
	/*
		tapTempo method
		- uses audio context to find time passed between taps
		- stores time difference(diff) between taps in tapDifferenceArray
	*/
	tapTempo() {
		// if no audio context, create one
		if (this._audioContext === null) {
			this._audioContext = new (window.AudioContext ||
				window.webkitAudioContext)();
		}
		if (this._previousTap) {
			const diff = this._audioContext.currentTime - this._previousTap;
			const average = this._updateTapDifferenceArray(diff);
			this.setTempo(Math.floor(60 / average));
		}
		this._previousTap = this._audioContext.currentTime;
	}
}
