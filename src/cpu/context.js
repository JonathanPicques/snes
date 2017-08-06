import Address from "../addr";
import {AddressingModes} from "./modes";

const _snes = Symbol("snes");
const _opcode = Symbol("opcode");
const _type = Symbol("type");
const _value = Symbol("value");
const _address = Symbol("address");
const _bytesMoved = Symbol("bytesMoved");
const _branchTakenCrossesPageBoundary = Symbol("branchTakenCrossesPageBoundary");

/**
 * Temporary address used for reading memory for addressing modes
 * addressPC will be set at CPU's PC + 1 in DecodeOpcode
 * @type {Address}
 */
const addressPC = new Address(0x0);

/**
 * This class turns an opcode into an executable instruction, providing data depending on the addressing mode:
 * - Value (eg. if addressing mode is Immediate)
 * - Address (eg. if addressing mode is Absolute, AbsoluteLong, DirectPage, ...)
 * - ByteMove (eg. if addressing mode is BlockMove, for opcodes MVP and MVN)
 * - Nothing (eg. if addressing mode is Implied, Accumulator, ... for opcodes like XCE, BRK, RTI, ...)
 */
export default class OpcodeContext {
    /**
     * @param {SNES} snes
     */
    constructor(snes) {
        /**
         * Reference to the SNES
         * @type {SNES}
         */
        this[_snes] = snes;
        /**
         * Reference to the opcode
         * @type {Opcode}
         */
        this[_opcode] = null;
        /**
         * Type of data this context will hand to the instruction
         * @param {ContextType}
         */
        this[_type] = ContextTypes.Nothing;
        /**
         * The data value if type is ContextTypes.Value, null otherwise
         * @type {number}
         */
        this[_value] = null;
        /**
         * The data address if type is ContextTypes.Address, null otherwise
         * @type {number}
         */
        this[_address] = new Address(0x0);
        /**
         * The data bytes moved if type is ContextTypes.BytesMoved, null otherwise
         * @type {BytesMoved}
         */
        this[_bytesMoved] = null;
        /**
         * Whether the instruction took a branch that crosses a page boundary
         * @type {boolean}
         */
        this[_branchTakenCrossesPageBoundary] = false;
    }

    /** @returns {CPU} */
    get Cpu() { return this[_snes].Cpu; }

    /** @returns {Memory} */
    get Memory() { return this[_snes].Memory; }

    /** @returns {Opcode} */
    get Opcode() { return this[_opcode]; }

    /** @returns {ContextType} */
    get Type() { return this[_type]; }

    /** @returns {number} */
    get Value() {
        if (this[_type] !== ContextTypes.Value) {
            throw new Error("This opcode addressing mode does not provide a value");
        }
        return this[_value];
    }

    /** @returns {Address} */
    get Address() {
        if (this[_type] !== ContextTypes.Address) {
            throw new Error("This opcode addressing mode does not provide an address");
        }
        return this[_address];
    }

    /** @returns {BytesMoved} */
    get BytesMoved() {
        if (this[_type] !== ContextTypes.BytesMoved) {
            throw new Error("This opcode addressing mode does not provide bytes moved");
        }
        return this[_bytesMoved];
    }

    /** @returns {boolean} */
    get BranchTakenCrossesPageBoundary() { return this[_branchTakenCrossesPageBoundary]; }

    /**
     * Turns the specified opcode into an executable instruction and returns the number of bytes consumed
     * @param {Opcode} opcode
     * @returns {number}
     */
    DecodeOpcode(opcode) {
        const bytes = opcode.Bytes.Evaluate(this);
        this[_opcode] = opcode;
        addressPC.Absolute = this[_snes].Cpu.Registers.PC.Absolute;
        addressPC.AddEffective(0x1);
        switch (opcode.AddressingMode) {
            case AddressingModes.Immediate:
                this[_value] = this.Memory.Read(addressPC, bytes - 0x1);
                this[_type] = ContextTypes.Value;
                break;
            case AddressingModes.Absolute:
                this[_address].Bank = this.Cpu.Registers.DB;
                this[_address].Effective = this.Memory.ReadUint16(addressPC);
                this[_type] = ContextTypes.Address;
                break;
            case AddressingModes.AbsoluteLong:
                this[_address].Absolute = this.Memory.ReadUint24(addressPC);
                this[_type] = ContextTypes.Address;
                break;
            case AddressingModes.DirectPage:
                this[_address].Bank = this.Cpu.Registers.DB;
                this[_address].Effective = this.Cpu.Registers.DP;
                this[_address].AddEffective(this.Memory.ReadUint8(addressPC));
                this[_type] = ContextTypes.Address;
                break;
            case AddressingModes.ProgramCounterRelative:
                this[_address].Bank = this.Cpu.Registers.PB;
                this[_address].Effective = this.Cpu.Registers.PC.Effective;
                this[_address].AddEffective(this.Memory.ReadInt8(addressPC));
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
        return bytes;
    }

    /**
     * Executes the instruction and returns the number of cycles elapsed
     * @returns {number}
     */
    ExecuteInstruction() {
        const previousCounter = this[_snes].Cpu.Registers.PC.Clone();
        this[_opcode].Instruction(this);
        return this[_opcode].Cycles.Evaluate(this, this[_snes].Cpu.Registers.PC, previousCounter);
    }

}

/**
 * @enum {ContextType}
 */
export const ContextTypes = {
    "Value": 0, // The opcode addressing mode yields a value
    "Address": 1, // The opcode addressing mode yields an address
    "BytesMoved": 2, // The opcode addressing mode yields bytes moved
    "Nothing": 3, // The opcode addressing mode does not yield a result
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
export class UnimplementedAddressingModeError extends Error {

    /**
     * @param {Object} message
     */
    constructor(message) {
        super(message);
    }

}
