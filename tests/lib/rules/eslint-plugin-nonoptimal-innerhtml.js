/**
 * @fileoverview Don&#39;t use innerHTML inside loops.
 * @author Andrés Quilodrán
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/nonoptimal-innerhtml"),
  RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
ruleTester.run("nonoptimal-innerhtml", rule, {
  valid: [
    // give me some code that won't trigger a warning
  ],

  invalid: [
    {
      code: "for (let i = 0; i < 10; i++) { document.innerHTML += '<h1>Foobar</h1>'; }",
      errors: [{ message: "Fill me in.", type: "Me too" }],
    },
  ],
});
