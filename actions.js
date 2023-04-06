export function getActions() {
	return {
		runSpeedtest: {
			name: 'Run Speedtest',
			options: [],
			callback: () => {
				this.runTest()
			},
		},
	}
}
