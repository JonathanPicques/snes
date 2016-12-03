import {GetStringFromMemory} from "./utils/format";

const _snes = Symbol("snes");

/**
 * This class emulates the cartridge of the SNES
 */
export default class Cartridge {

    /**
     * @param {SNES} snes
     * @param {ArrayBuffer} rom
     * @param {number} offset
     */
    constructor(snes, rom, offset) {
        /**
         * Reference to the SNES
         * @type {SNES}
         */
        this[_snes] = snes;
        /**
         * Rom data
         * @type {Uint8Array}
         */
        this.Rom = new Uint8Array(rom);
        /**
         * Rom data viewer
         * @type {DataView}
         */
        this.RomView = new DataView(rom);
        /**
         * Rom header
         * @type {Object}
         */
        this.Header = {
            "Offset": offset,
            "ROM": {
                "Name": "", // 21 bytes
                "MapMode": 0x0, // 8-bit
                "RomType": 0x0, // 8-bit
                "RomSize": 0x0, // 8-bit
                "SRAMSize": 0x0, // 8-bit
                "DestinationCode": 0x0, // 8-bit
                "FixedValue": 0x0, // 8-bit
                "Version": 0x0, // 8-bit
                "ComplementCheck": 0x0, // 8-bit
                "Checksum": 0x0, // 8-bit
            },
            "InterruptVectors": {
                "NativeMode": {
                    "COP": 0x0, // 16-bit
                    "BRK": 0x0, // 16-bit
                    "ABORT": 0x0, // 16-bit
                    "NMI": 0x0, // 16-bit
                    "RESET": 0x0, // 16-bit
                    "IRQ": 0x0, // 16-bit
                },
                "EmulationMode": {
                    "COP": 0x0, // 16-bit
                    "ABORT": 0x0, // 16-bit
                    "NMI": 0x0, // 16-bit
                    "RES": 0x0, // 16-bit
                    "BRK": 0x0, // 16-bit
                    "IRQ": 0x0, // 16-bit
                },
            },
        };
    }

    /**
     * Powers this cartridge
     */
    Power() {
        this.parseHeader();
    }

    /**
     * Resets this cartridge
     */
    Reset() {}

    /**
     * Decodes the specified address and returns the data buffer and the offset address
     * @param {Address} address
     * @returns {[DataView, number, string]}
     * @abstract
     */
    DecodeAddress(address) {
        return [null, address.Absolute, ""];
    }

    /**
     * Parses the ROM header
     * @private
     */
    parseHeader() {
        this.Header.ROM.Name = GetStringFromMemory(this.Rom, this.Header.Offset, this.Header.Offset + 0x15); // 0x?fc0 - 0x?fd4
        this.Header.ROM.MapMode = this.RomView.getUint8(this.Header.Offset + 0x16); // 0x?fd5
        this.Header.ROM.RomType = this.RomView.getUint8(this.Header.Offset + 0x17); // 0x?fd6
        this.Header.ROM.RomSize = this.RomView.getUint8(this.Header.Offset + 0x18); // 0x?fd7
        this.Header.ROM.SRAMSize = this.RomView.getUint8(this.Header.Offset + 0x19); // 0x?fd8
        this.Header.ROM.DestinationCode = this.RomView.getUint8(this.Header.Offset + 0x1a); // 0x?fd9
        this.Header.ROM.FixedValue = this.RomView.getUint8(this.Header.Offset + 0x1b); // 0x?fda
        this.Header.ROM.Version = this.RomView.getUint8(this.Header.Offset + 0x1c); // // 0x?fdb
        this.Header.ROM.ComplementCheck = this.RomView.getUint16(this.Header.Offset + 0x1d, true); // // 0x?fdc
        this.Header.ROM.Checksum = this.RomView.getUint16(this.Header.Offset + 0x1f, true); // // 0x?fde

        this.Header.InterruptVectors.NativeMode.COP = this.RomView.getUint16(this.Header.Offset + 0x24, true); // 0x?fe4
        this.Header.InterruptVectors.NativeMode.BRK = this.RomView.getUint16(this.Header.Offset + 0x26, true); // 0x?fe6
        this.Header.InterruptVectors.NativeMode.ABORT = this.RomView.getUint16(this.Header.Offset + 0x28, true); // 0x?fe8
        this.Header.InterruptVectors.NativeMode.NMI = this.RomView.getUint16(this.Header.Offset + 0x2a, true); // 0x?fea
        this.Header.InterruptVectors.NativeMode.RESET = this.RomView.getUint16(this.Header.Offset + 0x2c, true); // 0x?fec
        this.Header.InterruptVectors.NativeMode.IRQ = this.RomView.getUint16(this.Header.Offset + 0x2e, true); // 0x?fee

        this.Header.InterruptVectors.EmulationMode.COP = this.RomView.getUint16(this.Header.Offset + 0x34, true); // 0x?ff4-5
        this.Header.InterruptVectors.EmulationMode.ABORT = this.RomView.getUint16(this.Header.Offset + 0x38, true); // 0x?ff8
        this.Header.InterruptVectors.EmulationMode.NMI = this.RomView.getUint16(this.Header.Offset + 0x3a, true); // 0x?ffa
        this.Header.InterruptVectors.EmulationMode.RES = this.RomView.getUint16(this.Header.Offset + 0x3c, true); // 0x?ffc
        this.Header.InterruptVectors.EmulationMode.BRK = this.RomView.getUint16(this.Header.Offset + 0x3e, true); // 0x?ffe
        this.Header.InterruptVectors.EmulationMode.IRQ = this.RomView.getUint16(this.Header.Offset + 0x3e, true); // 0x?ffe
    }

