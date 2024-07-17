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
    uniqueName: "onboarding",
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
        // name: "onboarding",
        // filename: "remoteEntry.js",
        // exposes: {
        //     './Component': './projects/onboarding/src/app/app.component.ts',
        // },
        name: "onboarding",
        filename: "remoteEntry.js",
        exposes: {
            './OnboardingModule': './projects/onboarding/src/app/onboarding/onboarding.module.ts',
        },

        // For hosts (please adjust)
        // remotes: {
        //     "shell": "http://localhost:5000/remoteEntry.js",
        //     "layout": "http://localhost:4000/remoteEntry.js",
        //     "acl": "http://localhost:4100/remoteEntry.js",
        //     "master": "http://localhost:4200/remoteEntry.js",
        //     "repAndViz": "http://localhost:4200/remoteEntry.js",

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
