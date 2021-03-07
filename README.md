# React TODO Sample Remix 2021

* This is a React classic sample TODO app in a current 2021 way.
* tried to be a real world example includes backend API and tests.
* using the latest version, tools and practices as of 2021.03.
  - TypeScript
  - Function Component
  - React Hooks (useState, useReducer, createContext, custom hook)
  - Material-UI and makeStyles (not App.css)
  - Tests with Jest and React Testing Library (not Enzyme)
  - Mock Service Worker
* remixed official docs and best practices found in various blogs.
* hoping to be a simple hello world example for reference.

## Key Points Summary

* `useReducer` is similar to `useState` but for complex state
* move logics from view to custom hooks and reducer if needed
* use the latest tools (RTL, MSW) for readable test

## Setup

```bash
# https://github.com/facebook/create-react-app
npx create-react-app todo-ts --template typescript
cd todo-ts

# https://material-ui.com/getting-started/installation/
# https://material-ui.com/guides/typescript/
npm install @material-ui/core @material-ui/icons @material-ui/lab
# add Roboto Font to public/index.html in the line before manifest

npm install axios
npm install json-server msw --save-dev
```

## Test and Run

```bash
# run backend server (note: waitFor default timeout = 1000ms)
npx json-server --delay 500 db.json
# run app
PORT=4000 BROWSER=none npm start
open http://localhost:4000

# run test
npm test
# run test only one file
npm test -- App.test.tsx
# test with coverage
npm test -- --coverage
open coverage/lcov-report/index.html
# https://facebook.github.io/create-react-app/docs/running-tests

# build for production
npm run build
# https://facebook.github.io/create-react-app/docs/deployment
```

## Backend Json Server

* Json Server is a simple backend server for development

```bash
# start
npx json-server db.json

# http://localhost:3000/db
# http://localhost:3000/todo
# http://localhost:3000/todo/1

# todo by curl
# create (id is auto increment)
curl -X POST -H 'Content-Type: application/json' \
  --data-binary '{"title": "Foo", "done": false}' \
  --dump-header /dev/stdout \
  http://localhost:3000/todo
# update
curl -X PUT -H 'Content-Type: application/json' \
  --data-binary '{"id": 3, "title": "Foo", "done": true}' \
  --dump-header /dev/stdout \
  http://localhost:3000/todo/3
# delete
curl -X DELETE \
  --dump-header /dev/stdout \
  http://localhost:3000/todo/3
```

## App Structure

* `App` (tasks)
  - `TaskInput`  {createTask}
  - `TaskList`   {tasks}
    - `TaskItem` {task, updateTask, deleteTask}

## Reference

### about App

* React.js + TypeScript でTodoアプリを作ってみる
  - https://www.webopixel.net/javascript/1598.html
* Reactの標準機能（useContext/useReducer）でステート管理
  - https://www.webopixel.net/javascript/1647.html
* Interacting With RESTful APIs Using TypeScript, React Hooks, and Axios.
  - https://medium.com/swlh/interacting-with-restful-apis-using-typescript-react-hooks-and-axios-part-1-af52920ae3e4
* React Hooks Tutorial
  - https://www.youtube.com/watch?v=cF2lQ_gZeA8&list=PLC3y8-rFHvwisvxhZ135pogtX7_Oe3Q3A
* Hooks FAQ
  - https://reactjs.org/docs/hooks-faq.html
* React Hooksでデータを取得する方法
  - https://qiita.com/ossan-engineer/items/c3853315f59dc20bc9dc
* React Hooksとカスタムフックが実現する世界 - ロジックの分離と再利用性の向上
  - https://qiita.com/sonatard/items/617f324228f75b9c802f

### about Test

* React Testing Libraryの使い方
  - https://qiita.com/ossan-engineer/items/4757d7457fafd44d2d2f
* Common mistakes with React Testing Library
  - https://kentcdodds.com/blog/common-mistakes-with-react-testing-library
* Async Methods
  - https://testing-library.com/docs/dom-testing-library/api-async/
* Mock Service Worker
  - https://mswjs.io/docs/
* Use Mock Service Worker and Test Like a User
  - https://www.youtube.com/watch?v=v77fjkKQTH0
