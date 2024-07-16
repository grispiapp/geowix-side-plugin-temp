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
  const { orders, setOrders, setSelectedOrderCode } = useStore().order;
  const { ticket, bundle, loading: grispiLoading } = useGrispi();

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleFetchOrders = async () => {
      if (!ticket || !bundle?.settings?.apikey) {
        setError("Talep bilgisine ulaşılamadı.");
        setLoading(false);
        return;
      }

      const orderNumber = ticket.fieldMap["tu.order_number"]?.value;
      const trackingCode = ticket.fieldMap["tu.tracking_code"]?.value;
      const phoneNumber = bundle.context.requester.phone?.startsWith("+90")
        ? bundle.context.requester.phone.replace("+90", "")
        : null;

      if (!orderNumber && !trackingCode && !phoneNumber) {
        setError(
          "Siparişlerin listelenmesi için telefon, sipariş numarası veya takip kodu bilgilerinden biri gereklidir. Lütfen bu bilgilerden birini talep formuna ekleyip kaydedin."
        );
        setLoading(false);
        return;
      }

      setLoading(true);

      const orders = await getOrders({
        apikey: bundle.settings.apikey as string,
        prm: orderNumber ?? trackingCode ?? phoneNumber,
      });

      if (orders.datav.length === 0) {
        if (orderNumber) {
          setError(
            "Kullanıcının sipariş numarasıyla ilişkili bir kayıt bulunamadı."
          );
        } else if (trackingCode) {
          setError(
            "Kullanıcının takip numarasıyla ilişkili sipariş kaydı bulunamadı."
          );
        } else {
          setError(
            "Kullanıcının telefon numarasıyla ilişkili sipariş kaydı bulunamadı."
          );
        }
      } else {
        setError(null);
      }

      setOrders(orders.datav);
      setLoading(false);

      if (orders.datav.length === 1) {
        setSelectedOrderCode(orders.datav[0].order_code);
      }
    };

    handleFetchOrders();
  }, [ticket, bundle]);

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
