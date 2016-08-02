import OpcodesMapping from "./opcode/opcodes";
import InstructionContext from "./instruction/context";

import {enumeratorName} from "./utils/enum";
import {AddressingModes} from "./mem";

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
            "A": 0x0, // (Accumulator) 8 bits or 16 bits
            "X": 0x0, // (Index X) 8 bits or 16 bits
            "Y": 0x0, // (Index Y) 8 bits or 16 bits
            "S": 0x0, // (Stack Pointer) 8 bits
            "DP": 0x0, // (Direct Page) 8 bits
            "DB": 0x0, // (Data Bank) 8 bits
            "PC": 0x0, // (Program Counter) 16 bits
            "PB": 0x0, // (ProgramBank) 8 bits
            "E": 0x0, // (Emulation mode) 8 bits, 0x0 = native, 0x1 = emulation
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
        this.Registers.S = 0x0;
        this.Registers.DP = 0x0;
        this.Registers.DB = 0x0;
        this.Registers.PC = 0x0;
        this.Registers.PB = 0x0;
        this.Registers.E = 0x1;

        this.Registers.P = P_Registers.I | P_Registers.X | P_Registers.M;
        this.Registers.S = 0x100;
        this.Registers.PC = this[_snes].Header.InterruptVectors.EmulationMode.RES;
    }

    /**
     * Makes this CPU tick
     */
    Tick() {
        const opcode = OpcodesMapping.get(this[_snes].Memory.GetUint8(this.Registers.PC));
        if (typeof opcode === "undefined") {
            throw new Error(`${this[_snes].Memory.GetUint8(this.Registers.PC)} is not a valid opcode`);
        }

        if (this[_snes].Debug) {
            console.log("PC", "@", `0x${this.Registers.PC.toString(16)}`);
            console.log(opcode.Instruction.name, "with", opcode.Bytes.Evaluate(this), "bytes",
                "in", opcode.Cycles.Evaluate(this), "cycles", `(${enumeratorName(AddressingModes, opcode.AddressingMode)})`);
        }

        this.Registers.PC += opcode.Bytes.Evaluate(this);
        this.Cycles += opcode.Cycles.Evaluate(this);
        opcode.Instruction(this[_context]);
    }

}

/**
 * Enumerates the bitfields of the P register
 * @enum {number}
 */
export const P_Registers = {
    "C": 0x80, // Carry (native)
    "Z": 0x40, // Zero
    "I": 0x20, // IRQ Disable
    "D": 0x10, // Decimal
    "X": 0x8, // Index register size: 0x0 = 8 bits, 0x1 = 16 bits
    "M": 0x4, // Accumulator register size: 0x0 = 8 bits, 0x1 = 16 bits
    "V": 0x2, // Overflow
    "N": 0x1, // Negative
};
