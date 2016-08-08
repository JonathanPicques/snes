import SNES from "./src/snes";

import {readFileSync} from "fs";
import {HumanReadableMemory} from "./src/utils/format";

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

console.log(HumanReadableMemory(snes.Cpu.Registers.Data, 0x0, 0x10));

for (let i = 0; i < 128; i++) {
    snes.Cpu.Tick();
}
