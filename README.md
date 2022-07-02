<h1 align="center">Syntax Tree Visualizer 🌳</h1>

<p align="center">Visualizer for JavaScript code into an <strong>abstract syntax tree</strong> and a <strong>parallel array</strong> representations.<p>

<div align="center">

![Coverage Badge](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/markovav-official/626ceaef15ab8d3d6dd2be185454916a/raw/SyntaxTreeVisualizer__heads_main.json)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

[Description](#description) • [Demo](#demo) • [How to use](#instruction) • [Features](#features) • [Installation](#installation) • [Contribution](#contribution) • [Technologies used](#techno)

</div>

___

<h2 id="description">Description</h2>

**Syntax Visualizer** is an interactive webpage for vizualizing JavaScript code in forms of abstract syntax tree (AST) and parallel array representations. The page contains three fields: the code editor, the AST representation, and the parallel array representation. When you enter the code, the representations are immediately generated.

<h2 id="demo">Demo</h2>

[![Watch the video](https://img.youtube.com/vi/fhR5PJ9H5yM/maxresdefault.jpg)](https://www.youtube.com/watch?v=fhR5PJ9H5yM)

<h2 id="instruction">How to use?</h2>

Follow the [link](http://syntax-visualizer.markovav.ru/) to use the website.

1. Enter the code in the “code” block.
2. The program will automatically build images of the tree and the array.
3. You can hover on any item of tree or array to see corresponding parts of code.
4. You can fold constant expressions (yellow nodes in tree) by clicking on them.

<h2 id="features">Features</h2>

- ⏩ Immediate AST and parallel array generation
- 🛠️ Code editor with syntax highlighting and code refactoring (Ctrl+Alt+L)
- 💡 Highlighting of similar parts
- 🔗 Share the result via auto-generated URL
- 👨‍💻 Folding of constant expressions

<h2 id="installation">Installation</h2>

<h2 id="contribution">Contribution</h2>

To contribute to the project, create a **pull request** with a detailed explanation, written tests, and no SonarCloud alerts.

<h2 id="techno">Technologies used</h2>

- Code editor – [CodeMirror](https://github.com/codemirror/codemirror5)
- Parser – [Acorn](https://github.com/acornjs/acorn)
- Tree builder – [reaflow](https://github.com/reaviz/reaflow)
