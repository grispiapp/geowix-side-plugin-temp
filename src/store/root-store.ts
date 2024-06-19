import { CurrentUserStore } from "./current-user-store";
import { OrderStore } from "./order-store";

export class RootStore {
  currentUser: CurrentUserStore;
  order: OrderStore;

  constructor() {
    this.currentUser = new CurrentUserStore(this);
    this.order = new OrderStore(this);
  }
}
