import ip from 'ip';
import mongoose from 'mongoose';
import format from 'date-fns/format';

import { PORT, NODE_ENV } from '../config/env';

/**
 * Starts the server and listens for termination signals.
 *
 * @param {Object} server - The express server instance.
 */
export const start = server => {

    console.info("SETUP - Starting server..");

    // Start the server
    const serverProcess = server.listen(PORT, error => {
        if (error) {
            console.error('ERROR - Unable to start server.')
        } else {
            console.info(`INFO - Server started on`);
            console.info(`  Local   http://localhost:${PORT} [${NODE_ENV}]`);
            console.info(`  Network http://${ip.address()}:${PORT} [${NODE_ENV}]`);
            console.info(`  Datetime ${format(new Date(), 'yyyy-MM-dd hh:mm:ss a')}\n`);
        }
    });

    // Stop the server
    for (let signal of ['SIGINT', 'SIGTERM']) {

        process.on(signal, () => {

            console.info('INFO - Shutting down server..');

            // CLose the process
            serverProcess.close(() => {

                console.info('INFO - Server has been shut down.');

                // Disconnect from the database
                mongoose.connection.close(false, () => {

                    console.info('INFO - Database disconnected.');

                    // Exit from the process
                    process.exit(0);

                })

            })

        })

    }
};
