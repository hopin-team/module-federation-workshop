# Module Federation Workshop

by [@alex_lobera](https://twitter.com/alex_lobera)

## We are hiring

Do you want to join Hopin and work on cutting-edge microfrontends? See [open roles here](https://hopin.com/careers).

## Learning objectives

- Configure Webpack Module Federation
- Define and use explict boundaries between independent microfrontends
- Apply different routings between independent microfrontends
- Implement framework agnostic communication between microfrontends
- Identify pros and cons of microfrontends

## Teaching method

1. ⬆️ Discovery ⬇️ Instruction
2. Learn by coding (and explaining things to your peers)
3. The exercise is meant to help you think and build a mental model. You are not meant to know how to do everything the exercise asks you to do.

More about our [teaching method here](https://reactgraphql.academy/blog/react-graphql-academy-teaching-method/).

## Prerequisites

You need to be comfortable writing JavaScript, HTML, and React to do this exercise. Some experience with Nextjs and Webpack will be helpful but not required.

## Getting started

```console
git clone git@github.com:hopin-team/module-federation-workshop.git
cd module-federation-workshop
yarn
yarn start
```

## Part 1: Plain JavaScript

### 🥑 Before JS exercise 1

A) ⚠️ Disclaimer, this is not meant to be a Webpack workshop.

B) Trainer explains briefly the two apps we have `chat` and `host` and how they are set up:

- `chat/package.json` scripts: `"start": "webpack serve"`
- How does HtmlWebpackPlugin work?
- Explain chat/src/index.js: `const root = document.getElementById("root-chat");`. Idem `host` app.

C) Trainer demo `chat` here http://localhost:8888/ and `host` here http://localhost:8887/

D) Our goal is to easily and efficiently share `chat` within `host`. We'll do that by adding ModuleFederationPlugin to `chat`. Trainer explains steps:

```js
 new ModuleFederationPlugin({
    name: "chat",
    filename: "remoteEntry.js",
    exposes: {
        "./App": "./src/index.js",
    },
}),
```

E) Now we could `import ChatApp from "chat/App"` from a remote app. Trainer explains `scope` vs `module`.

### 🤸‍♀️ JS exercise 1

Your turn:

1- Add Module Federation to your `chat`.

2- Go to http://localhost:8888/ and try to identify in the network tab where `txtgen` is being downloaded.

3- Add Module Federation to your `host`. Hint, instead of defining the `exposes` key in ModuleFederationPlugin you must define:

```js
// no need to interpolate the template literals, just hardcode the string
// the template literal is just to hint you the value
remotes: {
  chat: `${scope}@{remoteUrl}/${filename}`;
}
```

4- `import` the remote `chat` module `App` in `host/src/index.js`

🚨 Heads up 1. Even if you define the `host/webpack.config.js` and the `import` correctly you should still get this error `Uncaught TypeError: Cannot read property 'call' of undefined` in http://localhost:8887/. There is a non trivial issue, do you identify it? Hint, we need do add some async boundary somewhere so `webpack` has time to resolve the import.

🚨 Heads up 2. When you fix the previous error you'll get a new one `Uncaught (in promise) TypeError: Cannot read property 'append' of null`. How do you fix it? Hint: you need to add something in `host/public/index.html` to append the `chat`.

### 🥑 Before JS exercise 2

A) Everyone goes to the root directory of the project and:

- Stop Webpack
- Run `git checkout exercise-2 && yarn && yarn start`

B) Show trainees http://localhost:8888/ network tab and where `txtgen` is. Why is in a separate text? `src/chat/webpack.config.js` shared key.

C) In `chat` we also had to add `src/bootstrap.js` and import it async in `src/index.js`. Why do we have to do that if we don't import any remote module in `chat`? Hint, replace `import("./bootstrap");` with `import "./bootstrap";` in `chat/src/index.js`, navigate to http://localhost:8888/ and look at the console tab on the browser.

### 🤸‍♀️ JS Exercise 2

1- Add `txtgen` as a shared package in `sessions`. Make sure that http://localhost:8886/ works. Hint: add an async boundary in the entry point.

2- Why do you think it's useful in our case to add `txtgen` as a shared package to both `sessions` and `chat`? Hint, go to http://localhost:8887/ and look at the network tab.

3- What do you think will happen if sessions uses `txtgen` version 1 and `txtgen` version 2?

### 🥑 Before JS exercise 3

Well done! you've built a good Module Federation foundation. Now it's time to create better boundaries between `chat`, `sessions`, and `host`. We'll use the same branch.

Trainer:

A) Rename `id=”root-chat”` to `id=”root-chat-dev”` in `chat/public/index.html`.

B) Create a `mount` function in `chat/src/bootstrap.js`. Pass to it the DOM element to which we want to insert the content. If `process.env.NODE_ENV === "development"` and we found `root-chat-dev` then the call `mount`.

