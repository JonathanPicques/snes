import CPU from "./cpu";
import PPU from "./ppu";
import APU from "./apu";
import Memory from "./mem";
import ParseROM from "./rom/rom";

const _mem = Symbol("Memory");
const _cpu = Symbol("Cpu");
const _ppu = Symbol("Ppu");
const _apu = Symbol("Apu");

export default class SNES {

    /**
     * Parsed header
     * @type {Object}
     */
    Header = {
        "Offset": 0,
        "ROM": {
            "name": "", // 21 bytes
            "mapMode": 0x0, // 8 bits
            "romType": 0x0, // 8 bits
            "romSize": 0x0, // 8 bits
            "sramSize": 0x0, // 8 bits
            "destinationCode": 0x0, // 8 bits
            "fixedValue": 0x0, // 8 bits
            "version": 0x0, // 8 bits
            "complementCheck": 0x0, // 8 bits
            "checksum": 0x0, // 8 bits
        },
        "InterruptVectors": {
            "NativeMode": {
                "COP": 0x0, // 16 bits
                "BRK": 0x0, // 16 bits
                "ABORT": 0x0, // 16 bits
                "NMI": 0x0, // 16 bits
                "RESET": 0x0, // 16 bits
                "IRQ": 0x0, // 16 bits
            },
            "EmulationMode": {
                "COP": 0x0, // 16 bits
                "ABORT": 0x0, // 16 bits
                "NMI": 0x0, // 16 bits
                "RES": 0x0, // 16 bits
                "BRK": 0x0, // 16 bits
                "IRQ": 0x0, // 16 bits
            },
        },
    };

    /**
     * @param {ArrayBuffer} rom
     */
    constructor(rom) {
        this[_mem] = new Memory(this, rom);
        this[_cpu] = new CPU(this);
        this[_ppu] = new PPU(this);
        this[_apu] = new APU(this);

        ParseROM(this);
        this[_cpu].Reset();
    }

    /** @returns {Memory} */
    get Memory() { return this[_mem]; }

    /** @returns {CPU} */
    get Cpu() { return this[_cpu]; }

    /** @returns {PPU} */
    get Ppu() { return this[_ppu]; }

    /** @returns {APU} */
    get Apu() { return this[_apu]; }

}
