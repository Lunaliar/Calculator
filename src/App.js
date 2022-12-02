import calculateString from "calculate-string";
import React, {useState} from "react";
import "./style.scss";

const buttonSymbols = [
	"CE",
	"←",
	"x²",
	"¹/x",
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
const operators = ["/", "+", "-", "*", "CE", "x²", "¹/x", "←", "="];
const basicOperators = operators.splice(0, 4);
function App() {
	const [answer, setAnswer] = useState(false);
	const [history, setHistory] = useState("2+2");
	const [input, setInput] = useState("0");

	const handleKey = (e) => {
		console.log(e.code);
		if (buttonSymbols.includes(e.code)) handleClick(e.code);
		else return;
	};
	const handleCalc = (val) => {
		let newHistory = history + " " + input + " " + val;
		let result = "";
		if (val === "CE") {
			console.log("on the right track");
			setInput("0");
			setHistory("");
			return;
		}
		if (val === "←") {
			setInput((prevInput) => prevInput.slice(0, -1));
			return;
		}
		if (val === "¹/x") {
			newHistory = `1/${history + input}`;
			result = calculateString(newHistory).substring(0, 14);
			setHistory(newHistory);
			setInput(result);
			setAnswer(true);
		}
		if (val === "x²") {
			if (operators.includes(history.slice(-1))) {
				newHistory = `${history + input} * ${history + input} =`;
				result = calculateString(newHistory).substring(0, 20);
				setInput(result);
				setHistory(newHistory);
			} else {
				newHistory = `${history + input} * ${history + input} =`;
				result = calculateString(newHistory).substring(0, 20);
				setInput(result);
				setHistory(newHistory);
			}
			setAnswer(true);
		}
		if (basicOperators.includes(val)) {
			if (operators.includes(newHistory.slice(-1))) {
				setHistory(newHistory.slice(0, -1) + " " + val);
				setInput("");
				return;
			} else {
				setHistory(newHistory + val);
				setInput("");
				return;
			}
		}
		if (val === "=") {
			setAnswer(true);
			const result = calculateString(newHistory);
			setHistory(newHistory);
			setInput(result);
			return;
		} else return console.log("not made yet");
	};

	const handleClick = (val) => {
		const newInput = input + val;
		const prevInput = input;
		if (!answer) {
			if (input === undefined) {
				setInput("0");
				return;
			}
			if (operators.includes(val)) {
				if (input === "0") return;
				return handleCalc(val);
			}
			if (input === "0" && val === ".") return setInput("0.");
			if (val === "." && input.includes(".")) return;
			else {
				console.log("add input val");
				if (input === "0") return setInput(val);
				return setInput(newInput);
			}
		} else {
			if (operators.includes(val)) setInput(val);
			else setInput(val);
			setHistory(prevInput);
			setAnswer(false);
			return;
		}
	};

	return (
		<div className="app">
			<div className="container">
				<div className="display">
					<div className="calc">{history}</div>
					<div className="input">{input}</div>
				</div>
				<div className="buttons">
					{buttonSymbols.map((b) => {
						return (
							<div
								onClick={(e) => handleClick(b.toString())}
								className={`button ${b === "=" ? "equal" : b} `}
								onKeyDown={(e) => handleKey(e)}
								key={b}
							>
								{b}
							</div>
						);
					})}
				</div>
			</div>
			<p>Developed by Sav Costabile</p>
		</div>
	);
}
export default App;
