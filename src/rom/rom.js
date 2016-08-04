import {GetStringFromMemory} from "../utils/format";

/**
 * Parses the ROM information from the memory
 * @param {SNES} snes
 */
const ParseROM = (snes) => {
    parseHeaderOffset(snes);
    parseHeader(snes);
    parseInterruptVectors(snes);
};
export default ParseROM;

/**
 * Finds the ROM internal header address offset
 * @param {SNES} snes
 * @returns {number}
 * @private
 */
const parseHeaderOffset = (snes) => {
    // TODO: Find if LoROM, HiROM or ExHiROM
    const smcHeaderOffset = (snes.Memory.Data.length % 0x400) === 0 ? 0x0 : 0x200;
    snes.Header.Offset = smcHeaderOffset + (0x7fc0 || 0x00ffc0 || 0x40ffc0 || this);
};

/**
 * Parses the ROM header
 * @param {SNES} snes
 * @private
 */
const parseHeader = (snes) => {
    snes.Header.ROM.name = GetStringFromMemory(snes.Memory.Data, snes.Header.Offset, snes.Header.Offset + 0x15);
    snes.Header.ROM.mapMode = snes.Memory.GetUint8(snes.Header.Offset + 0x16);
    snes.Header.ROM.romType = snes.Memory.GetUint8(snes.Header.Offset + 0x17);
    snes.Header.ROM.romSize = snes.Memory.GetUint8(snes.Header.Offset + 0x18);
    snes.Header.ROM.sramSize = snes.Memory.GetUint8(snes.Header.Offset + 0x19);
    snes.Header.ROM.destinationCode = snes.Memory.GetUint8(snes.Header.Offset + 0x1a);
    snes.Header.ROM.fixedValue = snes.Memory.GetUint8(snes.Header.Offset + 0x1b);
    snes.Header.ROM.version = snes.Memory.GetUint8(snes.Header.Offset + 0x1c);
    snes.Header.ROM.complementCheck = snes.Memory.GetUint16(snes.Header.Offset + 0x1d);
    snes.Header.ROM.checksum = snes.Memory.GetUint16(snes.Header.Offset + 0x1f);
};

/**
 * Parses the ROM interrupt vectors for emulation and native modes
 * @param {SNES} snes
 * @private
 */
const parseInterruptVectors = (snes) => {
    snes.Header.InterruptVectors.NativeMode.COP = snes.Memory.GetUint16(snes.Header.Offset + 0x24);
    snes.Header.InterruptVectors.NativeMode.BRK = snes.Memory.GetUint16(snes.Header.Offset + 0x26);
    snes.Header.InterruptVectors.NativeMode.ABORT = snes.Memory.GetUint16(snes.Header.Offset + 0x28);
    snes.Header.InterruptVectors.NativeMode.NMI = snes.Memory.GetUint16(snes.Header.Offset + 0x2a);
    snes.Header.InterruptVectors.NativeMode.RESET = snes.Memory.GetUint16(snes.Header.Offset + 0x2c);
    snes.Header.InterruptVectors.NativeMode.IRQ = snes.Memory.GetUint16(snes.Header.Offset + 0x2e);

    snes.Header.InterruptVectors.EmulationMode.COP = snes.Memory.GetUint16(snes.Header.Offset + 0x34);
    snes.Header.InterruptVectors.EmulationMode.ABORT = snes.Memory.GetUint16(snes.Header.Offset + 0x38);
    snes.Header.InterruptVectors.EmulationMode.NMI = snes.Memory.GetUint16(snes.Header.Offset + 0x3a);
    snes.Header.InterruptVectors.EmulationMode.RES = snes.Memory.GetUint16(snes.Header.Offset + 0x3c);
    snes.Header.InterruptVectors.EmulationMode.BRK = snes.Memory.GetUint16(snes.Header.Offset + 0x3e);
    snes.Header.InterruptVectors.EmulationMode.IRQ = snes.Memory.GetUint16(snes.Header.Offset + 0x3e);
};
