import {StatusRegisters} from "../cpu";
import {InstructionsType} from "./context";

/**
 * This object is a mapping for instructions
 * @type {Object<string, Instruction>}
 */
const InstructionsMapping = {
    "BRK": (context) => {
        if (context.Cpu.Registers.E === 0x0) {
            context.Memory.PushStackUint8(context.Cpu.Registers.PB);
            context.Memory.PushStackUint16(context.Cpu.Registers.PC);
            context.Memory.PushStackUint8(context.Cpu.Registers.P);
            context.Cpu.Registers.PC = context.Header.InterruptVectors.NativeMode.BRK;
            // TODO: select the good PB bank
            context.Cpu.Registers.PB = context.Header.InterruptVectors.NativeMode.BRK;
        } else {
            context.Memory.PushStackUint16(context.Cpu.Registers.PC);
            context.Memory.PushStackUint8(context.Cpu.Registers.P);
            context.Cpu.Registers.PC = context.Header.InterruptVectors.EmulationMode.BRK;
        }
        context.Cpu.SetStatusRegister(StatusRegisters.I, 0x1);
        context.Cpu.SetStatusRegister(StatusRegisters.D, 0x0);
    },
    "ASL": (context) => {
        // TODO: Dumb implementation (emulation mode fails)
        // TODO: InstructionsType: Nothing (Accumulator)
        // TODO: Update P registers: N, Z, C
        let value = null;
        switch (context.Type) {
            case InstructionsType.Address:
                value = context.Memory.GetUint16(context.Address);
                break;
            default:
                throw new AddressingModeNotHandledError();
        }
        switch (context.Type) {
            case InstructionsType.Address:
                context.Memory.SetUint16(context.Address, value << 1);
                break;
        }
    },
    "RTI": (context) => {
        if (context.Cpu.Registers.E === 0x0) {
            context.Cpu.Registers.P = context.Memory.PopStackUint8();
            context.Cpu.Registers.PC = context.Memory.PopStackUint16();
            context.Cpu.Registers.PB = context.Memory.PopStackUint8();
        } else {
            const X = context.Cpu.Registers.X;
            const Y = context.Cpu.Registers.Y;
            context.Cpu.Registers.P = context.Memory.PopStackUint8();
            context.Cpu.Registers.PC = context.Memory.PopStackUint16();
            context.Cpu.Registers.X = X;
            context.Cpu.Registers.Y = Y;
        }
    },
    "ADC": (context) => {},
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
