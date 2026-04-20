// src/hooks/useAsync.js
import { useState, useEffect, useCallback } from "react";

/**
 * Runs an async function and tracks loading/error/data state.
 * @param {Function} asyncFn  - The async function to call.
 * @param {Array}    deps     - Re-run when these change.
 */
export function useAsync(asyncFn, deps = []) {
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  const run = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await asyncFn();
      setData(result);
    } catch (err) {
      setError(err.message || "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => { run(); }, [run]);

  return { data, loading, error, refetch: run };
}
