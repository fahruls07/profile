const chalk = require('chalk');

const DEBUG = process.env.DEBUG === 'true';

function logInfo(...args) {
  if (DEBUG) console.log(chalk.blueBright('ℹ️ [INFO]'), ...args);
}

function logWarn(...args) {
  if (DEBUG) console.warn(chalk.yellow('⚠️ [WARN]'), ...args);
}

function logError(...args) {
  if (DEBUG) console.error(chalk.red('❌ [ERROR]'), ...args);
}

function logSuccess(...args) {
  if (DEBUG) console.log(chalk.green('✅ [SUCCESS]'), ...args);
}

module.exports = { logInfo, logWarn, logError, logSuccess };
