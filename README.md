# praxis

[![server tests](https://travis-ci.org/coopinabox/praxis.png)](https://travis-ci.org/coopinabox/praxis)
[![npm version](https://badge.fury.io/js/coopinabox-praxis.png)](https://npmjs.org/package/coopinabox-praxis)
[![dependency status](https://david-dm.org/coopinabox/praxis.png)](https://david-dm.org/coopinabox/praxis)
[![devDependency status](https://david-dm.org/coopinabox/praxis/dev-status.png)](https://david-dm.org/coopinabox/praxis#info=devDependencies)

[![browser tests](https://ci.testling.com/coopinabox/praxis.png)](https://ci.testling.com/coopinabox/praxis)

### IN PROGRESS

a holonic action delegation system for Coop-in-a-Box

## how to install

- [nvm](https://github.com/creationix/nvm): node version manager
- [nodejs](http://nodejs.org): javascript interpreter
- [npm](http://npmjs.org): javascript package manager

first you'll need to make sure your system has a c++ compiler. For OSX, XCode will work, for Ubuntu, the build-essential and libssl-dev packages work.

```
git clone https://github.com/creationix/nvm.git ~/.nvm
source ~/.nvm/nvm.sh
nvm install 0.10
nvm use 0.10
nvm alias default 0.10
```

it's a good idea to put the 2nd line in your ~/.bashrc, ~/.zshrc, ~/.profile, etc to source nvm automatically upon login.

```
git clone https://github.com/coopinabox/praxis
npm install
```

## how to run

```
[sudo] npm run start
```
browse to [localhost](http://localhost)

## how to develop

```
npm run develop
```
browse to [localhost:5000](http://localhost:5000)

## how to test

```
npm run test
```

- to run integration tests, you need to install [`phantomjs`](http://phantomjs.org/)
  - `[sudo] npm install -g phantomjs`
- to run client tests, you need to install [`xvfb`](http://packages.debian.org/stable/xvfb)
  - `[sudo] apt-get install xvfb`
