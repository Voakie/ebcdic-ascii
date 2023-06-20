import englishCodeset from "./0037"
import germanCodeset from "./0273"
import finsweCodeset from "./0278"
import frenchCodeset from "./0297"
import latinCodeset from "./1047"

export interface IConvTableEntry {
  hex: string
  ebcdic: string
  ascii: string
}

export type ConvTableName = "0037" | "0273" | "0278" | "0297" | "1047"

export const convTables: Record<ConvTableName, IConvTableEntry[]> = {
  "0037": englishCodeset,
  "0273": germanCodeset,
  "0278": finsweCodeset,
  "0297": frenchCodeset,
  "1047": latinCodeset,
}
