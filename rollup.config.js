import replace from "@rollup/plugin-replace";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import copy from "rollup-plugin-copy";
import { terser } from "rollup-plugin-terser";
import vuePlugin from "rollup-plugin-vue";
import visualizer from "rollup-plugin-visualizer";

/**
 * @typedef {"development" | "production"} Environment
 * @param {string} outputDir
 * @param {string} input
 * @param {boolean} minify
 * @param {(environment: Environment) => any[]} customPlugins
 * @param {Environment} [environment = "production"]
 */
function generateConfig(
	outputDir,
	input,
	minify,
	customPlugins,
	environment = "production"
) {
	// const extension = minify ? ".min.js" : ".js";
	const extension = ".js";

	let plugins = [
		...customPlugins(environment),
		replace({
			"process.env.NODE_ENV": JSON.stringify(environment),
		}),
		vuePlugin(),
		nodeResolve({
			extensions: [".mjs", ".js", ".jsx", ".json", ".node"],
		}),
		commonjs(),
	];

	if (minify) {
		plugins.push(terser());
	}

	return {
		input,
		output: {
			dir: outputDir,
			format: "es",
			compact: minify,
			entryFileNames: `[name]${extension}`,
			chunkFileNames: `[name]-[hash]${extension}`,
		},
		plugins,
		watch: {
			clearScreen: false,
		},
	};
}

export default generateConfig(
	"dist",
	"src/index.js",
	process.env.NODE_ENV == "production",
	() => [
		copy({
			targets: [{ src: "src/index.html", dest: "dist" }],
		}),
		visualizer({
			filename: "dist/stats.html",
		}),
	]
);
