<h1 align="center">Syntax Tree Visualizer 🌳</h1>

<p align="center">Visualizer for JavaScript code into an <strong>abstract syntax tree</strong> and a <strong>parallel array</strong> representations.<p>

<div align="center">

![Coverage Badge](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/markovav-official/626ceaef15ab8d3d6dd2be185454916a/raw/SyntaxTreeVisualizer__heads_main.json)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

[Description](#description) • [Demo](#demo) • [How to use](#instruction) • [Features](#features) • [Installation](#installation) • [Contribution](#contribution) • [Frameworks used](#frameworks)

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

<h3>Examples</h3>

- [Factorial function](http://syntax-visualizer.markovav.ru/?code=ZnVuY3Rpb24gZmFjdG9yaWFsKG4pIHsKICBsZXQgYW5zd2VyPTE7CiAgaWYgKG49PTB8fG49PTEpIHsKICAgIHJldHVybiBhbnN3ZXI7CiAgfQogIGVsc2UKICB7CiAgICBmb3IgKHZhciBpPW47aT49MTtpLS0pIHsKICAgICAgYW5zd2VyPWFuc3dlcippOwogICAgfQogICAgcmV0dXJuIGFuc3dlcjsKICB9Cn0KbGV0IG4gPSAxICsgMSArIDEgKyAxOyBhbnN3ZXIgPSBmYWN0b3JpYWwobik7CmNvbnNvbGUubG9nKCJUaGUgIisiZmFjdG9yaWFsICIrIm9mICIrbisiIGlzICIrYW5zd2VyKTs=)
- [Classes](http://syntax-visualizer.markovav.ru/?code=Y2xhc3MgQW5pbWFscyB7CiAgY29uc3RydWN0b3IobmFtZSwgYWdlKSB7CiAgICB0aGlzLm5hbWUgPSBuYW1lOwogICAgdGhpcy5hZ2UgPSBhZ2U7CiAgfQogIHNpbmcoKSB7CiAgICByZXR1cm4gdGhpcy5uYW1lICsgJyBjYW4gc2luZyc7CiAgfQogIGRhbmNlKCkgewogICAgcmV0dXJuIHRoaXMubmFtZSArICcgY2FuIGRhbmNlJzsKICB9Cn0KY2xhc3MgQ2F0cyBleHRlbmRzIEFuaW1hbHMgewogIGNvbnN0cnVjdG9yKG5hbWUsIGFnZSwgd2hpc2tlckNvbG9yKSB7CiAgICBzdXBlcihuYW1lLCBhZ2UpOwogICAgdGhpcy53aGlza2VyQ29sb3IgPSB3aGlza2VyQ29sb3I7CiAgfQogIHdoaXNrZXJzKCkgewogICAgcmV0dXJuICdJIGhhdmUgJyArIHRoaXMud2hpc2tlckNvbG9yICsgJyB3aGlza2Vycyc7CiAgfQp9CmxldCBjbGFyYSA9IG5ldyBDYXRzKCJDbGFyYSIsIDMzLCAiaW5kaWdvIik7)

<h2 id="features">Features</h2>

- ⏩ Immediate AST and parallel array generation
- 🛠️ Code editor with syntax highlighting and code refactoring (Ctrl+Alt+L)
- ↩️ UNDO (Ctrl+Z) and REDO (Ctrl+Y) functionality
- 💡 Highlighting of similar parts
- 🔗 Share the result via auto-generated URL
- 👨‍💻 Folding of constant expressions

<h2 id="installation">Installation</h2>

### Manual installation
1. Install Node.js by the following link [nodejs.org](https://nodejs.org/)
2. Clone the repository
```console
git clone https://github.com/InnoSWP/SyntaxTreeVisualizer
```
3. Open project folder
4. Install dependencies
```console
npm install
```
5. Run the project in development mode
```console
npm start
```

### Using Docker
1. Install Docker on your computer [docker.com](https://www.docker.com/get-started/)
2. Pull image [markovav/syntax_tree_visualizer:latest](https://hub.docker.com/r/markovav/syntax_tree_visualizer)
```console
docker pull markovav/syntax_tree_visualizer
```
3. Create a container using this image
```console
docker run -p 80:3000 -d --name syntax-tree-visualizer markovav/syntax_tree_visualizer
```

<h2 id="contribution">Contribution</h2>

To contribute to the project, create a **pull request** with a detailed explanation, written tests, and no SonarCloud alerts.

<h2 id="frameworks">Frameworks used</h2>

- Code editor – [CodeMirror](https://github.com/codemirror/codemirror5)
- Parser – [Acorn](https://github.com/acornjs/acorn)
- Tree builder – [reaflow](https://github.com/reaviz/reaflow)
