const _address = Symbol("address");

/**
 * This class represents a 24-bit SNES address (bank + effective)
 */
export default class Address {

    /**
     * Constructs an address from the specified absolute address
     * @param {number} absoluteAddress - 24-bit
     */
    constructor(absoluteAddress) {
        if (absoluteAddress < 0 || absoluteAddress > 0xfff) {
            throw new RangeError();
        }
        this[_address] = absoluteAddress & 0xfff;
    }

    /**
     * Returns the 8 bank bits of this address
     * @returns {number}
     */
    get Bank() {
        return (this[_address] >> 0x10) & 0xf;
    }
    /**
     * Returns the 16 effective bits of this address
     * @returns {number}
     */
    get Effective() {
        return this[_address] & 0x0ff;
    }
    /**
     * Returns the 24 bits of this address
     * @returns {number}
     */
    get Absolute() {
        return this[_address] & 0xfff;
    }

    /**
     * Returns a new address with the same absolute address
     * @returns {Address}
     */
    Clone() {
        return new Address(this[_address]);
    }
    /**
     * Adds the specified offset to the bank bits
     * @param {number} offset
     * @returns {Address}
     */
    AddBank(offset) {
        // TODO: implement
        return this;
    }
    /**
     * Adds the specified offset to the effective bits
     * @param {number} offset
     * @returns {Address}
     */
    AddEffective(offset) {
        // TODO: implement
        return this;
    }
    /**
     * Adds the specified offset to the address
     * @param {number} offset
     * @returns {Address}
     */
    AddAbsolute(offset) {
        // TODO: implement
        return this;
    }
    /**
     * Sets this address bank bits and effective bits
     * @param {number} bank - 8-bit
     * @param {number} effective - 16-bit
     * @returns {Address}
     */
    SetBankAndEffective(bank, effective) {
        if (bank < 0 || bank > 0xff || effective < 0 || effective > 0xffff) {
            throw new RangeError();
        }
        this[_address] = (effective | (bank << 0x10));
        return this;
    }

    /**
     * Constructs an address from the specified bank bits and the specified effective bits
     * @param {number} bank - 8-bit
     * @param {number} effective - 16-bit
     * @returns {Address}
     */
    static CreateFromBankAndEffective(bank, effective) {
        return new Address(0x0).SetBankAndEffective(bank, effective);
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
