// rollup.config.mjs
export default {
	input: 'src/picomap.js',
	output: [{
		file: 'dist/picomap-es.js',
		format: 'es'
	},
    {
        file: 'dist/picomap.js',
		format: 'umd',
        name: 'Picomap'
    }
    ]
};