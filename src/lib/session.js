"server-only";

import { auth } from "./auth";
import { headers } from "next/headers";

export const session = async () =>
  await auth.api.getSession({
    headers: await headers(),
  });
