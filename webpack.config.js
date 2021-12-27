module.exports = {
  mode: 'development',
  entry: {
    carousel: './src/components/Carousel.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: require.resolve('babel-loader'),
      },
    ],
  },
};
