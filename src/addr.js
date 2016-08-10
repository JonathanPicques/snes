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
