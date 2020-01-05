// Change output name for server.
const config = {
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: "index",
        },
      },
    },
  },
};
module.exports = config;
