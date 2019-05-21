![logo](https://i.imgur.com/Zc5otUj.png)
Scans your code to find all the require() to tell you what you actually need for the node project. Uses a single file as the starting point then does depth first search.

## Usage

### install
```
$ npm i what-i-actually-need -g
```

### run
Run the following in a node project.
By default it uses index.js as the entry point to start the scan.
```
$ what-i-actually-need
```
example output:
```
-- Running What-I-Actually-Need ---

index.js
--> node-sass
--> css-modules-require-hook
--> babel-register

server.js
--> nconf
--> log4js
--> http
--> https
--> fs
--> path

--------------------
12 dependencies are actually needed. There are currently 51 dependencies in package.json.
--------------------

Run the 'what-i-actually-need' command with '--run' flag to update package.json.
```

### Options

### --entry (Default: index.js) 
Entry point of your node based project, it will start the scan from this file.

### --run
To update the package.json dependencies after the scan is complete.

### --help
See the usage docs
