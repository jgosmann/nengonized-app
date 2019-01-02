export interface IRelayNode {
  id: string
}

export interface ILabeledObject extends IRelayNode {
  label: string
}

export interface INengoEnsemble extends ILabeledObject {
}

export interface INengoNetwork extends ILabeledObject {
  label: string
  ensembles: INengoEnsemble[]
  networks: INengoNetwork[]
}

export interface IKernel<NodeT extends IRelayNode> {
  model: INengoNetwork
  node: NodeT
}
