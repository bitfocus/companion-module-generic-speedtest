import { type SomeCompanionConfigField } from '@companion-module/base'
type configOptions = {
	[key: string]: string | undefined
}
export interface ModuleConfig extends configOptions {
	info: string
}
export function GetConfigFields(): SomeCompanionConfigField[] {
	return [
		{
			type: 'static-text',
			id: 'info',
			width: 12,
			label: 'Information',
			value: 'Testing',
		},
	]
}
