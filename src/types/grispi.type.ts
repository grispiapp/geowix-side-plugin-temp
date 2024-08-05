import { Agent, Requester } from "@/grispi/client/tickets/tickets.type";

export interface Settings
  extends Record<
    string,
    string | number | string[] | number[] | boolean[] | boolean | Settings
  > {}

export interface GrispiBundle {
  settings: Settings;
  context: Context;
}

interface Context {
  username: string;
  tenantId: string;
  token: string;
  ticketKey: string;
  agent: Agent;
  requester: Requester;
}
