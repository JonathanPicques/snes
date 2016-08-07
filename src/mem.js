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
     * Initializes the memory
     */
    Initialize() {
        // TODO: Get the memory mapping
    }

    /**
     * Returns the uint8 at the specified address
     * @param {number} address
     * @returns {number}
     */
    GetUint8(address) {
        throw new Error("not yet implemented", address);
    }

    /**
     * Returns the uint16 at the specified address
     * @param {number} address
     * @returns {number}
     */
    GetUint16(address) {
        throw new Error("not yet implemented", address);
    }

    /**
     * Sets the specified uint8 at the specified address
     * @param {number} address
     * @param {number} uint8
     */
    SetUint8(address, uint8) {
        throw new Error("not yet implemented", address, uint8);
    }

    /**
     * Sets the specified uint16 at the specified address
     * @param {number} address
     * @param {number} uint16
     */
    SetUint16(address, uint16) {
        throw new Error("not yet implemented", address, uint16);
    }

    /**
     * Pushes the specified uint8 on the stack at the specified address and moves the CPU stack pointer
     * @param {number} uint8
     */
    PushStackUint8(uint8) {
        throw new Error("not yet implemented", uint8);
        // this[_snes].Cpu.Registers.SP -= 0x1;
    }

    /**
     * Pushes the specified uint8 on the stack at the specified address and moves the CPU stack pointer
     * @param {number} uint16
     */
    PushStackUint16(uint16) {
        throw new Error("not yet implemented", uint16);
        // this[_snes].Cpu.Registers.SP -= 0x2;
    }

    /**
     * Pops the uint8 on the stack from the specified address and moves the CPU stack pointer
     * @returns {number}
     */
    PopStackUint8() {
        throw new Error("not yet implemented");
        // this[_snes].Cpu.Registers.SP += 0x1;
    }

    /**
     * Pops the uint16 on the stack from the specified address and moves the CPU stack pointer
     * @returns {number}
     */
    PopStackUint16() {
        throw new Error("not yet implemented");
        // this[_snes].Cpu.Registers.SP += 0x2;
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
