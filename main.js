import { InstanceBase, runEntrypoint, InstanceStatus } from '@companion-module/base'
import { getActions } from './actions.js'
import { getVariables } from './variables.js'
import { getFeedbacks } from './feedbacks.js'
import { getPresets } from './presets.js'
import { UpgradeScripts } from './upgrades.js'

import { UniversalSpeedTest, SpeedUnits } from '@bryce-seifert/universal-speedtest'

class SpeedtestInstance extends InstanceBase {
	constructor(internal) {
		super(internal)
	}

	async init(config) {
		this.config = config

		this.updateStatus(InstanceStatus.Ok)

		this.updateActions()
		this.updateFeedbacks()
		this.updateVariableDefinitions()
		this.initPresets()
		this.testComplete = false
		this.setVariableValues({
			test_status: 'Not Yet Run',
			download_speed: '-',
			upload_speed: '-',
			ping: '-',
			jitter: '-',
			server_city: 'TBD',
			server_distance: 'TBD',
			client_public_ip: 'TBD',
		})
	}

	async destroy() {
		this.log('debug', 'destroy')
	}

	async configUpdated(config) {
		this.config = config
		this.init(config)
	}

	getConfigFields() {
		return [
			{
				type: 'dropdown',
				id: 'service',
				label: 'Service',
				choices: [
					{ id: 'cloudflare', label: 'Cloudflare' },
					{ id: 'speedtest', label: 'Speedtest.net' },
				],
				default: 'cloudflare',
			},
		]
	}

	updateActions() {
		const actions = getActions.bind(this)()
		this.setActionDefinitions(actions)
	}

	updateFeedbacks() {
		const feedbacks = getFeedbacks.bind(this)()
		this.setFeedbackDefinitions(feedbacks)
	}

	updateVariableDefinitions() {
		const variables = getVariables.bind(this)()
		this.setVariableDefinitions(variables)
	}

	initPresets() {
		const presets = getPresets.bind(this)()
		this.setPresetDefinitions(presets)
	}

	runTest() {
		this.universalSpeedtest = new UniversalSpeedTest({
			debug: true,
			measureUpload: true,
			downloadUnit: SpeedUnits.Mbps,
			wait: false,
		})

		this.testComplete = false
		this.setVariableValues({
			test_status: 'Running',
			download_speed: '-',
			upload_speed: '-',
			ping: '-',
			jitter: '-',
			server_city: 'TBD',
			server_distance: 'TBD',
			client_public_ip: 'TBD',
		})
		this.checkFeedbacks('testComplete')

		if (this.config?.service === 'cloudflare') {
			this.universalSpeedtest
				.runCloudflareTest()
				.then((result) => {
					this.processTest(result)
					this.updateStatus(InstanceStatus.Ok)
				})
				.catch((error) => {
					this.log('error', error.message)
					this.setVariableValues({ test_status: 'Error' })
					this.updateStatus(InstanceStatus.ConnectionFailure)
				})
		} else {
			this.universalSpeedtest
				.runSpeedtestTest()
				.then((result) => {
					this.processTest(result)
					this.updateStatus(InstanceStatus.Ok)
				})
				.catch((error) => {
					this.log('error', error.message)
					this.setVariableValues({ test_status: 'Error' })
					this.updateStatus(InstanceStatus.ConnectionFailure)
				})
		}
	}

	processTest(data) {
		this.testComplete = true
		this.testResult = data

		this.setVariableValues({
			test_status: 'Complete',
			download_speed: Math.round(data.downloadSpeed),
			upload_speed: Math.round(data.uploadSpeed),
			ping: Math.round(data.ping),
			jitter: Math.round(data.jitter),
			server_city: data.server?.city,
			server_distance: Math.round(data.server?.distance),
			client_public_ip: data.client?.ip,
		})

		this.checkFeedbacks('resultCheck', 'testComplete')
	}
}

runEntrypoint(SpeedtestInstance, UpgradeScripts)