C) Add `export default mount` in `chat/src/bootstrap.js`

D) In `chat/webpack.config.js` replace:

```js
exposes: {
    "./App": "./src/index.js",
},
```

with

```js
exposes: {
    "./App": "./src/bootstrap.js",
},
```

### 🤸‍♀️ JS exercise 3

1- Everyone goes to the root directory of the project and:

- Stop Webpack
- Run `git checkout exercise-3 && yarn && yarn start`

2- Create a `mount` function in `sessions/src/bootstrap` and import it in `host` similiarly to what we just did in `chat`.

### 🏋️‍♀️ Bonus JS exercise 3

3- If the `host` was a React app and we wanted to mount `sessions` inside the `host` component tree, how would you invoke `mount(el)` in the `host`? Hint: you need a reference to a DOM element.

## Part 2: React

### 🥑 Before React exercise 1

A) (Only trainer) run `git checkout react && yarn && yarn start`

B) Demo http://localhost:8887 and walk through code `chat/src/bootstrap.js` and `chat/src/components/App.jsx` (same for `sessions` and `reception`).

C) Comment out `<div id="root-chat"></div>` in `src/host/public/index.html`

D) In `host/src/components` create component `ChatApp`. Mount reception in a `div` rendered by React in `ChatApp`.

E) Render `ChatApp` component in `host/src/components/App.jsx`. Remove `mountChat` from `host/src/bootstrap.js`

### 🤸‍♀️ React exercise 1

1- (Everyone) run `git checkout react-exercise-1 && yarn && yarn start`

2- Create the `SesssionsApp` component in `host/src/components` similarly to the previous `ChatApp`.

3- Render `SessionsApp` in `host/src/components/App.jsx`.

4- Go to http://localhost:8887 and check the network tab.

- A) How many instances of React does it download?
- B) How many instances of React DOM does it download?
- C) How many instances of React Router does it download?
- D) Can you fix it so it only downloads 1 instance of each? Hint: Are you going to manually share dependencies every time you update `package.json`? What if you import `package.json` and use it in `webpack.config.js`?

### 🏋️‍♀️ Bonus React exercise 1

5- Create `ReceptionApp` and render it in `host/src/components/App.jsx`. Can you abstract out some code instead of copy & pasting from `host/src/components/ChatApp`?

6- Can we export `reception/src/components/Schedule.jsx` in the Reception ModuleFederationPlugin `exposes` property? Would it make sense to do that?

### 🥑 Before React exercise 2

We are going to add some soft navigation (no full page reload) between the host and the remotes.

⚠️ Everyone run `git checkout react-exercise-2 && yarn && yarn start`

#### Navigation from host to remote:

A) If we navigate to http://localhost:8887 and click "Reception" on the menu the content of the page doesn't change. If we reload the page from http://localhost:8887/reception it show the reception component. Let's fix this.

B) In `reception/src/bootstrap.js` create a history object in mount using `createMemoryHistory();` from the package `history` and pass it to `<App history={history}/>` in `ReactDOM.render`.

C) Replace `BrowserRouter` with `Router` in `reception/src/components/App` and pass the prop `history` to `<Router history={history}>`.

D) In the `mount` function in `reception/src/bootstrap.js` return the following:

```js
return {
  onHostNavigate: (pathname) => {
    history.push(pathname);
  },
};
```

E) In `host/src/components/MountMF` destructure `onHostNavigate` from `mount(` and `return history.listen((e) => onHostNavigate(e.pathname));`. Use `useHistory` to get the `history` object in `MountMF`.

🙌 At this point if we click on "Reception" in http://localhost:8887 it should work.

🙋 **Any questions?**

⚠️ Avoid infinite loops in the future. In `reception/src/bootstrap.js` add:

```js
onHostNavigate: (nextPathname) => {
    const { pathname } = history.location;
    if (nextPathname !== pathname) history.push(nextPathname);
},
```

#### Navigation from remote to host

Now if reload the page in http://localhost:8887/reception it doesn't work.

A) In `host/src/components/MountMF` we pass a second argument `{ onNavigate }` to the `mount` function. Now we pass a callback (`onNavigate`) that the `remote` will invoke when it changes a route. `onNavigate` will update the `host` history if the pathname is different:

```
onNavigate: (nextPathname) => {
    const { pathname } = history.location;
    if (pathname != nextPathname) history.push(nextPathname);
},
```

B) Destructure `onNavigate` from the `mount` 2nd argument (default = {}) in `reception/src/bootstrap.js`. If `onNavigate` then add a listener to `history` that invokes `(e) => onNavigate(e.pathname)`

### 🤸‍♀️ React exercise 2

