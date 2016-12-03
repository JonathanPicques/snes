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

/**
 * Returns the addressing mode name for the specified addressing mode
 * @param {AddressingMode} index - specifies the addressing mode
 * @returns {string}
 */
export const AddressingModeName = (index) => {
    const enumeratorName = Object.keys(AddressingModes).find(enumerationName => AddressingModes[enumerationName] === index);
    if (typeof enumeratorName === "undefined") {
        throw new Error("Addressing mode unknown");
    }
    return enumeratorName;
};
