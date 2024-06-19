import { OrderDetailScreen } from "./order-detail-screen";
import { OrdersScreen } from "./orders-screen";
import { observer } from "mobx-react-lite";

import { useStore } from "@/contexts/store-context";

export const ScreenManager = observer(() => {
  const { selectedOrderCode } = useStore().order;

  if (selectedOrderCode) {
    return <OrderDetailScreen />;
  }

  return <OrdersScreen />;
});
