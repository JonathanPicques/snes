/**
 * Returns the enumerator name for the specified enumeration and index
 * @param {Object<string, number>} enumeration - specifies the enumeration
 * @param {number} index - specifies the index
 * @returns {string}
 */
export const EnumeratorName = (enumeration, index) => {
    for (const enumerator in enumeration) {
        if (enumeration.hasOwnProperty(enumerator)) {
            if (enumeration[enumerator] === index) {
                return enumerator;
            }
        }
    }
    throw new Error("Addressing mode unknown");
};
