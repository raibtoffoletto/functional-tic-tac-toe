# Functional Tic-Tac-Toe

React is a modern and versitile JavaScript library with different forms of implementation. This is an adaptation of the official [Intro to React Tutorial](https://reactjs.org/tutorial/tutorial.html) using the more current way of writing React with Functional Components and Hooks instead of JavaScript classes.

In this tutorial we will build a simple Tic-Tac-Toe game. It assumes you are familiar with some React concepts (the previous mentioned tutorial is a good place to start) and with modern JavaScript (basic knowledge of modules, the spread operator **[...]** or arrow functions **( )=>{ }**, for example). Also, it presumes that you understand and can use tools like git, node, npm and the command line in any OS of choice (Mac, Windows or Linux).

**Setup**

You should have a local development evironment set up or use a service like [Codepen](https://codesandbox.io) or [CodeSandbox](https://codesandbox.io) if you wish to follow on your browser.

_If you need help setting up your evironment, the official tutorial has a well written section dedicated to it =D ._

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

## Starter Code

### So, what is React exactly?

The official tutorial defines React as _"a declarative, efficient, and flexible JavaScript library for building user interfaces"_. There are several resources online defining it better, but suffise to say that, React is a very powerful library that lets you write for the web in a modular way. It dynamically creates, updates, and removes DOM elements from your page, _REACTing_ to the user's actions and inputs.

React Components can be JavaScript classes or functions and will return a JSX element to be rendered. JSX is a special syntax that looks like traditional HTML but is actually a collection of react elements. The example bellow illustrates a simple React Functional component that return a JSX snippet:

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

It looks like traditional HTML, but with some key differences, note that to give a css class to a `<div>` we need to use className, that is because class is a JavaScript type. Also, simple JavaScript can be injected using {} and we can easily pass properties to a component like the `key={}` in `<li>`. Custom components can be inserted to the page as it was a HTML tag (`<MyAppFooter />`). More details about JSX will appear during this tutorial.

### The Initial Project

Let's have a look at the folder structure of so far:

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

The files at `root` level are not that much important for us right now, they contain information about packages and scripts of our application, they won't be present in the final build.

The `public` folder contain all static files of our app: favicon and logos, a manifest for [PWAs](https://pt.wikipedia.org/wiki/Progressive_web_app), intructions for web crawlers and other ([robots](https://en.wikipedia.org/wiki/Robots_exclusion_standard)) and our traditional index.html where our app code will be inject by React.

Our main interest is the `src` directory. It contains all the source code for our application that later will be compiled into static files. There are no conventions here how we should organize our code, the only requirement is to have a valid `index.js` so the compiler knows where to start. I like to break up my code in several directories and make use of JavaScript modules, this helps to keep the code clean and maintainable.

I usually create a folder named `views` to contain all main views/routes of the app, here it only contains one: `Game.js`, in a bigger application this can maybe have a `Contact.js`, `HomePage.js`, `SignIn.js`, etc...

There is also a folder named `components` that will have all the pieces we will use to build our views. I tend to create sub directories with the same name of my views to keep them organized in a logical way, but since this is a simple app every thing is on the its root.

## Passing Data Through Props

## Making an Interactive Component

## Lifting State Up

## Taking Turns

## Declaring a Winner

## Create a Custom Hook

## Create a History Nagivator

## Final Thoughts
