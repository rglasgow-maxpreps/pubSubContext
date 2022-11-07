import {
  useRef,
  createContext,
  useContext,
  useCallback,
  useSyncExternalStore,
  ReactNode,
  FC
} from 'react';
import { PubSubContextStore, UseStoreData, UseStore} from './types/store';


export default function createPubSubContext<Store>(initialState: Store):PubSubContextStore<Store> {
  /**
   * Hook to get access to the data in the store
   * - by default there will be no subscribers to the store
   */
  const useStoreData = (): UseStoreData<Store> => {
    // the state of the store
    const store = useRef(initialState);

    //. a list of subscribers to the store
    const subscribers = useRef(new Set<() => void>());

    // the current state of the store
    const get = useCallback(() => store.current, []);

    // update the store and notify subscribers
    const set = useCallback((value: Partial<Store>) => {
      store.current = { ...store.current, ...value };
      subscribers.current.forEach((cb) => cb());
    }, []);

    // subscribe to the store
    const subscribe = useCallback((cb: () => void) => {
      subscribers.current.add(cb);
      return () => subscribers.current.delete(cb);
    }, []);

    return {
      get,
      set,
      subscribe
    };
  };

  const StoreContext = createContext<ReturnType<typeof useStoreData> | null>(null);

  const Provider:FC<{ children:ReactNode }>=( { children })=> {
    return (
      <StoreContext.Provider value={useStoreData()}>
        {children}
      </StoreContext.Provider>
    );
  }

  const useStore: UseStore<Store> =(
    selector
  )=>{
    const store = useContext(StoreContext);


    if (!store) {
      throw new Error('Store not found');
    }

    const state = useSyncExternalStore(store.subscribe, () => selector(store.get()));

    return {get:state, set:store.set};
  }

  return {
    Provider,
    useStore
  };
}

