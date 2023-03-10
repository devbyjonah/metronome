import { useState, createContext } from "react";

const DarkModeContext = createContext(true);

function DarkModeProvider(props) {
	const [darkMode, setDarkMode] = useState(true);
	const toggleDarkMode = () => {
		setDarkMode(!darkMode);
	};
	return (
		<div>
			<DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
				{props.children}
			</DarkModeContext.Provider>
		</div>
	);
}

export { DarkModeContext, DarkModeProvider };
