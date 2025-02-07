export const UpgradeScripts = [
	function (context, props) {
		//v2.0.0
		let changed = {
			updatedConfig: null,
			updatedActions: [],
			updatedFeedbacks: [],
		}
		if (props.config !== null) {
			let config = props.config
			if (config.service) {
				delete config.service
				changed.updatedConfig = config
			}
		}
		return changed
	},
]
