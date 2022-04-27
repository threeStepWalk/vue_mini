import { isObject } from "../shared/index"
import { createComponentInstance, setupComponent } from "./component"

export function render(vnode, container) {
  // patch
  patch(vnode, container)
}

// patch 函数，将组件 vnode 的 props 等属性添加，然后挂载到 container 上， 递归调用patch最终完成一个 vdom-tree
function patch(vnode, container) {
  // 处理组件
  // 判断 是不是 element
  // todo 判断vnode是不是一个element
  // 是element 就应该处理 element
  // 思考题： 如何去区分 是element 还是 compoent


  if (typeof vnode.type === 'string') {
    prcessElement(vnode, container)
  } else if (isObject(vnode.type)) {
    processComponent(vnode, container)
  }
}
function prcessElement(vnode, container) {
  mountElement(vnode, container)
}

function mountElement(vnode, container) {
  const { children, type, props } = vnode

  const el = document.createElement(type);

  if (typeof children === 'string') {
    el.textContent = children
  } else if (Array.isArray(children)) {
    mountChildren(vnode, el)
  }

  // props  
  for (const key in props) {
    const val = props[key]
    el.setAttribute(key, val)
  }

  container.append(el)
}

function mountChildren(vnode, container) {
  vnode.children.forEach(v => {
    patch(v, container)
  })
}

function processComponent(vnode, container) {
  mountComponet(vnode, container)

}

// 挂载组件
function mountComponet(vnode, container) {
  // 先创建一个 instance
  const instance = createComponentInstance(vnode)

  // 然后去处理组件内的 props, slots 以及 setup 函数 返回出来的值
  setupComponent(instance)

  setupRenderEffect(instance, container)
}

// 调用 render 函数 返回 vnode
function setupRenderEffect(instance, constructor) {
  const subTree = instance.render()

  // vnode  
  // vnode -> patch
  // vnode -> element -> mountElement

  patch(subTree, constructor)
}
