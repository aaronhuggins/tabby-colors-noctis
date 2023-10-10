import { Injectable } from '@angular/core'
import { TerminalColorSchemeProvider, TerminalColorScheme } from 'tabby-terminal'

const schemeContents = require.context('../schemes/', false, /.*/)

@Injectable()
export class ColorSchemes extends TerminalColorSchemeProvider {
	async getSchemes (): Promise<TerminalColorScheme[]> {
		const schemes: TerminalColorScheme[] = []

		for (const filename of schemeContents.keys()) {
			if (!filename.startsWith('./')) {
				const contents = schemeContents(filename).default as string;
				const scheme = JSON.parse(contents) as TerminalColorScheme;
				schemes.push(scheme);
			}
		}

		return schemes
	}
}
