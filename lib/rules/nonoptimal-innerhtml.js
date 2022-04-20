/**
 * @fileoverview Don't use innerHTML inside loops.
 * @author Andrés Quilodrán
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/**
 * @type {import('eslint').Rule.RuleModule}
 */
module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description: "Don't use innerHTML inside loops.",
      recommended: false,
      url: null, // URL to the documentation page for this rule
    },
    fixable: null, // Or `code` or `whitespace`
    schema: [], // Add a schema if the rule has options
  },

  create(context) {
    const loopNodeTypes = ["ForStatement", "WhileStatement", "ForOfStatement"];
    const arrayIteratorMethods = ["map", "forEach"];

    function isSettingInnerHTML(node) {
      return node.left.property && node.left.property.name === "innerHTML";
    }

    function isArrayIterator(node) {
      return (
        node.type === "ExpressionStatement" &&
        node.expression.callee &&
        node.expression.callee.property &&
        arrayIteratorMethods.includes(node.expression.callee.property.name)
      );
    }

    function isLoop(node) {
      return loopNodeTypes.includes(node.type) || isArrayIterator(node);
    }

    function isInLoop(node) {
      for (
        let currentNode = node;
        currentNode;
        currentNode = currentNode.parent
      ) {
        if (isLoop(currentNode)) {
          return true;
        }
      }
      return false;
    }

    function handleUnoptimalHTMLAssignment(node, context) {
      context.report({
        node: node.left.property,
        message:
          "Setting innerHTML inside a loop is nonoptimal, try using `createElement` instead",
      });
    }

    return {
      AssignmentExpression(node) {
        if (isSettingInnerHTML(node) && isInLoop(node)) {
          handleUnoptimalHTMLAssignment(node, context);
        }
      },
    };
  },
};
