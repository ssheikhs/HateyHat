"use client";

import { useCallback, useEffect, useState } from "react";
import { api } from "./api";

// Share identical public GET requests made by several components on one page
const inflight = new Map();

function load(path, auth) {
  if (auth) return api(path, { auth: true });
  if (!inflight.has(path)) {
    const p = api(path).finally(() => setTimeout(() => inflight.delete(path), 2000));
    inflight.set(path, p);
  }
  return inflight.get(path);
}

export function useApi(path, { auth = false, enabled = true } = {}) {
  const [state, setState] = useState({ data: null, error: null, loading: enabled && !!path });
  const [version, setVersion] = useState(0);

  useEffect(() => {
    if (!enabled || !path) return;
    let active = true;
    setState((s) => ({ ...s, loading: true, error: null }));
    load(path, auth)
      .then((data) => active && setState({ data, error: null, loading: false }))
      .catch((error) => active && setState({ data: null, error, loading: false }));
    return () => {
      active = false;
    };
  }, [path, auth, enabled, version]);

  const reload = useCallback(() => {
    inflight.delete(path);
    setVersion((v) => v + 1);
  }, [path]);

  return { ...state, reload, setData: (updater) => setState((s) => ({ ...s, data: typeof updater === "function" ? updater(s.data) : updater })) };
}
