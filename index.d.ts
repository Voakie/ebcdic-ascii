declare interface IConvTableEntry {
  hex: string
  ebcdic: string
  ascii: string
}
declare type ConvTable = IConvTableEntry[]
declare type ConvTableName = "0273" | "0037" | "0278"

declare module "ebcdic-ascii" {
  /**
   * Class for converting between EBCDIC and ASCII (ISO-8859-1)
   */
  export default class EbcdicAscii {
    table: ConvTable

    /**
     *
     * @param tableName string - May be "0273" for german, "0037" for english and "0278" for finnish/swedish
     */
    constructor(tableName: ConvTableName)

    setTable(tableName: ConvTableName): void

    /**
     * Convert a EBCDIC hex string to an ASCII string
     * @param ebcdic string - Hex representation of a EBCDIC string
     */
    toASCII(ebcdic: string): string

    /**
     * Convert a EBCDIC hex string to an ISO-8859-1 Buffer
     * @param ebcdic string - Hex representation of a EBCDIC string
     */
    toISO(ebcdic: string): Buffer

    /**
     * Convert an ASCII hex string to a EBCDIC hex string
     * @param ebcdic string - ASCII string
     */
    toEBCDIC(ascii: string): string

    /**
     * `AA2E30EE` -> [`AA`, `2E`, `30`, `EE`]
     * @param ebcdicString string - Hex representation of a EBCDIC string
     */
    splitHex(ebcdicString: string): string[]

    /**
     * Convert a EBCDIC hex char to an ASCII hex char
     * @param ebcdic string - Hex code for a EBCDIC char
     */
    charToASCII(ebcdicCode: string): string

    /**
     * Convert an ASCII hex char to a EBCDIC hex char
     * @param ebcdic string - Hex code for an ASCII char
     */
    charToEBCDIC(asciiCode: string): string
  }
}
