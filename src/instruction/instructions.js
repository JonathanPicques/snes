import {StatusRegisters} from "../cpu";
import {ContextTypes} from "./context";

/**
 * This enumeration lists all the different instructions
 * @enum {Instruction}
 */
const Instructions = {
    "BRK": (context) => {
        // BReaK
        if (context.Type !== ContextTypes.Nothing) {
            throw new UnhandledContextTypeError();
        }
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
    "ASL": () => {},
    "CLC": (context) => {
        // CLear Carry bit
        if (context.Type !== ContextTypes.Nothing) {
            throw new UnhandledContextTypeError();
        }
        context.Cpu.SetStatusRegister(StatusRegisters.C, 0x0);
    },
    "RTI": (context) => {
        // ReTurn from Interrupt
        if (context.Type !== ContextTypes.Nothing) {
            throw new UnhandledContextTypeError();
        }
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
    "PHK": (context) => {
        // PusH the program banK on the stacK
        if (context.Type !== ContextTypes.Nothing) {
            throw new UnhandledContextTypeError();
        }
        context.Memory.PushStackUint8(context.Cpu.Registers.PB);
    },
    "TCD": (context) => {
        // Transfer Accumulator C to Direct page
        if (context.Type !== ContextTypes.Nothing) {
            throw new UnhandledContextTypeError();
        }
        // Writes the accumulator C (16-bit) to the direct page pointer, disregarding the status bit M
        context.Memory.WriteUint16(context.Cpu.Registers.DP, context.Cpu.Registers.A);
        // Checks if the accumulator is negative (aka. most significant bit is set)
        context.Cpu.SetStatusRegister(StatusRegisters.N, (context.Cpu.Registers.A & 0x8000) === 0x0 ? 0x0 : 0x1);
        // Checks if the accumulator is zero
        context.Cpu.SetStatusRegister(StatusRegisters.Z, (context.Cpu.Registers.A) === 0x0 ? 0x1 : 0x0);
    },
    "JMP": (context) => {
        // JuMP
        if (context.Type !== ContextTypes.Address) {
            throw new UnhandledContextTypeError();
        }
        context.Cpu.Registers.PC = context.Address;
    },
    "ADC": () => {},
    "SEI": (context) => {
        // SEts Interrupt disable
        if (context.Type !== ContextTypes.Nothing) {
            throw new UnhandledContextTypeError();
        }
        context.Cpu.SetStatusRegister(StatusRegisters.I, 0x1);
    },
    "BRA": () => {},
    "STA": (context) => {
        // STore Accumulator
        switch (context.Type) {
            case ContextTypes.Address:
                if (context.Cpu.GetStatusRegister(StatusRegisters.M) === 0x0) {
                    context.Memory.WriteUint16(context.Address, context.Cpu.Registers.A); // 16-bit
                } else {
                    context.Memory.WriteUint8(context.Address, context.Cpu.Registers.A); // 8-bit
                }
                break;
            default:
                throw new UnhandledContextTypeError();
        }
    },
    "TXS": (context) => {
        // Transfer X to Stack pointer
        if (context.Type !== ContextTypes.Nothing) {
            throw new UnhandledContextTypeError();
        }
        // TODO: verify: Stack pointer highest bytes sets to $0 in emulation mode?
        if (context.Cpu.GetStatusRegister(StatusRegisters.X) === 0x0) {
            context.Memory.PushStackUint16(context.Cpu.Registers.X); // 16-bit
        } else {
            context.Memory.PushStackUint8(context.Cpu.Registers.X); // 8-bit
        }
    },
    "LDX": (context) => {
        // LoaD X
        switch (context.Type) {
            case ContextTypes.Value:
                if (context.Cpu.GetStatusRegister(StatusRegisters.X) === 0x0) {
                    context.Cpu.Registers.X = context.Value; // 16-bit
                } else {
                    context.Cpu.Registers.X = context.Value & 0xf; // 8-bit
                }
                break;
            default:
                throw new UnhandledContextTypeError();
        }
    },
    "LDA": (context) => {
        // LoaD Accumulator
        switch (context.Type) {
            case ContextTypes.Value:
                if (context.Cpu.GetStatusRegister(StatusRegisters.M) === 0x0) {
                    context.Cpu.Registers.A = context.Value; // 16-bit
                } else {
                    context.Cpu.Registers.A = context.Value & 0xf; // 8-bit
                }
                break;
            default:
                throw new UnhandledContextTypeError();
        }
        // Checks if the accumulator is negative (aka. most significant bit is set)
        context.Cpu.SetStatusRegister(StatusRegisters.N, (context.Cpu.Registers.A & 0x8000) === 0x0 ? 0x0 : 0x1);
        // Checks if the accumulator is zero
        context.Cpu.SetStatusRegister(StatusRegisters.Z, (context.Cpu.Registers.A) === 0x0 ? 0x1 : 0x0);
    },
    "PLB": (context) => {
        // PuLL data Bank register
        if (context.Type !== ContextTypes.Nothing) {
            throw new UnhandledContextTypeError();
        }
        context.Cpu.Registers.DB = context.Memory.PopStackUint8();
        // Checks if the data bank is negative (aka. most significant bit is set)
        context.Cpu.SetStatusRegister(StatusRegisters.N, (context.Cpu.Registers.DB & 0x80) === 0x0 ? 0x0 : 0x1);
        // Checks if the data bank is zero
        context.Cpu.SetStatusRegister(StatusRegisters.Z, (context.Cpu.Registers.DB) === 0x0 ? 0x1 : 0x0);
    },
    "REP": (context) => {
        // REset Processor status bits
        if (context.Type !== ContextTypes.Value) {
            throw new UnhandledContextTypeError();
        }
        context.Cpu.Registers.P &= ~context.Value;
        // In Emulation mode, Status register (P) bits M and X are forced to 0x1 (8-bit)
        if (context.Cpu.Registers.E === 0x1) {
            context.Cpu.SetStatusRegister(StatusRegisters.M, 0x1);
            context.Cpu.SetStatusRegister(StatusRegisters.X, 0x1);
        }
    },
    "SEP": (context) => {
        // SEt Processor status bits
        if (context.Type !== ContextTypes.Value) {
            throw new UnhandledContextTypeError();
        }
        context.Cpu.Registers.P |= context.Value;
        // In Emulation mode, Status register (P) bits M and X are forced to 0x1 (8-bit)
        if (context.Cpu.Registers.E === 0x1) {
            context.Cpu.SetStatusRegister(StatusRegisters.M, 0x1);
            context.Cpu.SetStatusRegister(StatusRegisters.X, 0x1);
        }
    },
    "XCE": (context) => {
        // eXchange Carry bit and Emulation bit
        if (context.Type !== ContextTypes.Nothing) {
            throw new UnhandledContextTypeError();
        }
        const Carry = context.Cpu.GetStatusRegister(StatusRegisters.C);
        const Emulation = context.Cpu.Registers.E;

        // Exchanges the Carry Bit with the Emulation bit
        context.Cpu.SetStatusRegister(StatusRegisters.C, Emulation);
        context.Cpu.Registers.E = Carry;

        // In Emulation mode, Status register (P) bits M and X are forced to 0x1 (8 bits)
        // TODO: verify: The accumulator and indexes high bytes are kept (no truncating) ?
        if (context.Cpu.Registers.E === 0x1) {
            context.Cpu.SetStatusRegister(StatusRegisters.M, 0x1);
            context.Cpu.SetStatusRegister(StatusRegisters.X, 0x1);
        }

        // TODO: verify: Stack pointer highest bytes sets to $1?
    },
    "SBC": () => {}
};
export default Instructions;
/**
 * @typedef {function} Instruction
 * @param {InstructionContext} context
 */

/**
 * This class represents an unhandled context type error
 */
export class UnhandledContextTypeError extends Error {}
