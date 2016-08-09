import OpcodesMapping from "./opcode/opcodes";
import InstructionContext from "./instruction/context";

import {EnumeratorName} from "./utils/enum";
import {AddressingModes} from "./mem";
import {InstructionsType} from "./instruction/context";
import {HumanReadableValue} from "./utils/format";
import {HumanReadableAddress} from "./utils/format";
import {HumanReadableStatusRegister} from "./utils/format";

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
        this[_context].DecodeOpcode(opcode, this.Registers.PC);
        this.DebugOpcode(opcode);
        this.Registers.PC += opcode.Bytes.Evaluate(this);
        this.Cycles += opcode.Cycles.Evaluate(this);
        opcode.Instruction(this[_context]);
    }

    /**
     * Debugs the given opcode
     */
    DebugOpcode(opcode) {
        console.log("--- Current state ---");
        console.log("PC", HumanReadableAddress(this.Registers.PC));
        console.log("Status", HumanReadableStatusRegister(this));
        console.log("--- Instruction ---");
        console.log(opcode.Instruction.name, "with", opcode.Bytes.Evaluate(this), "bytes", "in",
            opcode.Cycles.Evaluate(this), "cycles", `(${EnumeratorName(AddressingModes, opcode.AddressingMode)})`);
        switch (this[_context].Type) {
            case InstructionsType.Value:
                console.log("Value", HumanReadableValue(this[_context].Value));
                break;
            case InstructionsType.Address:
                console.log("Address", HumanReadableAddress(this[_context].Address));
                break;
        }
        console.log("---");
        console.log("");
    }

    /**
     * Returns the state of the specified bit in the status register
     * @param {number} bit
     * @returns {number}
     */
    GetStatusRegister(bit) {
        return (this.Registers.P & bit) === bit ? 0x1 : 0x0;
    };

    /**
     * Sets the state of the specified bit in the status register
     * @param {number} bit
     * @param {number} value
     */
    SetStatusRegister(bit, value) {
        this.Registers.P = value == 0x1 ? this.Registers.P | bit : this.Registers.P & ~bit;
    };

}

/**
 * Enumerates the bitfields of the Status register (P)
 * @enum {number}
 */
export const StatusRegisters = {
    "C": 0x80, // Carry (native)
    "Z": 0x40, // Zero
    "I": 0x20, // IRQ Disable
    "D": 0x10, // Decimal
    "X": 0x8, // Index register size: 0x0 = 16 bits, 0x1 = 8 bits
    "M": 0x4, // Accumulator register size: 0x0 = 16 bits, 0x1 = 8 bits
    "V": 0x2, // Overflow
    "N": 0x1, // Negative
};
