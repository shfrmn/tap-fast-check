import t from "tap"
import fc from "fast-check"

export {t, fc}

declare global {
  export namespace Tap {
    export interface Test {
      prop<T>(this: Tap.Test, prop: fc.IProperty<T>, message: string): boolean
    }
  }
}

t.Test.prototype.addAssert("prop", 1, function <
  T,
>(this: Tap.Test, prop: fc.IProperty<T>, message: string) {
  const {counterexample} = fc.check(prop)
  return this.strictSame(counterexample, null, message)
})
