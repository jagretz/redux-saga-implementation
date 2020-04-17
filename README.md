An example implementation of
[redux-saga](https://github.com/redux-saga/redux-saga).

The only purpose of this project was to gain an better understanding of how
sagas _can_ be implemented. Scope and functionality are limited to just a couple
features of the much larger saga [API](https://redux-saga.js.org/docs/api/).

The app loads up a simple UI that displays a random image of a cat. Read through
the comments in [effects.js](./src/effects.js) and [./src/Saga](./Saga.js) to
understand how they work together to create a sample implementation of
redux-saga.

_The project has been bootstrapped with
[create-react-app](https://github.com/facebook/create-react-app)._

## Usage

Clone this repository, and

```bash
npm install
npm start
```

## References

- [redux-saga](https://redux-saga.js.org/)
- [Original paper](http://www.cs.cornell.edu/andru/cs711/2002fa/reading/sagas.pdf)
  By Hector Garcia-Molina & Kenneth Salem on "Sagas"
- [Applying the Saga Pattern (Youtube video)](https://www.youtube.com/watch?v=xDuwrtwYHu8)
  By Caitie McCaffrey

## Contributing

N/A; this is just a sample project.

## License

See [LICENSE.md](./LICENSE.md)
