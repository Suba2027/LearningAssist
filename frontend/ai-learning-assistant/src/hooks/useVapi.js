/* import { useEffect, useRef, useState } from "react";
import Vapi from "@vapi-ai/web";

export default function useVapi() {
  const vapiRef = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (vapiRef.current) return;
    vapiRef.current = new Vapi(import.meta.env.VITE_VAPI_PUBLIC_KEY);

    vapiRef.current.on("call-start", () => setActive(true));
    vapiRef.current.on("call-end", () => setActive(false));
    vapiRef.current.on("error", (e) => console.error("Vapi error:", e));
  }, []);

  const startCall = () => {
    vapiRef.current.start(import.meta.env.VITE_VAPI_ASSISTANT_ID);
  };

  const stopCall = () => {
    vapiRef.current.stop();
  };

  return { startCall, stopCall, active };
}
 */
import { useEffect, useRef, useState } from "react";
import Vapi from "@vapi-ai/web";

export default function useVapi() {
  const vapiRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (vapiRef.current) return;

    const vapi = new Vapi(import.meta.env.VITE_VAPI_PUBLIC_KEY);
    vapiRef.current = vapi;

    vapi.on("call-start", () => setActive(true));
    vapi.on("call-end", () => setActive(false));
    vapi.on("error", (e) => console.error("Vapi error:", e));

    setReady(true); // ✅ mark as initialized
  }, []);

  const startCall = async () => {
    if (!ready || !vapiRef.current) {
      console.warn("Vapi not ready yet");
      return;
    }

    await vapiRef.current.start(
      import.meta.env.VITE_VAPI_ASSISTANT_ID
    );
  };

  const stopCall = () => {
    vapiRef.current?.stop();
  };

  return { startCall, stopCall, active, ready };
}
