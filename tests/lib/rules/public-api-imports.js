/**
 * @fileoverview .
 * @author gearonix
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/public-api-imports"),
  RuleTester = require("eslint").RuleTester;
const PluginErrors = require('../../../lib/errors')


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'
  }
});

ruleTester.run("public-api-imports", rule, {
  valid: [
    {
      code: "import { addCommentFormActions, addCommentFormReducer } from '../../model/slices/addCommentFormSlice'",
      errors: [],
    },
    {
      code: "import { useState } from 'react'",
      errors: [],
    },
    {
      code: "import { addCommentFormActions, addCommentFormReducer } from 'features/Entity'",
      errors: [],
    },
    {
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/features/Entity/store/comment.ts'",
      filename: 'C:\\Users\\Егор\\Desktop\\Development\\workspace\\ulbi_project\\src\\features\\Main\\ui\\Main.test.ts',
      errors: [{message: PluginErrors.PUBLIC_API_IMPORTS}],
      options: [
        {
          alias: '@',
          allowedPatterns: ['test*']
        }
      ]
    }
  ],

  invalid: [
    {
      code: "import { addCommentFormActions, addCommentFormReducer } from 'features/Entity/store/comment.ts'",
      errors: [{message: PluginErrors.PUBLIC_API_IMPORTS}],
    },
    {
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/features/Entity/store/comment.ts'",
      errors: [{message: PluginErrors.PUBLIC_API_IMPORTS}],
      options: [
        {
          alias: '@'
        }
      ]
    }
  ],
});
