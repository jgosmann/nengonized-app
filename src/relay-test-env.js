import {
  Environment,
  Network,
  RecordSource,
  Store
} from 'relay-runtime'


function fetchQuery(operation, variables) {
  return new Promise((resolve, reject) => {
    resolve()
  })
}


function subscribe(request, variables, cacheConfig, observer) {
  return {
    dispose: () => {
    }
  }
}

const store = new Store(new RecordSource())
const relayTestEnv = new Environment({
  network: Network.create(fetchQuery, subscribe),
  store: store,
})

export { store }
export default relayTestEnv
