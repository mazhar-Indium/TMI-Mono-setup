const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const mf = require("@angular-architects/module-federation/webpack");
const path = require("path");
const share = mf.share;

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(
  path.join(__dirname, '../../tsconfig.json'),
  [/* mapped paths to share */]);

module.exports = {
  output: {
    uniqueName: "repAndViz",
    publicPath: "auto",
    scriptType: "text/javascript"
  },
  optimization: {
    runtimeChunk: false
  },
  resolve: {
    alias: {
      ...sharedMappings.getAliases(),
    }
  },
  experiments: {
    outputModule: true
  },
  plugins: [
    new ModuleFederationPlugin({
        // library: { type: "module" },

        // For remotes (please adjust)
        // name: "repAndViz",
        // filename: "remoteEntry.js",
        // exposes: {
        //     './Component': './projects/rep-and-viz/src/app/app.component.ts',
        // },
        name: "acl",
        filename: "remoteEntry.js",
        exposes: {
            './RepAndVizModule': './projects/rep-and-viz/src/app/rep-and-viz/rep-and-viz.module.ts',
        },

        // For hosts (please adjust)
        // remotes: {
        //     "shell": "http://localhost:5000/remoteEntry.js",
        //     "layout": "http://localhost:4000/remoteEntry.js",
        //     "acl": "http://localhost:4100/remoteEntry.js",
        //     "onboarding": "http://localhost:4200/remoteEntry.js",
        //     "master": "http://localhost:4300/remoteEntry.js",

        // },

        shared: share({
          "@angular/core": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
          "@angular/common": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
          "@angular/common/http": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
          "@angular/router": { singleton: true, strictVersion: true, requiredVersion: 'auto' },

          ...sharedMappings.getDescriptors()
        })

    }),
    sharedMappings.getPlugin()
  ],
};