    /**
     * Creates a cartridge from the specified rom
     * @param {SNES} snes
     * @param {ArrayBuffer} rom
     * @returns {Cartridge}
     */
    static CreateFromRom(snes, rom) {
        const smcHeaderOffset = (rom.byteLength % 0x400) === 0 ? 0x0 : 0x200;
        const offset = smcHeaderOffset + (0x7fc0 || 0x00ffc0 || 0x40ffc0);
        switch (offset) {
            case 0x7fc0:
                return new CartridgeLoROM(snes, rom);
            case 0x00ffc0:
                return new CartridgeHiROM(snes, rom);
            default:
                throw new Error("Unknown rom type");
        }
    }

}

/**
 * This class emulates the cartridge of the SNES with LoROM mapping
 */
export class CartridgeLoROM extends Cartridge {

    /**
     * @param {SNES} snes
     * @param {ArrayBuffer} rom
     */
    constructor(snes, rom) {
        super(snes, rom, 0x7fc0);
        /**
         * @type {ArrayBuffer}
         */
        this.SRAM = new ArrayBuffer(0x7fff);
        /**
         * @type {DataView}
         */
        this.SRAMView = new DataView(this.SRAM);
    }

    //noinspection JSUnusedGlobalSymbols
    /**
     * Decodes the specified address and returns the data buffer and the offset address
     * @param {Address} address
     * @returns {[DataView, number, string]}
     * @override
     */
    DecodeAddress(address) {
        const bank = address.Bank;
        const effectiveAddress = address.Effective;
        if (bank >= 0x0 && bank < 0x40) {
            if (effectiveAddress >= 0x0 && effectiveAddress < 0x2000) {
                return [this[_snes].WRAMView, effectiveAddress, "WRAM"];
            }
            if (effectiveAddress >= 0x4000 && effectiveAddress < 0x4400) {
                return [this[_snes].Cpu.InternalRegistersView, effectiveAddress - 0x4000, "Internal CPU registers"];
            } else if (effectiveAddress >= 0x8000 && effectiveAddress <= 0xffff) {
                return [this.RomView, effectiveAddress - (bank + 1) * 0x8000, "ROM"];
            }
        } else if (bank >= 0x40 && bank < 0x6f) {
            if (effectiveAddress >= 0x0 && effectiveAddress < 0x7fff) {
                // TODO: not mapped if decoder is MAD-1
                return [this.RomView, effectiveAddress, "ROM"];
            }
            if (effectiveAddress >= 0x8000 && effectiveAddress <= 0xffff) {
                return [this.RomView, effectiveAddress - (bank + 1) * 0x8000, "ROM"];
            }
        } else if (bank >= 0x80 && bank < 0xff) {
            if (effectiveAddress > 0x0 && effectiveAddress <= 0x7fff) {
                // TODO: not mapped to SRAM if there is no SRAM in the cartridge
                return [this.SRAMView, effectiveAddress, "SRAM"];
            }
            if (effectiveAddress >= 0x8000 && effectiveAddress <= 0xffff) {
                return [this.RomView, effectiveAddress - ((bank - 0x80) + 1) * 0x8000, "ROM"];
            }
        }
        return [null, 0x0];
    }

}

/**
 * This class emulates the cartridge of the SNES with HiROM mapping
 */
export class CartridgeHiROM extends Cartridge {

    /**
     * @param {SNES} snes
     * @param {ArrayBuffer} rom
     */
    constructor(snes, rom) {
        super(snes, rom, 0x00ffc0);
    }

}
