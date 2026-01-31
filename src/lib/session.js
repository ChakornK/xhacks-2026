import { auth } from "./auth";
import { headers } from "next/headers";

const session = await auth.api.getSession({
  headers: await headers(),
});
