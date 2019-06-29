import { assert } from '@/_utils'

interface VasConstructor {
  el: string | Element
}

class Vas {
  el: Element | null

  constructor({ el }: VasConstructor) {
    this.el = el instanceof Element ? el : document.querySelector(el)

    assert(this.el, "'el' is not a HTML element.")
  }
}

export default Vas
