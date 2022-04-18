/**
 * @fileoverview Don&#39;t use innerHTML inside loops.
 * @author Andrés Quilodrán
 */
"use strict";

const rule = require("../../../lib/rules/nonoptimal-innerhtml"),
  RuleTester = require("eslint").RuleTester;

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 6 } });
ruleTester.run("nonoptimal-innerhtml", rule, {
  valid: [
    {
      code: "document.innerHTML += '<h1>Foobar</h1>';",
    },
    {
      code: "function optimalFunction() { document.innerHTML += '<h1>Foobar</h1>'; }",
    },
  ],

  invalid: [
    {
      code: "while (something) { document.innerHTML += '<h1>Foobar</h1>'; }",
      errors: [
        {
          message:
            "Setting innerHTML inside a loop is nonoptimal, try using `createElement` instead",
        },
      ],
    },
    {
      code: "for (let i = 0; i < 10; i++) { document.innerHTML += '<h1>Foobar</h1>'; }",
      errors: [
        {
          message:
            "Setting innerHTML inside a loop is nonoptimal, try using `createElement` instead",
        },
      ],
    },
    {
      code: `for (let i = 0; i < [1, 2, 3, 4].length; i++) {
          function test() {
            containerRoot.innerHTML = containerRoot.innerHTML + 'nonoptimal code :('
          }
          test();
        }
      `,
      errors: [
        {
          message:
            "Setting innerHTML inside a loop is nonoptimal, try using `createElement` instead",
        },
      ],
    },
    {
      code: `[1, 2, 3, 4].forEach((element) => {
          containerRoot.innerHTML += 'also nonoptimal code :('
        });
      `,
      errors: [
        {
          message:
            "Setting innerHTML inside a loop is nonoptimal, try using `createElement` instead",
        },
      ],
    },
  ],
});
