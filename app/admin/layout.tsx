import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return <div className="max-height flex flex-col md:flex-row md:overflow-hidden">{children}</div>;
}
