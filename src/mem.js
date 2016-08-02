const _snes = Symbol("snes");

/**
 * This class represents the SNES memory
 */
export default class Memory {

    /**
     * @param {SNES} snes
     * @param {ArrayBuffer} rom
     */
    constructor(snes, rom) {
        /**
         * @type {SNES}
         */
        this[_snes] = snes;
        /**
         * Memory map
         * @type {Uint8Array}
         */
        this.Data = new Uint8Array(rom);
        /**
         * Memory data view
         * @type {DataView}
         */
        this.View = new DataView(rom);
    }

    /**
     * Returns the uint8 at the specified address
     * @param {number} address
     * @returns {number}
     */
    GetUint8(address) {
        return this.View.getUint8(address);
    }

    /**
     * Returns the uint16 at the specified address
     * @param {number} address
     * @returns {number}
     */
    GetUint16(address) {
        return this.View.getUint16(address, true); // little endian
    }

    /**
     * Pushes the specified uint8 on the stack at the specified address and moves the CPU stack pointer
     * @param {number} uint8
     */
    PushStackUint8(uint8) {
        this.View.setUint8(this[_snes].Cpu.Registers.S, uint8);
        this[_snes].Cpu.Registers.S -= 0x1;
    }

    /**
     * Pushes the specified uint8 on the stack at the specified address and moves the CPU stack pointer
     * @param {number} uint16
     */
    PushStackUint16(uint16) {
        this.View.setUint16(this[_snes].Cpu.Registers.S, uint16, true); // little endian
        this[_snes].Cpu.Registers.S -= 0x2;
    }

    /**
     * Pops the uint8 on the stack from the specified address and moves the CPU stack pointer
     * @returns {number}
     */
    PopStackUint8() {
        const uint8 = this.View.getUint8(this[_snes].Cpu.Registers.S);
        this[_snes].Cpu.Registers.S += 0x1;
        return uint8;
    }

    /**
     * Pops the uint16 on the stack from the specified address and moves the CPU stack pointer
     * @returns {number}
     */
    PopStackUint16() {
        const uint16 = this.View.getUint16(this[_snes].Cpu.Registers.S, true);
        this[_snes].Cpu.Registers.S += 0x2;
        return uint16;
    }

    /**
     * Resolves the specified address corresponding to the specified addressing mode
     * @param {number} address
     * @param {AddressingMode} addressingMode
     * @returns {number}
     */
    ResolveAddress(address, addressingMode) {
        switch (addressingMode) {
            case AddressingModes.Absolute:
            case AddressingModes.Immediate:
                return address;
            case AddressingModes.DirectPage:
                return this[_snes].Cpu.Registers.DP + address;
            case AddressingModes.ProgramCounterRelative:
                return address + this[_snes].Cpu.Registers.PC;
            default:
                throw new Error(`Unable to resolve ${address} for addressing mode ${addressingMode}`);
        }
    }

};

/**
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
