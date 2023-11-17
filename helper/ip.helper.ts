import { ip, ipv6, mac } from "address";

export const getIpv4 = async () => {
  return ip();
};
