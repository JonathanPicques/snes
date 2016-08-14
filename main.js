import SNES from "./src/snes";
import {readFileSync} from "fs";

const snes = new SNES(readFileSync("./test/rom.sfc").buffer);

snes.Power();
snes.Reset();
snes.Run();
