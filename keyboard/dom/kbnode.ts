class KBNodeData {

}

export class KBNode {
  public tag: string;
  public data: KBNodeData;
  public children: Array<KBNode>;
  public text: string;
  public elm: Node;
  public context: any;
  public key: string | number;
  public parent: KBNode;
}