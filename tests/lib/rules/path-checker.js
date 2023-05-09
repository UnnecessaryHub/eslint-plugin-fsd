/**
 * @fileoverview feature-sliced-design path-checker
 * @author gearonix
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/path-checker"),
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
ruleTester.run("path-checker", rule, {
  valid: [
    {
      filename: 'C:\\Users\\tim\\Desktop\\javascript\\production_project\\src\\entities\\Article',
      code: "import { addCommentFormActions, addCommentFormReducer } from '../../model/slices/addCommentFormSlice'",
      errors: [],
    }
  ],
  invalid: [
    {
      code: "import {ThemeSwitcher} from 'features/ThemeSwitcher'",
      errors: [{ message: PluginErrors.SHOULD_BE_RELATIVE }],
      filename: 'C:\\Users\\Егор\\Desktop\\Development\\workspace\\ulbi_project\\src\\features\\Main\\ui\\Main.tsx'
    },
    {
      code: "import {ThemeSwitcher} from '@/features/ThemeSwitcher'",
      errors: [{ message: PluginErrors.SHOULD_BE_RELATIVE }],
      filename: 'C:\\Users\\Егор\\Desktop\\Development\\workspace\\ulbi_project\\src\\features\\Main\\ui\\Main.tsx',
      options: [
        {
          alias: '@'
        }
      ]
    }
  ],
});
