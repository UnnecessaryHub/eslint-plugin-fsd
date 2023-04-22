"use strict";

const path = require('path')


module.exports = {
  meta: {
    type: null,
    docs: {
      description: "feature-sliced-design path-checker",
      recommended: false,
      url: null,
    },
    fixable: null,
    schema: [],
  },

  create(context) {
    return {
      ImportDeclaration(node){
        const importPath = node.source.value
        const filePath = context.getFilename();

        if (shouldBeRelative(filePath, importPath)){
          context.report(node, 'The path must be relative according to the FSD methodology.')
        }
      }
    };
  },
};

const fsdLayers = [
    'app',
    'widgets',
    'features',
    'entities',
    'shared',
    'pages'
]

const isRelative = (path) => {
  return path.startsWith('.') || path.startsWith('./') || path.startsWith('../')
}

const shouldBeRelative = (filePath, importPath) => {
  if (isRelative(importPath)){
    return false
  }

  const toArray = importPath.split('/')
  const importLayer = toArray[0]
  const importSlice = toArray[1]

  if (!importLayer || !importSlice || !fsdLayers.includes(importLayer)){
    return false
  }

  const namespacedPath = path.toNamespacedPath(filePath)
  const normalizedPath = namespacedPath.split('src\\')[1]
  const fromArray = normalizedPath.split('\\')
  const fileLayer = fromArray[0]
  const fileSlice = fromArray[1]

  if (!fileLayer || !fileSlice || !fsdLayers.includes(fileLayer)){
    return false
  }

  return fileLayer === importLayer
}


console.log(shouldBeRelative('C:\\Users\\Егор\\Desktop\\Development\\workspace' +
    '\\ulbi_project\\src\\app\\App.tsx', 'app/providers/AppRouter'))


