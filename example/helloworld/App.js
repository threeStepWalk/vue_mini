import { h } from "../../lib/guide-mini-vue.esm.js"

export const App = {
  render() {
    // ui
    return h(
      'div',
      {
        id: 'root'
      },
      // 'hi,' + this.msg
      // string
      // 'hi'
      // Array
      [h("p", {class: 'red'}, 'hi'), h("p", {class:'blue'}, "mini-vue")]
    )
  },
  setup() {
    // composition api
    return {
      msg: 'mini-vue'
    }
  }
}