import { h, renderSlots, getCurrentInstance } from "../../lib/guide-mini-vue.esm.js";

export const Foo = {
  // setup(props, { emit }) {
  //   return {}
  // },
  // render() {
  //   const foo = h("p", {}, "foo")

  //   console.log(this.$slots);

  //   const age = 19

  //   return h("div", {}, [
  //     renderSlots(this.$slots, "header", { age }),
  //     foo,
  //     renderSlots(this.$slots, "footer")
  //   ])
  // }
  name: 'Foo',
  setup() {
    const instance = getCurrentInstance();
    // console.log('Foo', instance);
  },
  render() {
    return h('div', {}, 'Foo')
  }
}