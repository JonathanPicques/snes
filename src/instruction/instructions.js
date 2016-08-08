import {StatusRegisters} from "../cpu";
import {InstructionsType} from "./context";

/**
 * This object is a mapping for instructions
 * @type {Object<string, Instruction>}
 */
const InstructionsMapping = {
    "BRK": (context) => {},
    "ASL": (context) => {},
    "CLC": (context) => {
        context.Cpu.SetStatusRegister(StatusRegisters.C, 0x0);
    },
    "RTI": (context) => {},
    "ADC": (context) => {},
    "SEI": (context) => {
        context.Cpu.SetStatusRegister(StatusRegisters.I, 0x1);
    },
    "BRA": (context) => {},
    "XCE": (context) => {
        const Carry = context.Cpu.GetStatusRegister(StatusRegisters.C);
        const Emulation = context.Cpu.Registers.E;

        // Exchanges the Carry Bit with the Emulation bit
        context.Cpu.SetStatusRegister(StatusRegisters.C, Emulation);
        context.Cpu.Registers.E = Carry;

        // In Native mode, Status register (P) bits M and X are forced to 0x0 (16 bits)
        // In Emulation mode, Status register (P) bits M and X are forced to 0x1 (8 bits)
        // But the accumulator and indexes high bytes are kept in place (no truncating)
        context.Cpu.SetStatusRegister(StatusRegisters.M, context.Cpu.Registers.E);
        context.Cpu.SetStatusRegister(StatusRegisters.X, context.Cpu.Registers.E);
    },
    "SBC": (context) => {}
};
export default InstructionsMapping;

/**
 * @typedef {function} Instruction
 * @param {InstructionContext} context
 */

/**
 * This error represents an addressing mode not handled by an instruction
 */
export class AddressingModeNotHandledError extends Error {}
