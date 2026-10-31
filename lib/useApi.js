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
  const [version, setVersion] = useState(0);
  const key = enabled && path ? `${auth ? "a" : "p"}|${path}|${version}` : null;
  const [state, setState] = useState({ key: null, data: null, error: null });

  useEffect(() => {
    if (!key) return;
    let active = true;
    load(path, auth)
      .then((data) => active && setState({ key, data, error: null }))
      .catch((error) => active && setState({ key, data: null, error }));
    return () => {
      active = false;
    };
  }, [key, path, auth]);

  const reload = useCallback(() => {
    inflight.delete(path);
    setVersion((v) => v + 1);
  }, [path]);

  const setData = useCallback(
    (updater) => setState((s) => ({ ...s, data: typeof updater === "function" ? updater(s.data) : updater })),
    []
  );

  const ready = key !== null && state.key === key;
  return {
    data: ready ? state.data : null,
    error: ready ? state.error : null,
    loading: key !== null && !ready,
    reload,
    setData,
  };
}
