const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Add resolver for web compatibility with react-native-maps
config.resolver.alias = {
  ...config.resolver.alias,
  'react-native/Libraries/Utilities/codegenNativeCommands': path.resolve(
    __dirname,
    'metro-shims/codegenNativeCommands.js'
  ),
};

module.exports = config;