import React, { useState } from "react";
import "./style.css";
function App() {
	const buttonSymbols = [
		"Clear",
		"←",
		"/",
		"7",
		"8",
		"9",
		"*",
		"4",
		"5",
		"6",
		"-",
		"1",
		"2",
		"3",
		"+",
		".",
		"0",
		"=",
	];
	const [display, setDisplay] = useState("");
	const handleClick = (e) => {
		if (display === "Error") {
			setDisplay("");
		} else {
			switch (e.target.innerText) {
				case "←": {
					setDisplay((display) => display.slice(0, -1));
					break;
				}
				case "/":
				case "+":
				case "*":
				case "-": {
					if (
						display.charAt(display.length - 1) === "" ||
						display.charAt(display.length - 1) === "*" ||
						display.charAt(display.length - 1) === "-" ||
						display.charAt(display.length - 1) === "+" ||
						display.charAt(display.length - 1) === "/"
					) {
						break;
					} else {
						setDisplay((currDisplay) => (currDisplay += e.target.innerText));
					}
					break;
				}
				case "Clear": {
					setDisplay("");
					break;
				}
				case "=": {
					if (display === "") {
						break;
					} else {
						try {
							let evalDisplay = String(eval(display));
							setDisplay(evalDisplay);
						} catch (e) {
							setDisplay("Error");
							console.log(e);
						}
					}
					break;
				}
				case ".": {
					if (display === "") setDisplay("0");
					if (display.charAt(display.length - 1) === ".") break;
				}
				default: {
					setDisplay((currDisplay) => (currDisplay += e.target.innerText));
					break;
				}
			}
		}
	};

	return (
		<div className="container">
			<div
				className="display"
				placeholder="."
			>
				{display}
			</div>
			<div className="buttons">
				{buttonSymbols.map((b) => {
					return (
						<div
							onClick={(e) => handleClick(e)}
							className={`button ${b} ${b === "=" && "equals"}`}
							key={b}
						>
							{b}
						</div>
					);
				})}
			</div>
		</div>
	);
}
export default App;
