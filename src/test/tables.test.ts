import { convTables } from "../tables"

function combine<T>(array: T[]) {
  return array.flatMap((v, i) => array.slice(i + 1).map((w) => [v, w])) as [T, T][]
}

function combineWithName<T>(map: Record<string, T>) {
  const array = Object.entries(map).map(([k, v]) => ({ k, v }))
  return combine(array).map(([a, b]) => [a.k, b.k, a.v, b.v]) as [string, string, T, T][]
}

describe("tables", () => {
  const combination = combineWithName(convTables)

  test.each(combination)("%s codeset should have the same length as %s codeset", (_, __, a, b) => {
    const aLength = a.length
    const bLength = b.length
    expect(aLength).toBe(bLength)
  })

  test.each(combination)(
    "%s codeset should have the same ascii characters as %s codeset",
    (_, __, a, b) => {
      const aChars = a.map((c) => c.ascii)
      const bChars = b.map((c) => c.ascii)
      expect(aChars).toStrictEqual(bChars)
    },
  )
})
