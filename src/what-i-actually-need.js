const findRequires = require('find-requires');
const fs = require('fs');
const path = require('path');

const visitedFiles = {};

function extractModuleName (name) {
  if (name.startsWith('@')) {
    return name;
  }
  return name.split('/')[0];
}

function scanForNodeModules (file, modules, cwd) {
  return new Promise(async (resolve, reject) => {
    if (!cwd) {
      cwd = process.cwd();
    }
    const fullPath = path.join(cwd, file);
    if (visitedFiles[fullPath]) {
      reject(new Error('Visited Path'));
      return;
    } else {
      visitedFiles[fullPath] = true;
    }
    const fileContent = fs.readFileSync(fullPath, 'utf-8');
    const requiresFound = findRequires(fileContent);

    const nodeModules = requiresFound.filter(str => !str.startsWith('.'));
    const relativeRequires = requiresFound.filter(str => str.startsWith('.')).filter(str => {
      try {
        const fileName = `${str}.js`;
        if (fs.existsSync(path.join(cwd, fileName))) {
          return true;
        }
      } catch (err) {
        return false;
      }
    }).map(str => `${str}.js`);

    if (modules) {
      if (nodeModules.length > 0) {
        const newNodeModulesFound = nodeModules
          .map(extractModuleName)
          .filter(mod => {
            if (modules.indexOf(mod) === -1) {
              modules.push(mod);
              return true;
            }
            return false;
          });
        if (newNodeModulesFound.length > 0) {
          console.log();
          console.log(file);
          for (const i in newNodeModulesFound) {
            console.log(`--> ${newNodeModulesFound[i]}`);
          }
        }
      }
    } else {
      console.log();
      console.log(file);
      nodeModules.map(extractModuleName);
      for (const i in nodeModules) {
        console.log(`--> ${nodeModules[i]}`);
      }
      modules = nodeModules;
    }
    for (const i in relativeRequires) {
      try {
        const newCWD = path.dirname(path.join(cwd, relativeRequires[i]));
        const newFile = path.basename(relativeRequires[i]);
        let newModules = await scanForNodeModules(newFile, modules, newCWD);
        if (newModules) {
          modules = newModules;
        }
      } catch (e) {
      }
    }
    resolve(modules);
  });
}

async function whatIActuallyNeed (options) {
  return new Promise(async (resolve, reject) => {
    let { entry } = options;
    if (!entry) {
      entry = 'index.js';
    }
    const modules = await scanForNodeModules(entry);
    resolve(modules.sort());
  });
}

module.exports = whatIActuallyNeed;
