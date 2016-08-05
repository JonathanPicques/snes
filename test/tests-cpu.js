import {expect} from "chai";

import SNES from "../src/snes";

import {StatusRegisters} from "../src/cpu";

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
    it("Should test CPU default registers", () => {
        const snes = new SNES(data);

        // CPU registers
        expect(snes.Cpu.Registers.A).to.be.equal(0x0);
        expect(snes.Cpu.Registers.X).to.be.equal(0x0);
        expect(snes.Cpu.Registers.Y).to.be.equal(0x0);
        expect(snes.Cpu.Registers.SP).to.be.equal(0x100);
        expect(snes.Cpu.Registers.DP).to.be.equal(0x0);
        expect(snes.Cpu.Registers.DB).to.be.equal(0x0);
        expect(snes.Cpu.Registers.PC).to.be.equal(instructionAddress);
        expect(snes.Cpu.Registers.E).to.be.equal(0x1);

        // CPU Status register (P)
        expect(snes.Cpu.GetStatusRegister(StatusRegisters.C)).to.be.equal(0x0);
        expect(snes.Cpu.GetStatusRegister(StatusRegisters.Z)).to.be.equal(0x0);
        expect(snes.Cpu.GetStatusRegister(StatusRegisters.I)).to.be.equal(0x1);
        expect(snes.Cpu.GetStatusRegister(StatusRegisters.D)).to.be.equal(0x0);
        expect(snes.Cpu.GetStatusRegister(StatusRegisters.X)).to.be.equal(0x1);
        expect(snes.Cpu.GetStatusRegister(StatusRegisters.M)).to.be.equal(0x1);
        expect(snes.Cpu.GetStatusRegister(StatusRegisters.V)).to.be.equal(0x0);
        expect(snes.Cpu.GetStatusRegister(StatusRegisters.N)).to.be.equal(0x0);
    });
    it("Should test opcode XCE (0xfb)", () => {
        view.setUint8(instructionAddress, 0xfb); // XCE
        view.setUint8(instructionAddress + 1, 0xfb); // XCE
        const snes = new SNES(data);

        expect(snes.Cpu.Cycles).to.be.equal(0);
        expect(snes.Cpu.Registers.PC).to.be.equal(instructionAddress);
        expect(snes.Cpu.Registers.E).to.be.equal(0x1);
        expect(snes.Cpu.GetStatusRegister(StatusRegisters.C)).to.be.equal(0x0);
        expect(snes.Cpu.GetStatusRegister(StatusRegisters.M)).to.be.equal(0x1);
        expect(snes.Cpu.GetStatusRegister(StatusRegisters.X)).to.be.equal(0x1);

        snes.Cpu.Tick();

        expect(snes.Cpu.Cycles).to.be.equal(2);
        expect(snes.Cpu.Registers.PC).to.be.equal(instructionAddress + 1);
        expect(snes.Cpu.Registers.E).to.be.equal(0x0);
        expect(snes.Cpu.GetStatusRegister(StatusRegisters.C)).to.be.equal(0x1);
        expect(snes.Cpu.GetStatusRegister(StatusRegisters.M)).to.be.equal(0x0);
        expect(snes.Cpu.GetStatusRegister(StatusRegisters.X)).to.be.equal(0x0);

        snes.Cpu.Tick();

        expect(snes.Cpu.Cycles).to.be.equal(4);
        expect(snes.Cpu.Registers.PC).to.be.equal(instructionAddress + 2);
        expect(snes.Cpu.Registers.E).to.be.equal(0x1);
        expect(snes.Cpu.GetStatusRegister(StatusRegisters.C)).to.be.equal(0x0);
        expect(snes.Cpu.GetStatusRegister(StatusRegisters.M)).to.be.equal(0x1);
        expect(snes.Cpu.GetStatusRegister(StatusRegisters.X)).to.be.equal(0x1);
    });
});
