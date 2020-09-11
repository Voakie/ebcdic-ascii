import englishCodeset from "./tables/0037"
import germanCodeset from "./tables/0273"
import iconv from "iconv-lite"

interface IConvTableEntry {
  hex: string
  ebcdic: string
  ascii: string
}
type ConvTable = IConvTableEntry[]
type ConvTableName = "0273" | "0037"

const convTables = {
  "0273": germanCodeset,
  "0037": englishCodeset,
}

/**
 * Class for converting between EBCDIC and ASCII (ISO-8859-1)
 */
export default class EbcdicAscii {
  table: ConvTable

  /**
   *
   * @param tableName string - May be "0273" for german and "0037" for english
   */
  constructor(tableName: ConvTableName) {
    this.table = convTables[tableName]
  }

  setTable(tableName: ConvTableName) {
    this.table = convTables[tableName]
  }

  /**
   * Convert a EBCDIC hex string to an ASCII string
   * @param ebcdic string - Hex representation of a EBCDIC string
   */
  toASCII(ebcdic: string) {
    const ebcdicCodes = this.splitHex(ebcdic).map((a) => a.toUpperCase())
    const isoHex = ebcdicCodes.map((code) => this.charToASCII(code)).join("")

    return iconv.decode(Buffer.from(isoHex, "hex"), "ISO-8859-1")
  }

  /**
   * Convert a EBCDIC hex string to an ISO-8859-1 Buffer
   * @param ebcdic string - Hex representation of a EBCDIC string
   */
  toISO(ebcdic: string) {
    const ebcdicCodes = this.splitHex(ebcdic).map((a) => a.toUpperCase())
    const isoHex = ebcdicCodes.map((code) => this.charToASCII(code)).join("")

    return Buffer.from(isoHex, "hex")
  }

  /**
   * Convert an ASCII hex string to a EBCDIC hex string
   * @param ebcdic string - ASCII string
   */
  toEBCDIC(asciiHex: string) {
    const asciiChars = this.splitHex(asciiHex).map((a) => a.toUpperCase())
    const ebcdic = asciiChars.map((code) => this.charToEBCDIC(code)).join("")
    return ebcdic
  }

  /**
   * `AA2E30EE` -> [`AA`, `2E`, `30`, `EE`]
   * @param ebcdicString string - Hex representation of a EBCDIC string
   */
  splitHex(ebcdicString: string): string[] {
    const res = ebcdicString.match(/(..?)/g)
    return res ? res : []
  }

  /**
   * Convert a EBCDIC hex char to an ASCII hex char
   * @param ebcdic string - Hex code for a EBCDIC char
   */
  charToASCII(ebcdicCode: string) {
    if (ebcdicCode.length > 2) {
      throw new Error("Invalid char sequence size")
    }

    const ebcdicEntry = this.table.find((e) => e.hex === ebcdicCode)
    const asciiEntry = this.table.find((e) => e.ascii === ebcdicEntry?.ebcdic)
    if (asciiEntry === undefined) {
      return "00"
    }
    return asciiEntry.hex
  }

  /**
   * Convert an ASCII hex char to a EBCDIC hex char
   * @param ebcdic string - Hex code for an ASCII char
   */
  charToEBCDIC(asciiCode: string) {
    if (asciiCode.length > 2) {
      throw new Error("Invalid char sequence size")
    }

    const asciiEntry = this.table.find((e) => e.hex === asciiCode)
    const ebcdicEntry = this.table.find((e) => e.ebcdic === asciiEntry?.ascii)
    if (ebcdicEntry === undefined) {
      return "00"
    }
    return ebcdicEntry.hex
  }
}
