import SNES from "./src/snes";

import {readFileSync} from "fs";

const bufferize = (buffer) => {
    const arrayBuffer = new ArrayBuffer(buffer.length);
    const view = new Uint8Array(arrayBuffer);
    for (let i = 0; i < buffer.length; i++) {
        view[i] = buffer[i];
    }
    return arrayBuffer;
};

const snes = new SNES(bufferize(readFileSync("./test/rom.sfc")));

for (let i = 0; i < 128; i++) {
   try {
       snes.Cpu.Tick();
   } catch (ex) {
       console.log("Emulation stopped after", i, "instructions");
       throw ex;
   }
}
