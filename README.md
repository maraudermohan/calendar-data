#Course-Calendar App using (React + Redux + ES6 + Webpack) stack.

##Installation
1. **Install [Node 6](https://nodejs.org)**. Need to run multiple versions of Node? Use [nvm](https://github.com/creationix/nvm) or [nvm-windows](https://github.com/coreybutler/nvm-windows)
2. **Make sure you're in the root directory.** - `cd calendar-data`
3. **Install Node Packages.** - `npm install`
4. **Run the app.** - `npm start`
This will run the automated build process, start up a webserver, and open the application in your default browser.
5. **App will load in [browser](http://localhost:3000/)**
6. Open another tab in terminal and run - `npm run test`
This will show the results of the mocha tests I setup.

##Engineering & Design decisions
* I really enjoyed working on this challenging-yet-fun assignment.
* Used ReactJS as I find it very efficient, especially in dynamically re-rendering the DOM.
* Chose Redux, instead of using React's unidirectional-data-flow, to avoid error prone spaghetti code.
* Redux follows the flux pattern: A single store for all data; Only pure functions are allowed to change the data;
* Installed redux-immutable-state-invariant to make sure the store data is not mutated between or outside redux dispatches.
* Wrote components in JSX, as React is most efficient with JSX. 
* As JSX extends ES2015, I have added the Babel and its related packages to transpile it back to ES5.
* Chose Webpack over Grunt for two reasons - a) I personally am more familiar with Webpack, than Grunt. b) I went with the Module bundler , instead of the task runner. I find Webpack's loader support really advantageous.
* I needed a CSS-preprocessor to maintain my complex css code. I chose LESS over SASS, as it is built in Node.
* Most interesting part of the assignment was the code that identifies the time conflicts.
* I used a modified version of Quick sort [really efficient with O(N Log N) complexity] to sort all time-indices of selected courses and compare the smaller-duration with longer-duration to identify conflicts.
* Feature enhancement : User is **warned about the time conflict, but is allowed to still select the course**, the selected courses with conflicts are displayed accordingly. 
* I use my modified calendar model, which contains the time conflicts resolutions, to calculate the css-changes to display the time-conflicts.
* Feature enhancement : Added a **'Upcoming session'** module that displays the next 3 sessions from current time.
* Used Mocha for testing, along with Chai for the assertion support.
* Wrote testcases for all data flow from server through Redux : Catalog JSON -> Store initiation -> Actions triggered -> Reducers updating a copy of the state -> RootReducer back to the store.
* Please find below the list of packages used and their purposes in the project. 

##Production Dependencies
| **Dependency** | **Use** |
|----------|-------|
|babel-polyfill | Polyfill for Babel features that cannot be transpiled |
|bootstrap|CSS Framework|
|jquery|Only used to support toastr & event handling|
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
|mocha| test framework for node.js |
|chai| assertion library used with Mocha |
|chai-http| Chai extension for tests with http |
