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
        if ((this[_modifiers] & OpcodeCycles.MIsZero) !== 0) {
            cycles += cpu.Registers.M === 0x0 ? 1 : 0;
        }
        if ((this[_modifiers] & OpcodeCycles.LowByteDirectPageIsNonZero) !== 0) {
            cycles += ((cpu.Registers.DP & 0xf0) !== 0x0) ? 1 : 0;
        }
        if ((this[_modifiers] & OpcodeCycles.MIsZero2) !== 0) {
            cycles += cpu.Registers.M === 0x0 ? 2 : 0;
        }
        if ((this[_modifiers] & OpcodeCycles.XIsZero) !== 0) {
            cycles += cpu.Registers.X === 0x0 ? 1 : 0;
        }
        if ((this[_modifiers] & OpcodeCycles.NativeMode) !== 0) {
            cycles += cpu.Registers.E === 0 ? 1 : 0;
        }
        return cycles;
    }

    /**
     * Whether to add a cycle if CPU.Registers.M is set to zero (16-bit memory/accumulator)
     * @returns {number}
     */
    static get MIsZero() { return 0x1; }
    /**
     * Whether to add a cycle if CPU.Registers.DP is set to non-zero
     * @returns {number}
     */
    static get LowByteDirectPageIsNonZero() { return 0x2; }
    /**
     * Whether to add a cycle if the index crosses a page boundary
     * @returns {number}
     */
    static get IndexCrossesPageBoundary() { return 0x4; }
    /**
     * Whether to add two cycles if CPU.Registers.M is set to zero (16-bit memory/accumulator)
     * @returns {number}
     */
    static get MIsZero2() { return 0x8; }
    /**
     * Whether to remove a cycle if no page boundary are crossed
     * @returns {number}
     */
    static get NoPageBoundaryCrossed() { return 0x10; }
    /**
     * Whether to add a cycle if a branch was took
     * @returns {number}
     */
    static get BranchTaken() { return 0x20; }
    /**
     * Whether to add a cycle if the branch taken crosses page boundary
     * @returns {number}
     */
    static get BranchTakenCrossesPageBoundary() { return 0x40; }
    /**
     * Whether to add a cycle if CPU is in native mode
     * @returns {number}
     */
    static get NativeMode() { return 0x80; }
    /**
     * Whether to add a cycle if CPU.Registers.X is set to zero (16-bit index)
     * @returns {number}
     */
    static get XIsZero() { return 0x100; }
    /**
     * Whether to add seven cycles per byte moved
     * @returns {number}
     */
    static get SeventCyclesPerByteMoved() { return 0x200; }

}
