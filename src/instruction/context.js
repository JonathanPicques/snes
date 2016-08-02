/**
 * This class holds the context for a specified instruction resulting of the execution of a specified opcode
 */
export default class InstructionContext {

    /**
     * @type {SNES}
     */
    snes;

    /**
     * @param {SNES} snes
     */
    constructor(snes) {
        this.snes = snes;
    }

}
