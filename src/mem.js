import {StatusRegisters} from "./cpu";
import {HumanReadableAddress} from "./utils/format";

const _snes = Symbol("snes");

/**
 * This class represents the SNES memory
 */
export default class Memory {

    /**
     * @param {SNES} snes
     */
    constructor(snes) {
        /**
         * @type {SNES}
         */
        this[_snes] = snes;
    }

    /**
     * Reads the specified byte length from the specified address
     * @param {number} address
     * @param {number} byteLength
     * @returns {number}
     */
    Read(address, byteLength) {
        if (byteLength < 0 || byteLength > 3) {
            throw new RangeError();
        }
        let result = 0;
        for (let i = 0; i < byteLength; i++) {
            const [dataView, offsetAddress] = this[_snes].Cart.DecodeAddress(address + i);
            if (dataView === null) {
                throw new Error(`Cannot read at address: $${(address + i).toString(16)}`);
            }
            result |= dataView.getUint8(offsetAddress) << (i * 8);
        }
        return result;
    }
    /**
     * Reads the uint8 at the specified address
     * @param {number} address
     * @returns {number}
     */
    ReadUint8(address) {
        return this.Read(address, 1);
    }
    /**
     * Reads the uint16 at the specified address
     * @param {number} address
     * @returns {number}
     */
    ReadUint16(address) {
        return this.Read(address, 2);
    }
    /**
     * Reads the uint24 at the specified address
     * @param {number} address
     * @returns {number}
     */
    ReadUint24(address) {
        return this.Read(address, 3);
    }
    /**
     * Reads the accumulator depending on the accumulator size (8-bit or 16-bit) at the specified address
     * @returns {number}
     */
    ReadAccumulator(address) {
        if (this[_snes].Cpu.GetStatusRegister(StatusRegisters.M) === 0x0) {
            return this.ReadUint16(address); // 16-bit
        }
        return this.ReadUint8(address); // 8-bit
    }

    /**
     * Writes the value of the specified byte length to the specified address
     * @param {number} address
     * @param {number} byteLength
     * @param {number} value
     */
    Write(address, byteLength, value) {
        if (byteLength < 0 || byteLength > 3) {
            throw new RangeError();
        }
        for (let i = 0; i < byteLength; i++) {
            const [dataView, offsetAddress] = this[_snes].Cart.DecodeAddress(address + i);
            if (dataView === null) {
                throw new Error(`Cannot write at address: ${HumanReadableAddress(address + i)}`);
            }
            dataView.setUint8(offsetAddress, (value >> (i * 8)) & 0xff);
        }
    }
    /**
     * Writes the specified uint8 at the specified address
     * @param {number} address
     * @param {number} uint8
     */
    WriteUint8(address, uint8) {
        this.Write(address, 1, uint8);
    }
    /**
     * Writes the specified uint16 at the specified address
     * @param {number} address
     * @param {number} uint16
     */
    WriteUint16(address, uint16) {
        this.Write(address, 2, uint16);
    }
    /**
     * Writes the specified uint24 at the specified address
     * @param {number} address
     * @param {number} uint24
     */
    WriteUint24(address, uint24) {
        this.Write(address, 3, uint24);
    }
    /**
     * Writes the accumulator depending on the accumulator size (8-bit or 16-bit) at the specified address
     * @returns {number}
     */
    WriteAccumulator(address) {
        if (this[_snes].Cpu.GetStatusRegister(StatusRegisters.M) === 0x0) {
            return this.WriteUint16(address, this[_snes].Cpu.Registers.A); // 16-bit
        }
        return this.WriteUint8(address, this[_snes].Cpu.Registers.A); // 8-bit
    }

    /**
     * Pushes the value of the specified byte length onto the stack and moves the CPU stack pointer
     * @param {number} byteLength
     * @param {number} value
     */
    PushStack(byteLength, value) {
        if (byteLength < 0 || byteLength > 2) {
            throw new RangeError();
        }
        this.Write(this[_snes].Cpu.Registers.SP, byteLength, value);
        this[_snes].Cpu.Registers.SP -= byteLength;
    }
    /**
     * Pushes the specified uint8 on the stack and moves the CPU stack pointer
     * @param {number} uint8
     */
    PushStackUint8(uint8) {
        this.PushStack(1, uint8);
    }
    /**
     * Pushes the specified uint8 on the stack and moves the CPU stack pointer
     * @param {number} uint16
     */
    PushStackUint16(uint16) {
        this.PushStack(2, uint16);
    }

    /**
     * Pops the value of the specified byte length from the stack and moves the CPU stack pointer
     * @param {number} byteLength
     * @returns {number}
     */
    PopStack(byteLength) {
        if (byteLength < 0 || byteLength > 2) {
            throw new RangeError();
        }
        const value = this.Read(this[_snes].Cpu.Registers.SP, byteLength);
        this[_snes].Cpu.Registers.SP += byteLength;
        return value;
    }
    /**
     * Pops the uint8 from the stack and moves the CPU stack pointer
     * @returns {number}
     */
    PopStackUint8() {
        return this.PopStack(1);
    }
    /**
     * Pops the uint16 from the stack and moves the CPU stack pointer
     * @returns {number}
     */
    PopStackUint16() {
        return this.PopStack(2);
    }

    /**
     * Composes the address from the specified bank and effective address
     * @param {number} bank - 8-bit
     * @param {number} effectiveAddress - 16-bit
     * @returns {number}
     */
    static ComposeAddress(bank, effectiveAddress) {
        if (bank < 0x0 || bank > 0xff || effectiveAddress < 0 || effectiveAddress > 0xffff) {
            throw new RangeError();
        }
        return effectiveAddress | (bank << 0xf);
    }
    /**
     * Decomposes the specified address in bank and effective address
     * @param {number} address
     * @returns {Array<number>}
     */
    static DecomposeAddress(address) {
        if (address < 0 || address > 0xffffff) {
            throw new RangeError();
        }
        if ((address & 0xffff0000) !== 0) {
            return [(address >> 16) & 0xff, address & 0x00ffff];
        }
        return [0x0, address];
    }

}

/**
 * This enumeration lists all the different addressing modes
 * @enum {AddressingMode}
 */
export const AddressingModes = {
    "Immediate": 0,
    "Absolute": 1,
    "AbsoluteTransferControl": 2,
    "AbsoluteLong": 3,
    "DirectPage": 4,
    "DirectPageIndirect": 5,
    "DirectPageIndirectLong": 6,
    "AbsoluteIndexedX": 7,
    "AbsoluteLongIndexedX": 8,
    "AbsoluteIndexedY": 9,
    "DirectPageIndexedX": 10,
    "DirectPageIndexedY": 11,
    "DirectPageIndexedIndirectX": 12,
    "DirectPageIndexedIndirectY": 13,
    "DirectPageIndirectLongIndexedY": 14,
    "StackRelative": 15,
    "StackRelativeIndexedY": 16,
    "Accumulator": 17,
    "ProgramCounterRelative": 18,
    "ProgramCounterRelativeLong": 19,
    "StackInterrupt": 20,
    "Implied": 21,
    "AbsoluteIndirect": 22,
    "AbsoluteIndexedIndirect": 23,
    "AbsoluteIndirectLong": 24,
    "BlockMove": 25,
    "StackAbsolute": 26,
    "StackDirectPageIndirect": 27,
    "StackPCRelativeLong": 28,
    "StackPush": 29,
    "StackPull": 30,
    "StackReturnFromInterrupt": 31,
    "StackReturnFromInterruptLong": 32,
    "StackReturnFromSubroutine": 33,
};
/**
 * @typedef {number} AddressingMode
 */
