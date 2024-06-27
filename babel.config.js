module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-react',
  ],
  plugins: [
    '@babel/plugin-proposal-private-methods',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-transform-private-property-in-object',  // Bu eklentiyi kullanın
    '@babel/plugin-transform-runtime',
  ],
};
