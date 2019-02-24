# util-promisifyAll

[![Greenkeeper badge](https://badges.greenkeeper.io/charlieduong94/util-promisifyAll.svg)](https://greenkeeper.io/)

`bluebird`'s `promisifyAll` implemented with node 8.x's builtin `util.promisify`. For those
times when you don't want to pull in all of `bluebird` just to promisify some functions.

### Installation

```bash
npm i util-promisifyall
```

### Example Usage
This library wraps any traditional callback-based library and attempts
to promisify any function exported by the module or its prototype.

It does so by creating and exposing a "promisified" version of each function,
which can then be invoked by appending `Async` to the old function name, such as:

```
const promisifyAll = require('util-promisifyall'); // note lowercase 'a' in 'all'
const fs = promisifyAll(require('fs'));

const readDir = async (dir) => {
  try {
    const res = await fs.readdirAsync(dir);
    console.log(res);
    return res;
  } catch (error) {
    throw error;
  }
}
```