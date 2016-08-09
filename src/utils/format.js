import {StatusRegisters as SR} from "../cpu";

/**
 * Returns the characters read from the memory into a string
 * @param {Uint8Array} memory
 * @param {number} from
 * @param {number} to
 * @returns {string}
 */
export const GetStringFromMemory = (memory, from, to) => {
    return Array.prototype.map.call(memory.slice(from, to), byte => String.fromCharCode(byte)).join("");
};

/**
 * Returns an human readable string for the specified registers
 * @param {Object<string, number>} registers
 * @param {number} [padding=0]
 * @returns {string}
 */
export const HumanReadableRegisters = (registers, padding) => {
    let humanReadableString = "";
    if (typeof padding === "undefined") {
        padding = 0;
    }
    for (const register in registers) {
        if (registers.hasOwnProperty(register)) {
            humanReadableString += `${`\t`.repeat(padding)}`;
            humanReadableString += `${register}: `;
            if (typeof registers[register] === "number") {
                humanReadableString += `0x${registers[register].toString(16)}\n`;
            } else if (typeof registers[register] === "string") {
                humanReadableString += `${registers[register]}\n`;
            } else {
                humanReadableString += `\n`;
                humanReadableString += `${HumanReadableRegisters(registers[register], padding + 1)}`;
            }
        }
    }
    return humanReadableString;
};

/**
 * Returns an human readable string for the specified cpu status register
 * @param {CPU} cpu
 * @returns {string}
 */
export const HumanReadableStatusRegister = (cpu) => {
    return Object.keys(SR).reverse().map(bit => `${bit}: ${cpu.GetStatusRegister(SR[bit])}`).join(", ");
};
