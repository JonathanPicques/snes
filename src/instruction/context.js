const _snes = Symbol("snes");

/**
 * This class holds the context for a specified instruction resulting of the execution of a specified opcode
 * A context is determined by the addressing mode and can either be:
 *  - Value
 *  - Address
 *  - ByteMove
 *  - Nothing
 */
export default class InstructionContext {
    /**
     * @param {SNES} snes
     */
    constructor(snes) {
        /**
         * @type {SNES}
         */
        this[_snes] = snes;
    }

    /** @returns {Memory} */
    get Memory() { return this[_snes].Memory; }

    /** @returns {CPU} */
    get Cpu() { return this[_snes].Cpu; }

}

/**
 * @enum {number}
 */
export const InstructionType = {
    "Value": 0,
    "Address": 1,
    "ByteMove": 2,
    "Nothing": 3,
};
