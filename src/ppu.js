const _snes = Symbol("snes");

/**
 * This class emulates the picture processing unit of the SNES
 */
export default class PPU {

    /**
     * @param {SNES} snes
     */
    constructor(snes) {
        this[_snes] = snes;
    }

}
