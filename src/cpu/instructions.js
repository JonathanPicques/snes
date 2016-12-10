import {ContextTypes} from "./context";
import {StatusFlags} from "../cpu";

/**
 * This enumeration lists all the different opcode instructions
 * @enum {Instruction}
 */
const Instructions = {
    "BRK": context => {
        // BReaK
        if (context.Type !== ContextTypes.Nothing) {
            throw new UnhandledContextTypeError();
        }
        if (context.Cpu.Registers.E === 0x0) {
            context.Memory.PushStackUint8(context.Cpu.Registers.PB);
            context.Memory.PushStackUint16(context.Cpu.Registers.PC + 2);
            context.Memory.PushStackUint8(context.Cpu.Registers.P);
            context.Cpu.Registers.PC = context.Header.InterruptVectors.NativeMode.BRK;
            context.Cpu.Registers.PB = context.Header.InterruptVectors.NativeMode.BRK;
        } else {
            context.Memory.PushStackUint16(context.Cpu.Registers.PC + 2);
            context.Memory.PushStackUint8(context.Cpu.Registers.P);
            context.Cpu.Registers.PC = context.Header.InterruptVectors.EmulationMode.BRK;
        }
        context.Cpu.SetStatusFlag(StatusFlags.I, 0x1);
        context.Cpu.SetStatusFlag(StatusFlags.D, 0x0);
    },
    "ORA": context => {
        // ORA
        throw new Error("not yet implemented", context);
    },
    "COP": context => {
        // COP
        throw new Error("not yet implemented", context);
    },
    "TSB": context => {
        // TSB
        throw new Error("not yet implemented", context);
    },
    "ASL": context => {
        // ASL
        throw new Error("not yet implemented", context);
    },
    "PHP": context => {
        // PHP
        throw new Error("not yet implemented", context);
    },
    "PHD": context => {
        // PHD
        throw new Error("not yet implemented", context);
    },
    "BPL": context => {
        // Branch on PLus
        if (context.Type !== ContextTypes.Address) {
            throw new UnhandledContextTypeError();
        }
        if (context.Cpu.GetStatusFlag(StatusFlags.N) === 0x0) {
            context.Cpu.Registers.PC = context.Address.Effective;
            context.Cpu.Registers.PB = context.Address.Bank;
        }
    },
    "TRB": context => {
        // TRB
        throw new Error("not yet implemented", context);
    },
    "CLC": context => {
        // CLear Carry bit
        if (context.Type !== ContextTypes.Nothing) {
            throw new UnhandledContextTypeError();
        }
        context.Cpu.SetStatusFlag(StatusFlags.C, 0x0);
    },
    "INC": context => {
        // INC
        throw new Error("not yet implemented", context);
    },
    "TCS": context => {
        // TCS
        throw new Error("not yet implemented", context);
    },
    "JSR": context => {
        // JSR
        throw new Error("not yet implemented", context);
    },
    "AND": context => {
        // AND
        throw new Error("not yet implemented", context);
    },
    "BIT": context => {
        // BIT
        throw new Error("not yet implemented", context);
    },
    "ROL": context => {
        // ROL
        throw new Error("not yet implemented", context);
    },
    "PLP": context => {
        // PLP
        throw new Error("not yet implemented", context);
    },
    "PLD": context => {
        // PLD
        throw new Error("not yet implemented", context);
    },
    "BMI": context => {
        // BMI
        throw new Error("not yet implemented", context);
    },
    "SEC": context => {
        // SEt Carry bit
        if (context.Type !== ContextTypes.Nothing) {
            throw new UnhandledContextTypeError();
        }
        context.Cpu.SetStatusFlag(StatusFlags.C, 0x1);
    },
    "DEC": context => {
        // DEC
        throw new Error("not yet implemented", context);
    },
    "TSC": context => {
        // TSC
        throw new Error("not yet implemented", context);
    },
    "RTI": context => {
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
    "EOR": context => {
        // EOR
        throw new Error("not yet implemented", context);
    },
    "WDM": context => {
        // WDM
        throw new Error("not yet implemented", context);
    },
    "MVP": context => {
        // MVP
        throw new Error("not yet implemented", context);
    },
    "LSR": context => {
        // LSR
        throw new Error("not yet implemented", context);
    },
    "PHA": context => {
        // PHA
        throw new Error("not yet implemented", context);
    },
    "PHK": context => {
        // PusH the program banK on the stacK
        if (context.Type !== ContextTypes.Nothing) {
            throw new UnhandledContextTypeError();
        }
        context.Memory.PushStackUint8(context.Cpu.Registers.PB);
    },
    "JMP": context => {
        // JuMP
        if (context.Type !== ContextTypes.Address) {
            throw new UnhandledContextTypeError();
        }
        context.Cpu.Registers.PC.Effective = context.Address.Effective;
        context.Cpu.Registers.PB = context.Address.Bank;
    },
    "BVC": context => {
        // BVC
        throw new Error("not yet implemented", context);
    },
    "MVN": context => {
        // MVN
        throw new Error("not yet implemented", context);
    },
    "CLI": context => {
        // CLI
        throw new Error("not yet implemented", context);
    },
    "PHY": context => {
        // PHY
        throw new Error("not yet implemented", context);
    },
    "TCD": context => {
        // Transfer Accumulator C to Direct page
        if (context.Type !== ContextTypes.Nothing) {
            throw new UnhandledContextTypeError();
        }
        // Transfers the accumulator C (16-bit) to the direct page pointer, disregarding the status bit M
        context.Cpu.Registers.DP = context.Cpu.Registers.A;
        // Checks if the accumulator is negative (aka. most significant bit is set)
        context.Cpu.SetStatusFlag(StatusFlags.N, (context.Cpu.Registers.DP & 0x8000) === 0x0 ? 0x0 : 0x1);
        // Checks if the accumulator is zero
        context.Cpu.SetStatusFlag(StatusFlags.Z, (context.Cpu.Registers.DP) === 0x0 ? 0x1 : 0x0);
    },
    "RTS": context => {
        // RTS
        throw new Error("not yet implemented", context);
    },
    "ADC": context => {
        // ADC
        throw new Error("not yet implemented", context);
    },
    "PER": context => {
        // PER
        throw new Error("not yet implemented", context);
    },
    "STZ": context => {
        // STZ
        throw new Error("not yet implemented", context);
    },
    "ROR": context => {
        // ROR
        throw new Error("not yet implemented", context);
    },
    "PLA": context => {
        // PLA
        throw new Error("not yet implemented", context);
    },
    "RTL": context => {
        // RTL
        throw new Error("not yet implemented", context);
    },
    "BVS": context => {
        // BVS
        throw new Error("not yet implemented", context);
    },
    "SEI": context => {
        // SEts Interrupt disable
        if (context.Type !== ContextTypes.Nothing) {
            throw new UnhandledContextTypeError();
        }
        context.Cpu.SetStatusFlag(StatusFlags.I, 0x1);
    },
    "PLY": context => {
        // PLY
        throw new Error("not yet implemented", context);
    },
    "TDC": context => {
        // TDC
        throw new Error("not yet implemented", context);
    },
    "BRA": context => {
        // BRA
        throw new Error("not yet implemented", context);
    },
    "STA": context => {
        // STore Accumulator
        switch (context.Type) {
            case ContextTypes.Address:
                context.Memory.WriteAccumulator(context.Address);
                break;
            default:
                throw new UnhandledContextTypeError();
        }
    },
    "BRL": context => {
        // BRL
        throw new Error("not yet implemented", context);
    },
    "STY": context => {
        // STY
        throw new Error("not yet implemented", context);
    },
    "STX": context => {
        // STX
        throw new Error("not yet implemented", context);
    },
    "DEY": context => {
        // DEY
        throw new Error("not yet implemented", context);
    },
    "TXA": context => {
        // TXA
        throw new Error("not yet implemented", context);
    },
    "PHB": context => {
        // PHB
        throw new Error("not yet implemented", context);
    },
    "BCC": context => {
        // BCC
        throw new Error("not yet implemented", context);
    },
    "TYA": context => {
        // TYA
        throw new Error("not yet implemented", context);
    },
    "TXS": context => {
        // Transfer X to Stack pointer
        if (context.Type !== ContextTypes.Nothing) {
            throw new UnhandledContextTypeError();
        }
        if (context.Cpu.Registers.E === 0x0) {
            // In Native mode, the whole X index is transferred to the stack pointer
            context.Cpu.Registers.SP = context.Cpu.Registers.X;
        } else {
            // In Emulation mode, the high bytes are set
            context.Cpu.Registers.SP |= context.Cpu.Registers.X << 0x8;
        }
    },
    "TXY": context => {
        // TXY
        throw new Error("not yet implemented", context);
    },
    "LDY": context => {
        // LDY
        throw new Error("not yet implemented", context);
    },
    "LDA": context => {
        // LoaD Accumulator
        let value = 0;
        switch (context.Type) {
            case ContextTypes.Value:
                value = context.Value;
                break;
            case ContextTypes.Address:
                value = context.Memory.ReadAccumulator(context.Address);
                break;
            default:
                throw new UnhandledContextTypeError();

        }
        if (context.Cpu.GetStatusFlag(StatusFlags.M) === 0x0) {
            context.Cpu.Registers.A = value; // 16-bit
        } else {
            context.Cpu.Registers.A = value & 0xf; // 8-bit
        }
        // Checks if the accumulator is negative (aka. most significant bit is set)
        context.Cpu.SetStatusFlag(StatusFlags.N, (context.Cpu.Registers.A & 0x8000) === 0x0 ? 0x0 : 0x1);
        // Checks if the accumulator is zero
        context.Cpu.SetStatusFlag(StatusFlags.Z, (context.Cpu.Registers.A) === 0x0 ? 0x1 : 0x0);
    },
    "LDX": context => {
        // LoaD X
        switch (context.Type) {
            case ContextTypes.Value:
                if (context.Cpu.GetStatusFlag(StatusFlags.X) === 0x0) {
                    context.Cpu.Registers.X = context.Value; // 16-bit
                } else {
                    context.Cpu.Registers.X = context.Value & 0xf; // 8-bit
                }
                break;
            default:
                throw new UnhandledContextTypeError();
        }
    },
    "TAY": context => {
        // TAY
        throw new Error("not yet implemented", context);
    },
    "TAX": context => {
        // TAX
        throw new Error("not yet implemented", context);
    },
    "PLB": context => {
        // PuLL data Bank register
        if (context.Type !== ContextTypes.Nothing) {
            throw new UnhandledContextTypeError();
        }
        context.Cpu.Registers.DB = context.Memory.PopStackUint8();
        // Checks if the data bank is negative (aka. most significant bit is set)
        context.Cpu.SetStatusFlag(StatusFlags.N, (context.Cpu.Registers.DB & 0x80) === 0x0 ? 0x0 : 0x1);
        // Checks if the data bank is zero
        context.Cpu.SetStatusFlag(StatusFlags.Z, (context.Cpu.Registers.DB) === 0x0 ? 0x1 : 0x0);
    },
    "BCS": context => {
        // BCS
        throw new Error("not yet implemented", context);
    },
    "CLV": context => {
        // CLV
        throw new Error("not yet implemented", context);
    },
    "TSX": context => {
        // TSX
        throw new Error("not yet implemented", context);
    },
    "TYX": context => {
        // TYX
        throw new Error("not yet implemented", context);
    },
    "CPY": context => {
        // CPY
        throw new Error("not yet implemented", context);
    },
    "CMP": context => {
        // CMP
        throw new Error("not yet implemented", context);
    },
    "REP": context => {
        // REset Processor status bits
        if (context.Type !== ContextTypes.Value) {
            throw new UnhandledContextTypeError();
        }
        context.Cpu.Registers.P &= ~context.Value;
        // In Emulation mode, Status register (P) bits M and X are forced to 0x1 (8-bit)
        if (context.Cpu.Registers.E === 0x1) {
            context.Cpu.SetStatusFlag(StatusFlags.M, 0x1);
            context.Cpu.SetStatusFlag(StatusFlags.X, 0x1);
        }
    },
    "INY": context => {
        // INY
        throw new Error("not yet implemented", context);
    },
    "DEX": context => {
        // DEX
        throw new Error("not yet implemented", context);
    },
    "WAI": context => {
        // WAI
        throw new Error("not yet implemented", context);
    },
    "BNE": context => {
        // BNE
        throw new Error("not yet implemented", context);
    },
    "PEI": context => {
        // PEI
        throw new Error("not yet implemented", context);
    },
    "CLD": context => {
        // CLD
        throw new Error("not yet implemented", context);
    },
    "PHX": context => {
        // PHX
        throw new Error("not yet implemented", context);
    },
    "STP": context => {
        // STP
        throw new Error("not yet implemented", context);
    },
    "CPX": context => {
        // CPX
        throw new Error("not yet implemented", context);
    },
    "SBC": context => {
        // SBC
        throw new Error("not yet implemented", context);
    },
    "SEP": context => {
        // SEt Processor status bits
        if (context.Type !== ContextTypes.Value) {
            throw new UnhandledContextTypeError();
        }
        context.Cpu.Registers.P |= context.Value;
        // In Emulation mode, Status register (P) bits M and X are forced to 0x1 (8-bit)
        if (context.Cpu.Registers.E === 0x1) {
            context.Cpu.SetStatusFlag(StatusFlags.M, 0x1);
            context.Cpu.SetStatusFlag(StatusFlags.X, 0x1);
        }
    },
    "INX": context => {
        // INX
        throw new Error("not yet implemented", context);
    },
    "NOP": context => {
        // NOP
        throw new Error("not yet implemented", context);
    },
    "XBA": context => {
        // XBA
        throw new Error("not yet implemented", context);
    },
    "BEQ": context => {
        // BEQ
        throw new Error("not yet implemented", context);
    },
    "PEA": context => {
        // PEA
        throw new Error("not yet implemented", context);
    },
    "SED": context => {
        // SED
        throw new Error("not yet implemented", context);
    },
    "PLX": context => {
        // PLX
        throw new Error("not yet implemented", context);
    },
    "XCE": context => {
        // eXchange Carry bit and Emulation bit
        if (context.Type !== ContextTypes.Nothing) {
            throw new UnhandledContextTypeError();
        }
        const Carry = context.Cpu.GetStatusFlag(StatusFlags.C);
        const Emulation = context.Cpu.Registers.E;

        // Exchanges the Carry Bit with the Emulation bit
        context.Cpu.SetStatusFlag(StatusFlags.C, Emulation);
        context.Cpu.Registers.E = Carry;

        // In Emulation mode, Status register (P) bits M and X are forced to 0x1 (8-bit)
        if (context.Cpu.Registers.E === 0x1) {
            context.Cpu.SetStatusFlag(StatusFlags.M, 0x1);
            context.Cpu.SetStatusFlag(StatusFlags.X, 0x1);
        }
    }
};
export default Instructions;
/**
 * @typedef {function} Instruction
 * @param {OpcodeContext} context
 */

/**
 * This class represents an unhandled context type error
 */
export class UnhandledContextTypeError extends Error {
}
