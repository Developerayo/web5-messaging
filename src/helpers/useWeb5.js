import { useState, useEffect } from 'react';
import { Web5 } from "@tbd54566975/web5";

export function useWeb5() {
  const [web5, setWeb5] = useState(null);
  const [myDid, setMyDid] = useState(null);

  useEffect(() => {
    async function initialize() {
      try {
        const { web5, did } = await Web5.connect();
        console.log("Web5 initialized successfully", web5, did);
        setWeb5(web5);
        setMyDid(did);
      } catch (error) {
        console.error("Error initializing Web5:", error);
      }
    }
    initialize();
  }, []);

  return { web5, myDid };
}
