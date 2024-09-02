module.exports = {
	externals: [
		{
			// TODO: This is not good for number of files on disk, but is easy to implement
			'@bryce-seifert/universal-speedtest': 'commonjs @bryce-seifert/universal-speedtest',
		},
	],
}
