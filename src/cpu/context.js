import Address from "../addr";

import {AddressingModes} from "./modes";

const _snes = Symbol("snes");
const _opcode = Symbol("snes");
const _lookup = Symbol("lookup");
const _type = Symbol("type");
const _value = Symbol("value");
const _address = Symbol("address");
const _bytesMoved = Symbol("bytesMoved");

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
         * @type {Address}
         */
        this[_lookup] = new Address(0x0);
        /**
         * @param {ContextType}
         */
        this[_type] = ContextTypes.Nothing;
        /**
         * @type {number}
         */
        this[_value] = null;
        /**
         * @type {number}
         */
        this[_address] = new Address(0x0);
        /**
         * @type {BytesMoved}
         */
        this[_bytesMoved] = null;
    }

    /**
     * Decodes the specified opcode and sets the instruction context
     * @param {Opcode} opcode
     * @param {number} bytes
     * @param {Address} address
     * @returns {Opcode}
     */
    DecodeOpcode(opcode, bytes, address) {
        this[_opcode] = opcode;
        this[_lookup].Absolute = address.Absolute;
        this[_lookup].AddEffective(1);
        switch (opcode.AddressingMode) {
            case AddressingModes.Immediate:
                this[_value] = this.Memory.Read(this[_lookup], bytes - 0x1);
                this[_type] = ContextTypes.Value;
                break;
            case AddressingModes.Absolute:
                this[_address].Bank = this.Cpu.Registers.DB;
                this[_address].Effective = this.Memory.ReadUint16(this[_lookup]);
                this[_type] = ContextTypes.Address;
                break;
            case AddressingModes.AbsoluteLong:
                this[_address].Absolute = this.Memory.ReadUint24(this[_lookup]);
                this[_type] = ContextTypes.Address;
                break;
            case AddressingModes.DirectPage:
                this[_address].Bank = this.Cpu.Registers.DB;
                this[_address].Effective = this.Cpu.Registers.DP;
                this[_address].AddEffective(this.Memory.ReadUint8(this[_lookup]));
                this[_type] = ContextTypes.Address;
                break;
            case AddressingModes.ProgramCounterRelative:
                this[_address].Bank = this.Cpu.Registers.PB;
                this[_address].Effective = this.Cpu.Registers.PC.Effective;
                this[_address].AddEffective(this.Memory.ReadInt8(this[_lookup]));
                this[_type] = ContextTypes.Address;
                break;
            case AddressingModes.Accumulator:
            case AddressingModes.StackPush:
            case AddressingModes.StackPull:
            case AddressingModes.Implied:
                this[_type] = ContextTypes.Nothing;
                break;
            default:
                throw new UnimplementedAddressingModeError(opcode.AddressingMode);
        }
        return opcode;
    }

    /** @returns {ContextType} */
    get Type() { return this[_type]; }
    /** @returns {number} */
    get Value() {
        if (this[_type] !== ContextTypes.Value) throw new Error("This opcode addressing mode does not provide a value");
        return this[_value];
    }
    /** @returns {Address} */
    get Address() {
        if (this[_type] !== ContextTypes.Address) throw new Error("This opcode addressing mode does not provide a value");
        return this[_address];
    }
    /** @returns {BytesMoved} */
    get BytesMoved() {
        if (this[_type] !== ContextTypes.BytesMoved) throw new Error("This opcode addressing mode does not provide a value");
        return this[_bytesMoved];
    }

    /** @returns {CPU} */
    get Cpu() { return this[_snes].Cpu; }
    /** @returns {Memory} */
    get Memory() { return this[_snes].Memory; }

}

/**
 * @enum {ContextType}
 */
export const ContextTypes = {
    "Value": 0, // The opcode addressing mode resulted in a value
    "Address": 1, // The opcode addressing mode resulted in an address
    "BytesMoved": 2, // The opcode addressing mode resulted in bytes moved
    "Nothing": 3, // The opcode addressing mode did not expect a result
};
/**
 * @typedef {number} ContextType
 */

/**
 * @typedef {Object} BytesMoved
 * @property {number} from
 * @property {number} to
 * @property {number} size
 */

/**
 * This class represents an unimplemented addressing mode error
 */
export class UnimplementedAddressingModeError extends Error {}
