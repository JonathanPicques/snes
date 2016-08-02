import {P_Registers} from "../cpu";
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
        context.Cpu.Registers.P &= P_Registers.D;
        context.Cpu.Registers.P |= P_Registers.I;
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
        }
        const result = value << 1;
        switch (context.Type) {
            case InstructionsType.Address:
                context.Memory.SetUint16(context.Address, result);
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
        const Carry = context.Cpu.Registers.P & P_Registers.C;
        const Emulation = context.Cpu.Registers.E;
        context.Cpu.Registers.E = Carry;
        context.Cpu.Registers.P = Emulation === 0x1 ? context.Cpu.Registers.P | P_Registers.C : context.Cpu.Registers.P & ~P_Registers.C;
        if (context.Cpu.Registers.E === 0x1) {
            context.Cpu.Registers.X = 0x1;
            context.Cpu.Registers.M = 0x1;
        }
    },
    "SBC": (context) => {}
};
export default InstructionsMapping;

/**
 * @typedef {function} Instruction
 * @param {InstructionContext} context
 */
