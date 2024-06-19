import {
  GetOrdersRequest,
  GetOrdersResponse,
  ShipmentTrackingRequest,
  ShipmentTrackingResponse,
} from "@/types/geowix.type";

export async function getShipmentTracking(
  request: ShipmentTrackingRequest
): Promise<ShipmentTrackingResponse> {
  const response = await fetch(
    "https://ws.geowix.com/grispi/shipmentTracking",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    }
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data: ShipmentTrackingResponse = await response.json();
  return data;
}

export async function getOrders(
  request: GetOrdersRequest
): Promise<GetOrdersResponse> {
  const response = await fetch("https://ws.geowix.com/grispi/getOrders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data: GetOrdersResponse = await response.json();
  return data;
}
