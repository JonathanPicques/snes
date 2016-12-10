const _address = Symbol("address");

/**
 * This class represents a 24-bit SNES address (bank + effective)
 */
export default class Address {

    /**
     * Constructs an address from the specified absolute address (24-bit)
     * @param {number} absolute
     */
    constructor(absolute) {
        this.Absolute = absolute;
    }

    /**
     * Returns the 8 bank bits of this address
     * @returns {number}
     */
    get Bank() { return (this[_address] >> 0x10) & 0xff; }

    /**
     * Returns the 16 effective bits of this address
     * @returns {number}
     */
    get Effective() { return this[_address] & 0x0ffff; }

    /**
     * Returns the 24 bits of this address
     * @returns {number}
     */
    get Absolute() { return this[_address]; }

    /**
     * Sets the 8 bank bits of this address
     * @param {number} bank
     */
    set Bank(bank) {
        if (bank < 0 || bank > 0xff) {
            throw new RangeError();
        }
        this[_address] = this.Effective | (bank << 0x10);
    }

    /**
     * Sets the 16 effective bits of this address
     * @param {number} effective
     */
    set Effective(effective) {
        if (effective < 0 || effective > 0xffff) {
            throw new RangeError();
        }
        this[_address] = effective | (this.Bank << 0x10);
    }

    /**
     * Sets the 24 bits of this address
     * @param {number} absolute
     */
    set Absolute(absolute) {
        if (absolute < 0 || absolute > 0xffffff) {
            throw new RangeError();
        }
        this[_address] = absolute & 0xffffff;
    }

    /**
     * Adds the specified offset to the bank bits
     * @param {number} offset
     * @returns {Address}
     */
    AddBank(offset) {
        this.Bank += offset;
        return this;
    }

    /**
     * Adds the specified offset to the effective bits, wrapping at bank if specified
     * @param {number} offset
     * @param {boolean} wrappingAtBank
     * @returns {Address}
     */
    AddEffective(offset, wrappingAtBank = false) {
        if (wrappingAtBank === true) {
            this.Effective = (this.Effective + offset) % 0x10000;
        } else {
            this.Effective += offset;
        }
        return this;
    }

    /**
     * Adds the specified offset to the address
     * @param {number} offset
     * @returns {Address}
     */
    AddAbsolute(offset) {
        this.Absolute += offset;
        return this;
    }

    /**
     * Clones this address
     * @returns {Address}
     */
    Clone() {
        return new Address(this[_address]);
    }

}
