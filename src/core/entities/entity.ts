import { UniqueId } from "./value-objects/unique-id.value-object.js";

export class Entity<Props> {
  private _id: UniqueId;
  protected props: Props;

  get id(): UniqueId {
    return this._id;
  }

  constructor(props: Props, id?: string) {
    this._id = new UniqueId(id);
    this.props = props;
  }
}
