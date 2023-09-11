import t from "tap"
import fc from "fast-check"

export {t, fc}

declare global {
  export namespace Tap {
    export interface Test {
      prop<T>(
        this: Tap.Test,
        prop: fc.IProperty<T>,
        paramsOrMessage1?: fc.Parameters<T> | string,
        paramsOrMessage2?: fc.Parameters<T> | string,
      ): boolean
    }
  }
}

t.Test.prototype.addAssert("prop", 3, function <
  T,
>(this: Tap.Test, prop: fc.IProperty<T>, paramsOrMessage1?: fc.Parameters<T> | string, paramsOrMessage2?: fc.Parameters<T> | string): boolean {
  const params = [paramsOrMessage1, paramsOrMessage2].find(
    (arg): arg is fc.Parameters<T> => typeof arg === "object",
  )
  const propMessage = [paramsOrMessage1, paramsOrMessage2].find(
    (arg): arg is string => typeof arg === "string",
  )
  const {counterexample, failed, error} = fc.check(prop, {
    ...(params || {}),
    endOnFailure: true,
  })
  if (failed && counterexample) {
    return this.strictSame(
      null,
      counterexample,
      `${propMessage}: failed with inputs`,
    )
  } else if (failed) {
    return this.notOk(error, `${propMessage}: interrupted or too many skips`)
  } else {
    return this.pass(propMessage)
  }
})
