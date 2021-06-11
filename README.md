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
3. The exercise is meant to help you think and build a mental model

More about our [teaching method here](https://reactgraphql.academy/blog/react-graphql-academy-teaching-method/).

## Prerequisites

You need to be comfortable writing JavaScript, HTML, and React to do this exercise. Some experience with Nextjs and Webpack will be helpful but not required.

## Getting started

```console
git clone https://github.com/hopin-team/module-federation-workshop
cd module-federation-workshop
yarn
yarn start
```

## 🥑 Before we start the exercise

- ⚠️ Disclaimer, this is not meant to be a Webpack workshop
- Explain briefly the two apps we have `chat` and `host` and how they are set up:
  - `chat/package.json` scripts: `"start": "webpack serve"`
  - How does HtmlWebpackPlugin work?
  - Explain chat/src/index.js: `const root = document.getElementById("root-chat");`. Idem `host` app.
- Demo `chat` here http://localhost:8888/ and `host` here http://localhost:8887/

Our goal is to easily and efficiently share `chat` in a way that can be embedded in `host`.

- Add ModuleFederationPlugin to chat and explain steps:

```
 new ModuleFederationPlugin({
    name: "chat",
    filename: "remoteEntry.js",
    exposes: {
        "./App": "./src/index.js",
    },
}),
```

- Now we could `import ChatApp from "chat/App"`. Explain `scope` vs `module`.

## 🧘🏾‍♀️ Warming up

Your turn:

- Add Module Federation to your `chat`.
- Add Module Federation to your `host`. Hint, instead of defining the `exposes` key in ModuleFederationPlugin you must define:

```
    remotes: { [some-name]: `${scope}@{remoteUrl}/${filename}` }
```

🚨 Heads up, even if you define `host/webpack.config.js` correctly you should see this error `Uncaught TypeError: Cannot read property 'call' of undefined` in http://localhost:8887/. Do you identify the non trivial issue?
