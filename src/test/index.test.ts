import EBCDIC from "../"
import iconv from "iconv-lite"

const ebcdicTestStringEN =
  "818283848586878889919293949596979899A2A3A4A5A6A7A8A9C1C2C3C4C5C6C7C8C9D1D2D3D4D5D6D7D8D9E2E3E4E5E6E7E8E9F0F1F2F3F4F5F6F7F8F9"
const ebcdicTestStringDE =
  "818283848586878889919293949596979899A2A3A4A5A6A7A8A9C1C2C3C4C5C6C7C8C9D1D2D3D4D5D6D7D8D9E2E3E4E5E6E7E8E9F0F1F2F3F4F5F6F7F8F96AD0C0E04A5AA1"
const ebcdicTestStringFI_SE =
  "818283848586878889919293949596979899A2A3A4A5A6A7A8A9C1C2C3C4C5C6C7C8C9D1D2D3D4D5D6D7D8D9E2E3E4E5E6E7E8E9F0F1F2F3F4F5F6F7F8F9D0C06A5B7B7C"

describe("ebcdic-ascii", () => {
  it("should resolve an english ebcdic string", () => {
    const converter = new EBCDIC("0037")

    const ascii = converter.toASCII(ebcdicTestStringEN)
    expect(ascii).toEqual("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789")
  })

  it("should resolve a german ebcdic string", () => {
    const converter = new EBCDIC("0273")

    const ascii = converter.toASCII(ebcdicTestStringDE)
    expect(ascii).toEqual("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789öüäÖÄÜß")
  })

  it("should resolve a finnish/swedish ebcdic string", () => {
    const converter = new EBCDIC("0278")

    const ascii = converter.toASCII(ebcdicTestStringFI_SE)
    expect(ascii).toEqual("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789åäöÅÄÖ")
  })

  it("should convert english ASCII to EBCDIC and back", () => {
    const converter = new EBCDIC("0273")
    const ebcdic = converter.toEBCDIC(
      Buffer.from("English Test String!§$&/()=?", "ascii").toString("hex"),
    )
    const ascii = converter.toASCII(ebcdic)
    expect(ascii).toEqual("English Test String!§$&/()=?")
  })

  it("should convert german ASCII to EBCDIC and back", () => {
    const converter = new EBCDIC("0273")
    const ebcdic = converter.toEBCDIC(Buffer.from("ÖÄÜ öäü Test ßtring", "ascii").toString("hex"))
    const ascii = converter.toASCII(ebcdic)
    expect(ascii).toEqual("ÖÄÜ öäü Test ßtring")
  })

  it("should convert german ASCII to EBCDIC and back", () => {
    const converter = new EBCDIC("0278")
    const ebcdic = converter.toEBCDIC(
      Buffer.from("ÖÄÅ öäå Test String !@#¤%&/()[]{}^'*_-:.;,", "ascii").toString("hex"),
    )
    const ascii = converter.toASCII(ebcdic)
    expect(ascii).toEqual("ÖÄÅ öäå Test String !@#¤%&/()[]{}^'*_-:.;,")
  })

  it("should convert german EBCDIC to ISO and back", () => {
    const converter = new EBCDIC("0273")
    const isoHex = converter.toISO(ebcdicTestStringDE)
    const ebcdic = converter.toEBCDIC(isoHex.toString("hex"))
    expect(ebcdic).toEqual(ebcdicTestStringDE)
  })

  it("should convert english EBCDIC to ISO and back", () => {
    const converter = new EBCDIC("0037")
    const isoHex = converter.toISO(ebcdicTestStringEN)
    const ebcdic = converter.toEBCDIC(isoHex.toString("hex"))
    expect(ebcdic).toEqual(ebcdicTestStringEN)
  })

  it("should convert english EBCDIC to ISO and back", () => {
    const converter = new EBCDIC("0278")
    const isoHex = converter.toISO(ebcdicTestStringFI_SE)
    const ebcdic = converter.toEBCDIC(isoHex.toString("hex"))
    expect(ebcdic).toEqual(ebcdicTestStringFI_SE)
  })
})
