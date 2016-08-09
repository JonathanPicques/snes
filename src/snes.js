import CPU from "./cpu";
import PPU from "./ppu";
import APU from "./apu";
import Memory from "./mem";
import Cartridge from "./cart";

const _cpu = Symbol("Cpu");
const _ppu = Symbol("Ppu");
const _apu = Symbol("Apu");
const _mem = Symbol("Memory");
const _cart = Symbol("Cartridge");

export default class SNES {

    /**
     * @param {ArrayBuffer} rom
     */
    constructor(rom) {
        /**
         * @type {CPU}
         */
        this[_cpu] = new CPU(this);
        /**
         * @type {PPU}
         */
        this[_ppu] = new PPU(this);
        /**
         * @type {APU}
         */
        this[_apu] = new APU(this);
        /**
         * @type {Memory}
         */
        this[_mem] = new Memory(this);
        /**
         * @type {Cartridge}
         */
        this[_cart] = Cartridge.CreateFromRom(this, rom);
        /**
         * @type {ArrayBuffer}
         */
        this.WRAM = new ArrayBuffer(0x1f400);
        /**
         * @type {DataView}
         */
        this.WRAMView = new DataView(this.WRAM);

        this.initialize();
    }

    /**
     * Parses the rom into Memory and initializes the CPU, PPU and APU
     * @private
     */
    initialize() {
        this[_cpu].Reset();
    }

    /** @returns {CPU} */
    get Cpu() { return this[_cpu]; }
    /** @returns {PPU} */
    get Ppu() { return this[_ppu]; }
    /** @returns {APU} */
    get Apu() { return this[_apu]; }
    /** @returns {Cartridge} */
    get Cart() { return this[_cart]; }
    /** @returns {Memory} */
    get Memory() { return this[_mem]; }

}
