import React, { type ReactNode } from 'react';

interface ILayoutProps {
  children: ReactNode;
}

const Layout: React.FC<ILayoutProps> = ({ children }: ILayoutProps) => {
  return (
    <div className='p-4'>
      {children}
    </div>
  )
}

export default Layout