# Functional Tic-Tac-Toe

React is a modern and versatile JavaScript library with different forms of implementations. This is an adaptation of the official [Intro to React Tutorial](https://reactjs.org/tutorial/tutorial.html) using the most current fashion of writing React with Functional Components and Hooks instead of JavaScript classes.

In this tutorial we will build a simple Tic-Tac-Toe game. It assumes you are familiar with some React concepts (the previous mentioned tutorial is a good place to start) and with modern JavaScript (basic knowledge of modules, the spread operator **[...]** or arrow functions **( )=>{ }**, for example). Also, it presumes that you understand and can use tools like git, node, npm and the command line in any OS of choice (Mac, Windows or Linux).

**Setup**

You should have a local development environment set up or use a service like [Codepen](https://codesandbox.io) or [CodeSandbox](https://codesandbox.io) if you wish to follow on your browser.

_If you need help setting up your environment, the official tutorial has a well written section dedicated to it._ 🙂

The complete project can be found on [GitHub](https://github.com/raibtoffoletto/functional-tic-tac-toe) but we will start by cloning the Starter Code and installing the project's dependencies.

```bash
git clone --branch StarterCode https://github.com/raibtoffoletto/functional-tic-tac-toe.git

cd functional-tic-tac-toe/

npm install
```

You can run the project and see changes on real time in your browser by executing:

```bash
npm start
```

_By default a local server starts on port 3000, to override it, you can set the local variable PORT before executing the command._

# Starting from the beginning

## So, what is React exactly?

The official tutorial defines React as _"a declarative, efficient, and flexible JavaScript library for building user interfaces"_. There are several resources online defining it better, but in a few words, React is a very powerful library that lets you write for the web in a modular way. It dynamically creates, updates, and removes [DOM](https://en.wikipedia.org/wiki/Document_Object_Model) elements from your page, _REACTing_ to the user's actions and inputs.

React Components can be JavaScript classes or functions and will return a JSX element to be rendered. JSX is a special syntax that looks like traditional HTML but is actually a collection of react elements. The example below illustrates a simple React Functional component that return a JSX snippet:

```javascript
const MyApp = () => (
  <main>
    <h1>My App</h1>
    <div className="menuItems">
      <ul>
        {["fist", "second"].map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
    <MyAppFooter />
  </main>
);
```

It looks like traditional HTML, but with some key differences, note that in order to give a CSS class to a `<div>` we need to use `className`, that is because the verb `class` is already in use in JavaScript. Also, simple JavaScript can be injected using {} and we can easily pass properties to a component like the `key={}` in `<li>`. Custom components can be inserted to the page as if it was a HTML tag (`<MyAppFooter />`). More details about JSX will appear during this tutorial.

## The Initial Project

Let's have a look at the directory structure of so far:

```
├── README.md
├── package-lock.json
├── package.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
└── src
    ├── components
    │   ├── Board.js
    │   ├── Square.js
    │   └── index.js
    ├── index.css
    ├── index.js
    └── views
        ├── Game.js
        └── index.js
```

The files at `root` level are not that important for us right now, they contain information about packages and scripts of our application, they won't be present in the final build.

The `public` folder contain all static files of our app: favicon and logos, a manifest for [PWAs](https://pt.wikipedia.org/wiki/Progressive_web_app), instructions for web crawlers and other ([robots](https://en.wikipedia.org/wiki/Robots_exclusion_standard)) and as well our traditional `index.html` where our app code will be inject by the React library.

Our main interest is the `src` directory. It contains all the source code for our application that later will be compiled into static files. There are no conventions here on how we should organize our code, the only requirement is to have a valid `index.js` so the compiler knows where to start. I like to break up my code in several directories and make extensive use of JavaScript modules, this helps to keep the code clean and maintainable.

I usually create a folder named `views` to contain all main views/routes of the app. In our case, it only contains one: `Game.js` (in a bigger application this may have the app's `Contact.js`, `HomePage.js`, `SignIn.js`, etc...).

There is also a folder named `components` that will have all the pieces we will use to build our views. I tend to create sub directories with the same name as my views to keep them organized in a logical way, with commonly used components in their own folder as well. Again, this is a simple app so everything is on its root. 😉

To make better use of JavaScript modules, every sub directory has an `index.js`. It links all the components to be exported as a module. Take the `components/index.js` for example:

```javascript
import Board from "./Board";
import Square from "./Square";

export { Board, Square };
```

It wraps up components into a single export. If we want to access both from another directory in our file structure we would simply use:

```javascript
import { Board, Square } from "../components";
```

Instead of:

```javascript
import Board from "../components/Board";
import Square from "../components/Square";
```

That makes it easy if we need to change the folder's inner structure without breaking import paths in other parts of our code. In another example, consider the following folder structure:

```javascript
└── src
    ├── components
    │   ├── Game
    │   │   ├── Board.js
    │   │   ├── Square.js
    │   │   └── index.js
    │   └── index.js
```

In this case the `components/Game/index.js` would look like our current `components/index.js` and the new `components/index.js` could be simple as this:

```javascript
export * as GameComponents from "./Game";
```

Making the import and use of different components of the same module very easier. Also, the addition of new components to the `Game/index.js` would be automatically accessible from the imports in other parts of the code.

```javascript
import { GameComponents } from "../components";

const RenderComponents = () => (
  <div>
    <GameComponents.Board />
    <GameComponents.Square />
    <GameComponents.SomeNewComponent />
  </div>
);
```

## The `src/index.js`

This is the application main file. First we import React and ReactDOM libraries, the second one is necessary here so we can manipulate DOM elements and point out to React where it can inject our application code in the `public/index.html` file.

```javascript
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Game from "./views";

ReactDOM.render(<Game />, document.getElementById("root"));
```

Then we have a global stylesheet file with all the CSS of our application needs. To use CSS with React components you simply import them into your file. You can create a stylesheet file for every component if you like, keeping the code organized. After compiling our application, they will all be injected as inline CSS at our `public/index.html` file. **However**, be careful, those styles are **NOT** contained to their own component by default, meaning that if we have a class with the same name across multiple files they will override themselfs (_though most of the graphical libraries for React will use contained styles_).

At last, we import our only view component `<Game />` and instruct ReactDOM to inject it into the `<div id="root"></div>` at the main HTML file. Here is where I usually inject an application wrapper `<App />` or a `<Router />` component and configure different providers I may be using (more on that later). The idea is to keep this file as simple as possible and organize all our code elsewhere.

## View and Components

So far our main view is very simple. We import our board component and set it up in a two column layout. The `game-info` will later hold information about our match, but for now it stays there empty. Notice that there is no stylesheet file here, all of our CSS is inside the `src/index.css`, but we can set the name for CSS classes with the standard prop[erty] `className` (as mentioned before, the use of the verb `class` is already in use by JavaScript itself).

```javascript
import React from "react";
import { Board } from "../components";

const Game = () => {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
      <div className="game-info">
        <div>{/* status */}</div>
        <ol>{/* TODO */}</ol>
      </div>
    </div>
  );
};

export default Game;
```

React functional components need always to have a return value: or a JSX or `null`. A function without any return or that returns `undefined` cannot be used as a React component and the compiler will return an error. In the same way, all JSX needs to be wrapped by a component, in our case the `<div className="game"></div>`.

But you may ask: _why do I need this wrapped if there will be one `<div id="root"></div>` where this code will be injected? Couldn't we just return this instead?_

```javascript
return (
    <div className="game-board">
      ...
    </div>
    <div className="game-info">
      ...
    </div>
  );
```

**No!** A returned JSX must have an unique top level component. Remember that we are not writing HTML here, those are JSX components, so think of them as functions, in JavaScript you cannot have two `returns` inside the same function, one will be ignored. For the cases when you don't want to insert another DOM element in your structure but you need to wrap the returned JSX in something, React provides us with a component called `Fragment`. It will not insert any HTML tag in the final code, but will provide a wrapper function for all of your returned fragments.

```javascript
return (
  <React.Fragment>
    <div className="game-board">...</div>
    <div className="game-info">...</div>
  </React.Fragment>
);
```

> Note: You can use <React.Fragment>...</React.Fragment> or <>...</> for short!

---

Moving on to our components. The `Square` is a very simple function that returns a button (which so far does nothing).

```javascript
import React from "react";

const Square = () => {
  return <button className="square">{/* TODO */}</button>;
};

export default Square;
```

> Note: To insert comments inside a JSX we need to use {/\* \*/}, remember, you are not writing pure HTML, JSX is a JavaScript syntax.

And finally we have our game's `Board` component. Besides rendering the board structure, this functional component has a property that displays a status message and a function that creates a `Square` component. To use javascript inside the returned JSX, we wrap it with curly brackets `{}`, in our case `{status}` prints out the property's string and `{renderSquare()}` creates a `<Square />`.

We could simply have used `<Square />` instead of a dedicated function `{renderSquare(i)}`. However, you may have noticed that the board is composed by several squares, so, later on, this function will be useful to iterate over the `Square` component, helping us to not repeat ourselves (the [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) rule).

```javascript
import React from "react";
import { Square } from "./";

const Board = () => {
  const status = "Next player: X";

  const renderSquare = (i) => {
    return <Square />;
  };

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};

export default Board;
```

> Note: Make a habit of defining properties as `const`, they may change values in different renders, but assure their immutability for the current render. If a property needs its value changed, then use `let` instead of `var` (...[read more](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let#Block_scope_with_let)).

> Note: Curly brackets `{}` only injects JSX or prints out strings, if you try to print out an `object` it will not work. For `bool`s and `array` values you can quickly convert them to strings with literals: `` {`${true || []}`} ``.

# Passing Data Between Components

## Props

In React, data can be easily **passed down** through the component's hierarchy with the use of `props`. Those properties are forwarded from the parent component to the child component using a syntax similar to HTML:

```javascript
const ParentComponent = () => (
  <ChildComponent
    stringProp=""
    intProp={0}
    boolProp={true}
    arrayProp={[0, 1]}
    objectProp={{ key: "value" }}
    functionProp={() => {
      console.log("function");
    }}
  />
);
```

Those values can be accessed by the `ChildComponent` via an object always passed to React Components called `props`. We can also easily access those properties by deconstructing the desired values already in the function arguments definition, as it is done with `functionProp` in the example below.

```javascript
const ChildComponent = ({ functionProp, ...props }) => {
  const { stringProp, intProp, boolProp, arrayProp, objectProp } = props;

  functionProp({ stringProp, intProp, boolProp, arrayProp, objectProp });

  return null;
};
```

> Notes:
> Anything besides a `string` should be passed between curly brackets.
> You can discontruct just a few props in the function arguments and leave the rest as part of the `props` object (or any other name) by using the spread operator like the example above.

## Passing a Prop

In the `Board.js`, let's alter our method `renderSquare(i)` to forward its `i` value to each of the different `<Square />` components created. To take advantage of the arrow function syntax, we can omit here the curly brackets and `return` statement. We will pass the value of `i` as a prop named `value`.

```javascript
...

const renderSquare = (i) => <Square value={i} />;

...
```

Now we can alter our `Square` component to access and display the `value` prop. We can pass a variable called props as an argument (`Square = (props) =>`) and access its property with `props.value`, or simply use the disconstruction syntax as follow:

```javascript
...

const Square = ({ value }) => {
  return <button className="square">{value}</button>;
};

...
```

Now the board should show each index number in their correspondent squares.

## Type Check

JavaScript is a dynamic and weak typed language. Due to this characteristic, the type of `value` in `<Square />` can easily change in the parent component before being forwarded to the child component. In our case, we are directly injecting the `value` prop as a button label.If, for example, its type changes from a `number` to an `object` it can cause our program to break. One solution for type safety would be to use TypeScript (there are several cons and pros for that... I wont touch those in this tutorial). Another solution is to use a package provided with React called [PropTypes](https://reactjs.org/docs/typechecking-with-proptypes.html).

With PropTypes, we can define what are the expected types of our props and if they are required or not. In the case of a failure, an error message will appear in the console, making debugging our application much easier. Keeping a component's `propTypes` property up-to-date also helps in documenting what exactly a component expects to be provided with, so in the future we can simply look at it to understand how to implement said component. In the example below, `MyComponent` expects an object `textOptions` containing the properties `color` and `fontSize` of types `string` and `number` respectively.

```javascript
MyComponent.propTypes = {
  textOptions: PropTypes.shape({
    color: PropTypes.string.isRequired,
    fontSize: PropTypes.number.isRequired,
  }).isRequired,
};
```

To use PropTypes, first we need to import it at the top of our file. Now we can add a propType property to `Square` and make sure that we are receiving a `number` as a prop. To be sure we have a label to our button, we will mark it as _required_. If the `value` passed to the component doesn't meet these requirements, an error will show in the console. Here is how the final component looks like:

```javascript
import React from "react";
import PropTypes from "prop-types";

const Square = ({ value }) => {
  return <button className="square">{value}</button>;
};

Square.propTypes = {
  value: PropTypes.number.isRequired,
};

export default Square;
```

> Note: The property `propTypes` must always be defined **after** we have declared our component.

# Making an Interactive Component

# Lifting State Up

# Taking Turns

# Declaring a Winner

# Create a Custom Hook

# Create a History Nagivator

# Final Thoughts
