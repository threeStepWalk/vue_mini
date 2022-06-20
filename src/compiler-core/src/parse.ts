import { NodeTypes } from "./ast"

const enum TagType {
  Start,
  End
}

export function baseParse(content: string) {
  const context = createParserContext(content)
  return createRoot(parseChildren(context))
}

// 解析 children ，返回 children数组
function parseChildren(context) {
  const nodes: any = []

  let node;
  const s = context.source;
  if (s.startsWith("{{")) {
    node = parseInterpolation(context)
  } else if (s[0] === "<") {
    if (/[a-z]/i.test(s[1])) {
      node = parseElement(context)

    }
  }

  nodes.push(node)

  return nodes
}

// 解析插值
function parseInterpolation(context) {
  // {{message}}
  const openDelimiter = "{{"
  const closeDelimiter = "}}"

  const closeIndex = context.source.indexOf(closeDelimiter, openDelimiter.length)

  advanceBy(context, openDelimiter.length)

  const rawContentLength = closeIndex - openDelimiter.length

  const rawContent = context.source.slice(0, rawContentLength)

  const content = rawContent.trim()

  advanceBy(context, rawContentLength + closeDelimiter.length)


  return {
    type: NodeTypes.INTERPOLATION,
    content: {
      type: NodeTypes.SIMPLE_EXPRESSION,
      content
    }
  }
}

// 字符串推进
function advanceBy(context: any, length: number) {
  context.source = context.source.slice(length)
}

// 解析根节点
function createRoot(children) {
  return {
    children,
  }
}

function createParserContext(content: string) {
  return {
    source: content
  }
}

function parseElement(context: any) {
  const element = parseTag(context, TagType.Start)

  parseTag(context, TagType.End)
  console.log("---------", context.source);

  return element
}

function parseTag(context: any, type: TagType) {
  // 1. 解析 tag
  const match: any = /^<\/?([a-z]*)/i.exec(context.source)
  const tag = match[1]

  // 2. 删除处理完的代码
  advanceBy(context, match[0].length)
  advanceBy(context, 1)

  if (type === TagType.End) return;

  return {
    type: NodeTypes.ELEMENT,
    tag
  }
}