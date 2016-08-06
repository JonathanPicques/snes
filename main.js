import SNES from "./src/snes";

import {readFileSync} from "fs";
import {HumanReadableRegisters} from "./src/utils/format";

const bufferize = (buffer) => {
    const arrayBuffer = new ArrayBuffer(buffer.length);
    const view = new Uint8Array(arrayBuffer);
    for (let i = 0; i < buffer.length; i++) {
        view[i] = buffer[i];
    }
    return arrayBuffer;
};

const snes = new SNES(bufferize(readFileSync("./test/rom.sfc")));
snes.Debug = true;

// console.log(HumanReadableRegisters(snes.Header));

// console.log(snes.Memory.Data.length.toString(16));

console.log((0x400 << snes.Cart.Header.ROM.RomSize) / 2, 0x7fff/8);

for (let i = 0; i < 128; i++) {
    snes.Cpu.Tick();
}
