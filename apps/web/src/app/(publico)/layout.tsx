import { ReactNode } from 'react';

export default function LayoutPublico({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
}
