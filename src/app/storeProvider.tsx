'use client'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import { Store, AppStore } from '@/lib/Store/Store'

export default function StoreProvider({
  children
}: {
  children: React.ReactNode
}) {
const storeRef = useRef<AppStore>()
  if (!storeRef.current) {
    storeRef.current = Store()
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}