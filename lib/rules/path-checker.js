"use strict";

const path = require('path')
const PluginErrors = require('../errors')
const {isRelative, fsdLayers} = require('../helpers')


module.exports = {
  meta: {
    type: null,
    docs: {
      description: "feature-sliced-design path-checker",
      recommended: false,
      url: null,
    },
    fixable: null,
    schema: [
      {
        type: 'object',
        properties: {
          alias: {
            type: 'string'
          }
        }
      }
    ],
  },

  create(context) {
    const alias = context.options[0]?.alias
    return {
      ImportDeclaration(node){
        const sourceValue = node.source.value
        const importPath = alias ? sourceValue.replace(`${alias}/`, '') : sourceValue
        const filePath = context.getFilename();

        if (shouldBeRelative(filePath, importPath)){
          context.report(node, PluginErrors.SHOULD_BE_RELATIVE)
        }
      }
    };
  },
};



const shouldBeRelative = (filePath, importPath) => {
  if (isRelative(importPath) || !filePath || !importPath){
    return false
  }

  const toArray = importPath?.split('/')
  const importLayer = toArray[0]
  const importSlice = toArray[1]

  if (!importLayer || !importSlice || !fsdLayers.includes(importLayer)){
    return false
  }

  const namespacedPath = path.toNamespacedPath(filePath)

  if (!namespacedPath){
    return false
  }

  const normalizedPath = namespacedPath?.split('src\\')[1]

  if (!normalizedPath){
    return false
  }

  const fromArray = normalizedPath?.split('\\')
  const fileLayer = fromArray[0]
  const fileSlice = fromArray[1]

  if (!fileLayer || !fileSlice || !fsdLayers.includes(fileLayer)){
    return false
  }

  return fileLayer === importLayer
}


