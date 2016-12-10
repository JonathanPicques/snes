import {StatusFlags as SR} from "../cpu";

/**
 * Regex to filter human readable characters
 * @type {RegExp}
 */
const humanReadableCharacters = /^[\u0020-\u007e\u00a0-\u00ff]*$/;

/**
 * Returns the printable character for the specified byte or a dot (.)
 * @param {number} byte
 * @returns {string}
 */
export const HumanReadableByte = (byte) => {
    return humanReadableCharacters.test(String.fromCharCode(byte)) ? String.fromCharCode(byte) : ".";
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
    return Object.keys(cpu.Registers).reverse().map((bit) => {
        const value = cpu.Registers[bit];
        if (typeof value === "number") {
            return `${bit}: $${value.toString(16)}`;
        }
        return `${bit}: ${HumanReadableAddress(value)}`;
    }).join(", ");
};

/**
 * Returns an human readable string for the cpu status register bits
 * @param {CPU} cpu
 * @returns {string}
 */
export const HumanReadableCpuStatusRegister = (cpu) => {
    return Object.keys(SR).reverse().map(bit => `${bit}: ${cpu.GetStatusFlag(SR[bit])}`).join(", ");
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
 * @param {Address} address
 * @returns {string}
 */
export const HumanReadableAddress = (address) => {
    return `$${("00" + address.Bank.toString(16)).slice(-2)}:${("0000" + address.Effective.toString(16)).slice(-4)}`;
};

/**
 * Returns an human readable string for the specified memory range
 * @param {Memory} memory
 * @param {number} from
 * @param {number} to
 * @returns {string}
 */
export const HumanReadableMemory = (memory, from, to) => {
    let humanReadableString = "";
    const hex = (v, l) => { return ("0".repeat(l) + v.toString(16)).slice(-l); };
    const rows = (to - from) / 0x10;
    const read = (a) => { try { return memory.ReadUint8(a); } catch (e) { return null; } };
    for (let row = 0x0; row < rows; row++) {
        const bytes = [];
        const chars = [];
        for (let col = 0x0; col < 0x10; col++) {
            if (row + col > to) break;
            const byte = read(from + row * 0x10 + col);
            const char = HumanReadableByte(byte);
            bytes.push(byte === null ? "??" : hex(byte, 2));
            chars.push(char);
        }
        humanReadableString += `${hex(from + row * 0x10, 6)} ${bytes.join(" ")} ${chars.join("")}\n`;
    }
    return humanReadableString;
};

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
