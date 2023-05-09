/**
 * @fileoverview .
 * @author gearonix
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const PluginErrors = require('../errors')
const {isRelative, fsdLayers} = require('../helpers')
const micromatch = require('micromatch')
const path = require('path')

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: null, // `problem`, `suggestion`, or `layout`
    docs: {
      description: ".",
      recommended: false,
      url: null, // URL to the documentation page for this rule
    },
    fixable: null, // Or `code` or `whitespace`
    schema: [
      {
        type: 'object',
        properties: {
          alias: {
            type: 'string'
          },
          allowedPatterns: {
            type: 'array'
          }
        }
      }
    ],
  },
  create(context) {
    const alias = context.options[0]?.alias
    const allowedPatterns = context.options[0]?.allowedPatterns
    return {
      ImportDeclaration(node){
        const sourceValue = node.source.value
        const importPath = alias ? sourceValue.replace(`${alias}/`, '') : sourceValue

        const currentFilePath = context.getFilename();
        const normalizedPath = path.toNamespacedPath(currentFilePath);

        const isCurrentFileIgnored = allowedPatterns ? allowedPatterns.some((pattern) => {
          return micromatch.isMatch(normalizedPath, pattern)
        }) : false
        
        console.log(isCurrentFileIgnored)

        if (isPublicImport(importPath) && !isCurrentFileIgnored){
          context.report(node, PluginErrors.PUBLIC_API_IMPORTS)
        }
      }
    };
  },
};

const isPublicImport = (importPath) => {
  if (isRelative(importPath)){
    return false
  }
  const layers = importPath?.split('/')

  const importLayer = layers?.[0]

  if (!importLayer || !fsdLayers.includes(importLayer)){
    return false
  }

  console.log(layers.length)

  return layers.length > 2

}
