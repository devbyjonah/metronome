export default function Sliders({ changeVolume, changePitch }) {
	return (
		<div className="d-flex flex-column">
			<label htmlFor="volume">Volume</label>
			<input
				name="volume"
				onInput={changeVolume}
				type="range"
				min="0"
				max="1.5"
				step=".01"
				defaultValue="1"
			/>
			<label htmlFor="pitch">Pitch</label>
			<input
				name="pitch"
				onInput={changePitch}
				type="range"
				min="100"
				max="3000"
				step="1"
				defaultValue="1000"
			/>
		</div>
	);
}
