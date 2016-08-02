import {AddressingModes} from "../mem";

const _snes = Symbol("snes");
const _opcode = Symbol("snes");

const _value = Symbol("value");
const _address = Symbol("value");
const _byteMoved = Symbol("value");

/**
 * This class holds the context for a specified instruction resulting of the execution of a specified opcode
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
        /**
         * @type {Opcode}
         */
        this[_opcode] = null;
        /**
         * @type {number}
         */
        this[_value] = null;
        /**
         * @type {number}
         */
        this[_address] = null;
        /**
         * @type {ByteMoved}
         */
        this[_byteMoved] = null;
    }

    /**
     * Decodes the specified opcode and sets the instruction context
     * @param {Opcode} opcode
     * @param {number} address
     * @return {Opcode}
     */
    DecodeOpcode(opcode, address) {
        this[_opcode] = opcode;

        this[_value] = null;
        this[_address] = null;
        this[_byteMoved] = null;

        switch (opcode.AddressingMode) {
            case AddressingModes.Immediate:
                this[_value] = address;
                break;
            case AddressingModes.Absolute:
                this[_address] = address;
                break;
            case AddressingModes.DirectPage:
                this[_address] = this.Cpu.Registers.DP + address;
                break;
            case AddressingModes.Accumulator:
            case AddressingModes.Implied:
                break;
        }
        return opcode;
    }

    /** @returns {Memory} */
    get Memory() { return this[_snes].Memory; }

    /** @returns {CPU} */
    get Cpu() { return this[_snes].Cpu; }

    /** @returns {InstructionsType} */
    get Type() {
        if (this[_value] !== null) return InstructionsType.Value;
        if (this[_address] !== null) return InstructionsType.Address;
        if (this[_byteMoved] !== null) return InstructionsType.ByteMove;
        return InstructionsType.Nothing;
    }

    /** @returns {number} */
    get Value() {
        if (this[_value] === null) {
            throw new Error("This opcode addressing mode does not provide a value");
        }
        return this[_value];
    }

    /** @returns {number} */
    get Address() {
        if (this[_address] === null) {
            throw new Error("This opcode addressing mode does not provide an address");
        }
        return this[_address];
    }

    /** @returns {ByteMoved} */
    get ByteMoved() {
        if (this[_byteMoved] === null) {
            throw new Error("This opcode addressing mode does not provide byte move");
        }
        return this[_byteMoved];
    }

}

/**
 * @enum {InstructionType}
 */
export const InstructionsType = {
    // TODO: Document
    "Value": 0,
    "Address": 1,
    "ByteMove": 2,
    "Nothing": 3,
};

/**
 * @typedef {number} InstructionType
 */

/**
 * @typedef {Object} ByteMoved
 * @property {number} from
 * @property {number} to
 * @property {number} size
 */
