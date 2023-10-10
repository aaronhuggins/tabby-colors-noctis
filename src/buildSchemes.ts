import type { TerminalColorScheme } from 'tabby-terminal'
import { writeFile } from 'node:fs/promises'

const ghApiBase = "https://api.github.com/repos";
const noctisRepo = "liviuschera/noctis";

interface VscodeTheme {
	name: string;
	colors: {
		"editor.background": string;
		"editor.selectionBackground": string;
		"editorCursor.foreground": string;
		"tab.activeForeground": string;
		"terminal.ansiBlack": string;
		"terminal.ansiRed": string;
		"terminal.ansiGreen": string;
		"terminal.ansiYellow": string;
		"terminal.ansiBlue": string;
		"terminal.ansiMagenta": string;
		"terminal.ansiCyan": string;
		"terminal.ansiWhite": string;
		"terminal.ansiBrightBlack": string;
		"terminal.ansiBrightRed": string;
		"terminal.ansiBrightGreen": string;
		"terminal.ansiBrightYellow": string;
		"terminal.ansiBrightBlue": string;
		"terminal.ansiBrightMagenta": string;
		"terminal.ansiBrightCyan": string;
		"terminal.ansiBrightWhite": string;
	};
}

const schemeThemeMap = {
	name: "name",
	background: "editor.background",
	foreground: "tab.activeForeground",
	cursor: "editorCursor.foreground",
	colors: [
		"terminal.ansiBlack",
		"terminal.ansiRed",
		"terminal.ansiGreen",
		"terminal.ansiYellow",
		"terminal.ansiBlue",
		"terminal.ansiMagenta",
		"terminal.ansiCyan",
		"terminal.ansiWhite",
		"terminal.ansiBrightBlack",
		"terminal.ansiBrightRed",
		"terminal.ansiBrightGreen",
		"terminal.ansiBrightYellow",
		"terminal.ansiBrightBlue",
		"terminal.ansiBrightMagenta",
		"terminal.ansiBrightCyan",
		"terminal.ansiBrightWhite"
	],
	selection: "editor.selectionBackground"
} as const

async function main () {
	const filesRes = await fetch(`${ghApiBase}/${noctisRepo}/contents/themes`);
	const files = await filesRes.json() as {
		name: string
		download_url: string
	}[]

	for (const { name: filename, download_url: themeUrl } of files) {
		const vscodeThemeRes = await fetch(themeUrl);
		const vscodeTheme = await vscodeThemeRes.json() as VscodeTheme;
		const colorScheme = {} as TerminalColorScheme;
		colorScheme.name = vscodeTheme[schemeThemeMap.name];
		colorScheme.foreground = vscodeTheme.colors[schemeThemeMap.foreground];
		colorScheme.background = vscodeTheme.colors[schemeThemeMap.background];
		colorScheme.cursor = vscodeTheme.colors[schemeThemeMap.cursor];
		colorScheme.colors = [];
		colorScheme.selection = vscodeTheme.colors[schemeThemeMap.selection];
		const { length } = schemeThemeMap.colors;

		for (let i = 0; i < length; i++) {
			const colorKey = schemeThemeMap.colors[i];
			colorScheme.colors[i] = vscodeTheme.colors[colorKey];
		}

		await writeFile(`./schemes/${filename}`, JSON.stringify(colorScheme, null, '\t'), 'utf-8');
	}
}

main().then(console.info, console.error);
