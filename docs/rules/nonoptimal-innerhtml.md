# Don't use `innerHTML` inside loops. (eslint-plugin-nonoptimal-innerhtml)

Using the `innerHTML` property to set or add to the content of a `Node` inside a loop will very likely make your website slow if:

1. the loop is long enough, or
2. the HTML you're inserting is large

If both happen in conjunction, the performance impact will be bigger.

The reason for this is that, since `innerHTML` receives a simple string, it has to be parsed and validated as correct HTML before appearing in the DOM.

Parsing gets slower as the content being parsed grows. Also, doing parsing operations inside a loop will inevitably take more time as the loop gets longer. Hence the the risk of poor performance when using the `innerHTML` property directly.

## Rule Details

This rules allows you to create a smoother user experience without worrying about easily avoidable performance issues.

### Incorrect code example

```js
while (something) {
  document.innerHTML += "<h1>Lorem Ipsum</h1>";
}
```

```js
largeArray.forEach((element) => {
  container.innerHTML += `<div><p>${element.text}</p></div>`;
});
```

### Correct code example

```js
while (something) {
  const mainTitle = document.createElement("h1");
  mainTitle.textContent = "Lorem Ipsum";

  document.appendChild(mainTitle);
}
```

```js
while (something) {
  const mainTitleContainer = document.querySelector("#main-title-container");

  const newTitle = document.createElement("span");
  newTitle.textContent = "Lorem Ipsum";

  mainTitleContainer.replaceChild(newTitle, mainTitleContainer.children[0]);
}
```

```js
function addButton(label, interactiveDiv) {
  interactiveDiv.innerHTML = `<button>${label}</button>`;
}
```

```js
while (something) {
  const footer = document.querySelector("#footer");

  const mainTitle = document.createElement("h1");
  mainTitle.textContent = "Foobar";

  footer.replaceChildren(mainTitle);
}
```

## Further Reading

Read about [the algorithm used when accessing or setting the `innerHTML`](https://dev.w3.org/html5/spec-LC/apis-in-html-documents.html#innerhtml) property of a `Node` is documented by the W3C.

You can also read about the [security concerns when using `innerHTML`](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML#security_considerations).
