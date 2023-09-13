// rollup.config.mjs
export default {
	input: 'src/picomap.js',
	output: [{
		file: 'dist/picomap-es.js',
		format: 'es',
        sourcemap: 'true'
	},
    {
        file: 'dist/picomap.max.js',
		format: 'umd',
        name: 'Picomap',
        sourcemap: 'true'
    }
    ]
};