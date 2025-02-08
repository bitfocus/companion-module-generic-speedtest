import type { ModuleInstance } from './main.js'

export function UpdateActions(self: ModuleInstance): void {
	self.setActionDefinitions({
		runSpeedtest: {
			name: 'Run Test',
			options: [],
			callback: async () => {
				await self.runTest()
			},
		},
	})
}
