const _bytes = Symbol("bytes");
const _modifiers = Symbol("modifiers");

/**
 * This class returns the number of bytes needed to execute a specified opcode depending on the CPU state
 */
export default class OpcodeBytes {

    /**
     * @param {number} bytes
     * @param {...number} modifiers
     */
    constructor(bytes, ...modifiers) {
        this[_bytes] = bytes;
        this[_modifiers] = 0;
        for (const modifier of modifiers) {
            this[_modifiers] |= modifier;
        }
    }

    /**
     * Returns the number of bytes needed to execute a specified opcode
     * @param {CPU} cpu
     * @returns {number}
     */
    Evaluate(cpu) {
        let bytes = this[_bytes];
        if ((this[_modifiers] & OpcodeBytes.MIsZero) !== 0) {
            bytes += cpu.Registers.M === 0x0 ? 1 : 0;
        }
        if ((this[_modifiers] & OpcodeBytes.XIsZero) !== 0) {
            bytes += cpu.Registers.X === 0x0 ? 1 : 0;
        }
        return bytes;
    }

    /**
     * Whether to add a byte if CPU.Registers.M is set to 0 (16-bit memory/accumulator)
     * @returns {number}
     */
    static get MIsZero() { return 0x1; }
    /**
     * Whether to add a byte if CPU.Registers.X is set to 0 (16-bit index)
     * @returns {number}
     */
    static get XIsZero() { return 0x2; }

}
