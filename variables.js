export function getVariables() {
	const variables = [
		{ variableId: 'download_speed', name: 'Download speed (Mbps)' },
		{ variableId: 'upload_speed', name: 'Upload speed (Mbps)' },
		{ variableId: 'ping', name: 'Ping' },
		{ variableId: 'jitter', name: 'Jitter' },
		{ variableId: 'server_city', name: 'Test server city' },
		{ variableId: 'server_distance', name: 'Test server distance (km)' },
		{ variableId: 'client_public_ip', name: 'Public IP address of the host machine' },
		{ variableId: 'test_status', name: 'Current status of the speedtest' },
	]
	return variables
}
