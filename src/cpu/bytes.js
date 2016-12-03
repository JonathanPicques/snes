import {StatusRegisters} from "../cpu";

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
        this[_modifiers] = modifiers.reduce((a, modifier) => a | modifier, 0);
    }

    /**
     * Returns the number of bytes needed to execute a specified opcode
     * @param {OpcodeContext} context
     * @returns {number}
     */
    Evaluate(context) {
        let bytes = this[_bytes];
        if ((this[_modifiers] & ByteModifiers.MIsZero) !== 0) {
            bytes += context.Cpu.GetStatusRegister(StatusRegisters.M) === 0x0 ? 0x1 : 0x0;
        }
        if ((this[_modifiers] & ByteModifiers.XIsZero) !== 0) {
            bytes += context.Cpu.GetStatusRegister(StatusRegisters.X) === 0x0 ? 0x1 : 0x0;
        }
        return bytes;
    }

}

/**
 * This enumeration lists all the modifiers for the number of bytes
 * @enum {ByteModifier}
 */
export const ByteModifiers = {
    "MIsZero": 0x1, // Whether to add a byte if CPU.Status.M is set to zero (16-bit memory/accumulator)
    "XIsZero": 0x2, // Whether to add a byte if CPU.Status.X is set to zero (16-bit index)
};
/**
 * @typedef {number} ByteModifier
 */
