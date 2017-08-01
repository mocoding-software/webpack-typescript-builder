import * as webpack from 'webpack';
import * as path from "path";

export class Dll {
    metadataPath: string;

    /**
     *
     */
    constructor(private dllName: string, private sourceType: string, tempDir: string) {
        this.metadataPath = path.join(tempDir, name + "." + sourceType + "-dll.json");
    }

    produce(): webpack.DllPlugin {
        return new webpack.DllPlugin({
            context: __dirname,
            name: this.dllName,
            path: this.metadataPath
        });
    }

    consume(): webpack.DllPlugin {
        return new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require(this.metadataPath),
            name: this.sourceType === "umd" ? name : "./" + name,
            sourceType: this.sourceType
        });
    }
}