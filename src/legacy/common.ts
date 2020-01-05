import * as webpack from "webpack";

export const getDefaultResolveSection: () => webpack.Resolve = () => ({
    extensions:  [".js", ".jsx", ".ts", ".tsx"],
});

export const clientEntry: webpack.Entry = {
  index: ["client/index"],
};

export const serverEntry: webpack.Entry = {
  index: ["server/index"],
};
