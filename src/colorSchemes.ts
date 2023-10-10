import { Injectable } from '@angular/core'
import { TerminalColorSchemeProvider, TerminalColorScheme } from 'tabby-terminal'

const schemeContents = require.context('../schemes/', false, /.*/)

@Injectable()
export class ColorSchemes extends TerminalColorSchemeProvider {
	async getSchemes (): Promise<TerminalColorScheme[]> {
		const schemes: TerminalColorScheme[] = []

		for (const filename of schemeContents.keys()) {
			if (!filename.startsWith('./')) {
				const scheme = schemeContents(filename) as TerminalColorScheme;
				schemes.push(scheme);
			}
		}

		return schemes
	}
}