1- Implement navigation between `host` and `reception` and `reception` and `host` as we just did. You'll know it works because you'll be able to navigate to reception by clicking on "Reception" on the navigation bar. Once in reception you'll be able to navigate to `sessions` by clicking on "Session 123"

2- Once you implement the previous point full page reloads won't work anymore. When we reload http://localhost:8887/reception we see now the home page instead of `reception`. Same thing happens in http://localhost:8887/sessions. Can you fix that? Hint: get the `pathname` in the `host`, pass it to `mount` and then `push` it to `history` before calling `ReactDOM.render`.

3- Display the `chat` app inside `Session.jsx` component above the video.

### 🏋️‍♀️ Bonus React exercise 2

4- If you navigate to http://localhost:8885/sessions or http://localhost:8886/reception you'll see that the remotes don't work in isolation anymore. How can you fix that? Hint, `reception` and `sessions` should not be rendered with memory history when they are not mounted by the `host`. What other history have we used?

5- Open the React dev tools and select the "Components" tab. In the home page (http://localhost:8887) you'll see that there are 3 React apps. In the home page we don't display `sessions` nor `reception`, why should we mount them? How would you mount only one React app on http://localhost:8887 ?

## Part 3: Nextjs

### 🥑 Before Nextjs exercise

Nextjs current version (11.0.0) doesn't fully support Module Federation (oh 😞). The reason being Nextjs does not have an async boundary for Webpack to resolve modules in the shared scope. When using `dynamic from "next/dynamic"` shared packages, such as React, are downloaded more than once.

The workaround is to load the [remote containers dynamically without SSR](https://github.com/module-federation/module-federation-examples/pull/835).

A) Run `git checkout nextjs && yarn && yarn start`

B) Let me walk you through this code `src/nextjs/components/LoadNextMF`. ⚠️ Notice we've added an `unmount` function to `chat/src/bootstrap.js`.

C) Mount chat in `nextjs/pages/index.js` using `src/nextjs/components/LoadNextMF`

D) How can we mount `chat` if there is no `remotes` in `nextjs/next.config.js`?

### 🤸‍♀️ Nextjs exercise

1- Everyone goes to the root directory of the project and:

- Stop Webpack
- Run `git checkout nextjs-exercise-1 && yarn && yarn start`

2- In http://localhost:3001/reception how many copies of React do we download? Can you find where we are downloading React in the networking tab?

3- We have not implemented any `host` to `remote` navigation nor the other way around. There is neither `onHostNavigate` nor `onNavigate` callbacks on `host/src/components/LoadNextMF.jsx`. How can we click on "Reception" in the navigation bar from http://localhost:3001/ and navigate to http://localhost:3001/reception?

4- In http://localhost:3001/reception if you click on "Expo 1" the navigation doesn't work. Can you fix it? Hint, you'll need to use `useRouter` from `next/router` to [push](https://nextjs.org/docs/api-reference/next/router#routerpush) a `pathname` in `LoadNextMF.jsx`. Tip: pass `{ shallow: true }` when pushing a route since we only need client-side navigation.

5- Implenent page http://localhost:3001/expo and http://localhost:3001/expo/1. In this case `expo` and `expo/1` are 2 pages in 1 microfrontend, do we need to implement router listeners to navigate from `host` to `remote`? You can test this by clicking on "Expo 1" on the navigation should display Expo 1 and not Expo list.

⚠️ Tip: you can use this [routeChangeStart event](https://nextjs.org/docs/api-reference/next/router#routerevents) to implmement a listener. Pro-tip: don't forget to cleanup listeners with `router.events.off` if you add any listener.

6- Do you think we should use the rest operator in `nextjs/components/LoadNextMF.jsx` and then spread it in `MountMF` and `mount`? Or is it better to explicitly pass each argument as we currently do? Which approach is more future-proofed? Snippet of the proposed change:

```js
export default function LoadNextMF({
  url,
  scope,
  module,
  errorComponent: ErrorComponent = () => "There was an error",
  loadingComponent: LoadingComponent = () => "...",
  ...rest // 👈
}) {
  // some code
}

//                           👇
function MountMF({ mount, ...rest }) {
  const ref = useRef();

  useEffect(() => {
    const { unmount } = mount(ref.current, {
      // some arguments
      ...rest, // 👈
    });

    return unmount;
  }, [
    ref.current,
    mount,
    ...Object.values(rest), // 👈
  ]);

  return <div ref={ref} />;
}
```

### 🏋️‍♀️ Bonus Nextjs exercise

7- Comment out the following line in `nextjs/next.config.js`:

```js
react: {
  // eager: true,  👈 comment out this line
  requiredVersion: packageJsonDeps.react,
},
```

Then stop Webpack and run `yarn start` again. You should see this error `Uncaught Error: Shared module is not available for eager consumption`. What does the error mean?

8- Add `chat` to `session`. Do you need to use `LoadNextMF.jsx`?
