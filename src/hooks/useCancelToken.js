import { useRef } from 'react'

import axios from 'axios'

export default function useCancelToken() {
  const source = useRef(axios.CancelToken.source());
  const isCancelled = useRef(false);

  return {
    ...source.current,
    cancel() {
      source.current.cancel();
      isCancelled.current = true;
    },
    isCancelled() {
      return isCancelled.current; 
    },
  };
}