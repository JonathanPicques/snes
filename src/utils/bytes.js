const printableCharacters = /^[\u0020-\u007e\u00a0-\u00ff]*$/;

/**
 * Returns the specified uint8 as its binary representation
 * @param {number} uint8
 * @returns {string}
 */
export const uint8ToBinary = (uint8) => {
    return "0b" + ("00000000" + (uint8 >>> 0).toString(2)).slice(-8);
};

/**
 * Returns the specified uint16 as its binary representation
 * @param {number} uint8
 * @returns {string}
 */
export const uint16ToBinary = (uint8) => {
    return "0b" + ("0000000000000000" + (uint8 >>> 0).toString(2)).slice(-16);
};

/**
 * Returns the printable character or .
 * @param {number} byte
 * @returns {string}
 */
export const prettyByte = (byte) => {
   return printableCharacters.test(String.fromCharCode(byte)) ? String.fromCharCode(byte) : "."
};

/**
 * @param {Uint8Array} buffer
 * @param {number} from
 * @param {number} to
 * @returns {string}
 */
export const stringRange = (buffer, from, to) => {
    return Array.prototype.map.call(buffer.slice(from, to), byte => String.fromCharCode(byte)).join("");
};

/**
 * @param {Uint8Array} buffer
 * @param {number} from
 * @param {number} [to=from + 0x40]
 */
export const debugOpcodes = (buffer, from, to) => {
    let debug = "";
    if (typeof to == "undefined") {
        to = Math.min(from + 0x40, buffer.length);
    }
    if (to < from || to > buffer.length) {
        throw new Error("to out of bounds");
    }
    const rows = (to - from) / 16;
    for (let row = 0; row < rows; row++) {
        const subBuffer = buffer.slice(from + row * 16, from + row * 16 + 16);
        const asciiBuffer = Array.prototype.map.call(subBuffer, prettyByte);
        debug += ("00000000" + (from + row * 16).toString(16)).slice(-8) + ": ";
        for (let col = 0; col < 16; col++) {
            const byte = subBuffer[col];
            debug += ("00" + byte.toString(16)).slice(-2) + " ";
            if (col === 7) {
                debug += " ";
            }
        }
        debug += "|" + asciiBuffer.join("") + "|\n";
    }
    console.log(debug);
};
