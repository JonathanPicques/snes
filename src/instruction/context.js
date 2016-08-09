import {AddressingModes} from "../mem";

const _snes = Symbol("snes");
const _opcode = Symbol("snes");
const _value = Symbol("value");
const _address = Symbol("address");
const _byteMoved = Symbol("byteMoved");

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
                this[_value] = this.Memory.ReadUint8(address + 1); // TODO: ReadUint16 if bytes == 2?
                break;
            case AddressingModes.Absolute:
                this[_address] = this.Memory.ReadUint24(address + 1) & 0xffff; // TODO: really remove bank byte?
                break;
            case AddressingModes.AbsoluteLong:
                this[_address] = this.Memory.ReadUint24(address + 1);
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
    "Value": 0, // The opcode addressing mode resulted in a value
    "Address": 1, // The opcode addressing mode resulted in an address
    "ByteMove": 2, // The opcode addressing mode resulted in a byte move
    "Nothing": 3, // The opcode addressing mode did not expect a result
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
