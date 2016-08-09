import OpcodeBytes from "./bytes";
import OpcodeCycles from "./cycles";
import Instructions from "../instruction/instructions";

import {AddressingModes} from "../mem";

/**
 * An opcode is the combination of:
 *  - An instruction set, aka the routine to execute
 *  - An addressing mode, aka where the instruction will find its arguments
 *  - A number of bytes, aka from how many the program counter will be incremented
 *  - A number of cycles, aka the number of cycles it will take to run the instruction on the CPU
 * @typedef {Object} Opcode
 * @property {function} Instruction
 * @property {AddressingMode} AddressingMode
 * @property {OpcodeBytes} Bytes
 * @property {OpcodeCycles} Cycles
 */

/**
 * This map holds the opcode definitions
 * @type {Map<number, Opcode>}
 */
const OpcodesMapping = new Map();
OpcodesMapping.set(0x00, {
    "Instruction": Instructions.BRK,
    "AddressingMode": AddressingModes.StackInterrupt,
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(7, OpcodeCycles.NativeMode)
});
OpcodesMapping.set(0x06, {
    "Instruction": Instructions.ASL,
    "AddressingMode": AddressingModes.DirectPage,
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(5, OpcodeCycles.DirectPageLowIsNonZero, OpcodeCycles.MIsZero2)
});
OpcodesMapping.set(0x18, {
    "Instruction": Instructions.CLC,
    "AddressingMode": AddressingModes.Implied,
    "Bytes": new OpcodeBytes(1),
    "Cycles": new OpcodeCycles(2)
});
OpcodesMapping.set(0x40, {
    "Instruction": Instructions.RTI,
    "AddressingMode": AddressingModes.StackReturnFromInterrupt,
    "Bytes": new OpcodeBytes(1),
    "Cycles": new OpcodeCycles(6)
});
OpcodesMapping.set(0x5c, {
    "Instruction": Instructions.JMP,
    "AddressingMode": AddressingModes.AbsoluteLong,
    "Bytes": new OpcodeBytes(4),
    "Cycles": new OpcodeCycles(4)
});
OpcodesMapping.set(0x61, {
    "Instruction": Instructions.ADC,
    "AddressingMode": AddressingModes.DirectPageIndexedIndirectX,
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(6, OpcodeCycles.MIsZero1, OpcodeCycles.DirectPageLowIsNonZero)
});
OpcodesMapping.set(0x78, {
    "Instruction": Instructions.SEI,
    "AddressingMode": AddressingModes.Implied,
    "Bytes": new OpcodeBytes(1),
    "Cycles": new OpcodeCycles(2)
});
OpcodesMapping.set(0x80, {
    "Instruction": Instructions.BRA,
    "AddressingMode": AddressingModes.ProgramCounterRelative,
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(3)
});
OpcodesMapping.set(0x85, {
    "Instruction": Instructions.STA,
    "AddressingMode": AddressingModes.DirectPage,
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(3, OpcodeCycles.MIsZero1, OpcodeCycles.DirectPageLowIsNonZero)
});
OpcodesMapping.set(0x8d, {
    "Instruction": Instructions.STA,
    "AddressingMode": AddressingModes.Absolute,
    "Bytes": new OpcodeBytes(3),
    "Cycles": new OpcodeCycles(4, OpcodeCycles.MIsZero1)
});
OpcodesMapping.set(0xa9, {
    "Instruction": Instructions.LDA,
    "AddressingMode": AddressingModes.Immediate,
    "Bytes": new OpcodeBytes(2, OpcodeBytes.MIsZero),
    "Cycles": new OpcodeCycles(2, OpcodeCycles.MIsZero1)
});
OpcodesMapping.set(0xe2, {
    "Instruction": Instructions.SEP,
    "AddressingMode": AddressingModes.Immediate,
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(3)
});
OpcodesMapping.set(0xfb, {
    "Instruction": Instructions.XCE,
    "AddressingMode": AddressingModes.Implied,
    "Bytes": new OpcodeBytes(1),
    "Cycles": new OpcodeCycles(2)
});
OpcodesMapping.set(0xff, {
    "Instruction": Instructions.SBC,
    "AddressingMode": AddressingModes.AbsoluteLongIndexedX,
    "Bytes": new OpcodeBytes(4),
    "Cycles": new OpcodeCycles(5)
});
export default OpcodesMapping;
