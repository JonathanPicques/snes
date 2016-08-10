import Memory from "../mem";

import {AddressingModes} from "../mem";

const _snes = Symbol("snes");
const _opcode = Symbol("snes");
const _value = Symbol("value");
const _address = Symbol("address");
const _byteMoved = Symbol("byteMoved");

/**
 * This class holds the context for a specified opcode
 * Depending on the addressing mode of the opcode, the context will provide one of the following:
 * - Value (eg. if addressing mode is Immediate)
 * - Address (eg. if addressing mode is Absolute, AbsoluteLong, DirectPage, ...)
 * - ByteMove (eg. if addressing mode is BlockMove, for opcodes MVP and MVN)
 * - Nothing (eg. if addressing mode is Implied, Accumulator, ... for opcodes like XCE, BRK, RTI, ...)
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
     * @param {number} bytes
     * @param {number} address
     * @returns {Opcode}
     */
    DecodeOpcode(opcode, bytes, address) {
        this[_opcode] = opcode;

        this[_value] = null;
        this[_address] = null;
        this[_byteMoved] = null;

        switch (opcode.AddressingMode) {
            case AddressingModes.Immediate:
                this[_value] = this.Memory.Read(address + 1, bytes - 0x1);
                break;
            case AddressingModes.Absolute:
                this[_address] = Memory.ComposeAddress(this.Cpu.Registers.DB, this.Memory.ReadUint16(address + 1));
                break;
            case AddressingModes.AbsoluteLong:
                this[_address] = this.Memory.ReadUint24(address + 1);
                break;
            case AddressingModes.DirectPage:
                this[_address] = Memory.ComposeAddress(0x0, this.Cpu.Registers.DP + this.Memory.ReadUint8(address + 1));
                break;
            case AddressingModes.Accumulator:
            case AddressingModes.Implied:
                break;
            default:
                throw new UnknownAddressingModeError(opcode.AddressingMode);
        }
        return opcode;
    }

    /** @returns {Memory} */
    get Memory() { return this[_snes].Memory; }
    /** @returns {CPU} */
    get Cpu() { return this[_snes].Cpu; }

    /** @returns {ContextTypes} */
    get Type() {
        if (this[_value] !== null) return ContextTypes.Value;
        if (this[_address] !== null) return ContextTypes.Address;
        if (this[_byteMoved] !== null) return ContextTypes.ByteMove;
        return ContextTypes.Nothing;
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
 * @enum {ContextType}
 */
export const ContextTypes = {
    "Value": 0, // The opcode addressing mode resulted in a value
    "Address": 1, // The opcode addressing mode resulted in an address
    "ByteMove": 2, // The opcode addressing mode resulted in a byte move
    "Nothing": 3, // The opcode addressing mode did not expect a result
};
/**
 * @typedef {number} ContextType
 */

/**
 * @typedef {Object} ByteMoved
 * @property {number} from
 * @property {number} to
 * @property {number} size
 */

/**
 * This class represents an unknown addressing mode error
 */
export class UnknownAddressingModeError extends Error {}
