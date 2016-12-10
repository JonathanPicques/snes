import Address from "./addr";
import {StatusFlags} from "./cpu";
import {HumanReadableAddress} from "./utils/format";

const _snes = Symbol("snes");

/**
 * This class represents the SNES memory
 */
export default class Memory {

    /**
     * @param {SNES} snes
     */
    constructor(snes) {
        /**
         * Reference to the SNES
         * @type {SNES}
         */
        this[_snes] = snes;
    }

    /**
     * Reads the specified byte length from the specified address
     * @param {Address} address
     * @param {number} byteLength
     * @returns {number}
     */
    Read(address, byteLength) {
        if (byteLength < 0 || byteLength > 3) {
            throw new RangeError();
        }
        let result = 0;
        for (let i = 0; i < byteLength; i++) {
            const readAddress = new Address(address.Absolute).AddEffective(i);
            const [dataView, offsetAddress, type] = this[_snes].Cart.DecodeAddress(readAddress);
            if (dataView === null) {
                throw new Error(`Cannot read at address: ${HumanReadableAddress(readAddress)}`);
            }
            /* eslint-disable no-console */
            console.log(`Reading from ${type} @${HumanReadableAddress(readAddress)}`);
            /* eslint-enable no-console */
            result |= dataView.getUint8(offsetAddress) << (i * 8);
        }
        return result;
    }

    /**
     * Reads the uint8 at the specified address
     * @param {Address} address
     * @returns {number}
     */
    ReadUint8(address) {
        return this.Read(address, 1);
    }

    /**
     * Reads the uint16 at the specified address
     * @param {Address} address
     * @returns {number}
     */
    ReadUint16(address) {
        return this.Read(address, 2);
    }

    /**
     * Reads the uint24 at the specified address
     * @param {Address} address
     * @returns {number}
     */
    ReadUint24(address) {
        return this.Read(address, 3);
    }

    /**
     * Reads the uint8 at the specified address
     * @param {Address} address
     * @returns {number}
     */
    ReadInt8(address) {
        const int8 = this.Read(address, 1);
        return int8 > 0x7f ? int8 - 0xfe : int8;
    }

    /**
     * Reads the accumulator depending on the accumulator size (8-bit or 16-bit) at the specified address
     * @param {Address} address
     * @returns {number}
     */
    ReadAccumulator(address) {
        if (this[_snes].Cpu.GetStatusFlag(StatusFlags.M) === 0x0) {
            return this.ReadUint16(address); // 16-bit
        }
        return this.ReadUint8(address); // 8-bit
    }

    /**
     * Writes the value of the specified byte length to the specified address
     * @param {Address} address
     * @param {number} byteLength
     * @param {number} value
     */
    Write(address, byteLength, value) {
        if (byteLength < 0 || byteLength > 3) {
            throw new RangeError();
        }
        for (let i = 0; i < byteLength; i++) {
            const writeAddress = new Address(address.Absolute).AddEffective(i);
            const [dataView, offsetAddress, type] = this[_snes].Cart.DecodeAddress(writeAddress);
            if (dataView === null) {
                throw new Error(`Cannot write at address: ${HumanReadableAddress(writeAddress)}`);
            }
            /* eslint-disable no-console */
            console.log(`Writing on ${type} @${HumanReadableAddress(writeAddress)}`);
            /* eslint-enable no-console */
            dataView.setUint8(offsetAddress, (value >> (i * 8)) & 0xff);
        }
    }

    /**
     * Writes the specified uint8 at the specified address
     * @param {Address} address
     * @param {number} uint8
     */
    WriteUint8(address, uint8) {
        this.Write(address, 1, uint8);
    }

    /**
     * Writes the specified uint16 at the specified address
     * @param {Address} address
     * @param {number} uint16
     */
    WriteUint16(address, uint16) {
        this.Write(address, 2, uint16);
    }

    /**
     * Writes the accumulator depending on the accumulator size (8-bit or 16-bit) at the specified address
     * @param {Address} address
     * @returns {number}
     */
    WriteAccumulator(address) {
        if (this[_snes].Cpu.GetStatusFlag(StatusFlags.M) === 0x0) {
            return this.WriteUint16(address, this[_snes].Cpu.Registers.A); // 16-bit
        }
        return this.WriteUint8(address, this[_snes].Cpu.Registers.A); // 8-bit
    }

    /**
     * Pushes the value of the specified byte length onto the stack and moves the CPU stack pointer
     * @param {number} byteLength
     * @param {number} value
     */
    PushStack(byteLength, value) {
        if (byteLength < 0 || byteLength > 2) {
            throw new RangeError();
        }
        this[_snes].Cpu.Registers.SP -= byteLength;
        this.Write(this[_snes].Cpu.Registers.SP, byteLength, value);
    }

    /**
     * Pushes the specified uint8 on the stack and moves the CPU stack pointer
     * @param {number} uint8
     */
    PushStackUint8(uint8) {
        this.PushStack(1, uint8);
    }

    /**
     * Pushes the specified uint8 on the stack and moves the CPU stack pointer
     * @param {number} uint16
     */
    PushStackUint16(uint16) {
        this.PushStack(2, uint16);
    }

    /**
     * Pops the value of the specified byte length from the stack and moves the CPU stack pointer
     * @param {number} byteLength
     * @returns {number}
     */
    PopStack(byteLength) {
        if (byteLength < 0 || byteLength > 2) {
            throw new RangeError();
        }
        const value = this.Read(this[_snes].Cpu.Registers.SP, byteLength);
        this[_snes].Cpu.Registers.SP += byteLength;
        return value;
    }

    /**
     * Pops the uint8 from the stack and moves the CPU stack pointer
     * @returns {number}
     */
    PopStackUint8() {
        return this.PopStack(1);
    }

    /**
     * Pops the uint16 from the stack and moves the CPU stack pointer
     * @returns {number}
     */
    PopStackUint16() {
        return this.PopStack(2);
    }

}
