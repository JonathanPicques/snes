/**
 * Returns the status of the specified bit in the specified register
 * @param {number} register
 * @param {number} bit
 * @returns {number}
 */
export const GetStatusRegister = (register, bit) => {
    return (register & bit) === bit ? 0x1 : 0x0;
};

/**
 * Returns the status of the specified bit in the specified register
 * @param {number} register
 * @param {number} bit
 * @param {number} value
 * @returns {number}
 */
export const SetStatusRegister = (register, bit, value) => {
    return value == 0x1 ? register | bit : register & ~bit;
};
