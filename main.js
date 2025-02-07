import { InstanceBase, runEntrypoint, InstanceStatus } from '@companion-module/base'
import { getActions } from './actions.js'
import { getVariables } from './variables.js'
import { getFeedbacks } from './feedbacks.js'
import { getPresets } from './presets.js'
import { UpgradeScripts } from './upgrades.js'

import { UniversalSpeedTest, DistanceUnits } from 'universal-speedtest'

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
		return []
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

	async runTest() {
		this.setVariableValues({ test_status: 'Running' })
		this.testComplete = false

		const universalSpeedTest = new UniversalSpeedTest({
			debug: true,
			tests: {
				measureUpload: true,
				measureDownload: true,
			},
			units: {
				distanceUnit: DistanceUnits.km,
			},
		})

		try {
			const testResult = await universalSpeedTest.performOoklaTest()
			//console.log(testResult)
			this.processTest(testResult)
		} catch (e) {
			this.updateStatus(InstanceStatus.ConnectionFailure)
			this.log('error', `${e}`)
		}
	}

	processTest(data) {
		this.updateStatus(InstanceStatus.Ok)
		this.testComplete = true
		this.testResult = data

		this.setVariableValues({
			test_status: 'Complete',
			download_speed: Math.round(data.downloadResult?.speed),
			upload_speed: Math.round(data.uploadResult?.speed),
			ping: Math.round(data.pingResult?.latency),
			jitter: Math.round(data.pingResult?.jitter),
			server_city: data.bestServer?.name ?? 'Unknown',
			server_distance: Math.round(data.bestServer?.distance),
			client_public_ip: data.client?.ip ?? 'Unknown',
		})

		this.checkFeedbacks('resultCheck', 'testComplete')
	}
}

runEntrypoint(SpeedtestInstance, UpgradeScripts)
