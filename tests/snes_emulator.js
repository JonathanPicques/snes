import SNES from "../src/snes";

import {readFileSync} from "fs";

const bufferize = (buffer) => {
    const arrayBuffer = new ArrayBuffer(buffer.length);
    const view = new Uint8Array(arrayBuffer);
    for (let i = 0; i < buffer.length; i++) {
        view[i] = buffer[i];
    }
    return arrayBuffer;
};

const snes = new SNES(bufferize(readFileSync("./tests/rom.sfc")));
snes.Debug = true;

for (let i = 0; i < 128; i++) {
    snes.Cpu.Tick();
}
