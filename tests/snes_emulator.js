import {readFileSync} from "fs";
import SNES from "../src/snes";
import {debugOpcodes} from "../src/utils/bytes";

const bufferize = (buffer) => {
    const arrayBuffer = new ArrayBuffer(buffer.length);
    const view = new Uint8Array(arrayBuffer);
    for (let i = 0; i < buffer.length; i++) {
        view[i] = buffer[i];
    }
    return arrayBuffer;
};

const snes = new SNES(bufferize(readFileSync("./tests/rom.sfc")));

for (let i = 0; i < 128; i++) {
    console.log(`Executing opcode 0x${snes.Memory.GetUint8(snes.Cpu.Registers.PC).toString(16)}`);

    snes.Cpu.Tick();
    console.log(snes.Cpu.Registers.PC);
}
