"use client";

import { useEffect } from "react";
import { useSession } from "@/lib/auth-client";
import api from "@/lib/axios";

export default function TokenSync() {
  const { data: session } = useSession();

  useEffect(() => {
    const syncToken = async () => {
      if (session?.user?.email) {
        try {
          const res = await api.post("/jwt", {
            email: session.user.email,
            name: session.user.name,
          });
          if (res.data?.token) {
            localStorage.setItem("access-token", res.data.token);
          }
        } catch (err) {
          console.error("Failed to sync auth token:", err);
        }
      } else {
        localStorage.removeItem("access-token");
      }
    };

    syncToken();
  }, [session]);

  return null;
}
