const fs = require('fs');

function updatePackage (options) {
  const { modules } = options;
  const packageJSON = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
  const { dependencies } = packageJSON;
  if (modules && modules.length > 0 && dependencies) {
    console.log();
    console.log('--------------------');
    console.log(`${modules.length} dependencies are actually needed. There are currently ${Object.keys(dependencies).length} dependencies in package.json.`);
    console.log('--------------------');
    if (!options.run) {
      console.log();
      console.log(`Run the 'what-i-actually-need' command with '--run' flag to update package.json.`);
      return;
    }
    const newDependencies = {};
    for (const index in modules) {
      const module = modules[index];
      if (dependencies[module]) {
        newDependencies[module] = dependencies[module];
      }
    }
    packageJSON.dependencies = newDependencies;
    fs.writeFile('./package.json', JSON.stringify(packageJSON), 'utf8', (err) => { if (err) throw err; });
    console.log();
    console.log('package.json has been updated with what is actually needed.');
  }
}

module.exports = updatePackage;
