import { useState, useCallback } from 'react';

const useCopyToClipboard = (url: string) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(url);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 1000);
    } catch (error) {
      console.error('Unable to copy to clipboard:', error);
    }
  }, [url]);

  return { isCopied, copyToClipboard };
};

export default useCopyToClipboard;