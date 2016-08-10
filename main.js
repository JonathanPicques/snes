import SNES from "./src/snes";
import Readline from "readline";
import {readFileSync} from "fs";

const snes = new SNES(readFileSync("./test/rom.sfc").buffer);
const reader = Readline.createInterface({"input": process.stdin, "output": process.stdout, "prompt": "snes$ "});
let instructions = 0;

reader.prompt();
reader.on("line", () => {
    try { snes.Cpu.Tick(); } catch (e) { console.error(e); reader.close(); }
    instructions += 1;
    reader.prompt();
});
reader.on("close", () => {
    console.log(`Emulation ended after ${instructions} instructions`);
    process.exit(0);
});
