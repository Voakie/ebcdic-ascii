import { ConvTableName, convTables, IConvTableEntry } from "./tables"
import iconv from "iconv-lite"

type ConvTable = IConvTableEntry[]
type QuickLookupTable = { [name: string]: string }

/**
 * Class for converting between EBCDIC and ASCII (ISO-8859-1)
 */
export default class EbcdicAscii {
  asciiToEbcdicTable: QuickLookupTable = {}
  ebcdicToAsciiTable: QuickLookupTable = {}

  /**
   *
   * @param tableName string - May be "0273" for german, "0037" for english and "0278" for finnish/swedish
   */
  constructor(tableName: ConvTableName) {
    this.setTable(tableName)
  }

  setTable(tableName: ConvTableName) {
    const simpleTable: ConvTable = convTables[tableName]

    simpleTable.forEach((tableItem) => {
      const asciiCode: string = tableItem.hex
      const ebcdicEntry = simpleTable.find((e) => e.ebcdic === tableItem?.ascii)
      const ebcdicCode: string = ebcdicEntry ? ebcdicEntry.hex : "00"

      this.asciiToEbcdicTable[asciiCode] = ebcdicCode
      this.ebcdicToAsciiTable[ebcdicCode] = asciiCode
    })
    this.ebcdicToAsciiTable["00"] = "00"
  }

  /**
   * Convert an EBCDIC hex string to an ASCII string
   * @param ebcdic string - Hex representation of an EBCDIC string
   */
  toASCII(ebcdic: string) {
    const ebcdicCodes = this.splitHex(ebcdic).map((a) => a.toUpperCase())
    const isoHex = ebcdicCodes.map((code) => this.charToASCII(code)).join("")

    return iconv.decode(Buffer.from(isoHex, "hex"), "ISO-8859-1")
  }

  /**
   * Convert an EBCDIC hex string to an ISO-8859-1 Buffer
   * @param ebcdic string - Hex representation of an EBCDIC string
   */
  toISO(ebcdic: string) {
    const ebcdicCodes = this.splitHex(ebcdic).map((a) => a.toUpperCase())
    const isoHex = ebcdicCodes.map((code) => this.charToASCII(code)).join("")

    return Buffer.from(isoHex, "hex")
  }

  /**
   * Convert an ASCII hex string to an EBCDIC hex string
   * @param asciiHex string - ASCII string
   */
  toEBCDIC(asciiHex: string) {
    const asciiChars = this.splitHex(asciiHex).map((a) => a.toUpperCase())
    return asciiChars.map((code) => this.charToEBCDIC(code)).join("")
  }

  /**
   * `AA2E30EE` -> [`AA`, `2E`, `30`, `EE`]
   * @param ebcdicString string - Hex representation of an EBCDIC string
   */
  splitHex(ebcdicString: string): string[] {
    const res = ebcdicString.match(/(..?)/g)
    return res ? res : []
  }

  /**
   * Convert an EBCDIC hex char to an ASCII hex char
   * @param ebcdicCode string - Hex code for an EBCDIC char
   */
  charToASCII(ebcdicCode: string) {
    const asciiCode = this.ebcdicToAsciiTable[ebcdicCode]
    if (asciiCode === undefined) {
      throw new Error(`Invalid char sequence ${ebcdicCode}`)
    }
    return asciiCode
  }

  /**
   * Convert an ASCII hex char to an EBCDIC hex char
   * @param asciiCode string - Hex code for an ASCII char
   */
  charToEBCDIC(asciiCode: string) {
    const ebcdicCode = this.asciiToEbcdicTable[asciiCode]
    if (ebcdicCode === undefined) {
      throw new Error(`Invalid char sequence ${asciiCode}`)
    }
    return ebcdicCode
  }
}
