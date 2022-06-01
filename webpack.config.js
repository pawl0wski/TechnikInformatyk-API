const path = require("path");

module.exports = {
    entry: "./src/main.ts",
    mode: "production",
    target: "node",
    devtool: false,
    externals: ["pg-hstore"],
    output: {
        filename: "[name].js",
        path: path.resolve("dist"),
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
    module: {
        rules: [{ test: /\.ts$/, loader: "ts-loader" }],
    },
};
