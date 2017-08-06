import {expect} from "chai";
import {readFileSync} from "fs";
import {describe, it, beforeEach} from "mocha";

import SNES from "../src/snes";
import Address from "../src/addr";
import {StatusFlags} from "../src/cpu";

let snes;
let rom;
let firstOpcode;
const defaultRom = readFileSync("./test/snes_lorom.sfc").buffer;

describe("Instructions", () => {
    beforeEach(() => {
        rom = defaultRom.slice();
        snes = new SNES(rom);
        snes.Power();
        snes.Reset();
        firstOpcode = snes.Cart.Header.InterruptVectors.EmulationMode.RES;
    });
    it("should test CPU registers at reset", () => {
        expect(snes.Cpu.Registers.P).to.be.equal(StatusFlags.I | StatusFlags.X | StatusFlags.M);
        expect(snes.Cpu.Registers.A).to.be.equal(0x0);
        expect(snes.Cpu.Registers.X).to.be.equal(0x0);
        expect(snes.Cpu.Registers.Y).to.be.equal(0x0);
        expect(snes.Cpu.Registers.SP).to.be.equal(0x100);
        expect(snes.Cpu.Registers.DP).to.be.equal(0x0);
        expect(snes.Cpu.Registers.DB).to.be.equal(0x0);
        expect(snes.Cpu.Registers.E).to.be.equal(0x1);

        expect(snes.Cpu.Registers.PC.Effective).to.be.equal(snes.Cart.Header.InterruptVectors.EmulationMode.RES);
        expect(snes.Cpu.Registers.PC.Bank).to.be.equal(snes.Cpu.Registers.PB);
        expect(snes.Cpu.Registers.PB).to.be.equal(0x0);
    });
    it("should test CLC/SEC", () => {
        const snes = new SNES(rom);
        const addr = new Address(firstOpcode);
        snes.Power();
        snes.Reset();

        snes.Memory.WriteUint8(addr, 0x38); // SEC
        snes.Memory.WriteUint8(addr.AddEffective(0x1), 0x18); // CLC

        expect(snes.Cpu.GetStatusFlag(StatusFlags.C)).to.be.equal(0x0); // Carry should be clear
        snes.Cpu.Tick(); // SEC
        expect(snes.Cpu.GetStatusFlag(StatusFlags.C)).to.be.equal(0x1);
        snes.Cpu.Tick(); // CLC
        expect(snes.Cpu.GetStatusFlag(StatusFlags.C)).to.be.equal(0x0);
    });
    it("should test XCE", () => {
        const snes = new SNES(rom);
        const addr = new Address(firstOpcode);
        snes.Power();
        snes.Reset();

        snes.Memory.WriteUint8(addr, 0x18); // CLC
        snes.Memory.WriteUint8(addr.AddEffective(0x1), 0xfb); // XCE
        snes.Memory.WriteUint8(addr.AddEffective(0x1), 0x38); // SEC
        snes.Memory.WriteUint8(addr.AddEffective(0x1), 0xfb); // XCE

        expect(snes.Cpu.Registers.E).to.be.equal(0x1);
        expect(snes.Cpu.GetStatusFlag(StatusFlags.C)).to.be.equal(0x0);

        snes.Cpu.Tick(); // CLC
        snes.Cpu.Tick(); // XCE

        expect(snes.Cpu.Registers.E).to.be.equal(0x0);
        expect(snes.Cpu.GetStatusFlag(StatusFlags.C)).to.be.equal(0x1);

        snes.Cpu.Tick(); // SEC
        snes.Cpu.Tick(); // XCE

        expect(snes.Cpu.Registers.E).to.be.equal(0x1);
        expect(snes.Cpu.GetStatusFlag(StatusFlags.C)).to.be.equal(0x0);
    });
});
