'use client';

import React from 'react';

interface Props {
  timesUp: boolean;
  children: [React.ReactNode, React.ReactNode]; // enforce exactly 2 children
}

export default function SmartWaiter({ timesUp, children }: Props) {
  return <>{timesUp ? children[0] : children[1]}</>;
}
SmartWaiter.displayName = 'SmartWaiter';