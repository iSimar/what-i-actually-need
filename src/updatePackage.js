const fs = require('fs');
const path = require('path');

function updatePackage (options) {
  const { modules, keep } = options;
  let packagesToKeep;
  let packagesKept = 0;
  if (keep) {
    const cwd = process.cwd();
    packagesToKeep = require(path.join(cwd, keep));
  }
  const packageJSON = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
  const { dependencies } = packageJSON;
  if (modules && modules.length > 0 && dependencies) {
    const newDependencies = {};
    for (const index in modules) {
      const module = modules[index];
      if (dependencies[module]) {
        newDependencies[module] = dependencies[module];
      }
    }
    if (packagesToKeep) {
      for (const index in packagesToKeep) {
        const packageToKeep = packagesToKeep[index];
        if (dependencies[packageToKeep]) {
          newDependencies[packageToKeep] = dependencies[packageToKeep];
          packagesKept = packagesKept + 1;
        }
      }
    }
    console.log();
    console.log('--------------------');
    console.log(`${Object.keys(newDependencies).length} dependencies are actually needed. There are currently ${Object.keys(dependencies).length} dependencies in package.json.`);
    if (packagesToKeep) {
      console.log(`${packagesKept} dependencies out of ${packagesToKeep.length} were not actually needed but were kept using the file provided via 'keep' parameter.`);
    }
    console.log('--------------------');
    packageJSON.dependencies = newDependencies;
    if (!options.run) {
      console.log();
      console.log(`Run the 'what-i-actually-need' command with '--run' flag to update package.json.`);
      return;
    }
    fs.writeFile('./package.json', JSON.stringify(packageJSON), 'utf8', (err) => { if (err) throw err; });
    console.log();
    console.log('package.json has been updated with what is actually needed.');
  }
}

module.exports = updatePackage;
