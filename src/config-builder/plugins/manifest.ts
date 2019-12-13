import ManifestPlugin from "webpack-manifest-plugin";

export const manifest = new ManifestPlugin({
    filter: _ => _.isChunk
})