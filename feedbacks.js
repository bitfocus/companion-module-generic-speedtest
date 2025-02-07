import { combineRgb } from '@companion-module/base'

export function getFeedbacks() {
	const feedbacks = {}

	const ColorGreen = combineRgb(0, 200, 0)

	let testOptions = [
		{ id: 'downloadSpeed', label: 'Download Speed' },
		{ id: 'uploadSpeed', label: 'Upload Speed' },
		{ id: 'ping', label: 'Ping' },
		{ id: 'jitter', label: 'Jitter' },
	]

	let comparison = [
		{ id: 'greater', label: '>' },
		{ id: 'less', label: '<' },
	]

	feedbacks['resultCheck'] = {
		type: 'boolean',
		name: 'Change style based on test results',
		description: 'Change style if selected measurement is greater than value',
		defaultStyle: {
			bgcolor: ColorGreen,
		},
		options: [
			{
				type: 'dropdown',
				label: 'Measurement',
				id: 'measure',
				choices: testOptions,
				default: 'downloadSpeed',
			},
			{
				type: 'dropdown',
				label: 'Comparison',
				id: 'comparison',
				choices: comparison,
				default: 'greater',
			},
			{
				type: 'number',
				label: 'Value',
				id: 'value',
				default: 20,
			},
		],
		callback: (feedback) => {
			if (feedback.options.comparison === 'greater') {
				return this.testResult?.[`${feedback.options.measure}`] > feedback.options.value
			} else {
				return this.testResult?.[`${feedback.options.measure}`] < feedback.options.value
			}
		},
	}

	feedbacks['testComplete'] = {
		type: 'boolean',
		name: 'Change style when test is completed',
		description: 'Change style if speedtest is complete',
		defaultStyle: {
			bgcolor: ColorGreen,
		},
		options: [],
		callback: () => {
			return this.testComplete
		},
	}

	return feedbacks
}
