import {
  Environment,
  Network,
  RecordSource,
  Store
} from 'relay-runtime'


const query_ws = new WebSocket('ws://localhost:8998/graphql')
const subscription_ws = new WebSocket('ws://localhost:8998/subscription')


// FIXME this should be converted to pure HTTP or handle out of order responses
function fetchQuery(operation, variables) {
  query_ws.send(operation.text)
  return new Promise((resolve, reject) => {
    query_ws.onmessage = e => {
      resolve({data: JSON.parse(e.data)})
    }
  })
}


let next_subscription_id = 0
// FIXME handle variables and cacheConfig
// FIXME overwriting of event handlers
function subscribe(request, variables, cacheConfig, observer) {
  const subscriptionId = next_subscription_id++
  subscription_ws.send(JSON.stringify({
    action: 'subscribe',
    subscriptionId,
    query: request.text,
    variables: variables,
  }))
  subscription_ws.onmessage = e => {
    observer.onNext({data: JSON.parse(e.data)})
  }
  subscription_ws.onerror = e => {
    console.log(e)
    // FIXME error handling
  }
  return {
    dispose: () => {
      subscription_ws.send(JSON.stringify({
        action: 'unsubscribe',
        subscriptionId,
      }))
    }
  }
}

const store = new Store(new RecordSource())
const environment = new Environment({
  network: Network.create(fetchQuery, subscribe),
  store: store,
})

export { query_ws, store, subscription_ws }
export default environment
