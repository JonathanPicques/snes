/**
 * Regex to filter printable characters
 * @type {RegExp}
 */
const printableCharacters = /^[\u0020-\u007e\u00a0-\u00ff]*$/;

/**
 * Returns the specified uint8 in its binary representation
 * @param {number} uint8
 * @returns {string}
 */
export const GetUint8AsBinaryString = (uint8) => {
    return "0b" + ("00000000" + (uint8 >>> 0).toString(2)).slice(-8);
};

/**
 * Returns the specified uint16 in its binary representation
 * @param {number} uint8
 * @returns {string}
 */
export const GetUint16AsBinaryString = (uint8) => {
    return "0b" + ("0000000000000000" + (uint8 >>> 0).toString(2)).slice(-16);
};

/**
 * Returns the specified uint32 in its binary representation
 * @param {number} uint32
 * @returns {string}
 */
export const GetUint32AsBinaryString = (uint32) => {
    return "0b" + ("00000000000000000000000000000000" + (uint32 >>> 0).toString(2)).slice(-32);
};

/**
 * Returns the printable character for the specified byte or a dot (.)
 * @param {number} byte
 * @returns {string}
 */
export const GetByteAsPrintableCharacter = (byte) => {
   return printableCharacters.test(String.fromCharCode(byte)) ? String.fromCharCode(byte) : "."
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

/**
 * Returns an human readable string for the specified memory fragment
 * @param {Uint8Array} memory
 * @param {number} from
 * @param {number} [to=from + 0x40]
 * @returns {string}
 */
export const HumanReadableMemory = (memory, from, to) => {
    let humanReadableString = "";
    if (typeof to == "undefined") {
        to = Math.min(from + 0x40, memory.length);
    }
    if (to < from || to > memory.length) {
        throw new Error("to out of bounds");
    }
    const rows = (to - from) / 16;
    for (let row = 0; row < rows; row++) {
        const subBuffer = memory.slice(from + row * 16, from + row * 16 + 16);
        const asciiBuffer = Array.prototype.map.call(subBuffer, GetByteAsPrintableCharacter);
        humanReadableString += ("00000000" + (from + row * 16).toString(16)).slice(-8) + ": ";
        for (let col = 0; col < 16; col++) {
            const byte = subBuffer[col];
            humanReadableString += ("00" + byte.toString(16)).slice(-2) + " ";
            if (col === 7) {
                humanReadableString += " ";
            }
        }
        humanReadableString += "|" + asciiBuffer.join("") + "|\n";
    }
    return humanReadableString;
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
