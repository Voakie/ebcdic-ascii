# ebcdic-ascii

Node.js module for converting between EBCDIC and ASCII (ISO-8859-1).
Supported EBCDIC codesets:

- 0037: English
- 0273: German
- 0278: Finnish/Swedish
- 0297: French
- 1047: Latin 1/Open Systems

0xxx EBCDIC codesets were taken from [longpelaexpertise.com.au](http://www.longpelaexpertise.com.au/toolsCode.php).

1047 EBCDIC codeset was taken from [this source](https://zims-en.kiwix.campusafrica.gos.orange.com/wikipedia_en_all_nopic/A/EBCDIC_1047).

## Usage

### Importing with `import`

```js
import EBCDIC from "ebcdic-ascii"
```

### Importing with `require`

```js
const EBCDIC = require("ebcdic-ascii").default
```

### Basic Usage
```js
const converter = new EBCDIC("0037")

converter.toASCII("E385A2A340D485A2A2818785")
// returns "Test Message"

converter.toEBCDIC("54657374204D657373616765")
// returns "E385A2A340D485A2A2818785"
```

Check out `index.d.ts` for documentation
