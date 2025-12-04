import React, { useEffect, useRef } from 'react'
import { DivKit } from '@divkitframework/react'
import { registerShorelineComponents, divkitCustomComponents } from './divkit-extensions'
import '@divkitframework/divkit/dist/client.css'

interface DivKitWrapperProps {
  id: string
  json: any
  onError?: (error: { error: Error & { level: 'error' | 'warn'; additional: Record<string, unknown> } }) => void
  onStat?: (details: { type: 'click' | 'visible' | 'disappear' | 'trigger'; action: any }) => void
  onCustomAction?: (action: any) => void
}

export const DivKitWrapper: React.FC<DivKitWrapperProps> = ({
  id,
  json,
  onError,
  onStat,
  onCustomAction,
}) => {
  const isRegistered = useRef(false)

  useEffect(() => {
    if (!isRegistered.current) {
      registerShorelineComponents()
      isRegistered.current = true
    }
  }, [])

  return (
    <DivKit
      id={id}
      json={json}
      customComponents={divkitCustomComponents}
      onError={onError}
      onStat={onStat}
      onCustomAction={onCustomAction}
    />
  )
}
