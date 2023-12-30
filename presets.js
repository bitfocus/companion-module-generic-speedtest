import { combineRgb } from '@companion-module/base'

export function getPresets() {
	const ColorWhite = combineRgb(255, 255, 255)
	const ColorBlack = combineRgb(0, 0, 0)
	const ColorRed = combineRgb(200, 0, 0)
	const ColorGreen = combineRgb(0, 200, 0)
	const ColorOrange = combineRgb(255, 102, 0)

	let presets = {
		runTest: {
			type: 'button',
			category: 'General',
			name: 'Run Test',
			options: {},
			style: {
				text: 'Run Speedtest',
				size: '14',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'runSpeedtest',
							options: {},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
		testStatus: {
			type: 'button',
			category: 'General',
			name: 'Test Status',
			options: {},
			style: {
				text: 'Status:\\n$(speedtest:test_status)',
				size: '14',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'testComplete',
					options: {},
					isInverted: true,
					style: {
						bgcolor: ColorOrange,
					},
				},
				{
					feedbackId: 'testComplete',
					options: {},
					style: {
						bgcolor: ColorGreen,
					},
				},
			],
		},
		download: {
			type: 'button',
			category: 'General',
			name: 'Download Speed',
			options: {},
			style: {
				text: 'Down:\\n$(speedtest:download_speed) Mbps',
				size: '14',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [],
					up: [],
				},
			],
			feedbacks: [],
		},
		upload: {
			type: 'button',
			category: 'General',
			name: 'Upload Speed',
			options: {},
			style: {
				text: 'Up:\\n$(speedtest:upload_speed) Mbps',
				size: '14',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [],
					up: [],
				},
			],
			feedbacks: [],
		},
		ping: {
			type: 'button',
			category: 'General',
			name: 'Ping',
			options: {},
			style: {
				text: 'Ping:\\n$(speedtest:ping) ms',
				size: '14',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [],
					up: [],
				},
			],
			feedbacks: [],
		},
		jitter: {
			type: 'button',
			category: 'General',
			name: 'Jitter',
			options: {},
			style: {
				text: 'Jitter:\\n$(speedtest:jitter) ms',
				size: '14',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [],
					up: [],
				},
			],
			feedbacks: [],
		},
		testServer: {
			type: 'button',
			category: 'General',
			name: 'Test Server',
			options: {},
			style: {
				text: '$(speedtest:server_city)\\n$(speedtest:server_distance) km',
				size: '14',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [],
					up: [],
				},
			],
			feedbacks: [],
		},
		deviceIp: {
			type: 'button',
			category: 'General',
			name: 'Public IP',
			options: {},
			style: {
				text: 'Public IP\\n$(speedtest:client_public_ip)',
				size: '14',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [],
					up: [],
				},
			],
			feedbacks: [],
		},
	}

	return presets
}
