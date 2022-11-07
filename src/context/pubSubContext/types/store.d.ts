export interface UseStoreData<Store> {
  /**
   * The current state of the store.
   */
  get: () => Store;
  /**
   * Set the state of the store. This will trigger a re-render of all SUBSCRIBED components.
   */
  set: (value: Partial<Store>) => void;
  /**
   * Listen to changes in the store. This will trigger a re-render of the ATOMIC component.
   */
  subscribe: (callback: () => void) => () => void;
}

export type UseStore<Store> = <SelectorOutput>(
  selector: (store: Store) => SelectorOutput
) => { get: SelectorOutput; set: (value: Partial<Store>) => void };

export interface PubSubContextStore<TData> {
  useStore: UseStore<TData>;
  Provider: React.FC<{ children: React.ReactNode }>;
}
