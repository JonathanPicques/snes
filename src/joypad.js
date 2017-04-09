const _snes = Symbol("snes");

/**
 * This class emulates the joypad of th SNES
 */
export default class Joypad {

    /**
     * @param {SNES} snes
     */
    constructor(snes) {
        /**
         * Reference to the SNES
         * @type {SNES}
         */
        this[_snes] = snes;
    }

    /**
     * Powers this joypad
     */
    Power() {

    }

    /**
     * Resets this joypad
     */
    Reset() {}

}

/**
 * Enumerates the joypad buttons
 * @enum {JoypadButton}
 */
export const JoypadButtons = {
    "A": 0x0,
    "B": 0x1,
    "X": 0x2,
    "Y": 0x3,
    "DPadUp": 0x4,
    "DPadDown": 0x5,
    "DPadLeft": 0x6,
    "DPadRight": 0x7,
    "LShoulder": 0x8,
    "RShoulder": 0x9,
    "Start": 0xa,
    "Select": 0xb,
    "Unused1": 0xc,
    "Unused2": 0xd,
    "Unused3": 0xe,
    "Unused4": 0xf,
};

/**
 * @typedef {number} JoypadButton
 */
