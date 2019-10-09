#!/usr/bin/env node

const commandLineArgs = require('command-line-args');
const usage = require('./src/usage');
const whatIActuallyNeed = require('./src/what-i-actually-need');
const updatePackage = require('./src/updatePackage');

const optionDefinitions = [
  { name: 'entry', alias: 'e' },
  { name: 'run', alias: 'r', type: Boolean },
  { name: 'keep', alias: 'k' },
  { name: 'help', alias: 'h', type: Boolean }
];
const options = commandLineArgs(optionDefinitions);

async function main (options) {
  if (options.help) {
    console.log(usage);
    return;
  }
  console.log('-- Running What-I-Actually-Need ---');
  options.modules = await whatIActuallyNeed(options);
  updatePackage(options);
}

main(options);
