#Course-Calendar App using (React + Redux + ES6 + Webpack) stack.

##Installation
1. **Install [Node 6](https://nodejs.org)**. Need to run multiple versions of Node? Use [nvm](https://github.com/creationix/nvm) or [nvm-windows](https://github.com/coreybutler/nvm-windows)
2. **Make sure you're in the directory you just created.** - `cd calendar-data`
3. **Install Node Packages.** - `npm install`
4. **Run the app.** - `npm start`
This will run the automated build process, start up a webserver, and open the application in your default browser. When doing development with this kit, this command will continue watching files all your files. Every time you hit save the code is rebuilt, linting runs, and tests run automatically. Note: The -s flag is optional. It enables silent mode which suppresses unnecessary messages during the build.
5. **App will load in [browser](http://localhost:3000/)**

##Summary
* didnt use lodash/underscore, achieved it using ES6 methods
* LESS built in Node, so chose LESS over SASS
* most complex code - identifying time conflict and calculating respective css changes
* explanation of modified calendar model
* Used Quick sort, since time complexity O(n log n) and space complexity O(1)
* Explain redux-immutable, middleware, thunk?
* catalog, big catalog into js files , also edited the ID's
* simulate ajax call for catalog n calendar json (calendarReducer)
* presentation vs container components
* additional notes : concentrated on design

##Production Dependencies
| **Dependency** | **Use** |
|----------|-------|
|babel-polyfill | Polyfill for Babel features that cannot be transpiled |
|bootstrap|CSS Framework|
|jquery|Only used to support toastr|
|react|React library |
|react-dom|React library for DOM rendering |
|react-redux|Redux library for connecting React components to Redux |
|react-router|React library for routing |
|react-router-redux|Keep React Router in sync with Redux application state|
|redux|Library for unidirectional data flows |
|redux-thunk|Async redux library|
|toastr|Display messages to the user|

##Development Dependencies
| **Dependency** | **Use** |
|----------|-------|
|babel-cli|Babel Command line interface |
|babel-core|Babel Core for transpiling the new JavaScript to old |
|babel-loader|Adds Babel support to Webpack |
|babel-plugin-react-display-name| Add displayName to React.createClass calls |
|babel-preset-es2015|Babel preset for ES2015|
|babel-preset-react| Add JSX support to Babel |
|babel-preset-react-hmre|Hot reloading preset for Babel|
|babel-register|Register Babel to transpile our Mocha tests|
|compression|Add gzip support to Express|
|cross-env|Cross-environment friendly way to handle environment variables|
|css-loader|Add CSS support to Webpack|
|less| CSS pre-processor, adding features and techniques to CSS|
|less-loader|LESS loader module for Webpack|
|eventsource-polyfill|Polyfill to support hot reloading in IE|
|express|Serves development and production builds|
|extract-text-webpack-plugin| Extracts CSS into separate file for production build | 
|file-loader| Adds file loading support to Webpack |
|open|Open app in default browser|
|redux-immutable-state-invariant|Warn when Redux state is mutated|
|style-loader| Add Style support to Webpack |
|url-loader| Add url loading support to Webpack |
|webpack| Bundler with plugin system and integrated development server |
|webpack-dev-middleware| Adds middleware support to webpack |
|webpack-hot-middleware| Adds hot reloading to webpack |
|isomorphic-fetch| Fetch for node and Browserify |
