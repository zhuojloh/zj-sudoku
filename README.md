Uber Sudoku Coding Challenge
===============
A mobile-friendly, responsive and lightweight Sudoku web game. 

Technology Stacks
---
**Node.js Express**

Lightweight javascript-based web server that is fast to develop and deploy

**Jade**

Server-side template engine that minimize line of code for generating HTML

**Gulp**

A build system is used for transforming React JSX files to JS and bundling them together using Browserify. It is also being used to transform SASS files into minified CSS.
Ideally if time permits, it can be used to run unit test too. My weapon of choice for unit test will be Jasmine and Karma. However it was not included in this build

**Browserify**

Node.js style module compilation tools for browser. 

**React**

High performance client-side template engine that allows javascript logic and HTML in the same file. I used it to create javascript components that are easy to maintain.

**Sass**

CSS Preprocessor. Minimize written lines of repeating code in CSS. CSS codes are much easier to maintain and scale using SASS when mixins and variables are used.

**JQuery**

A javascript library that is widely used. I used it primary for HTML DOM traversal and javascript event handling.

**Underscore**

A javascript functional helper library. Using it mostly for deep object comparison.

**Sudoku.js**

Third party Sudoku board generator and solver.

Structure
---
root

|--bin : Express generated folder for starting Node.js server

|--public : Front-end static folder that houses generated javascript and css files

|--routes : Express routers folder

|--src : Client-side javascript and sass folder

&#x2002;&#x2002;&#x2002;|--lib : Third party javascript library folder

&#x2002;&#x2002;&#x2002;|--react : Housing all react component files

&#x2002;&#x2002;&#x2002;|--sass : Housing all sass files

|--views : Server side template jade file folder

|--app.js : Node.js application file    

|--gulpfile.js : Build system gulp file

|--package.json : NPM package file

|--README.md : what you are reading right now   
  
Looking forward (What to do if I have more time)
---
1. I will finish up installing Karma and Jasmine to unit test react components. 
2. For React Sudoku board component, every number input causes React components to rerender. This may be the recommended way by Facebook since they have subtle bugs on state change without rerender.
Going forward I may change my architecture to not change state every number input but since the current implementation does not have any performance issues, I will stick with this one for now.
3. The Sudoku library that I used offers difficulty levels. I did not fully make use of that.
4. Ability to turning off Correct/Incorrect hinting by using CSS 
5. For better UX, Reset Game, Solve Game, New Game buttons need a confirmation dialog.

Build instruction
---
1. Run `npm install`
2. Run `npm install gulp -g`. You may require to use sudo on OSX/Linux
3. Run `gulp build` to build SASS and JS file.
4. Run `npm start` to start the server. Current setting is listening in port 3000.

Demo
---
http://zj-sudoku.herokuapp.com/