import Address from "../src/addr";

import {expect} from "chai";

describe("Addresses", () => {
    it("should test addresses", () => {
        const address = new Address(0x000000);
        expect(address.Bank).to.be.equal(0x00);
        expect(address.Effective).to.be.equal(0x0000);
        expect(address.Absolute).to.be.equal(0x000000);

        address.Bank = 0x80;
        expect(address.Bank).to.be.equal(0x80);
        expect(address.Effective).to.be.equal(0x0000);
        expect(address.Absolute).to.be.equal(0x800000);

        address.Effective = 0x5645;
        expect(address.Bank).to.be.equal(0x80);
        expect(address.Effective).to.be.equal(0x5645);
        expect(address.Absolute).to.be.equal(0x805645);

        address.Absolute = 0x401234;
        expect(address.Bank).to.be.equal(0x40);
        expect(address.Effective).to.be.equal(0x1234);
        expect(address.Absolute).to.be.equal(0x401234);

        address.Bank = 0x0;
        expect(address.Bank).to.be.equal(0x00);
        expect(address.Effective).to.be.equal(0x1234);
        expect(address.Absolute).to.be.equal(0x001234);

        address.Bank = 0x20;
        expect(address.Bank).to.be.equal(0x20);
        expect(address.Effective).to.be.equal(0x1234);
        expect(address.Absolute).to.be.equal(0x201234);

        address.Effective = 0x0000;
        expect(address.Bank).to.be.equal(0x20);
        expect(address.Effective).to.be.equal(0x0000);
        expect(address.Absolute).to.be.equal(0x200000);

        address.Bank = 0xff;
        address.Effective = 0xffff;
        expect(address.Bank).to.be.equal(0xff);
        expect(address.Effective).to.be.equal(0xffff);
        expect(address.Absolute).to.be.equal(0xffffff);

        expect(() => { address.Bank = 0x100; }).to.throw();
        expect(() => { address.Bank = -0x01; }).to.throw();
        expect(() => { address.Effective = 0x10000; }).to.throw();
        expect(() => { address.Effective = -0x01; }).to.throw();
        expect(() => { address.Absolute = -0x01; }).to.throw();
        expect(() => { address.Absolute = 0x1000000; }).to.throw();
    });
    it("should test addresses arithmetic", () => {
        const address = new Address(0x201234);
        expect(address.Bank).to.be.equal(0x20);
        expect(address.Effective).to.be.equal(0x1234);
        expect(address.Absolute).to.be.equal(0x201234);

        address.AddBank(0x20);
        expect(address.Bank).to.be.equal(0x40);
        expect(address.Effective).to.be.equal(0x1234);
        expect(address.Absolute).to.be.equal(0x401234);

        address.AddBank(-0x40);
        expect(address.Bank).to.be.equal(0x00);
        expect(address.Effective).to.be.equal(0x1234);
        expect(address.Absolute).to.be.equal(0x001234);

        address.AddEffective(0x1234);
        expect(address.Bank).to.be.equal(0x00);
        expect(address.Effective).to.be.equal(0x2468);
        expect(address.Absolute).to.be.equal(0x002468);

        address.AddEffective(-2 * 0x1234);
        expect(address.Bank).to.be.equal(0x00);
        expect(address.Effective).to.be.equal(0x0000);
        expect(address.Absolute).to.be.equal(0x000000);

        address.AddAbsolute(0xffffff);
        expect(address.Bank).to.be.equal(0xff);
        expect(address.Effective).to.be.equal(0xffff);
        expect(address.Absolute).to.be.equal(0xffffff);

        address.AddAbsolute(-0x1);
        expect(address.Bank).to.be.equal(0xff);
        expect(address.Effective).to.be.equal(0xfffe);
        expect(address.Absolute).to.be.equal(0xfffffe);
    });
});
