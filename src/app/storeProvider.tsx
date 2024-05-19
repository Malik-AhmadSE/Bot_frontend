'use client'
import React, { useCallback, useEffect, useRef } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { Store, AppStore } from '@/lib/Store/store';
import { setUser } from '@/lib/Store/features/auth/auth';
import { current } from '@/services/current';

export default function StoreProvider({
  children
}: {
  children: React.ReactNode
}) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = Store();
  }

  return (
    <Provider store={storeRef.current}>
      <ChildWrapper>{children}</ChildWrapper>
    </Provider>
  );
}

function ChildWrapper({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();

  const handleData = useCallback(async () => {
    try {
      const response = await current();
      dispatch(setUser(response.data));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, []);

  useEffect(() => {
    handleData();
  }, [handleData]);

  return <>{children}</>;
}
