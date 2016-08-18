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
         * @type {Cartridge}
         */
        this[_cart] = Cartridge.CreateFromRom(this, rom);
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
         * @type {ArrayBuffer}
         */
        this.WRAM = new ArrayBuffer(0x1f400);
        /**
         * @type {DataView}
         */
        this.WRAMView = new DataView(this.WRAM);
    }

    /**
     * Powers on the SNES and all sub-components
     */
    Power() {
        this[_cart].Power();
        this[_cpu].Power();
        // this[_ppu].Power();
        // this[_apu].Power();
    }

    /**
     * Resets on the SNES and all sub-components
     */
    Reset() {
        this[_cart].Reset();
        this[_cpu].Reset();
        // this[_ppu].Reset();
        // this[_apu].Reset();
        // this[_cart].Reset();
    }

    /**
     * Starts the SNES main loop
     */
    Run() {
        while (this[_cpu].Cycles < 0xff) { // Arbitrary number
            this[_cpu].Tick();
        }
    }

    /** @returns {Cartridge} */
    get Cart() { return this[_cart]; }

    /** @returns {CPU} */
    get Cpu() { return this[_cpu]; }

    /** @returns {PPU} */
    get Ppu() { return this[_ppu]; }

    /** @returns {APU} */
    get Apu() { return this[_apu]; }

    /** @returns {Memory} */
    get Memory() { return this[_mem]; }

}
