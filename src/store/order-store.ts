import { RootStore } from "./root-store";
import { makeAutoObservable } from "mobx";

import { Order, ShipmentTrackingResponse } from "@/types/geowix.type";

export class OrderStore {
  rootStore: RootStore;
  selectedOrderCode: string | null = null;
  shipmentTrackingDetail: ShipmentTrackingResponse | null = null;
  orders: Order[] = [];

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);

    this.rootStore = rootStore;
  }

  setOrders = (orders: Order[]) => {
    this.orders = [...orders].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  };

  setSelectedOrderCode = (orderCode: string | null) => {
    this.selectedOrderCode = orderCode;

    if (orderCode === null) {
      this.shipmentTrackingDetail = null;
    }
  };

  setShipmentTrackingDetail = (shipmentTracking: ShipmentTrackingResponse) => {
    this.shipmentTrackingDetail = shipmentTracking;
  };

  get selectedOrder() {
    return this.orders?.find(
      (order) => order.order_code === this.selectedOrderCode
    );
  }
}
