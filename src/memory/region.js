/**
 * This class represents a memory region used to map addresses
 * TODO: Improve documentation
 */
export default class MemoryRegion {

    constructor() {
        /**
         * @type {Array<Array<number>>}
         */
        this.Ranges = [
            [0, 0]
        ];
    }

}

export const MemoryRegionTypes = {
    "RESERVED": 0, // Cannot read nor write
    "REGISTERS": 1, // Can read and write
    "ROM": 2, // Can read
    "RAM": 3 // Can read and write
};
