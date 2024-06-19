import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";

import { LoadingWrapper } from "@/components/loading-wrapper";
import { OrderItem } from "@/components/order-item";
import {
  Screen,
  ScreenContent,
  ScreenHeader,
  ScreenTitle,
} from "@/components/ui/screen";
import { useGrispi } from "@/contexts/grispi-context";
import { useStore } from "@/contexts/store-context";
import { getOrders } from "@/lib/geowix";

export const OrdersScreen = observer(() => {
  const { orders, setOrders } = useStore().order;
  const { ticket, settings, loading: grispiLoading } = useGrispi();

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleFetchOrders = async () => {
      if (!ticket || !settings?.apikey) {
        setError("Talep bilgisine ulaşılamadı.");
        setLoading(false);
        return;
      }

      const orderNumber = ticket.fieldMap["tu.order_number"]?.value;
      const trackingCode = ticket.fieldMap["tu.tracking_code"]?.value;
      const phoneNumber = null;

      if (!orderNumber && !trackingCode && !phoneNumber) {
        setError(
          "Siparişlerin listelenmesi için telefon, sipariş numarası veya takip kodu bilgilerinden biri gereklidir. Lütfen bu bilgilerden birini talep formuna ekleyip kaydedin."
        );
        setLoading(false);
        return;
      }

      setLoading(true);

      const orders = await getOrders({
        apikey: settings.apikey,
        prm: orderNumber ?? trackingCode,
      });

      setOrders(orders.datav);
      setLoading(false);
      setError(null);
    };

    handleFetchOrders();
  }, [ticket, settings]);

  const isLoading = loading || grispiLoading;

  return (
    <Screen>
      <ScreenHeader>
        <ScreenTitle>Geowix Sipariş Listesi</ScreenTitle>
      </ScreenHeader>
      <ScreenContent className="space-y-3 p-6">
        {isLoading && <LoadingWrapper />}
        {!isLoading &&
          !error &&
          orders?.map((order) => (
            <OrderItem key={order.order_code} order={order} />
          ))}
        {!isLoading && error && <div>{error}</div>}
      </ScreenContent>
    </Screen>
  );
});
