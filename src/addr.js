const _address = Symbol("address");

/**
 * This class represents a 24-bit SNES address (bank + effective)
 */
export default class Address {

    /**
     * Constructs an address from the specified absolute address
     * @param {number} absolute - 24-bit
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
     * Adds the specified offset to the effective bits
     * @param {number} offset
     * @returns {Address}
     */
    AddEffective(offset) {
        this.Effective += offset;
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

}

/**
 * Composes the address from the specified bank and effective address
 * @param {number} bank - 8-bit
 * @param {number} effectiveAddress - 16-bit
 * @returns {number}
 */
export const AbsoluteAddress = (bank, effectiveAddress) => {
    if (bank < 0x0 || bank > 0xff || effectiveAddress < 0 || effectiveAddress > 0xffff) {
        throw new RangeError();
    }
    return effectiveAddress | (bank << 0x10);
};
/**
 * Returns the bank from the specified absolute address
 * @param {number} address
 * @returns {number}
 */
export const BankFromAddress = (address) => {
    if (address < 0 || address > 0xffffff) {
        throw new RangeError();
    }
    if ((address & 0xffff0000) !== 0) {
        return (address >> 16) & 0xff;
    }
    return 0x0;
};
/**
 * Returns the effective address from the specified absolute address
 * @param {number} address
 * @returns {number}
 */
export const EffectiveAddressFromAddress = (address) => {
    if (address < 0 || address > 0xffffff) {
        throw new RangeError();
    }
    if ((address & 0xffff0000) !== 0) {
        return address & 0x00ffff;
    }
    return address;
};
