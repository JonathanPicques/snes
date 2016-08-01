const _snes = Symbol("snes");

/**
 * This class emulates the SPC700 audio processing unit of the SNES
 */
export default class APU {

    /**
     * @param {SNES} snes
     */
    constructor(snes) {
        this[_snes] = snes;
    }

}
