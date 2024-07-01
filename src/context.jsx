import { createContext, useState, useContext, useEffect } from 'react';

const GlobalContext = createContext();

// using js to check if the user prefers dark mode
const getInitialDarkMode = () => {
	const prefersDarkMode = window.matchMedia(
		'(prefers-color-scheme: dark)'
	).matches;
	const storedDarkMode = localStorage.getItem('darkTheme');

	if (storedDarkMode === null) {
		return prefersDarkMode;
	}

	return storedDarkMode === 'true';
};

export const AppContext = ({ children }) => {
	const [isDarkTheme, setIsDarkTheme] = useState(getInitialDarkMode());
	const [searchTerm, setSearchTerm] = useState('dog');

	const toggleDarkTheme = () => {
		const newDarkTheme = !isDarkTheme;
		setIsDarkTheme(newDarkTheme);
		//const body = document.querySelector('body');
		//body.classList.toggle('dark-theme', newDarkTheme);

		// alternatively, you could use the following line:
		//document.body.classList.toggle('dark-theme', newDarkTheme); // this is the same as above two lines

		// let's save this to local storage
		localStorage.setItem('darkTheme', newDarkTheme);
	};

	useEffect(() => {
		const body = document.querySelector('body');
		body.classList.toggle('dark-theme', isDarkTheme);
	},[isDarkTheme]); //  by adding this coding to the dependency we could removed the commented code in the ToggleDarkTheme function.  This way every time we toggle, the useEffect will run and add the dark-theme class to the body

	return (
		<GlobalContext.Provider
			value={{ isDarkTheme, toggleDarkTheme, searchTerm, setSearchTerm }}>
			{children}
		</GlobalContext.Provider>
	);
};

export const useGlobalContext = () => useContext(GlobalContext);
