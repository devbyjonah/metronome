import { useEffect } from "react";

export default function MetronomeEngine() {
	// useEffect main callback runs on component did mount
	useEffect(() => {
		// create audio context instance on mount
		let metronomeContext = new AudioContext();
		// close audio context on component unmount
		return () => {
			metronomeContext.close();
		};
	}, []); // leave off array to run effect on every update or
	// include dependencies in array to run on dependency change

	return <div></div>;
}
