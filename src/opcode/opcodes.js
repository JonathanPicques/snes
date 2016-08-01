import OpcodeBytes from "./bytes";
import OpcodeCycles from "./cycles";
import Instructions from "../instruction/instructions";
import {AddressingModes} from "../mem";

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
    "Cycles": new OpcodeCycles(5, OpcodeCycles.LowByteDirectPageIsNonZero, OpcodeCycles.MIsZero2)
});
OpcodesMapping.set(0x40, {
    "Instruction": Instructions.RTI,
    "AddressingMode": AddressingModes.StackReturnFromInterrupt,
    "Bytes": new OpcodeBytes(1),
    "Cycles": new OpcodeCycles(6)
});
OpcodesMapping.set(0x61, {
    "Instruction": Instructions.ADC,
    "AddressingMode": AddressingModes.DirectPageIndexedIndirectX,
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(6, OpcodeCycles.MIsZero1, OpcodeCycles.LowByteDirectPageIsNonZero)
});
OpcodesMapping.set(0x80, {
    "Instruction": Instructions.BRA,
    "AddressingMode": AddressingModes.ProgramCounterRelative,
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

/**
 * @typedef {Object} Opcode
 * @property {function} Instruction
 * @property {AddressingMode} AddressingMode
 * @property {OpcodeBytes} Bytes
 * @property {OpcodeCycles} Cycles
 */
