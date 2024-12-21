const smalls = [
	"a",
	"b",
	"c",
	"d",
	"e",
	"f",
	"g",
	"h",
	"i",
	"j",
	"k",
	"l",
	"m",
	"n",
	"o",
	"p",
	"q",
	"r",
	"s",
	"t",
	"u",
	"v",
	"w",
	"x",
	"y",
	"z",
];
const capitals = [
	"A",
	"B",
	"C",
	"D",
	"E",
	"F",
	"G",
	"H",
	"I",
	"J",
	"K",
	"L",
	"M",
	"N",
	"O",
	"P",
	"Q",
	"R",
	"S",
	"T",
	"U",
	"V",
	"W",
	"X",
	"Y",
	"Z",
];

const specials = [
	"!",
	"@",
	"#",
	"$",
	"%",
	"^",
	"&",
	"*",
	"(",
	")",
	"-",
	"_",
	"=",
	"+",
	"[",
	"]",
	"{",
	"}",
	";",
	":",
	'"',
	"'",
	"<",
	">",
	",",
	".",
	"?",
	"/",
];
export default function generateID() {
	const id = `${Math.floor(1000000000 + Math.random() * 9000000000)}`;
	return id;
}
function generateToken() {
	let token = "";
	for (let index = 0; index < 64; index++) {
		const whichArr = Math.floor(1 + Math.random() * 3);
		if (whichArr === 1) {
			token += smalls[Math.floor(Math.random() * 26)];
		} else if (whichArr === 2) {
			token += capitals[Math.floor(Math.random() * 26)];
		} else if (whichArr === 3) {
			token += specials[Math.floor(Math.random() * specials.length)];
		}
	}
	console.log(token);

	return token;
}
generateToken();
