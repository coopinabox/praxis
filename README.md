# tasks

[![server tests](https://travis-ci.org/holonomy/tasks.png)](https://travis-ci.org/holonomy/tasks)
[![npm version](https://badge.fury.io/js/holonomy-tasks.png)](https://npmjs.org/package/holonomy-tasks)
[![dependency status](https://david-dm.org/holonomy/tasks.png)](https://david-dm.org/holonomy/tasks)
[![devDependency status](https://david-dm.org/holonomy/tasks/dev-status.png)](https://david-dm.org/holonomy/tasks#info=devDependencies)

[![browser tests](https://ci.testling.com/holonomy/tasks.png)](https://ci.testling.com/holonomy/tasks)

### IN PROGRESS

a holonic task management system

## how to install

- [nvm](https://github.com/creationix/nvm): node version manager
- [nodejs](http://nodejs.org): javascript interpreter
- [npm](http://npmjs.org): javascriptpackage manager

first you'll need to make sure your system has a c++ compiler. For OSX, XCode will work, for Ubuntu, the build-essential and libssl-dev packages work.

```
git clone https://github.com/creationix/nvm.git ~/.nvm
source ~/.nvm/nvm.sh
nvm install 0.10
nvm use 0.10
nvm alias default 0.10
```

it's a good idea to put the 2nd line in your ~/.bashrc, ~/.zshrc, ~/.profile, etc to source nvm automatically upon login.

### tasks

```
git clone https://github.com/holonomy/tasks
npm install
```

## how to run

```
npm run start
```
browse to [localhost:5000](http://localhost:5000)

## how to develop

```
npm run develop
```

## how to test

```
npm run test
```

- to run integration tests, you need to install [`phantomjs`](http://phantomjs.org/)
  - `[sudo] npm install -g phantomjs`
- to run client tests, you need to install [`xvfb`](http://packages.debian.org/stable/xvfb)
  - `[sudo] apt-get install xvfb`
