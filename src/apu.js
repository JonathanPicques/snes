const _snes = Symbol("snes");

/**
 * This class emulates the SPC700 audio processing unit of the SNES
 */
export default class APU {

    /**
     * @param {SNES} snes
     */
    constructor(snes) {
        /**
         * @type {SNES}
         */
        this[_snes] = snes;
    }

    /**
     * Powers this APU
     */
    Power() {}

    /**
     * Resets this APU
     */
    Reset() {}

}
