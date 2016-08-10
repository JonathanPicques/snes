import OpcodesMapping from "./opcode/opcodes";
import InstructionContext from "./instruction/context";

import {EnumeratorName} from "./utils/enum";
import {AddressingModes} from "./mem";
import {ContextTypes} from "./instruction/context";
import {HumanReadableValue} from "./utils/format";
import {HumanReadableAddress} from "./utils/format";
import {HumanReadableCpuRegister} from "./utils/format";
import {HumanReadableCpuStatusRegister} from "./utils/format";

const _snes = Symbol("snes");
const _context = Symbol("InstructionContext");

/**
 * This class emulates the 65C816 central processing unit of the SNES
 */
export default class CPU {

    /**
     * @param {SNES} snes
     */
    constructor(snes) {
        /**
         * @type {SNES}
         */
        this[_snes] = snes;
        /**
         * @type {InstructionContext}
         */
        this[_context] = new InstructionContext(snes);
        /**
         * Number of cycles elapsed
         * @type {number}
         */
        this.Cycles = 0;
        /**
         * CPU registers
         * @type {Object}
         */
        this.Registers = {
            "P": 0x0, // (Status) 8 bits
            "A": 0x0, // (Accumulator ) 8 bits if P.M == 0, 16 bits if P.M == 1
            "X": 0x0, // (Index X) 8 bits if P.X == 0, 16 bits if P.X == 1
            "Y": 0x0, // (Index Y) 8 bits if P.X == 0, 16 bits if P.X == 1

            "SP": 0x0, // (Stack Pointer) 8 bits
            "DP": 0x0, // (Direct Page) 8 bits
            "DB": 0x0, // (Data Bank) 8 bits
            "PC": 0x0, // (Program Counter) 16 bits
            "PB": 0x0, // (Program Bank) 8 bits

            "E": 0x0, // (Emulation mode) 8 bits: 0x0 = native, 0x1 = emulation
        };
        /**
         * Internal CPU registers
         * @type {ArrayBuffer}
         */
        this.InternalRegisters = new ArrayBuffer(0x3ff);
        /**
         * Internal CPU registers view
         * @type {DataView}
         */
        this.InternalRegistersView = new DataView(this.InternalRegisters);
    }

    /**
     * Resets this CPU
     */
    Reset() {
        this.Registers.P = 0x0;
        this.Registers.A = 0x0;
        this.Registers.X = 0x0;
        this.Registers.Y = 0x0;
        this.Registers.SP = 0x0;
        this.Registers.DP = 0x0;
        this.Registers.DB = 0x0;
        this.Registers.PC = 0x0;
        this.Registers.PB = 0x0;
        this.Registers.E = 0x1;

        this.Registers.P = StatusRegisters.I | StatusRegisters.X | StatusRegisters.M;
        this.Registers.SP = 0x1ff;
        this.Registers.PC = this[_snes].Cart.Header.InterruptVectors.EmulationMode.RES;
    }

    /**
     * Makes this CPU tick
     */
    Tick() {
        const op = this[_snes].Memory.ReadUint8(this.Registers.PC);
        const opcode = OpcodesMapping.get(op);
        if (typeof opcode === "undefined") {
            throw new Error(`${op.toString(16)} is not a valid opcode`);
        }
        const bytes = opcode.Bytes.Evaluate(this);
        this[_context].DecodeOpcode(opcode, bytes, this.Registers.PC);
        this.DebugOpcode(op, opcode);
        this.Registers.PC += bytes;
        this.Cycles += opcode.Cycles.Evaluate(this);
        opcode.Instruction(this[_context]);
    }

    /**
     * Debugs the given opcode
     * @param {number} op
     * @param {Opcode} opcode
     */
    DebugOpcode(op, opcode) {
        /*eslint-disable no-console */
        console.log("--- Current state ---");
        console.log("Cpu", HumanReadableCpuRegister(this));
        console.log("Status", HumanReadableCpuStatusRegister(this));
        console.log("--- Instruction ---");
        console.log(opcode.Instruction.name, `(${op.toString(16)})`, "with", opcode.Bytes.Evaluate(this), "bytes", "in",
            opcode.Cycles.Evaluate(this), "cycles", `(${EnumeratorName(AddressingModes, opcode.AddressingMode)})`);
        switch (this[_context].Type) {
            case ContextTypes.Value:
                console.log("Value", HumanReadableValue(this[_context].Value));
                break;
            case ContextTypes.Address:
                console.log("Address", HumanReadableAddress(this[_context].Address));
                break;
        }
        console.log("---");
        console.log("");
        /*eslint-enable no-console */
    }

    /**
     * Returns the state of the specified bit in the status register
     * @param {StatusRegister} bit
     * @returns {number}
     */
    GetStatusRegister(bit) {
        return (this.Registers.P & bit) === bit ? 0x1 : 0x0;
    }

    /**
     * Sets the state of the specified bit in the status register
     * @param {StatusRegister} bit
     * @param {number} value
     */
    SetStatusRegister(bit, value) {
        this.Registers.P = value === 0x1 ? this.Registers.P | bit : this.Registers.P & ~bit;
    }

}

/**
 * Enumerates the bitfields of the Status register (P)
 * @enum {StatusRegister}
 */
export const StatusRegisters = {
    "C": 0x1, // Carry (native)
    "Z": 0x2, // Zero
    "I": 0x4, // IRQ Disable
    "D": 0x8, // Decimal
    "X": 0x10, // Index register size: 0x0 = 16 bits, 0x1 = 8 bits
    "M": 0x20, // Accumulator register size: 0x0 = 16 bits, 0x1 = 8 bits
    "V": 0x40, // Overflow
    "N": 0x80, // Negative
};
/**
 * @typedef {number} StatusRegister
 */
