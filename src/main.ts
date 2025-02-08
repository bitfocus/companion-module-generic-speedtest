import { InstanceBase, runEntrypoint, InstanceStatus, SomeCompanionConfigField } from '@companion-module/base'
import { GetConfigFields, type ModuleConfig } from './config.js'
import { UpdateActions } from './actions.js'
import { UpdateVariableDefinitions } from './variables.js'
import { UpdateFeedbacks } from './feedbacks.js'
import { UpdatePresets } from './presets.js'
import { UpgradeScripts } from './upgrades.js'

import { UniversalSpeedTest, DistanceUnits } from 'universal-speedtest'
import { OAResult } from './@types/speedtest-types.js'

export class ModuleInstance extends InstanceBase<ModuleConfig> {
	config!: ModuleConfig
	testComplete: boolean = false
	testResult: OAResult | undefined

	constructor(internal: unknown) {
		super(internal)
	}

	async init(config: ModuleConfig): Promise<void> {
		this.config = config

		this.updateStatus(InstanceStatus.Ok)

		this.updateActions()
		this.updateFeedbacks()
		this.updateVariableDefinitions()
		this.updatePresets()
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

	async destroy(): Promise<void> {
		this.log('debug', 'destroy')
	}

	async configUpdated(config: ModuleConfig): Promise<void> {
		this.config = config
		await this.init(config)
	}

	getConfigFields(): SomeCompanionConfigField[] {
		return GetConfigFields()
	}

	updateActions(): void {
		UpdateActions(this)
	}

	updateFeedbacks(): void {
		UpdateFeedbacks(this)
	}

	updateVariableDefinitions(): void {
		UpdateVariableDefinitions(this)
	}

	updatePresets(): void {
		UpdatePresets(this)
	}

	async runTest(): Promise<OAResult | undefined> {
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
			return testResult
		} catch (e) {
			this.updateStatus(InstanceStatus.ConnectionFailure)
			this.log('error', `${e}`)
			this.setVariableValues({ test_status: 'Error' })
			return undefined
		}
	}

	processTest(data: OAResult): void {
		this.updateStatus(InstanceStatus.Ok)
		this.testComplete = true
		this.testResult = data

		this.setVariableValues({
			test_status: 'Complete',
			download_speed: Math.round(data.downloadResult?.speed ?? 0),
			upload_speed: Math.round(data.uploadResult?.speed ?? 0),
			ping: Math.round(data.pingResult?.latency ?? 0),
			jitter: Math.round(data.pingResult?.jitter ?? 0),
			server_city: data.bestServer?.name ?? 'Unknown',
			server_distance: Math.round(data.bestServer?.distance ?? 0),
			client_public_ip: data.client?.ip ?? 'Unknown',
		})

		this.checkFeedbacks('resultCheck', 'testComplete')
	}
}

runEntrypoint(ModuleInstance, UpgradeScripts)
