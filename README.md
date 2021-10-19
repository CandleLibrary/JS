<h1 align=center>CandleLibrary JS</h1>

<h3 align=center>JavaScript Parsing & AST Library</h3>

<p align=center> <img alt="npm (tag)" src="https://img.shields.io/npm/v/@candlelib/js?style=for-the-badge&logo=appveyor"> </p>

CandleLibrary JS is both a standalone **JavaScript** parser written in TypeScript, and a critical part of the CandleLibrary component system. It can be used independently within projects that require the capability to parse and generate a simple AST for JavaScript string inputs.

CL JS AST's can be traversed using cfw.Conflagrate traversal functions, and rendered to string with customized formatting using Conflagrate's rendering functions. These functions are integrated within the library.

>Note: CandleLibrary JS only evaluates syntactic forms within a JavaScript string input. It is not designed to evaluate semantics and cannot be used as-is to determine whether an input is semantically correct.

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


