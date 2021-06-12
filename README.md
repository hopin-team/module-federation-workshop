# Moduel Federation Workshop

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

## 🥑 Before exercise 1

A) ⚠️ Disclaimer, this is not meant to be a Webpack workshop.

B) Trainer explains briefly the two apps we have `chat` and `host` and how they are set up:

- `chat/package.json` scripts: `"start": "webpack serve"`
- How does HtmlWebpackPlugin work?
- Explain chat/src/index.js: `const root = document.getElementById("root-chat");`. Idem `host` app.

C) Trainer demo `chat` here http://localhost:8888/ and `host` here http://localhost:8887/

D) Our goal is to easily and efficiently share `chat` within `host`. We'll do that by adding ModuleFederationPlugin to `chat`. Trainer explains steps:

```
 new ModuleFederationPlugin({
    name: "chat",
    filename: "remoteEntry.js",
    exposes: {
        "./App": "./src/index.js",
    },
}),
```

E) Now we could `import ChatApp from "chat/App"` from a remote app. Trainer explains `scope` vs `module`.

## 🤸‍♀️ Exercise 1

Your turn:

1- Add Module Federation to your `chat`.

2- Go to http://localhost:8888/ and try to identify in the network tab where `txtgen` is being downloaded.

3- Add Module Federation to your `host`. Hint, instead of defining the `exposes` key in ModuleFederationPlugin you must define:

```
    remotes: { chat: `${scope}@{remoteUrl}/${filename}` }
```

4- `import` the remote `chat` module `App` in `host/src/index.js`

🚨 Heads up 1. Even if you define the `host/webpack.config.js` and the `import` correctly you should still get this error `Uncaught TypeError: Cannot read property 'call' of undefined` in http://localhost:8887/. There is a non trivial issue, do you identify it? Hint, we need do add some async boundary somewhere so `webpack` has time to resolve the import.

🚨 Heads up 2. When you fix the previous error you'll get a new one `Uncaught (in promise) TypeError: Cannot read property 'append' of null`. How do you fix it? Hint: you need to add something in `host/public/index.html` to append the `chat`.

## 🥑 Before exercise 2

A) Go to the root directory of the project and:

- Stop Webpack
- Run `git checkout exercise-2`
- Run `yarn`
- Run `yarn start`

B) Show trainees http://localhost:8888/ network tab and where `txtgen` is. Why? `src/chat/webpack.config.js` shared key.

C) In `chat` we also had to add `src/bootstrap.js` and import it async in `src/index.js`. Why if we don't import any remote module in `chat`? Hint, replace `import("./bootstrap");` with `import "./bootstrap";` in `chat/src/index.js`.

## 🤸‍♀️ Exercise 2

1. Add `txtgen` as a shared package in `sessions`. Make sure that http://localhost:8886/ works. Hint: add an async boundary in the entry point.

2. Why do you think it's useful in our case to add `txtgen` as a shared package to both `sessions` and `chat`? Hint, go to http://localhost:8887/ and look at the network tab.

3. What do you think will happen if sessions uses `txtgen` version 1 and `txtgen` version 2?
