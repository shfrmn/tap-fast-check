# tap-fast-check

Property testing for Tap using fast-check

```typescript
import {t, fc} from "tap-fast-check"

t.test("String.indexOf()", async (t) => {
  t.prop(
    fc.property(fc.string(), (text) => {
      return text.indexOf(text) >= 0
    }),
    "Always contains itself",
  )
})
```
