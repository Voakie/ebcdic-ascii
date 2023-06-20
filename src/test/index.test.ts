import EBCDIC from "../"

const ebcdicTestStringEN =
  "818283848586878889919293949596979899A2A3A4A5A6A7A8A9C1C2C3C4C5C6C7C8C9D1D2D3D4D5D6D7D8D9E2E3E4E5E6E7E8E9F0F1F2F3F4F5F6F7F8F9"
const ebcdicTestStringDE =
  "818283848586878889919293949596979899A2A3A4A5A6A7A8A9C1C2C3C4C5C6C7C8C9D1D2D3D4D5D6D7D8D9E2E3E4E5E6E7E8E9F0F1F2F3F4F5F6F7F8F96AD0C0E04A5AA1"
const ebcdicTestStringFI_SE =
  "818283848586878889919293949596979899A2A3A4A5A6A7A8A9C1C2C3C4C5C6C7C8C9D1D2D3D4D5D6D7D8D9E2E3E4E5E6E7E8E9F0F1F2F3F4F5F6F7F8F9D0C06A5B7B7C"
  const ebcdicTestStringFR_FR =
  "818283848586878889919293949596979899A2A3A4A5A6A7A8A9C1C2C3C4C5C6C7C8C9D1D2D3D4D5D6D7D8D9E2E3E4E5E6E7E8E9F0F1F2F3F4F5F6F7F8F9C0D0527C43CB7174726463EB"
const ebcdicTestStringLatin =
  "42434445464748494A4B4C4D4E4F505152535455565758595A5B5C5D5E5F606162636465666768696A6B6C6D6E6F707172737475767778797A7B7C7D7E7F808182838485868788898A8B8C8D8E8F909192939495969798999C9D9E9FA0A1A2A3A4A5A6A7A8A9AAABACADAEAFB0B1B2B3B4B5B6B7B8B9BABBBCBDBEBFC0C1C2C3C4C5C6C7C8C9CBCCCDCECFD0D1D2D3D4D5D6D7D8D9DADBDCDDDEDFE0E1E2E3E4E5E6E7E8E9EAEBECEDEEEFF0F1F2F3F4F5F6F7F8F9FAFBFCFDFE40"

describe("ebcdic-ascii", () => {
  describe("toASCII", () => {
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

    it("should resolve a french ebcdic string", () => {
      const converter = new EBCDIC("0297")

      const ascii = converter.toASCII(ebcdicTestStringFR_FR)
      expect(ascii).toEqual("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789éèêàäôÉÈÊÀÄÔ")
    })

    it("should resolve a latin ebcdic string", () => {
      const converter = new EBCDIC("1047")

      const ascii = converter.toASCII(ebcdicTestStringLatin)
      expect(ascii).toEqual(
        "âäàáãåçñ¢.<(+|&éêëèíîïìß!$*);^-/ÂÄÀÁÃÅÇÑ¦,%_>?øÉÊËÈÍÎÏÌ`:#@'=\"Øabcdefghi«»ðýþ±°jklmnopqræ¸Æ¤µ~stuvwxyz¡¿Ð[Þ®¬£¥·©§¶¼½¾Ý¨¯]´×{ABCDEFGHIôöòóõ}JKLMNOPQR¹ûüùúÿ\\÷STUVWXYZ²ÔÖÒÓÕ0123456789³ÛÜÙÚ ",
      )
    })
  })

  describe("toEBCDIC", () => {
    it("should convert english ASCII to EBCDIC and back", () => {
      const converter = new EBCDIC("0037")
      const expectedString = "English Test String!§$&/()=?"
      const ebcdic = converter.toEBCDIC(Buffer.from(expectedString, "ascii").toString("hex"))
      const ascii = converter.toASCII(ebcdic)
      expect(ascii).toEqual(expectedString)
    })

    it("should convert german ASCII to EBCDIC and back", () => {
      const converter = new EBCDIC("0273")
      const expectedString = "ÖÄÜ öäü Test ßtring"
      const ebcdic = converter.toEBCDIC(Buffer.from(expectedString, "ascii").toString("hex"))
      const ascii = converter.toASCII(ebcdic)
      expect(ascii).toEqual(expectedString)
    })

    it("should convert finnish/swedish ASCII to EBCDIC and back", () => {
      const converter = new EBCDIC("0278")
      const expectedString = "ÖÄÅ öäå Test String !@#¤%&/()[]{}^'*_-:.;,"
      const ebcdic = converter.toEBCDIC(Buffer.from(expectedString, "ascii").toString("hex"))
      const ascii = converter.toASCII(ebcdic)
      expect(ascii).toEqual(expectedString)
    })

    it("should convert french ASCII to EBCDIC and back", () => {
      const converter = new EBCDIC("0297")
      const expectedString = "éèêàäôÉÈÊÀÄÔ Test String !@#¤%&/()[]{}^'*_-:.;,"
      const ebcdic = converter.toEBCDIC(Buffer.from(expectedString, "ascii").toString("hex"))
      const ascii = converter.toASCII(ebcdic)
      expect(ascii).toEqual(expectedString)
    })

    it("should convert latin to EBCDIC and back", () => {
      const converter = new EBCDIC("1047")
      const expectedString = "âãáàêéèîíìôõóòúùü ç Test String !@#¤%&/()[]{}^'*_-:.;,"
      const ebcdic = converter.toEBCDIC(Buffer.from(expectedString, "ascii").toString("hex"))
      const ascii = converter.toASCII(ebcdic)
      expect(ascii).toEqual(expectedString)
    })
  })

  describe("toISO", () => {
    it("should convert english EBCDIC to ISO and back", () => {
      const converter = new EBCDIC("0037")
      const isoHex = converter.toISO(ebcdicTestStringEN)
      const ebcdic = converter.toEBCDIC(isoHex.toString("hex"))
      expect(ebcdic).toEqual(ebcdicTestStringEN)
    })

    it("should convert german EBCDIC to ISO and back", () => {
      const converter = new EBCDIC("0273")
      const isoHex = converter.toISO(ebcdicTestStringDE)
      const ebcdic = converter.toEBCDIC(isoHex.toString("hex"))
      expect(ebcdic).toEqual(ebcdicTestStringDE)
    })

    it("should convert finnish/swedish EBCDIC to ISO and back", () => {
      const converter = new EBCDIC("0278")
      const isoHex = converter.toISO(ebcdicTestStringFI_SE)
      const ebcdic = converter.toEBCDIC(isoHex.toString("hex"))
      expect(ebcdic).toEqual(ebcdicTestStringFI_SE)
    })

    it("should convert french EBCDIC to ISO and back", () => {
      const converter = new EBCDIC("0297")
      const isoHex = converter.toISO(ebcdicTestStringFR_FR)
      const ebcdic = converter.toEBCDIC(isoHex.toString("hex"))
      expect(ebcdic).toEqual(ebcdicTestStringFR_FR)
    })

    it("should convert latin EBCDIC to ISO and back", () => {
      const converter = new EBCDIC("1047")
      const isoHex = converter.toISO(ebcdicTestStringLatin)
      const ebcdic = converter.toEBCDIC(isoHex.toString("hex"))
      expect(ebcdic).toEqual(ebcdicTestStringLatin)
    })
  })
})
