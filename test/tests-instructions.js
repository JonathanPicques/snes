import SNES from "../src/snes";
import {expect} from "chai";
import {readFileSync} from "fs";
import {StatusRegisters} from "../src/cpu";

const defaultRom = readFileSync("./test/snes_lorom.sfc").buffer;
const firstOpcode = 0x8002; // Address of first opcode in LoROM
let rom;
let view;
describe("Instructions", () => {
    beforeEach(() => {
        rom = defaultRom.slice();
        view = new DataView(rom);
    });
    it("should test CPU registers", () => {
        const snes = new SNES(rom);
        snes.Power();
        snes.Reset();

        expect(snes.Cpu.Registers.P).to.be.equal(StatusRegisters.I | StatusRegisters.X | StatusRegisters.M);
        expect(snes.Cpu.Registers.A).to.be.equal(0x0);
        expect(snes.Cpu.Registers.X).to.be.equal(0x0);
        expect(snes.Cpu.Registers.Y).to.be.equal(0x0);
        expect(snes.Cpu.Registers.SP).to.be.equal(0x100);
        expect(snes.Cpu.Registers.DP).to.be.equal(0x0);
        expect(snes.Cpu.Registers.DB).to.be.equal(0x0);
        expect(snes.Cpu.Registers.E).to.be.equal(0x1);

        expect(snes.Cpu.Registers.PC.Effective).to.be.equal(snes.Cart.Header.InterruptVectors.EmulationMode.RES);
        expect(snes.Cpu.Registers.PC.Effective).to.be.equal(firstOpcode);
        expect(snes.Cpu.Registers.PC.Bank).to.be.equal(snes.Cpu.Registers.PB);
        expect(snes.Cpu.Registers.PB).to.be.equal(0x0);
    });
    it("should test XCE", () => {
        view.setUint8(firstOpcode, 0x18); // CLC
        view.setUint8(firstOpcode + 0x1, 0xfb); // XCE
        view.setUint8(firstOpcode + 0x2, 0x18); // SEC
        view.setUint8(firstOpcode + 0x3, 0xfb); // XCE

        const snes = new SNES(rom);
        snes.Power();
        snes.Reset();

        expect(snes.Cpu.Registers.E).to.be.equal(0x1);
        expect(snes.Cpu.GetStatusRegister(StatusRegisters.C)).to.be.equal(0x0);

        snes.Cpu.Tick(); // CLC
        snes.Cpu.Tick(); // XCE

        expect(snes.Cpu.Registers.E).to.be.equal(0x0);
        expect(snes.Cpu.GetStatusRegister(StatusRegisters.C)).to.be.equal(0x1);
        /**
        snes.Cpu.Tick(); // SEC
        snes.Cpu.Tick(); // XCE

        expect(snes.Cpu.Registers.E).to.be.equal(0x1);
        expect(snes.Cpu.GetStatusRegister(StatusRegisters.C)).to.be.equal(0x0);
         **/
    });
});
