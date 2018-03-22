import * as path from "path";
import * as webpack from "webpack";

export class Dll {
    private metadataPath: string;

    constructor(private dllName: string, private sourceType: string, tempDir: string) {
        this.metadataPath = path.join(tempDir, dllName + "." + sourceType + "-dll.json");
    }

    public produce(): webpack.DllPlugin {
        return new webpack.DllPlugin({
            context: __dirname,
            name: this.dllName,
            path: this.metadataPath,
        });
    }

    public consume(): webpack.DllPlugin {
        return new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require(this.metadataPath),
            name: this.sourceType === "umd" ? this.dllName : "./" + this.dllName,
            sourceType: this.sourceType,
        });
    }
}
