import {expect} from "chai";

import SNES from "../src/snes";

import {P_Registers} from "../src/cpu";

const resetVectorAddress = 0x7ffc;
const instructionAddress = 0x841c;

let data = new ArrayBuffer(0x40000);
let view = new DataView(data);

describe("CPU Instructions", () => {
    beforeEach(() => {
        data = new ArrayBuffer(0x40000);
        view = new DataView(data);
        view.setUint16(resetVectorAddress, instructionAddress, true); // reset vector points to our first test instruction
    });
    it("XCE (0xfb)", () => {
        view.setUint8(instructionAddress, 0xfb); // XCE
        const snes = new SNES(data);

        expect(snes.Cpu.Registers.E).to.be.equal(1);
        // expect(snes.Cpu.Registers.P & P_Registers.C).to.be.equal(0);

        snes.Cpu.Tick();

        expect(snes.Cpu.Registers.E).to.be.equal(0);
        // expect(snes.Cpu.Registers.P & P_Registers.C).to.be.equal(1);
    });
});
