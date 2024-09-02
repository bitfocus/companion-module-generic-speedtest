export function getActions() {
	return {
		runSpeedtest: {
			name: 'Run Test',
			options: [],
			callback: () => {
				this.runTest()
			},
		},
	}
}
