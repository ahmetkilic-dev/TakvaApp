const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// global.css dosyamızı sisteme tanıtıyoruz
module.exports = withNativeWind(config, { input: "./global.css" });