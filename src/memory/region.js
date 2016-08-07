/**
 * This class represents a memory region used to map addresses
 * TODO: Improve documentation
 */
export default class MemoryRegion {

    /**
     * @param {number} byteLength
     * @param {MemoryRegionType} memoryType
     */
    constructor(byteLength, memoryType) {
        /**
         * @type {MemoryRegionType}
         */
        this.Type = memoryType;
        /**
         * @type {ArrayBuffer}
         */
        this.Data = new ArrayBuffer(byteLength);
        /**
         * @type {DataView}
         */
        this.View = new DataView(this.Data);
    }

}

/**
 * @enum {MemoryRegionType}
 */
export const MemoryRegionTypes = {
    "RESERVED": 0, // Cannot read nor write
    "REGISTERS": 1, // Can read and write
    "ROM": 2, // Can read
    "RAM": 3 // Can read and write
};

/**
 *@typedef {number} MemoryRegionType
 */
