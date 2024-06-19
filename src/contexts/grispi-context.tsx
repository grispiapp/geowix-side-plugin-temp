import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { GrispiClient } from "@/lib/grispi";
import { GrispiData, Settings, Ticket } from "@/types/grispi.type";

type GrispiContext = {
  ticket: Ticket | null;
  settings: Settings | null;
  loading: boolean;
};

const GrispiContext = createContext<GrispiContext | null>(null);

export const GrispiProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [settings, setSettings] = useState<Settings | null>(null);

  useEffect(() => {
    GrispiClient.instance()
      ._init()
      .then((data: GrispiData) => {
        setTicket(data.context.ticket);
        setSettings(data.settings);
        setLoading(false);

        GrispiClient.instance().activeTicketChanged = function (
          ticket: Ticket
        ) {
          setTicket(ticket);
        };
      })
      .catch((err) => {
        console.error({ err });
      });
  }, []);

  return (
    <GrispiContext.Provider
      value={{
        ticket,
        settings,
        loading,
      }}
    >
      {children}
    </GrispiContext.Provider>
  );
};

export const useGrispi = () => {
  const grispi = useContext(GrispiContext);

  if (!grispi) {
    throw new Error("useGrispi must be used within a GrispiProvider.");
  }

  return grispi;
};
