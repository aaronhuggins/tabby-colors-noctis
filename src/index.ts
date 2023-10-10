import { NgModule } from '@angular/core'
import { TerminalColorSchemeProvider } from 'tabby-terminal'
import { ColorSchemes } from './colorSchemes'

@NgModule({
	providers: [
		{
			provide: TerminalColorSchemeProvider,
			useClass: ColorSchemes,
			multi: true
		}
	]
})

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export default class NoctisColorsModule {}
