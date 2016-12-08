import OpcodeBytes, {ByteModifiers} from "./bytes";
import OpcodeCycles, {CycleModifiers} from "./cycles";
import Instructions from "./instructions";
import {AddressingModes} from "./modes";

/**
 * @typedef {Object} Opcode
 * @property {Instruction} Instruction - the CPU function to execute
 * @property {AddressingMode} AddressingMode - where the instruction will find its arguments
 * @property {OpcodeBytes} Bytes - the number of bytes the instruction will read
 * @property {OpcodeCycles} Cycles - the number of cycles needed to perform the instruction on the CPU
 */

/**
 * This map holds the opcode definitions
 * @type {Map<number, Opcode>}
 */
const Opcodes = new Map();
Opcodes.set(0x00, {
    "Instruction": Instructions.BRK,
    "AddressingMode": AddressingModes.StackInterrupt,
    "Bytes": new OpcodeBytes(2, ByteModifiers.OptionalSignature),
    "Cycles": new OpcodeCycles(7, CycleModifiers.NativeMode)
});
Opcodes.set(0x01, {
    "Instruction": Instructions.ORA,
    "AddressingMode": AddressingModes.DirectPageIndexedIndirectX,
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(6, CycleModifiers.MIsZeroOne, CycleModifiers.DirectPageLowIsNonZero)
});
Opcodes.set(0x02, {
    "Instruction": Instructions.COP,
    "AddressingMode": AddressingModes.StackInterrupt,
    "Bytes": new OpcodeBytes(2, ByteModifiers.OptionalSignature),
    "Cycles": new OpcodeCycles(7, CycleModifiers.NativeMode)
});
Opcodes.set(0x03, {
    "Instruction": Instructions.ORA,
    "AddressingMode": AddressingModes.StackRelative,
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(4, CycleModifiers.MIsZeroOne)
});
Opcodes.set(0x04, {
    "Instruction": Instructions.TSB,
    "AddressingMode": AddressingModes.DirectPage,
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(5, CycleModifiers.DirectPageLowIsNonZero, CycleModifiers.MIsZeroTwo)
});
Opcodes.set(0x05, {
    "Instruction": Instructions.ORA,
    "AddressingMode": AddressingModes.DirectPage,
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(3, CycleModifiers.MIsZeroOne, CycleModifiers.DirectPageLowIsNonZero)
});
Opcodes.set(0x06, {
    "Instruction": Instructions.ASL,
    "AddressingMode": AddressingModes.DirectPage,
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(5, CycleModifiers.DirectPageLowIsNonZero, CycleModifiers.MIsZeroTwo)
});
Opcodes.set(0x07, {
    "Instruction": Instructions.ORA,
    "AddressingMode": AddressingModes.DirectPageIndirectLong,
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(6, CycleModifiers.MIsZeroOne, CycleModifiers.DirectPageLowIsNonZero)
});
Opcodes.set(0x08, {
    "Instruction": Instructions.PHP,
    "AddressingMode": AddressingModes.StackPush,
    "Bytes": new OpcodeBytes(1),
    "Cycles": new OpcodeCycles(3)
});
Opcodes.set(0x09, {
    "Instruction": Instructions.ORA,
    "AddressingMode": AddressingModes.Immediate,
    "Bytes": new OpcodeBytes(2, ByteModifiers.MIsZero),
    "Cycles": new OpcodeCycles(2, CycleModifiers.MIsZeroOne)
});
Opcodes.set(0x0a, {
    "Instruction": Instructions.ASL,
    "AddressingMode": AddressingModes.Accumulator,
    "Bytes": new OpcodeBytes(1),
    "Cycles": new OpcodeCycles(2)
});
Opcodes.set(0x0b, {
    "Instruction": Instructions.PHD,
    "AddressingMode": AddressingModes.StackPush,
    "Bytes": new OpcodeBytes(1),
    "Cycles": new OpcodeCycles(4)
});
Opcodes.set(0x0c, {
    "Instruction": Instructions.TSB,
    "AddressingMode": AddressingModes.Absolute,
    "Bytes": new OpcodeBytes(3),
    "Cycles": new OpcodeCycles(6, CycleModifiers.MIsZeroTwo)
});
Opcodes.set(0x0d, {
    "Instruction": Instructions.ORA,
    "AddressingMode": AddressingModes.Absolute,
    "Bytes": new OpcodeBytes(3),
    "Cycles": new OpcodeCycles(4, CycleModifiers.MIsZeroOne)
});
Opcodes.set(0x0e, {
    "Instruction": Instructions.ASL,
    "AddressingMode": AddressingModes.Absolute,
    "Bytes": new OpcodeBytes(3),
    "Cycles": new OpcodeCycles(6, CycleModifiers.MIsZeroTwo)
});
Opcodes.set(0x0f, {
    "Instruction": Instructions.ORA,
    "AddressingMode": AddressingModes.AbsoluteLong,
    "Bytes": new OpcodeBytes(4),
    "Cycles": new OpcodeCycles(5, CycleModifiers.MIsZeroOne)
});
Opcodes.set(0x10, {
    "Instruction": Instructions.BPL,
    "AddressingMode": AddressingModes.ProgramCounterRelative,
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(2, CycleModifiers.BranchTaken, CycleModifiers.EmulationBranchTakenCrossesPageBoundary)
});
Opcodes.set(0x11, {
    "Instruction": Instructions.ORA,
    "AddressingMode": AddressingModes.DirectPageIndexedIndirectY,
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(5, CycleModifiers.MIsZeroOne, CycleModifiers.DirectPageLowIsNonZero, CycleModifiers.IndexCrossesPageBoundary)
});
Opcodes.set(0x12, {
    "Instruction": Instructions.ORA,
    "AddressingMode": AddressingModes.DirectPageIndirect,
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(5, CycleModifiers.MIsZeroOne, CycleModifiers.DirectPageLowIsNonZero)
});
Opcodes.set(0x13, {
    "Instruction": Instructions.ORA,
    "AddressingMode": AddressingModes.StackRelativeIndexedY, // TODO
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(7, CycleModifiers.MIsZeroOne)
});
Opcodes.set(0x14, {
    "Instruction": Instructions.TRB,
    "AddressingMode": AddressingModes.DirectPage,
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(5, CycleModifiers.DirectPageLowIsNonZero, CycleModifiers.MIsZeroTwo)
});
Opcodes.set(0x15, {
    "Instruction": Instructions.ORA,
    "AddressingMode": AddressingModes.DirectPageIndexedX,
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(4, CycleModifiers.MIsZeroOne, CycleModifiers.DirectPageLowIsNonZero)
});
Opcodes.set(0x16, {
    "Instruction": Instructions.ASL,
    "AddressingMode": AddressingModes.DirectPageIndexedX,
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(6, CycleModifiers.DirectPageLowIsNonZero, CycleModifiers.MIsZeroTwo)
});
Opcodes.set(0x17, {
    "Instruction": Instructions.ORA,
    "AddressingMode": AddressingModes.DirectPageIndirectLongIndexedY,
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(6, CycleModifiers.MIsZeroOne, CycleModifiers.DirectPageLowIsNonZero)
});
Opcodes.set(0x18, {
    "Instruction": Instructions.CLC,
    "AddressingMode": AddressingModes.Implied,
    "Bytes": new OpcodeBytes(1),
    "Cycles": new OpcodeCycles(2)
});
Opcodes.set(0x19, {
    "Instruction": Instructions.ORA,
    "AddressingMode": AddressingModes.AbsoluteIndexedY,
    "Bytes": new OpcodeBytes(3),
    "Cycles": new OpcodeCycles(4, CycleModifiers.MIsZeroOne, CycleModifiers.IndexCrossesPageBoundary)
});
Opcodes.set(0x1a, {
    "Instruction": Instructions.INC,
    "AddressingMode": AddressingModes.Accumulator, // TODO
    "Bytes": new OpcodeBytes(1),
    "Cycles": new OpcodeCycles(2)
});
Opcodes.set(0x1b, {
    "Instruction": Instructions.TCS,
    "AddressingMode": AddressingModes.Implied,
    "Bytes": new OpcodeBytes(1),
    "Cycles": new OpcodeCycles(2)
});
Opcodes.set(0x1c, {
    "Instruction": Instructions.TRB,
    "AddressingMode": AddressingModes.Absolute,
    "Bytes": new OpcodeBytes(3),
    "Cycles": new OpcodeCycles(6, CycleModifiers.MIsZeroTwo)
});
Opcodes.set(0x1d, {
    "Instruction": Instructions.ORA,
    "AddressingMode": AddressingModes.AbsoluteIndexedX,
    "Bytes": new OpcodeBytes(3),
    "Cycles": new OpcodeCycles(4, CycleModifiers.MIsZeroOne, CycleModifiers.IndexCrossesPageBoundary)
});
Opcodes.set(0x1e, {
    "Instruction": Instructions.ASL,
    "AddressingMode": AddressingModes.AbsoluteIndexedX,
    "Bytes": new OpcodeBytes(3),
    "Cycles": new OpcodeCycles(7, CycleModifiers.MIsZeroTwo, CycleModifiers.EmulationNoPageBoundaryCrossed)
});
Opcodes.set(0x1f, {
    "Instruction": Instructions.ORA,
    "AddressingMode": AddressingModes.AbsoluteLongIndexedX,
    "Bytes": new OpcodeBytes(4),
    "Cycles": new OpcodeCycles(5, CycleModifiers.MIsZeroOne)
});
Opcodes.set(0x20, {
    "Instruction": Instructions.JSR,
    "AddressingMode": AddressingModes.Absolute,
    "Bytes": new OpcodeBytes(3),
    "Cycles": new OpcodeCycles(6)
});
Opcodes.set(0x21, {
    "Instruction": Instructions.AND,
    "AddressingMode": AddressingModes.DirectPageIndexedIndirectX,
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(6, CycleModifiers.MIsZeroOne, CycleModifiers.DirectPageLowIsNonZero)
});
Opcodes.set(0x22, {
    "Instruction": Instructions.JSR,
    "AddressingMode": AddressingModes.AbsoluteLong,
    "Bytes": new OpcodeBytes(4),
    "Cycles": new OpcodeCycles(8)
});
Opcodes.set(0x23, {
    "Instruction": Instructions.AND,
    "AddressingMode": AddressingModes.StackRelative,
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(4, CycleModifiers.MIsZeroOne)
});
Opcodes.set(0x24, {
    "Instruction": Instructions.BIT,
    "AddressingMode": AddressingModes.DirectPage,
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(3, CycleModifiers.MIsZeroOne, CycleModifiers.DirectPageLowIsNonZero)
});
Opcodes.set(0x25, {
    "Instruction": Instructions.AND,
    "AddressingMode": AddressingModes.DirectPage,
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(3, CycleModifiers.MIsZeroOne, CycleModifiers.DirectPageLowIsNonZero)
});
Opcodes.set(0x26, {
    "Instruction": Instructions.ROL,
    "AddressingMode": AddressingModes.DirectPage,
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(5, CycleModifiers.DirectPageLowIsNonZero, CycleModifiers.MIsZeroTwo)
});
Opcodes.set(0x27, {
    "Instruction": Instructions.AND,
    "AddressingMode": AddressingModes.DirectPageIndirectLong,
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(6, CycleModifiers.MIsZeroOne, CycleModifiers.DirectPageLowIsNonZero)
});
Opcodes.set(0x28, {
    "Instruction": Instructions.PLP,
    "AddressingMode": AddressingModes.StackPull,
    "Bytes": new OpcodeBytes(1),
    "Cycles": new OpcodeCycles(4)
});
Opcodes.set(0x29, {
    "Instruction": Instructions.AND,
    "AddressingMode": AddressingModes.Immediate,
    "Bytes": new OpcodeBytes(2, ByteModifiers.MIsZero),
    "Cycles": new OpcodeCycles(2, CycleModifiers.MIsZeroOne)
});
Opcodes.set(0x2a, {
    "Instruction": Instructions.ROL,
    "AddressingMode": AddressingModes.Accumulator,
    "Bytes": new OpcodeBytes(1),
    "Cycles": new OpcodeCycles(2)
});
Opcodes.set(0x2b, {
    "Instruction": Instructions.PLD,
    "AddressingMode": AddressingModes.StackPull,
    "Bytes": new OpcodeBytes(1),
    "Cycles": new OpcodeCycles(5)
});
Opcodes.set(0x2c, {
    "Instruction": Instructions.BIT,
    "AddressingMode": AddressingModes.Absolute,
    "Bytes": new OpcodeBytes(3),
    "Cycles": new OpcodeCycles(4, CycleModifiers.MIsZeroOne)
});
Opcodes.set(0x2d, {
    "Instruction": Instructions.AND,
    "AddressingMode": AddressingModes.Absolute,
    "Bytes": new OpcodeBytes(3),
    "Cycles": new OpcodeCycles(4, CycleModifiers.MIsZeroOne)
});
Opcodes.set(0x2e, {
    "Instruction": Instructions.ROL,
    "AddressingMode": AddressingModes.Absolute,
    "Bytes": new OpcodeBytes(3),
    "Cycles": new OpcodeCycles(6, CycleModifiers.MIsZeroTwo)
});
Opcodes.set(0x2f, {
    "Instruction": Instructions.AND,
    "AddressingMode": AddressingModes.AbsoluteLong,
    "Bytes": new OpcodeBytes(4),
    "Cycles": new OpcodeCycles(5, CycleModifiers.MIsZeroOne)
});
Opcodes.set(0x30, {
    "Instruction": Instructions.BMI,
    "AddressingMode": AddressingModes.ProgramCounterRelative,
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(2, CycleModifiers.BranchTaken, CycleModifiers.EmulationBranchTakenCrossesPageBoundary)
});
Opcodes.set(0x31, {
    "Instruction": Instructions.AND,
    "AddressingMode": AddressingModes.DirectPageIndexedIndirectY,
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(5, CycleModifiers.MIsZeroOne, CycleModifiers.DirectPageLowIsNonZero, CycleModifiers.IndexCrossesPageBoundary)
});
Opcodes.set(0x32, {
    "Instruction": Instructions.AND,
    "AddressingMode": AddressingModes.DirectPageIndirect,
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(5, CycleModifiers.MIsZeroOne, CycleModifiers.MIsZeroOne)
});
Opcodes.set(0x33, {
    "Instruction": Instructions.AND,
    "AddressingMode": AddressingModes.StackRelativeIndexedY, // TODO
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(7, CycleModifiers.MIsZeroOne)
});
Opcodes.set(0x34, {
    "Instruction": Instructions.BIT,
    "AddressingMode": AddressingModes.DirectPageIndexedX,
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(4, CycleModifiers.MIsZeroOne, CycleModifiers.DirectPageLowIsNonZero)
});
Opcodes.set(0x35, {
    "Instruction": Instructions.AND,
    "AddressingMode": AddressingModes.DirectPageIndexedX,
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(4, CycleModifiers.MIsZeroOne, CycleModifiers.DirectPageLowIsNonZero)
});
Opcodes.set(0x36, {
    "Instruction": Instructions.ROL,
    "AddressingMode": AddressingModes.DirectPageIndexedX,
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(6, CycleModifiers.DirectPageLowIsNonZero, CycleModifiers.MIsZeroTwo)
});
Opcodes.set(0x37, {
    "Instruction": Instructions.AND,
    "AddressingMode": AddressingModes.DirectPageIndirectLongIndexedY,
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(6, CycleModifiers.MIsZeroOne, CycleModifiers.DirectPageLowIsNonZero)
});
Opcodes.set(0x38, {
    "Instruction": Instructions.SEC,
    "AddressingMode": AddressingModes.Implied,
    "Bytes": new OpcodeBytes(1),
    "Cycles": new OpcodeCycles(2)
});
Opcodes.set(0x39, {
    "Instruction": Instructions.AND,
    "AddressingMode": AddressingModes.AbsoluteIndexedY,
    "Bytes": new OpcodeBytes(3),
    "Cycles": new OpcodeCycles(4, CycleModifiers.MIsZeroOne, CycleModifiers.IndexCrossesPageBoundary)
});
Opcodes.set(0x3a, {
    "Instruction": Instructions.DEC,
    "AddressingMode": AddressingModes.Accumulator,
    "Bytes": new OpcodeBytes(1),
    "Cycles": new OpcodeCycles(2)
});
Opcodes.set(0x3b, {
    "Instruction": Instructions.TSC,
    "AddressingMode": AddressingModes.Implied,
    "Bytes": new OpcodeBytes(1),
    "Cycles": new OpcodeCycles(2)
});
Opcodes.set(0x3c, {
    "Instruction": Instructions.BIT,
    "AddressingMode": AddressingModes.AbsoluteIndexedX,
    "Bytes": new OpcodeBytes(3),
    "Cycles": new OpcodeCycles(4, CycleModifiers.MIsZeroOne, CycleModifiers.IndexCrossesPageBoundary)
});
Opcodes.set(0x3d, {
    "Instruction": Instructions.AND,
    "AddressingMode": AddressingModes.AbsoluteIndexedX,
    "Bytes": new OpcodeBytes(3),
    "Cycles": new OpcodeCycles(4, CycleModifiers.MIsZeroOne, CycleModifiers.IndexCrossesPageBoundary)
});
Opcodes.set(0x3e, {
    "Instruction": Instructions.ROL,
    "AddressingMode": AddressingModes.AbsoluteIndexedX,
    "Bytes": new OpcodeBytes(3),
    "Cycles": new OpcodeCycles(7, CycleModifiers.MIsZeroTwo, CycleModifiers.EmulationNoPageBoundaryCrossed)
});
Opcodes.set(0x3f, {
    "Instruction": Instructions.AND,
    "AddressingMode": AddressingModes.AbsoluteLongIndexedX,
    "Bytes": new OpcodeBytes(4),
    "Cycles": new OpcodeCycles(5, CycleModifiers.MIsZeroOne)
});
Opcodes.set(0x40, {
    "Instruction": Instructions.RTI,
    "AddressingMode": AddressingModes.StackReturnFromInterrupt,
    "Bytes": new OpcodeBytes(1),
    "Cycles": new OpcodeCycles(6, CycleModifiers.NativeMode)
});
Opcodes.set(0x41, {
    "Instruction": Instructions.EOR,
    "AddressingMode": AddressingModes.DirectPageIndexedIndirectX,
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(6, CycleModifiers.MIsZeroOne, CycleModifiers.DirectPageLowIsNonZero)
});
Opcodes.set(0x42, {
    "Instruction": Instructions.WDM,
    "AddressingMode": AddressingModes.Immediate, // TODO
    "Bytes": new OpcodeBytes(2 | 16), // TODO
    "Cycles": new OpcodeCycles(0) // TODO
});
Opcodes.set(0x43, {
    "Instruction": Instructions.EOR,
    "AddressingMode": AddressingModes.StackRelative,
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(4, CycleModifiers.MIsZeroOne)
});
Opcodes.set(0x44, {
    "Instruction": Instructions.MVP,
    "AddressingMode": AddressingModes.BlockMove,
    "Bytes": new OpcodeBytes(3),
    "Cycles": new OpcodeCycles(0, CycleModifiers.SevenCyclesPerByteMoved) // TODO
});
Opcodes.set(0x45, {
    "Instruction": Instructions.EOR,
    "AddressingMode": AddressingModes.DirectPage,
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(3, CycleModifiers.MIsZeroOne, CycleModifiers.DirectPageLowIsNonZero)
});
Opcodes.set(0x46, {
    "Instruction": Instructions.LSR,
    "AddressingMode": AddressingModes.DirectPage,
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(5, CycleModifiers.DirectPageLowIsNonZero, CycleModifiers.MIsZeroTwo)
});
Opcodes.set(0x47, {
    "Instruction": Instructions.EOR,
    "AddressingMode": AddressingModes.DirectPageIndirectLong,
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(6, CycleModifiers.MIsZeroOne, CycleModifiers.DirectPageLowIsNonZero)
});
Opcodes.set(0x48, {
    "Instruction": Instructions.PHA,
    "AddressingMode": AddressingModes.StackPush,
    "Bytes": new OpcodeBytes(1),
    "Cycles": new OpcodeCycles(3, CycleModifiers.MIsZeroOne)
});
Opcodes.set(0x49, {
    "Instruction": Instructions.EOR,
    "AddressingMode": AddressingModes.Immediate,
    "Bytes": new OpcodeBytes(2, ByteModifiers.MIsZero),
    "Cycles": new OpcodeCycles(2, CycleModifiers.MIsZeroOne)
});
Opcodes.set(0x4a, {
    "Instruction": Instructions.LSR,
    "AddressingMode": AddressingModes.Accumulator,
    "Bytes": new OpcodeBytes(1),
    "Cycles": new OpcodeCycles(2)
});
Opcodes.set(0x4b, {
    "Instruction": Instructions.PHK,
    "AddressingMode": AddressingModes.StackPush,
    "Bytes": new OpcodeBytes(1),
    "Cycles": new OpcodeCycles(3)
});
Opcodes.set(0x4c, {
    "Instruction": Instructions.JMP,
    "AddressingMode": AddressingModes.Absolute,
    "Bytes": new OpcodeBytes(3),
    "Cycles": new OpcodeCycles(3)
});
Opcodes.set(0x4d, {
    "Instruction": Instructions.EOR,
    "AddressingMode": AddressingModes.Absolute,
    "Bytes": new OpcodeBytes(3),
    "Cycles": new OpcodeCycles(4, CycleModifiers.MIsZeroOne)
});
Opcodes.set(0x4e, {
    "Instruction": Instructions.LSR,
    "AddressingMode": AddressingModes.Absolute,
    "Bytes": new OpcodeBytes(3),
    "Cycles": new OpcodeCycles(6, CycleModifiers.MIsZeroTwo)
});
Opcodes.set(0x4f, {
    "Instruction": Instructions.EOR,
    "AddressingMode": AddressingModes.AbsoluteLong,
    "Bytes": new OpcodeBytes(4),
    "Cycles": new OpcodeCycles(5, CycleModifiers.MIsZeroOne)
});
Opcodes.set(0x50, {
    "Instruction": Instructions.BVC,
    "AddressingMode": AddressingModes.ProgramCounterRelative,
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(2, CycleModifiers.BranchTaken, CycleModifiers.EmulationBranchTakenCrossesPageBoundary)
});
Opcodes.set(0x51, {
    "Instruction": Instructions.EOR,
    "AddressingMode": AddressingModes.DirectPageIndexedIndirectY,
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(5, CycleModifiers.MIsZeroOne, CycleModifiers.DirectPageLowIsNonZero, CycleModifiers.IndexCrossesPageBoundary)
});
Opcodes.set(0x52, {
    "Instruction": Instructions.EOR,
    "AddressingMode": AddressingModes.DirectPageIndirect,
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(5, CycleModifiers.MIsZeroOne, CycleModifiers.DirectPageLowIsNonZero)
});
Opcodes.set(0x53, {
    "Instruction": Instructions.EOR,
    "AddressingMode": AddressingModes.StackRelativeIndexedY, // TODO
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(7, CycleModifiers.MIsZeroOne)
});
Opcodes.set(0x54, {
    "Instruction": Instructions.MVN,
    "AddressingMode": AddressingModes.BlockMove,
    "Bytes": new OpcodeBytes(3),
    "Cycles": new OpcodeCycles(0, CycleModifiers.SevenCyclesPerByteMoved) // TODO
});
Opcodes.set(0x55, {
    "Instruction": Instructions.EOR,
    "AddressingMode": AddressingModes.DirectPageIndexedX,
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(4, CycleModifiers.MIsZeroOne, CycleModifiers.DirectPageLowIsNonZero)
});
Opcodes.set(0x56, {
    "Instruction": Instructions.LSR,
    "AddressingMode": AddressingModes.DirectPageIndexedX,
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(6, CycleModifiers.DirectPageLowIsNonZero, CycleModifiers.MIsZeroTwo)
});
Opcodes.set(0x57, {
    "Instruction": Instructions.EOR,
    "AddressingMode": AddressingModes.DirectPageIndirectLongIndexedY,
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(6, CycleModifiers.MIsZeroOne, CycleModifiers.DirectPageLowIsNonZero)
});
Opcodes.set(0x58, {
    "Instruction": Instructions.CLI,
    "AddressingMode": AddressingModes.Implied,
    "Bytes": new OpcodeBytes(1),
    "Cycles": new OpcodeCycles(2)
});
Opcodes.set(0x59, {
    "Instruction": Instructions.EOR,
    "AddressingMode": AddressingModes.AbsoluteIndexedY,
    "Bytes": new OpcodeBytes(3),
    "Cycles": new OpcodeCycles(4, CycleModifiers.MIsZeroOne, CycleModifiers.IndexCrossesPageBoundary)
});
Opcodes.set(0x5a, {
    "Instruction": Instructions.PHY,
    "AddressingMode": AddressingModes.StackPush,
    "Bytes": new OpcodeBytes(1),
    "Cycles": new OpcodeCycles(3, CycleModifiers.XIsZero)
});
Opcodes.set(0x5b, {
    "Instruction": Instructions.TCD,
    "AddressingMode": AddressingModes.Implied,
    "Bytes": new OpcodeBytes(1),
    "Cycles": new OpcodeCycles(2)
});
Opcodes.set(0x5c, {
    "Instruction": Instructions.JMP,
    "AddressingMode": AddressingModes.AbsoluteLong,
    "Bytes": new OpcodeBytes(4),
    "Cycles": new OpcodeCycles(4)
});
Opcodes.set(0x5d, {
    "Instruction": Instructions.EOR,
    "AddressingMode": AddressingModes.AbsoluteIndexedX,
    "Bytes": new OpcodeBytes(3),
    "Cycles": new OpcodeCycles(4, CycleModifiers.MIsZeroOne, CycleModifiers.IndexCrossesPageBoundary)
});
Opcodes.set(0x5e, {
    "Instruction": Instructions.LSR,
    "AddressingMode": AddressingModes.AbsoluteIndexedX,
    "Bytes": new OpcodeBytes(3),
    "Cycles": new OpcodeCycles(7, CycleModifiers.MIsZeroTwo, CycleModifiers.EmulationNoPageBoundaryCrossed)
});
Opcodes.set(0x5f, {
    "Instruction": Instructions.EOR,
    "AddressingMode": AddressingModes.AbsoluteLongIndexedX,
    "Bytes": new OpcodeBytes(4),
    "Cycles": new OpcodeCycles(5, CycleModifiers.MIsZeroOne)
});
Opcodes.set(0x60, {
    "Instruction": Instructions.RTS,
    "AddressingMode": AddressingModes.StackReturnFromSubroutine,
    "Bytes": new OpcodeBytes(1),
    "Cycles": new OpcodeCycles(6)
});
Opcodes.set(0x61, {
    "Instruction": Instructions.ADC,
    "AddressingMode": AddressingModes.DirectPageIndexedIndirectX,
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(6, CycleModifiers.MIsZeroOne, CycleModifiers.DirectPageLowIsNonZero, CycleModifiers.Decimal65C02)
});
Opcodes.set(0x62, {
    "Instruction": Instructions.PER,
    "AddressingMode": AddressingModes.StackPCRelativeLong,
    "Bytes": new OpcodeBytes(3),
    "Cycles": new OpcodeCycles(6)
});
Opcodes.set(0x63, {
    "Instruction": Instructions.ADC,
    "AddressingMode": AddressingModes.StackRelative,
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(4, CycleModifiers.MIsZeroOne, CycleModifiers.Decimal65C02)
});
Opcodes.set(0x64, {
    "Instruction": Instructions.STZ,
    "AddressingMode": AddressingModes.DirectPage,
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(3, CycleModifiers.MIsZeroOne, CycleModifiers.DirectPageLowIsNonZero)
});
Opcodes.set(0x65, {
    "Instruction": Instructions.ADC,
    "AddressingMode": AddressingModes.DirectPage,
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(3, CycleModifiers.MIsZeroOne, CycleModifiers.DirectPageLowIsNonZero, CycleModifiers.Decimal65C02)
});
Opcodes.set(0x66, {
    "Instruction": Instructions.ROR,
    "AddressingMode": AddressingModes.DirectPage,
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(5, CycleModifiers.MIsZeroOne)
});
Opcodes.set(0x67, {
    "Instruction": Instructions.ADC,
    "AddressingMode": AddressingModes.DirectPageIndirectLong,
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(6, CycleModifiers.MIsZeroOne, CycleModifiers.Decimal65C02)
});
Opcodes.set(0x68, {
    "Instruction": Instructions.PLA,
    "AddressingMode": AddressingModes.StackPull,
    "Bytes": new OpcodeBytes(1),
    "Cycles": new OpcodeCycles(4, CycleModifiers.MIsZeroOne)
});
Opcodes.set(0x69, {
    "Instruction": Instructions.ADC,
    "AddressingMode": AddressingModes.Immediate,
    "Bytes": new OpcodeBytes(2, ByteModifiers.MIsZero),
    "Cycles": new OpcodeCycles(2, CycleModifiers.MIsZeroOne, CycleModifiers.Decimal65C02)
});
Opcodes.set(0x6a, {
    "Instruction": Instructions.ROR,
    "AddressingMode": AddressingModes.Accumulator,
    "Bytes": new OpcodeBytes(1),
    "Cycles": new OpcodeCycles(2)
});
Opcodes.set(0x6b, {
    "Instruction": Instructions.RTL,
    "AddressingMode": AddressingModes.StackReturnFromInterruptLong, // TODO
    "Bytes": new OpcodeBytes(1),
    "Cycles": new OpcodeCycles(6)
});
Opcodes.set(0x6c, {
    "Instruction": Instructions.JMP,
    "AddressingMode": AddressingModes.AbsoluteIndirect,
    "Bytes": new OpcodeBytes(3),
    "Cycles": new OpcodeCycles(5, CycleModifiers.Is65C02, CycleModifiers.UnusedOne)
});
Opcodes.set(0x6d, {
    "Instruction": Instructions.ADC,
    "AddressingMode": AddressingModes.Absolute,
    "Bytes": new OpcodeBytes(3),
    "Cycles": new OpcodeCycles(4, CycleModifiers.MIsZeroOne, CycleModifiers.Decimal65C02)
});
Opcodes.set(0x6e, {
    "Instruction": Instructions.ROR,
    "AddressingMode": AddressingModes.Absolute,
    "Bytes": new OpcodeBytes(3),
    "Cycles": new OpcodeCycles(6, CycleModifiers.MIsZeroTwo)
});
Opcodes.set(0x6f, {
    "Instruction": Instructions.ADC,
    "AddressingMode": AddressingModes.AbsoluteLong,
    "Bytes": new OpcodeBytes(4),
    "Cycles": new OpcodeCycles(5, CycleModifiers.MIsZeroOne, CycleModifiers.Decimal65C02)
});
Opcodes.set(0x70, {
    "Instruction": Instructions.BVS,
    "AddressingMode": AddressingModes.ProgramCounterRelative,
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(2, CycleModifiers.BranchTaken, CycleModifiers.EmulationBranchTakenCrossesPageBoundary)
});
Opcodes.set(0x71, {
    "Instruction": Instructions.ADC,
    "AddressingMode": AddressingModes.DirectPageIndexedIndirectY,
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(5, CycleModifiers.MIsZeroOne, CycleModifiers.DirectPageLowIsNonZero, CycleModifiers.IndexCrossesPageBoundary, CycleModifiers.Decimal65C02)
});
Opcodes.set(0x72, {
    "Instruction": Instructions.ADC,
    "AddressingMode": AddressingModes.DirectPageIndirect,
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(5, CycleModifiers.MIsZeroOne, CycleModifiers.DirectPageLowIsNonZero, CycleModifiers.Decimal65C02)
});
Opcodes.set(0x73, {
    "Instruction": Instructions.ADC,
    "AddressingMode": AddressingModes.StackRelativeIndexedY, // TODO
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(7, CycleModifiers.MIsZeroOne, CycleModifiers.Decimal65C02)
});
Opcodes.set(0x74, {
    "Instruction": Instructions.STZ,
    "AddressingMode": AddressingModes.DirectPageIndexedX,
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(4, CycleModifiers.MIsZeroOne, CycleModifiers.DirectPageLowIsNonZero)
});
Opcodes.set(0x75, {
    "Instruction": Instructions.ADC,
    "AddressingMode": AddressingModes.DirectPageIndexedX,
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(4, CycleModifiers.MIsZeroOne, CycleModifiers.DirectPageLowIsNonZero, CycleModifiers.Decimal65C02)
});
Opcodes.set(0x76, {
    "Instruction": Instructions.ROR,
    "AddressingMode": AddressingModes.DirectPageIndexedX,
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(6, CycleModifiers.DirectPageLowIsNonZero, CycleModifiers.MIsZeroTwo)
});
Opcodes.set(0x77, {
    "Instruction": Instructions.ADC,
    "AddressingMode": AddressingModes.DirectPageIndirectLongIndexedY,
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(6, CycleModifiers.MIsZeroOne, CycleModifiers.DirectPageLowIsNonZero, CycleModifiers.Decimal65C02)
});
Opcodes.set(0x78, {
    "Instruction": Instructions.SEI,
    "AddressingMode": AddressingModes.Implied,
    "Bytes": new OpcodeBytes(1),
    "Cycles": new OpcodeCycles(2)
});
Opcodes.set(0x79, {
    "Instruction": Instructions.ADC,
    "AddressingMode": AddressingModes.AbsoluteIndexedY,
    "Bytes": new OpcodeBytes(3),
    "Cycles": new OpcodeCycles(4, CycleModifiers.MIsZeroOne, CycleModifiers.IndexCrossesPageBoundary, CycleModifiers.Decimal65C02)
});
Opcodes.set(0x7a, {
    "Instruction": Instructions.PLY,
    "AddressingMode": AddressingModes.StackPull,
    "Bytes": new OpcodeBytes(1),
    "Cycles": new OpcodeCycles(4, CycleModifiers.XIsZero)
});
Opcodes.set(0x7b, {
    "Instruction": Instructions.TDC,
    "AddressingMode": AddressingModes.Implied,
    "Bytes": new OpcodeBytes(1),
    "Cycles": new OpcodeCycles(2)
});
Opcodes.set(0x7c, {
    "Instruction": Instructions.JMP,
    "AddressingMode": AddressingModes.AbsoluteIndirectLong,
    "Bytes": new OpcodeBytes(3),
    "Cycles": new OpcodeCycles(6)
});
Opcodes.set(0x7d, {
    "Instruction": Instructions.ADC,
    "AddressingMode": AddressingModes.AbsoluteIndexedX,
    "Bytes": new OpcodeBytes(3),
    "Cycles": new OpcodeCycles(4, CycleModifiers.MIsZeroOne, CycleModifiers.IndexCrossesPageBoundary, CycleModifiers.Decimal65C02)
});
Opcodes.set(0x7e, {
    "Instruction": Instructions.ROR,
    "AddressingMode": AddressingModes.AbsoluteIndexedX,
    "Bytes": new OpcodeBytes(3),
    "Cycles": new OpcodeCycles(7, CycleModifiers.MIsZeroTwo, CycleModifiers.EmulationNoPageBoundaryCrossed)
});
Opcodes.set(0x7f, {
    "Instruction": Instructions.ADC,
    "AddressingMode": AddressingModes.AbsoluteLongIndexedX,
    "Bytes": new OpcodeBytes(4),
    "Cycles": new OpcodeCycles(5, CycleModifiers.MIsZeroOne, CycleModifiers.Decimal65C02)
});
Opcodes.set(0x80, {
    "Instruction": Instructions.BRA,
    "AddressingMode": AddressingModes.ProgramCounterRelative,
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(3, CycleModifiers.EmulationBranchTakenCrossesPageBoundary)
});
Opcodes.set(0x81, {
    "Instruction": Instructions.STA,
    "AddressingMode": AddressingModes.DirectPageIndexedIndirectX,
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(6, CycleModifiers.MIsZeroOne, CycleModifiers.DirectPageLowIsNonZero)
});
Opcodes.set(0x82, {
    "Instruction": Instructions.BRL,
    "AddressingMode": AddressingModes.ProgramCounterRelativeLong,
    "Bytes": new OpcodeBytes(3),
    "Cycles": new OpcodeCycles(4)
});
Opcodes.set(0x83, {
    "Instruction": Instructions.STA,
    "AddressingMode": AddressingModes.StackRelative,
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(4, CycleModifiers.MIsZeroOne)
});
Opcodes.set(0x84, {
    "Instruction": Instructions.STY,
    "AddressingMode": AddressingModes.DirectPage,
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(3, CycleModifiers.DirectPageLowIsNonZero, CycleModifiers.XIsZero)
});
Opcodes.set(0x85, {
    "Instruction": Instructions.STA,
    "AddressingMode": AddressingModes.DirectPage,
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(3, CycleModifiers.MIsZeroOne, CycleModifiers.DirectPageLowIsNonZero)
});
Opcodes.set(0x86, {
    "Instruction": Instructions.STX,
    "AddressingMode": AddressingModes.DirectPage,
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(3, CycleModifiers.DirectPageLowIsNonZero, CycleModifiers.XIsZero)
});
Opcodes.set(0x87, {
    "Instruction": Instructions.STA,
    "AddressingMode": AddressingModes.DirectPageIndirectLong,
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(6, CycleModifiers.MIsZeroOne, CycleModifiers.DirectPageLowIsNonZero)
});
Opcodes.set(0x88, {
    "Instruction": Instructions.DEY,
    "AddressingMode": AddressingModes.Implied,
    "Bytes": new OpcodeBytes(1),
    "Cycles": new OpcodeCycles(2)
});
Opcodes.set(0x89, {
    "Instruction": Instructions.BIT,
    "AddressingMode": AddressingModes.Immediate,
    "Bytes": new OpcodeBytes(2, ByteModifiers.MIsZero),
    "Cycles": new OpcodeCycles(2, CycleModifiers.MIsZeroOne)
});
Opcodes.set(0x8a, {
    "Instruction": Instructions.TXA,
    "AddressingMode": AddressingModes.Implied,
    "Bytes": new OpcodeBytes(1),
    "Cycles": new OpcodeCycles(2)
});
Opcodes.set(0x8b, {
    "Instruction": Instructions.PHB,
    "AddressingMode": AddressingModes.StackPush,
    "Bytes": new OpcodeBytes(1),
    "Cycles": new OpcodeCycles(3)
});
Opcodes.set(0x8c, {
    "Instruction": Instructions.STY,
    "AddressingMode": AddressingModes.Absolute,
    "Bytes": new OpcodeBytes(3),
    "Cycles": new OpcodeCycles(4, CycleModifiers.XIsZero)
});
Opcodes.set(0x8d, {
    "Instruction": Instructions.STA,
    "AddressingMode": AddressingModes.Absolute,
    "Bytes": new OpcodeBytes(3),
    "Cycles": new OpcodeCycles(4, CycleModifiers.MIsZeroOne)
});
Opcodes.set(0x8e, {
    "Instruction": Instructions.STX,
    "AddressingMode": AddressingModes.Absolute,
    "Bytes": new OpcodeBytes(3),
    "Cycles": new OpcodeCycles(4, CycleModifiers.XIsZero)
});
Opcodes.set(0x8f, {
    "Instruction": Instructions.STA,
    "AddressingMode": AddressingModes.AbsoluteLong,
    "Bytes": new OpcodeBytes(4),
    "Cycles": new OpcodeCycles(5, CycleModifiers.MIsZeroOne)
});
Opcodes.set(0x90, {
    "Instruction": Instructions.BCC,
    "AddressingMode": AddressingModes.ProgramCounterRelative,
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(2, CycleModifiers.BranchTaken, CycleModifiers.EmulationBranchTakenCrossesPageBoundary)
});
Opcodes.set(0x91, {
    "Instruction": Instructions.STA,
    "AddressingMode": AddressingModes.DirectPageIndexedIndirectY,
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(6, CycleModifiers.MIsZeroOne, CycleModifiers.DirectPageLowIsNonZero)
});
Opcodes.set(0x92, {
    "Instruction": Instructions.STA,
    "AddressingMode": AddressingModes.DirectPageIndirect,
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(5, CycleModifiers.MIsZeroOne, CycleModifiers.DirectPageLowIsNonZero)
});
Opcodes.set(0x93, {
    "Instruction": Instructions.STA,
    "AddressingMode": AddressingModes.StackRelativeIndexedY, // TODO
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(7, CycleModifiers.MIsZeroOne)
});
Opcodes.set(0x94, {
    "Instruction": Instructions.STY,
    "AddressingMode": AddressingModes.DirectPageIndexedX,
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(4, CycleModifiers.DirectPageLowIsNonZero, CycleModifiers.XIsZero)
});
Opcodes.set(0x95, {
    "Instruction": Instructions.STA,
    "AddressingMode": AddressingModes.DirectPageIndexedX,
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(4, CycleModifiers.MIsZeroOne, CycleModifiers.DirectPageLowIsNonZero)
});
Opcodes.set(0x96, {
    "Instruction": Instructions.STX,
    "AddressingMode": AddressingModes.DirectPageIndexedY,
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(4, CycleModifiers.DirectPageLowIsNonZero, CycleModifiers.XIsZero)
});
Opcodes.set(0x97, {
    "Instruction": Instructions.STA,
    "AddressingMode": AddressingModes.DirectPageIndirectLongIndexedY,
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(6, CycleModifiers.MIsZeroOne, CycleModifiers.DirectPageLowIsNonZero)
});
Opcodes.set(0x98, {
    "Instruction": Instructions.TYA,
    "AddressingMode": AddressingModes.Implied,
    "Bytes": new OpcodeBytes(1),
    "Cycles": new OpcodeCycles(2)
});
Opcodes.set(0x99, {
    "Instruction": Instructions.STA,
    "AddressingMode": AddressingModes.AbsoluteIndexedY,
    "Bytes": new OpcodeBytes(3),
    "Cycles": new OpcodeCycles(5, CycleModifiers.MIsZeroOne)
});
Opcodes.set(0x9a, {
    "Instruction": Instructions.TXS,
    "AddressingMode": AddressingModes.Implied,
    "Bytes": new OpcodeBytes(1),
    "Cycles": new OpcodeCycles(2)
});
Opcodes.set(0x9b, {
    "Instruction": Instructions.TXY,
    "AddressingMode": AddressingModes.Implied,
    "Bytes": new OpcodeBytes(1),
    "Cycles": new OpcodeCycles(2)
});
Opcodes.set(0x9c, {
    "Instruction": Instructions.STZ,
    "AddressingMode": AddressingModes.Absolute,
    "Bytes": new OpcodeBytes(3),
    "Cycles": new OpcodeCycles(4, CycleModifiers.MIsZeroOne)
});
Opcodes.set(0x9d, {
    "Instruction": Instructions.STA,
    "AddressingMode": AddressingModes.AbsoluteIndexedX,
    "Bytes": new OpcodeBytes(3),
    "Cycles": new OpcodeCycles(5, CycleModifiers.MIsZeroOne)
});
Opcodes.set(0x9e, {
    "Instruction": Instructions.STZ,
    "AddressingMode": AddressingModes.AbsoluteIndexedX,
    "Bytes": new OpcodeBytes(3),
    "Cycles": new OpcodeCycles(5, CycleModifiers.MIsZeroOne)
});
Opcodes.set(0x9f, {
    "Instruction": Instructions.STA,
    "AddressingMode": AddressingModes.AbsoluteLongIndexedX,
    "Bytes": new OpcodeBytes(4),
    "Cycles": new OpcodeCycles(5, CycleModifiers.MIsZeroOne)
});
Opcodes.set(0xa0, {
    "Instruction": Instructions.LDY,
    "AddressingMode": AddressingModes.Immediate,
    "Bytes": new OpcodeBytes(2, ByteModifiers.XIsZero),
    "Cycles": new OpcodeCycles(2, CycleModifiers.XIsZero)
});
Opcodes.set(0xa1, {
    "Instruction": Instructions.LDA,
    "AddressingMode": AddressingModes.DirectPageIndexedIndirectX,
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(6, CycleModifiers.MIsZeroOne, CycleModifiers.DirectPageLowIsNonZero)
});
Opcodes.set(0xa2, {
    "Instruction": Instructions.LDX,
    "AddressingMode": AddressingModes.Immediate,
    "Bytes": new OpcodeBytes(2, ByteModifiers.XIsZero),
    "Cycles": new OpcodeCycles(2, CycleModifiers.XIsZero)
});
Opcodes.set(0xa3, {
    "Instruction": Instructions.LDA,
    "AddressingMode": AddressingModes.StackRelative,
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(4, CycleModifiers.MIsZeroOne)
});
Opcodes.set(0xa4, {
    "Instruction": Instructions.LDY,
    "AddressingMode": AddressingModes.DirectPage,
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(3, CycleModifiers.DirectPageLowIsNonZero, CycleModifiers.XIsZero)
});
Opcodes.set(0xa5, {
    "Instruction": Instructions.LDA,
    "AddressingMode": AddressingModes.DirectPage,
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(3, CycleModifiers.MIsZeroOne, CycleModifiers.DirectPageLowIsNonZero)
});
Opcodes.set(0xa6, {
    "Instruction": Instructions.LDX,
    "AddressingMode": AddressingModes.DirectPage,
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(3, CycleModifiers.DirectPageLowIsNonZero, CycleModifiers.XIsZero)
});
Opcodes.set(0xa7, {
    "Instruction": Instructions.LDA,
    "AddressingMode": AddressingModes.DirectPageIndirectLong,
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(6, CycleModifiers.MIsZeroOne, CycleModifiers.DirectPageLowIsNonZero)
});
Opcodes.set(0xa8, {
    "Instruction": Instructions.TAY,
    "AddressingMode": AddressingModes.Implied,
    "Bytes": new OpcodeBytes(1),
    "Cycles": new OpcodeCycles(2)
});
Opcodes.set(0xa9, {
    "Instruction": Instructions.LDA,
    "AddressingMode": AddressingModes.Immediate,
    "Bytes": new OpcodeBytes(2, ByteModifiers.MIsZero),
    "Cycles": new OpcodeCycles(2, CycleModifiers.MIsZeroOne)
});
Opcodes.set(0xaa, {
    "Instruction": Instructions.TAX,
    "AddressingMode": AddressingModes.Implied,
    "Bytes": new OpcodeBytes(1),
    "Cycles": new OpcodeCycles(2)
});
Opcodes.set(0xab, {
    "Instruction": Instructions.PLB,
    "AddressingMode": AddressingModes.StackPull,
    "Bytes": new OpcodeBytes(1),
    "Cycles": new OpcodeCycles(4)
});
Opcodes.set(0xac, {
    "Instruction": Instructions.LDY,
    "AddressingMode": AddressingModes.Absolute,
    "Bytes": new OpcodeBytes(3),
    "Cycles": new OpcodeCycles(4, CycleModifiers.XIsZero)
});
Opcodes.set(0xad, {
    "Instruction": Instructions.LDA,
    "AddressingMode": AddressingModes.Absolute,
    "Bytes": new OpcodeBytes(3),
    "Cycles": new OpcodeCycles(4, CycleModifiers.MIsZeroOne)
});
Opcodes.set(0xae, {
    "Instruction": Instructions.LDX,
    "AddressingMode": AddressingModes.Absolute,
    "Bytes": new OpcodeBytes(3),
    "Cycles": new OpcodeCycles(4, CycleModifiers.XIsZero)
});
Opcodes.set(0xaf, {
    "Instruction": Instructions.LDA,
    "AddressingMode": AddressingModes.AbsoluteLong,
    "Bytes": new OpcodeBytes(4),
    "Cycles": new OpcodeCycles(5, CycleModifiers.MIsZeroOne)
});
Opcodes.set(0xb0, {
    "Instruction": Instructions.BCS,
    "AddressingMode": AddressingModes.ProgramCounterRelative,
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(2, CycleModifiers.BranchTaken, CycleModifiers.EmulationBranchTakenCrossesPageBoundary)
});
Opcodes.set(0xb1, {
    "Instruction": Instructions.LDA,
    "AddressingMode": AddressingModes.DirectPageIndexedIndirectY,
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(5, CycleModifiers.MIsZeroOne, CycleModifiers.DirectPageLowIsNonZero, CycleModifiers.IndexCrossesPageBoundary)
});
Opcodes.set(0xb2, {
    "Instruction": Instructions.LDA,
    "AddressingMode": AddressingModes.DirectPageIndirect,
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(5, CycleModifiers.MIsZeroOne, CycleModifiers.DirectPageLowIsNonZero)
});
Opcodes.set(0xb3, {
    "Instruction": Instructions.LDA,
    "AddressingMode": AddressingModes.StackRelativeIndexedY, // TODO
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(7, CycleModifiers.MIsZeroOne)
});
Opcodes.set(0xb4, {
    "Instruction": Instructions.LDY,
    "AddressingMode": AddressingModes.DirectPageIndexedX,
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(4, CycleModifiers.DirectPageLowIsNonZero, CycleModifiers.XIsZero)
});
Opcodes.set(0xb5, {
    "Instruction": Instructions.LDA,
    "AddressingMode": AddressingModes.DirectPageIndexedX,
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(4, CycleModifiers.MIsZeroOne, CycleModifiers.DirectPageLowIsNonZero)
});
Opcodes.set(0xb6, {
    "Instruction": Instructions.LDX,
    "AddressingMode": AddressingModes.DirectPageIndexedY,
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(4, CycleModifiers.DirectPageLowIsNonZero, CycleModifiers.XIsZero)
});
Opcodes.set(0xb7, {
    "Instruction": Instructions.LDA,
    "AddressingMode": AddressingModes.DirectPageIndirectLongIndexedY,
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(6, CycleModifiers.MIsZeroOne, CycleModifiers.DirectPageLowIsNonZero)
});
Opcodes.set(0xb8, {
    "Instruction": Instructions.CLV,
    "AddressingMode": AddressingModes.Implied,
    "Bytes": new OpcodeBytes(1),
    "Cycles": new OpcodeCycles(2)
});
Opcodes.set(0xb9, {
    "Instruction": Instructions.LDA,
    "AddressingMode": AddressingModes.AbsoluteIndexedY,
    "Bytes": new OpcodeBytes(3),
    "Cycles": new OpcodeCycles(4, CycleModifiers.MIsZeroOne, CycleModifiers.IndexCrossesPageBoundary)
});
Opcodes.set(0xba, {
    "Instruction": Instructions.TSX,
    "AddressingMode": AddressingModes.Implied,
    "Bytes": new OpcodeBytes(1),
    "Cycles": new OpcodeCycles(2)
});
Opcodes.set(0xbb, {
    "Instruction": Instructions.TYX,
    "AddressingMode": AddressingModes.Implied,
    "Bytes": new OpcodeBytes(1),
    "Cycles": new OpcodeCycles(2)
});
Opcodes.set(0xbc, {
    "Instruction": Instructions.LDY,
    "AddressingMode": AddressingModes.AbsoluteIndexedX,
    "Bytes": new OpcodeBytes(3),
    "Cycles": new OpcodeCycles(4, CycleModifiers.IndexCrossesPageBoundary, CycleModifiers.XIsZero)
});
Opcodes.set(0xbd, {
    "Instruction": Instructions.LDA,
    "AddressingMode": AddressingModes.AbsoluteIndexedX,
    "Bytes": new OpcodeBytes(3),
    "Cycles": new OpcodeCycles(4, CycleModifiers.MIsZeroOne, CycleModifiers.IndexCrossesPageBoundary)
});
Opcodes.set(0xbe, {
    "Instruction": Instructions.LDX,
    "AddressingMode": AddressingModes.AbsoluteIndexedY,
    "Bytes": new OpcodeBytes(3),
    "Cycles": new OpcodeCycles(4, CycleModifiers.IndexCrossesPageBoundary, CycleModifiers.XIsZero)
});
Opcodes.set(0xbf, {
    "Instruction": Instructions.LDA,
    "AddressingMode": AddressingModes.AbsoluteLongIndexedX,
    "Bytes": new OpcodeBytes(4),
    "Cycles": new OpcodeCycles(5, CycleModifiers.MIsZeroOne)
});
Opcodes.set(0xc0, {
    "Instruction": Instructions.CPY,
    "AddressingMode": AddressingModes.Immediate,
    "Bytes": new OpcodeBytes(2, ByteModifiers.XIsZero),
    "Cycles": new OpcodeCycles(2, CycleModifiers.XIsZero)
});
Opcodes.set(0xc1, {
    "Instruction": Instructions.CMP,
    "AddressingMode": AddressingModes.DirectPageIndexedIndirectX,
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(6, CycleModifiers.MIsZeroOne, CycleModifiers.DirectPageLowIsNonZero)
});
Opcodes.set(0xc2, {
    "Instruction": Instructions.REP,
    "AddressingMode": AddressingModes.Immediate,
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(3)
});
Opcodes.set(0xc3, {
    "Instruction": Instructions.CMP,
    "AddressingMode": AddressingModes.StackRelative,
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(4, CycleModifiers.MIsZeroOne)
});
Opcodes.set(0xc4, {
    "Instruction": Instructions.CPY,
    "AddressingMode": AddressingModes.DirectPage,
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(3, CycleModifiers.DirectPageLowIsNonZero, CycleModifiers.XIsZero)
});
Opcodes.set(0xc5, {
    "Instruction": Instructions.CMP,
    "AddressingMode": AddressingModes.DirectPage,
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(3, CycleModifiers.MIsZeroOne, CycleModifiers.DirectPageLowIsNonZero)
});
Opcodes.set(0xc6, {
    "Instruction": Instructions.DEC,
    "AddressingMode": AddressingModes.DirectPage,
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(5, CycleModifiers.DirectPageLowIsNonZero, CycleModifiers.MIsZeroTwo)
});
Opcodes.set(0xc7, {
    "Instruction": Instructions.CMP,
    "AddressingMode": AddressingModes.DirectPageIndirectLong,
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(6, CycleModifiers.MIsZeroOne, CycleModifiers.DirectPageLowIsNonZero)
});
Opcodes.set(0xc8, {
    "Instruction": Instructions.INY,
    "AddressingMode": AddressingModes.Implied,
    "Bytes": new OpcodeBytes(1),
    "Cycles": new OpcodeCycles(2)
});
Opcodes.set(0xc9, {
    "Instruction": Instructions.CMP,
    "AddressingMode": AddressingModes.Immediate,
    "Bytes": new OpcodeBytes(2, ByteModifiers.MIsZero),
    "Cycles": new OpcodeCycles(2, CycleModifiers.MIsZeroOne)
});
Opcodes.set(0xca, {
    "Instruction": Instructions.DEX,
    "AddressingMode": AddressingModes.Implied,
    "Bytes": new OpcodeBytes(1),
    "Cycles": new OpcodeCycles(2)
});
Opcodes.set(0xcb, {
    "Instruction": Instructions.WAI,
    "AddressingMode": AddressingModes.Implied,
    "Bytes": new OpcodeBytes(1),
    "Cycles": new OpcodeCycles(3, CycleModifiers.UnusedThree)
});
Opcodes.set(0xcc, {
    "Instruction": Instructions.CPY,
    "AddressingMode": AddressingModes.Absolute,
    "Bytes": new OpcodeBytes(3),
    "Cycles": new OpcodeCycles(4, CycleModifiers.XIsZero)
});
Opcodes.set(0xcd, {
    "Instruction": Instructions.CMP,
    "AddressingMode": AddressingModes.Absolute,
    "Bytes": new OpcodeBytes(3),
    "Cycles": new OpcodeCycles(4, CycleModifiers.MIsZeroOne)
});
Opcodes.set(0xce, {
    "Instruction": Instructions.DEC,
    "AddressingMode": AddressingModes.Absolute,
    "Bytes": new OpcodeBytes(3),
    "Cycles": new OpcodeCycles(6, CycleModifiers.MIsZeroTwo)
});
Opcodes.set(0xcf, {
    "Instruction": Instructions.CMP,
    "AddressingMode": AddressingModes.AbsoluteLong,
    "Bytes": new OpcodeBytes(4),
    "Cycles": new OpcodeCycles(5, CycleModifiers.MIsZeroOne)
});
Opcodes.set(0xd0, {
    "Instruction": Instructions.BNE,
    "AddressingMode": AddressingModes.ProgramCounterRelative,
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(2, CycleModifiers.BranchTaken, CycleModifiers.EmulationBranchTakenCrossesPageBoundary)
});
Opcodes.set(0xd1, {
    "Instruction": Instructions.CMP,
    "AddressingMode": AddressingModes.DirectPageIndexedIndirectY,
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(5, CycleModifiers.MIsZeroOne, CycleModifiers.DirectPageLowIsNonZero, CycleModifiers.IndexCrossesPageBoundary)
});
Opcodes.set(0xd2, {
    "Instruction": Instructions.CMP,
    "AddressingMode": AddressingModes.DirectPageIndirect,
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(5, CycleModifiers.MIsZeroOne, CycleModifiers.DirectPageLowIsNonZero)
});
Opcodes.set(0xd3, {
    "Instruction": Instructions.CMP,
    "AddressingMode": AddressingModes.StackRelativeIndexedY, // TODO
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(7, CycleModifiers.MIsZeroOne)
});
Opcodes.set(0xd4, {
    "Instruction": Instructions.PEI,
    "AddressingMode": AddressingModes.StackDirectPageIndirect,
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(6, CycleModifiers.DirectPageLowIsNonZero)
});
Opcodes.set(0xd5, {
    "Instruction": Instructions.CMP,
    "AddressingMode": AddressingModes.DirectPageIndexedX,
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(4, CycleModifiers.MIsZeroOne, CycleModifiers.DirectPageLowIsNonZero)
});
Opcodes.set(0xd6, {
    "Instruction": Instructions.DEC,
    "AddressingMode": AddressingModes.DirectPageIndexedX,
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(6, CycleModifiers.DirectPageLowIsNonZero, CycleModifiers.MIsZeroTwo)
});
Opcodes.set(0xd7, {
    "Instruction": Instructions.CMP,
    "AddressingMode": AddressingModes.DirectPageIndirectLongIndexedY,
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(6, CycleModifiers.MIsZeroOne, CycleModifiers.DirectPageLowIsNonZero)
});
Opcodes.set(0xd8, {
    "Instruction": Instructions.CLD,
    "AddressingMode": AddressingModes.Implied,
    "Bytes": new OpcodeBytes(1),
    "Cycles": new OpcodeCycles(2)
});
Opcodes.set(0xd9, {
    "Instruction": Instructions.CMP,
    "AddressingMode": AddressingModes.AbsoluteIndexedY,
    "Bytes": new OpcodeBytes(3),
    "Cycles": new OpcodeCycles(4, CycleModifiers.MIsZeroOne, CycleModifiers.IndexCrossesPageBoundary)
});
Opcodes.set(0xda, {
    "Instruction": Instructions.PHX,
    "AddressingMode": AddressingModes.StackPush,
    "Bytes": new OpcodeBytes(1),
    "Cycles": new OpcodeCycles(3, CycleModifiers.XIsZero)
});
Opcodes.set(0xdb, {
    "Instruction": Instructions.STP,
    "AddressingMode": AddressingModes.Implied,
    "Bytes": new OpcodeBytes(1),
    "Cycles": new OpcodeCycles(3, CycleModifiers.UnusedTwo)
});
Opcodes.set(0xdc, {
    "Instruction": Instructions.JMP,
    "AddressingMode": AddressingModes.AbsoluteIndirectLong,
    "Bytes": new OpcodeBytes(3),
    "Cycles": new OpcodeCycles(6)
});
Opcodes.set(0xdd, {
    "Instruction": Instructions.CMP,
    "AddressingMode": AddressingModes.AbsoluteIndexedX,
    "Bytes": new OpcodeBytes(3),
    "Cycles": new OpcodeCycles(4, CycleModifiers.MIsZeroOne, CycleModifiers.IndexCrossesPageBoundary)
});
Opcodes.set(0xde, {
    "Instruction": Instructions.DEC,
    "AddressingMode": AddressingModes.AbsoluteIndexedX,
    "Bytes": new OpcodeBytes(3),
    "Cycles": new OpcodeCycles(7, CycleModifiers.MIsZeroTwo, CycleModifiers.EmulationNoPageBoundaryCrossed)
});
Opcodes.set(0xdf, {
    "Instruction": Instructions.CMP,
    "AddressingMode": AddressingModes.AbsoluteLongIndexedX,
    "Bytes": new OpcodeBytes(4),
    "Cycles": new OpcodeCycles(5, CycleModifiers.MIsZeroOne)
});
Opcodes.set(0xe0, {
    "Instruction": Instructions.CPX,
    "AddressingMode": AddressingModes.Immediate,
    "Bytes": new OpcodeBytes(2, ByteModifiers.XIsZero),
    "Cycles": new OpcodeCycles(2, CycleModifiers.XIsZero)
});
Opcodes.set(0xe1, {
    "Instruction": Instructions.SBC,
    "AddressingMode": AddressingModes.DirectPageIndexedIndirectX,
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(6, CycleModifiers.MIsZeroOne, CycleModifiers.DirectPageLowIsNonZero, CycleModifiers.Decimal65C02)
});
Opcodes.set(0xe2, {
    "Instruction": Instructions.SEP,
    "AddressingMode": AddressingModes.Immediate,
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(3)
});
Opcodes.set(0xe3, {
    "Instruction": Instructions.SBC,
    "AddressingMode": AddressingModes.StackRelative,
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(4, CycleModifiers.MIsZeroOne, CycleModifiers.Decimal65C02)
});
Opcodes.set(0xe4, {
    "Instruction": Instructions.CPX,
    "AddressingMode": AddressingModes.DirectPage,
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(3, CycleModifiers.DirectPageLowIsNonZero, CycleModifiers.XIsZero)
});
Opcodes.set(0xe5, {
    "Instruction": Instructions.SBC,
    "AddressingMode": AddressingModes.DirectPage,
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(3, CycleModifiers.MIsZeroOne, CycleModifiers.DirectPageLowIsNonZero, CycleModifiers.Decimal65C02)
});
Opcodes.set(0xe6, {
    "Instruction": Instructions.INC,
    "AddressingMode": AddressingModes.DirectPage,
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(5)
});
Opcodes.set(0xe7, {
    "Instruction": Instructions.SBC,
    "AddressingMode": AddressingModes.DirectPageIndirectLong,
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(6, CycleModifiers.MIsZeroOne, CycleModifiers.DirectPageLowIsNonZero, CycleModifiers.Decimal65C02)
});
Opcodes.set(0xe8, {
    "Instruction": Instructions.INX,
    "AddressingMode": AddressingModes.Implied,
    "Bytes": new OpcodeBytes(1),
    "Cycles": new OpcodeCycles(2)
});
Opcodes.set(0xe9, {
    "Instruction": Instructions.SBC,
    "AddressingMode": AddressingModes.Immediate,
    "Bytes": new OpcodeBytes(2, ByteModifiers.MIsZero),
    "Cycles": new OpcodeCycles(2)
});
Opcodes.set(0xea, {
    "Instruction": Instructions.NOP,
    "AddressingMode": AddressingModes.Implied,
    "Bytes": new OpcodeBytes(1),
    "Cycles": new OpcodeCycles(2)
});
Opcodes.set(0xeb, {
    "Instruction": Instructions.XBA,
    "AddressingMode": AddressingModes.Implied,
    "Bytes": new OpcodeBytes(1),
    "Cycles": new OpcodeCycles(3)
});
Opcodes.set(0xec, {
    "Instruction": Instructions.CPX,
    "AddressingMode": AddressingModes.Absolute,
    "Bytes": new OpcodeBytes(3),
    "Cycles": new OpcodeCycles(4, CycleModifiers.XIsZero)
});
Opcodes.set(0xed, {
    "Instruction": Instructions.SBC,
    "AddressingMode": AddressingModes.Absolute,
    "Bytes": new OpcodeBytes(3),
    "Cycles": new OpcodeCycles(4, CycleModifiers.MIsZeroOne, CycleModifiers.Decimal65C02)
});
Opcodes.set(0xee, {
    "Instruction": Instructions.INC,
    "AddressingMode": AddressingModes.Absolute,
    "Bytes": new OpcodeBytes(3),
    "Cycles": new OpcodeCycles(6, CycleModifiers.MIsZeroTwo)
});
Opcodes.set(0xef, {
    "Instruction": Instructions.SBC,
    "AddressingMode": AddressingModes.AbsoluteLong,
    "Bytes": new OpcodeBytes(4),
    "Cycles": new OpcodeCycles(5, CycleModifiers.MIsZeroOne, CycleModifiers.Decimal65C02)
});
Opcodes.set(0xf0, {
    "Instruction": Instructions.BEQ,
    "AddressingMode": AddressingModes.ProgramCounterRelative,
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(2, CycleModifiers.BranchTaken, CycleModifiers.EmulationBranchTakenCrossesPageBoundary)
});
Opcodes.set(0xf1, {
    "Instruction": Instructions.SBC,
    "AddressingMode": AddressingModes.DirectPageIndexedIndirectY,
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(5, CycleModifiers.MIsZeroOne, CycleModifiers.DirectPageLowIsNonZero, CycleModifiers.IndexCrossesPageBoundary, CycleModifiers.Decimal65C02)
});
Opcodes.set(0xf2, {
    "Instruction": Instructions.SBC,
    "AddressingMode": AddressingModes.DirectPageIndirect,
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(5, CycleModifiers.MIsZeroOne, CycleModifiers.DirectPageLowIsNonZero, CycleModifiers.Decimal65C02)
});
Opcodes.set(0xf3, {
    "Instruction": Instructions.SBC,
    "AddressingMode": AddressingModes.StackRelativeIndexedY, // TODO
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(7, CycleModifiers.MIsZeroOne, CycleModifiers.Decimal65C02)
});
Opcodes.set(0xf4, {
    "Instruction": Instructions.PEA,
    "AddressingMode": AddressingModes.StackAbsolute,
    "Bytes": new OpcodeBytes(3),
    "Cycles": new OpcodeCycles(5)
});
Opcodes.set(0xf5, {
    "Instruction": Instructions.SBC,
    "AddressingMode": AddressingModes.DirectPageIndexedX,
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(4, CycleModifiers.MIsZeroOne, CycleModifiers.DirectPageLowIsNonZero, CycleModifiers.Decimal65C02)
});
Opcodes.set(0xf6, {
    "Instruction": Instructions.INC,
    "AddressingMode": AddressingModes.DirectPageIndexedX,
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(6, CycleModifiers.DirectPageLowIsNonZero, CycleModifiers.MIsZeroTwo)
});
Opcodes.set(0xf7, {
    "Instruction": Instructions.SBC,
    "AddressingMode": AddressingModes.DirectPageIndirectLongIndexedY,
    "Bytes": new OpcodeBytes(2),
    "Cycles": new OpcodeCycles(6, CycleModifiers.MIsZeroOne, CycleModifiers.DirectPageLowIsNonZero, CycleModifiers.Decimal65C02)
});
Opcodes.set(0xf8, {
    "Instruction": Instructions.SED,
    "AddressingMode": AddressingModes.Implied,
    "Bytes": new OpcodeBytes(1),
    "Cycles": new OpcodeCycles(2)
});
Opcodes.set(0xf9, {
    "Instruction": Instructions.SBC,
    "AddressingMode": AddressingModes.AbsoluteIndexedY,
    "Bytes": new OpcodeBytes(3),
    "Cycles": new OpcodeCycles(4, CycleModifiers.MIsZeroOne, CycleModifiers.IndexCrossesPageBoundary, CycleModifiers.Decimal65C02)
});
Opcodes.set(0xfa, {
    "Instruction": Instructions.PLX,
    "AddressingMode": AddressingModes.StackPull,
    "Bytes": new OpcodeBytes(1),
    "Cycles": new OpcodeCycles(4, CycleModifiers.XIsZero)
});
Opcodes.set(0xfb, {
    "Instruction": Instructions.XCE,
    "AddressingMode": AddressingModes.Implied,
    "Bytes": new OpcodeBytes(1),
    "Cycles": new OpcodeCycles(2)
});
Opcodes.set(0xfc, {
    "Instruction": Instructions.JSR,
    "AddressingMode": AddressingModes.AbsoluteIndirectLong,
    "Bytes": new OpcodeBytes(3),
    "Cycles": new OpcodeCycles(8)
});
Opcodes.set(0xfd, {
    "Instruction": Instructions.SBC,
    "AddressingMode": AddressingModes.AbsoluteIndexedX,
    "Bytes": new OpcodeBytes(3),
    "Cycles": new OpcodeCycles(4, CycleModifiers.MIsZeroOne, CycleModifiers.IndexCrossesPageBoundary, CycleModifiers.Decimal65C02)
});
Opcodes.set(0xfe, {
    "Instruction": Instructions.INC,
    "AddressingMode": AddressingModes.AbsoluteIndexedX,
    "Bytes": new OpcodeBytes(3),
    "Cycles": new OpcodeCycles(7, CycleModifiers.MIsZeroTwo, CycleModifiers.EmulationNoPageBoundaryCrossed)
});
Opcodes.set(0xff, {
    "Instruction": Instructions.SBC,
    "AddressingMode": AddressingModes.AbsoluteLongIndexedX,
    "Bytes": new OpcodeBytes(4),
    "Cycles": new OpcodeCycles(5, CycleModifiers.MIsZeroOne, CycleModifiers.Decimal65C02)
});
export default Opcodes;
