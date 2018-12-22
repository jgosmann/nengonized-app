import {
    Environment,
    Network,
    RecordSource,
    Store
} from 'relay-runtime';


let ws = null

function setWs(v) {
    ws = v
}

function hasWs() {
    return typeof(ws) !== 'undefined' && ws !== null
}

function fetchQuery(operation, variables) {
    ws.send(operation.text)
    return new Promise((resolve, reject) => {
        ws.onmessage = e => {
            resolve({data: JSON.parse(e.data)})
        }
    })
}


const environment = new Environment({
    network: Network.create(fetchQuery),
    store: new Store(new RecordSource()),
});

export { hasWs, setWs };
export default environment;
