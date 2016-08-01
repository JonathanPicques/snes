import {P_Registers} from "../cpu";

/**
 * This object is a mapping for instructions
 * @type {Object<string, Instruction>}
 */
const InstructionsMapping = {
    "ADC": (context) => {},
    "RTI": (context) => {
        if (context.snes.Cpu.Registers.E === 0x0) {
            context.snes.Cpu.Registers.P = context.snes.Memory.PopStackUint8();
            context.snes.Cpu.Registers.PC = context.snes.Memory.PopStackUint16();
            context.snes.Cpu.Registers.PB = context.snes.Memory.PopStackUint8();
        } else {
            // TODO: X and Y not affected in emulation mode
            context.snes.Cpu.Registers.P = context.snes.Memory.PopStackUint8();
            context.snes.Cpu.Registers.PC = context.snes.Memory.PopStackUint16();
        }
    },
    "BRK": (context) => {
        if (context.snes.Cpu.Registers.E === 0x0) {
            context.snes.Memory.PushStackUint8(context.snes.Cpu.Registers.PB);
            context.snes.Memory.PushStackUint16(context.snes.Cpu.Registers.PC);
            context.snes.Memory.PushStackUint8(context.snes.Cpu.Registers.P);
            context.snes.Cpu.Registers.PC = context.snes.Header.InterruptVectors.NativeMode.BRK;
            // TODO: select the good PB bank
            context.snes.Cpu.Registers.PB = context.snes.Header.InterruptVectors.NativeMode.BRK;
        } else {
            context.snes.Memory.PushStackUint16(context.snes.Cpu.Registers.PC);
            context.snes.Memory.PushStackUint8(context.snes.Cpu.Registers.P);
            context.snes.Cpu.Registers.PC = context.snes.Header.InterruptVectors.EmulationMode.BRK;
        }
        context.snes.Cpu.Registers.P &= P_Registers.D;
        context.snes.Cpu.Registers.P |= P_Registers.I;
    },
    "BRA": (context) => {},
    "XCE": (context) => {
        const Carry = context.snes.Cpu.Registers.P & P_Registers.C;
        const Emulation = context.snes.Cpu.Registers.E;
        context.snes.Cpu.Registers.E = Carry;
        context.snes.Cpu.Registers.P = Emulation === 0x1 ? context.snes.Cpu.Registers.P | P_Registers.C : context.snes.Cpu.Registers.P & ~P_Registers.C;
        if (context.snes.Cpu.Registers.E === 0x1) {
            context.snes.Cpu.Registers.X = 0x1;
            context.snes.Cpu.Registers.M = 0x1;
        }
    },
    "SBC": (context) => {}
};
export default InstructionsMapping;

/**
 * @typedef {function} Instruction
 * @param {InstructionContext} context
 */
