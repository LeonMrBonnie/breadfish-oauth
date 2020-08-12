import { nodeResolve } from "@rollup/plugin-node-resolve";
import pluginCommonJs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";

export default [
    {
        input: "src/index.js",
        output: {
            file: "lib/index.js",
            format: "cjs",
            name: "BreadfishOAuth",
            exports: "auto",
        },
        plugins: [
            pluginCommonJs({
                include: "node_modules/**",
            }),
            nodeResolve({
                browser: true,
            }),
            terser({
                output: {
                    comments: "all",
                },
                mangle: false,
            }),
        ],
    },
    {
        input: "src/index.js",
        output: {
            file: "lib/es6/index.js",
            format: "es",
            name: "BreadfishOAuth",
        },
        plugins: [
            pluginCommonJs({
                include: "node_modules/**",
            }),
            nodeResolve({
                browser: true,
            }),
            terser({
                output: {
                    comments: "all",
                },
                mangle: false,
            }),
        ],
    },
];
