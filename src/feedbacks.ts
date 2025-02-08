import { combineRgb, CompanionFeedbackDefinitions } from '@companion-module/base'
import type { ModuleInstance } from './main.js'
import { OAResult } from './@types/speedtest-types.js'

export function UpdateFeedbacks(self: ModuleInstance): void {
	const ColorGreen = combineRgb(0, 200, 0)

	const testOptions = [
		{ id: 'downloadSpeed', label: 'Download Speed' },
		{ id: 'uploadSpeed', label: 'Upload Speed' },
		{ id: 'ping', label: 'Ping' },
		{ id: 'jitter', label: 'Jitter' },
	]

	const comparison = [
		{ id: 'greater', label: '>' },
		{ id: 'less', label: '<' },
	]

	const feedbacks: CompanionFeedbackDefinitions = {
		resultCheck: {
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
					min: 0,
					max: 100000,
				},
			],
			callback: (feedback) => {
				const measure = feedback.options.measure as keyof OAResult
				if (self.testResult?.[measure]) {
					if (feedback.options.comparison === 'greater') {
						return self.testResult[measure] > (feedback.options.value ?? 0)
					} else {
						return self.testResult[measure] < (feedback.options.value ?? 0)
					}
				} else {
					return false
				}
			},
		},
		testComplete: {
			type: 'boolean',
			name: 'Change style when test is completed',
			description: 'Change style if speedtest is complete',
			defaultStyle: {
				bgcolor: ColorGreen,
			},
			options: [],
			callback: () => {
				return self.testComplete
			},
		},
	}
	self.setFeedbackDefinitions(feedbacks)
}
