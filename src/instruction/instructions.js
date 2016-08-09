import {StatusRegisters} from "../cpu";
import {InstructionsType} from "./context";

/**
 * This object is a mapping for instructions
 * @type {Object<string, Instruction>}
 */
const InstructionsMapping = {
    "BRK": (context) => {
        // BReaK
        if (context.Cpu.Registers.E === 0x0) {
            context.Memory.PushStackUint8(context.Cpu.Registers.PB);
            context.Memory.PushStackUint16(context.Cpu.Registers.PC + 2);
            context.Memory.PushStackUint8(context.Cpu.Registers.P);
            context.Cpu.Registers.PC = context.Header.InterruptVectors.NativeMode.BRK;
            // TODO: select the good program bank
            context.Cpu.Registers.PB = context.Header.InterruptVectors.NativeMode.BRK;
        } else {
            context.Memory.PushStackUint16(context.Cpu.Registers.PC + 2);
            context.Memory.PushStackUint8(context.Cpu.Registers.P);
            context.Cpu.Registers.PC = context.Header.InterruptVectors.EmulationMode.BRK;
        }
        context.Cpu.SetStatusRegister(StatusRegisters.I, 0x1);
        context.Cpu.SetStatusRegister(StatusRegisters.D, 0x0);
    },
    "ASL": (context) => {},
    "CLC": (context) => {
        // CLear Carry bit
        context.Cpu.SetStatusRegister(StatusRegisters.C, 0x0);
    },
    "RTI": (context) => {
        // ReTurn from Interrupt
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
    "JMP": (context) => {
        // JuMP
        context.Cpu.Registers.PC = context.Address;
    },
    "ADC": (context) => {},
    "SEI": (context) => {
        // SEts Interrupt disable
        context.Cpu.SetStatusRegister(StatusRegisters.I, 0x1);
    },
    "BRA": (context) => {
        // BRanch Always
    },
    "STA": (context) => {
        // STore Accumulator
        switch (context.Type) {
            case InstructionsType.Address:
                console.log(context.Address.toString(16));
                break;
            default:
                throw new Error("Invalid context type"); // TODO: replace by error class
        }
    },
    "LDA": (context) => {
        // LoaD Accumulator
        switch (context.Type) {
            case InstructionsType.Value:
                context.Cpu.Registers.A = context.Value;
                break;
            default:
                throw new Error("Invalid context type"); // TODO: replace by error class
        }
    },
    "SEP": (context) => {
        // SEt Processor status bits
        context.Cpu.Registers.P |= context.Value;

        // In Emulation mode, Status register (P) bits M and X are forced to 0x1 (8-bit)
        if (context.Cpu.Registers.E === 0x1) {
            context.Cpu.SetStatusRegister(StatusRegisters.M, 0x1);
            context.Cpu.SetStatusRegister(StatusRegisters.X, 0x1);
        }
    },
    "XCE": (context) => {
        // eXchange Carry bit and Emulation bit
        const Carry = context.Cpu.GetStatusRegister(StatusRegisters.C);
        const Emulation = context.Cpu.Registers.E;

        // Exchanges the Carry Bit with the Emulation bit
        context.Cpu.SetStatusRegister(StatusRegisters.C, Emulation);
        context.Cpu.Registers.E = Carry;

        // In Emulation mode, Status register (P) bits M and X are forced to 0x1 (8 bits)
        // TODO: verify: The accumulator and indexes high bytes are kept in place (no truncating)
        if (context.Cpu.Registers.E === 0x1) {
            context.Cpu.SetStatusRegister(StatusRegisters.M, 0x1);
            context.Cpu.SetStatusRegister(StatusRegisters.X, 0x1);
        }

        // TODO: Stack pointer highest bytes sets to $1?
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
