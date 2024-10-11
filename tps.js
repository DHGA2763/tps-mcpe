// Made by DHGA2763
import { system } from "@minecraft/server";


const TPS_TIMEOUT_TICK = 20 * 60 * 30;


/**
 * Measures tps from the time it runs until <tick> tick later.
 * @param {number} tick 
 * @param {function} callback
 */
export function getTpsSync(tick, callback) {

    if (typeof tick !== "number") reject(new TypeError(`getTpsSync(tick) - tick can only "number"`));
    if (tick >= TPS_TIMEOUT_TICK) reject(new Error(`getTpsSync() - timeOut ( It takes too long to measure )`));

    return system.run(() => {

        const startTime = Date.now();
        return system.runTimeout(() => {

            const second = (Date.now() - startTime) / 1000;
            const tps = tick/second;
            const answer = { tps: tps, second: second, tick: tick, time: { start: startTime, end: second*1000+startTime } };
            if (typeof callback === "function") return callback(answer);
            return answer;

        }, tick);

    });

};

/**
 * Measures tps from the time it runs until <tick> tick later.
 * @param {number} tick 
 * @returns {Promise}
 */
export async function getTps(tick) {

    return new Promise((resolve, reject) => {

        if (typeof tick !== "number") reject(new TypeError(`getTps(tick) - tick can only "number"`));
        if (tick >= TPS_TIMEOUT_TICK) reject(new Error(`getTps() - timeOut ( It takes too long to measure )`));

        system.run(() => {

            const startTime = Date.now();
            system.runTimeout( async () => {

                const second = (Date.now() - startTime) / 1000;
                const tps = tick/second;
                resolve({ tps: tps, second: second, tick: tick, time: { start: startTime, end: second*1000+startTime } });

            }, tick);
    
        });

    });

};
