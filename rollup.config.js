import json from "@rollup/plugin-json";
// import nodePolyfills from "rollup-plugin-polyfill-node"

export default args => {
    const result = args.configDefaultConfig;
    console.warn ('Custom roll up')
    return result.map((config, index) => {
            const plugins = config.plugins || []
            config.plugins = [
                ...plugins,
                json(),
                // nodePolyfills()
            ]   
        return config;
    });
};
