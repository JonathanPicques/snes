import Memory from "../mem";

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
 * Returns an human readable string for the cpu registers
 * @param {CPU} cpu
 * @returns {string}
 */
export const HumanReadableCpuRegister = (cpu) => {
    return Object.keys(cpu.Registers).reverse().map(bit => `${bit}: $${cpu.Registers[bit].toString(16)}`).join(", ");
};

/**
 * Returns an human readable string for the cpu status register bits
 * @param {CPU} cpu
 * @returns {string}
 */
export const HumanReadableCpuStatusRegister = (cpu) => {
    return Object.keys(SR).reverse().map(bit => `${bit}: ${cpu.GetStatusRegister(SR[bit])}`).join(", ");
};

/**
 * Returns an human readable string for the specified value
 * @param {number} value
 * @returns {string}
 */
export const HumanReadableValue = (value) => {
    return `#$${value.toString(16)}`;
};

/**
 * Returns an human readable string for the specified address
  * @param {number} address
 * @returns {string}
 */
export const HumanReadableAddress = (address) => {
    const [bank, effectiveAddress] = Memory.DecomposeAddress(address);
    return `$${("00" + bank.toString(16)).slice(-2)}:${("0000" + effectiveAddress.toString(16)).slice(-4)}`;
};
