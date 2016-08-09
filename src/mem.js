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
     * Reads the specified length of bytes from the specified address
     * @param {number} address
     * @param {number} length
     * @returns {number}
     */
    Read(address, length) {
        if (length < 0 || length > 3) {
            throw new RangeError();
        }
        let result = 0;
        for (let i = 0; i < length; i++) {
            const [dataView, offsetAddress] = this[_snes].Cart.DecodeAddress(address + i);
            if (dataView === null) {
                throw new Error(`Cannot read at address: $${(address + i).toString(16)}`);
            }
            result |= dataView.getUint8(offsetAddress) << (i * 8);
        }
        return result;
    }

    /**
     * Returns the uint8 at the specified address
     * @param {number} address
     * @returns {number}
     */
    ReadUint8(address) {
        return this.Read(address, 1);
    }

    /**
     * Returns the uint16 at the specified address
     * @param {number} address
     * @returns {number}
     */
    ReadUint16(address) {
        return this.Read(address, 2);
    }

    /**
     * Returns the uint24 at the specified address
     * @param {number} address
     * @returns {number}
     */
    ReadUint24(address) {
        return this.Read(address, 3);
    }

    /**
     * Writes the value of the specified length of bytes to the specified address
     * @param {number} address
     * @param {number} length
     * @param {number} value
     */
    Write(address, length, value) {
        if (length < 0 || length > 3) {
            throw new RangeError();
        }
        for (let i = 0; i < length; i++) {
            const [dataView, offsetAddress] = this[_snes].Cart.DecodeAddress(address + i);
            if (dataView === null) {
                throw new Error(`Cannot write at address: $${(address + i).toString(16)}`);
            }
            dataView.setUint8(offsetAddress, (value >> (i * 8)) & 0xff);
        }
    }

    /**
     * Sets the specified uint8 at the specified address
     * @param {number} address
     * @param {number} uint8
     */
    WriteUint8(address, uint8) {
        this.Write(address, 1, uint8);
    }

    /**
     * Sets the specified uint16 at the specified address
     * @param {number} address
     * @param {number} uint16
     */
    WriteUint16(address, uint16) {
        this.Write(address, 2, uint16);
    }

    /**
     * Sets the specified uint24 at the specified address
     * @param {number} address
     * @param {number} uint24
     */
    WriteUint24(address, uint24) {
        this.Write(address, 3, uint24);
    }

    /**
     * Pushes the specified uint8 on the stack at the specified address and moves the CPU stack pointer
     * @param {number} uint8
     */
    PushStackUint8(uint8) {
        this.WriteUint8(this[_snes].Cpu.Registers.SP, uint8);
        this[_snes].Cpu.Registers.SP -= 0x1;
    }

    /**
     * Pushes the specified uint8 on the stack at the specified address and moves the CPU stack pointer
     * @param {number} uint16
     */
    PushStackUint16(uint16) {
        this.WriteUint16(this[_snes].Cpu.Registers.SP, uint16);
        this[_snes].Cpu.Registers.SP -= 0x2;
    }

    /**
     * Pops the uint8 on the stack from the specified address and moves the CPU stack pointer
     * @returns {number}
     */
    PopStackUint8() {
        const result = this.ReadUint8(this[_snes].Cpu.Registers.SP);
        this[_snes].Cpu.Registers.SP += 0x1;
        return result;
    }

    /**
     * Pops the uint16 on the stack from the specified address and moves the CPU stack pointer
     * @returns {number}
     */
    PopStackUint16() {
        const result = this.ReadUint16(this[_snes].Cpu.Registers.SP);
        this[_snes].Cpu.Registers.SP += 0x2;
        return result;
    }

};

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
