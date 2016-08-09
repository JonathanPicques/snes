import {StatusRegisters} from "../cpu";

const _cycles = Symbol("bytes");
const _modifiers = Symbol("modifiers");

/**
 * This class returns the number of cycles needed to execute a specified opcode depending on the CPU state
 */
export default class OpcodeCycles {

    /**
     * @param {number} cycles
     * @param {...number} modifiers
     */
    constructor(cycles, ...modifiers) {
        this[_cycles] = cycles;
        this[_modifiers] = 0;
        for (const modifier of modifiers) {
            this[_modifiers] |= modifier;
        }
    }

    /**
     * Returns the number of cycles needed to execute a specified opcode
     * @param {CPU} cpu
     * @returns {number}
     */
    Evaluate(cpu) {
        let cycles = this[_cycles];
        if ((this[_modifiers] & CycleModifiers.MIsZero1) !== 0) {
            cycles += cpu.GetStatusRegister(StatusRegisters.M) === 0x0 ? 1 : 0;
        }
        if ((this[_modifiers] & CycleModifiers.DirectPageLowIsNonZero) !== 0) {
            cycles += ((cpu.Registers.DP & 0xf) !== 0x0) ? 1 : 0;
        }
        if ((this[_modifiers] & CycleModifiers.MIsZero2) !== 0) {
            cycles += cpu.GetStatusRegister(StatusRegisters.M) === 0x0 ? 2 : 0;
        }
        if ((this[_modifiers] & CycleModifiers.XIsZero) !== 0) {
            cycles += cpu.GetStatusRegister(StatusRegisters.X) === 0x0 ? 1 : 0;
        }
        if ((this[_modifiers] & CycleModifiers.NativeMode) !== 0) {
            cycles += cpu.Registers.E === 0x0 ? 1 : 0;
        }
        return cycles;
    }

}

/**
 * This enumeration lists all the modifiers for the number of cycles
 * @enum {CycleModifier}
 */
export const CycleModifiers = {
    "MIsZero1": 0x1, // Whether to add a cycle if CPU.Status.M is set to zero (16-bit memory/accumulator)
    "DirectPageLowIsNonZero": 0x2, // Whether to add a cycle if the lowest bits of CPU.Registers.DP are non-zero
    "IndexCrossesPageBoundary": 0x4, // Whether to add a cycle if the index crosses a page boundary
    "MIsZero2": 0x8, // Whether to add two cycles if CPU.Status.M is set to zero (16-bit memory/accumulator)
    "PageBoundaryNotCrossed": 0x10, // Whether to remove a cycle if no page boundary are crossed
    "BranchTaken": 0x20, // Whether to add a cycle if a branch was took
    "BranchTakenCrossesPageBoundary": 0x40, // Whether to add a cycle if the branch taken crosses page boundary
    "NativeMode": 0x80, // Whether to add a cycle if CPU is in native mode
    "XIsZero": 0x100, // Whether to add a cycle if CPU.Status.X is set to zero (16-bit index)
    "SevenCyclesPerByteMoved": 0x200, // Whether to add seven cycles per byte moved
};
/**
 * @typedef {number} CycleModifier
 */
