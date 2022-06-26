import { NodeTypes } from "./ast"
import { TO_DISPLAY_STRING } from "./runtimeHelpers"

export function transform(root, options = {}) {
  const context = createTransformContext(root, options)
  traverseNode(root, context)

  creeateRootCodegen(root)
  // root.codegenNode

  root.helpers = [...context.helpers.keys()]
}

function createTransformContext(root: any, options: any) {
  const context = {
    root,
    nodeTransforms: options.nodeTransforms || [],
    helpers: new Map(),
    helper(key) {
      context.helpers.set(key, 1)

    }
  }
  return context
}

function creeateRootCodegen(root) {
  root.codegenNode = root.children[0]
}

function traverseNode(node: any, context) {

  //! 调用外部传入的 plugin
  //! 2. 修改 text content
  const nodeTransforms = context.nodeTransforms
  for (let i = 0; i < nodeTransforms.length; i++) {
    const transform = nodeTransforms[i];
    transform(node)
  }

  switch (node.type) {
    case NodeTypes.INTERPOLATION:
      context.helper(TO_DISPLAY_STRING)
      break;
    case NodeTypes.ROOT:
    case NodeTypes.ELEMENT:
      traverChildren(node, context)
      break

    default:
      break;
  }

  // 1. 遍历 - 深度优先搜索
}

function traverChildren(node, context) {
  const children = node.children 
  
  for (let i = 0; i < children.length; i++) {
    const node = children[i];
    traverseNode(node, context)
  }

}