const { resolve, pruneGroups } = require('./functions');
const logger = require('./logger');

let PUSHGATEWAY_URL = resolve('PUSHGATEWAY_URL', 'http://localhost:9091');
if (!PUSHGATEWAY_URL.endsWith('/')) {
    PUSHGATEWAY_URL += '/'
}
logger.info(`Pushgateway URL: ${PUSHGATEWAY_URL}`);

const INTERVAL_SECONDS = resolve('PRUNE_INTERVAL', 60);
logger.info(`Prune interval: ${INTERVAL_SECONDS} seconds.`);

const PRUNE_THRESHOLD_SECONDS = resolve('PRUNE_THRESHOLD', 600);
logger.info(`Prune threshold: ${PRUNE_THRESHOLD_SECONDS} seconds.`);

const interval = setInterval(
    () => pruneGroups(PUSHGATEWAY_URL, PRUNE_THRESHOLD_SECONDS),
    INTERVAL_SECONDS * 1000
);

// Handle termination signals
process.on('SIGINT', () => {
    logger.info('Received SIGINT. Shutting down gracefully...');
    clearInterval(interval);
    process.exit(0);
});

process.on('SIGTERM', () => {
    logger.info('Received SIGTERM. Shutting down gracefully...');
    clearInterval(interval);
    process.exit(0);
});

module.exports = {
    pruneGroups,
    interval
}
