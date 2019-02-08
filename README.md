# util-promisifyAll

`bluebird`'s `promisifyAll` implemented with node 8.x's builtin `util.promisify`. For those
times when you don't want to pull in all of `bluebird` just to promisify some functions.

### Installation

```bash
npm i util-promisifyall
```

### Example Usage
This library wraps a any callback-based library and attempts to promisify
any function available on the module's export or its prototype.

It creates and exposes a "promisified" version of each function, which can
then be invoked by appending `Async` to the old function name, such as:

```
const promisifyAll = require('util-promisifyall'); // note lowercase 'a' in 'all'
const fs = promisifyAll(require('fs'));

const readDir = async (dir) => {
  try {
    const res = fs.readdirAsync(dir);
    console.log(res);
  } catch (error) {
    throw error;
  }
}
```