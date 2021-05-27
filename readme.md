<h1 align=center>
    <img src="./brand/cfw.js.svg" type="text/svg" rel="svg" height=80>
</h1>

<h3 align=center>JavaScript Parser</h3>

<p align=center> <sub><b>v0.2.1-dev</b></sub> </p>

cfw.JS is both a standalone **JavaScript** parser written in TypeScript, and a critical part of the CandleFW component system. It can be used independently within projects that require the capability to parse and generate a simple AST for JavaScript string inputs.

 cfw.JS AST's can be traversed using cfw.Conflagrate traversal functions, and rendered to string with customized formatting using Conflagrate's rendering functions. These functions are integrated within the library.

>Note: cfw.JS only evaluates syntactic forms within a JavaScript string input. It is not designed to evaluate semantics and cannot be used as-is to determine whether an input is semantically correct.

---
This library builds upon and extends the functionality found withing the following CFW libraries:
- cfw.**Wind**
- cfw.**Hydrocarbon**
- cfw.**Conflagrate**

## Installation

### Yarn
```sh
yarn add @candlelib/js
```
### NPM
```sh
npm install --save @candlelib/js
```
### Usage

#### nodejs

```js

import { parse as jsParse, render as jsRender } from "@candlelib/js";

const js_ast = jsRender(` console.log("Hello World") `);

const rendered_string = jsRender(ts_ast); 

// "console.log("Hello World")"

```
## Documentation

TODO

## License

**MIT License** - Copyright 2020 Anthony C. Weathersby

[see full license](./license.md)


