export function getOrCompute<K, V>(
  map: Map<K, V>,
  key: K,
  defaultProvider: () => V
): V {
  const value = map.get(key);
  if (value !== undefined) {
    return value;
  }
  const defaultValue = defaultProvider();
  map.set(key, defaultValue);
  return defaultValue;
}
