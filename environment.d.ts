import type { StrictAuthProp } from "@clerk/clerk-sdk-node";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CLERK_PUBLISHABLE_KEY: string;
      CLERK_SECRET_KEY: string;
    }
  }

  namespace Express {
    interface Request extends StrictAuthProp {}
  }
}
