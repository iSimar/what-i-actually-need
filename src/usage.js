const commandLineUsage = require('command-line-usage');

const sections = [
  {
    header: 'what-i-actually-need',
    content: 'Scans source code to find the node modules actually needs, can also update the package.json to remove the ones that are not needs'
  },
  {
    header: 'Options',
    optionList: [
      {
        name: 'entry',
        alias: 'e',
        typeLabel: '{underline String}',
        description: 'entry file ie. index.js'
      },
      {
        name: 'run',
        alias: 'r',
        typeLabel: '{underline Boolean}',
        description: 'Update package.json without asking after analyzing'
      },
      {
        name: 'keep',
        alias: 'k',
        typeLabel: '{underline String}',
        description: 'path to a json file with a array of packages to keep in package.json whhen updating it'
      },
      {
        name: 'help',
        alias: 'h',
        typeLabel: '{underline Boolean}',
        description: 'Print this usage guide.'
      }
    ]
  }
];

const usage = commandLineUsage(sections);

module.exports = usage;
