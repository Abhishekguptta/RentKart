import { useEffect, useState } from 'react';
import cn from 'classnames';

import '../styles/_sidebar.scss';

function Sidebar({anchorRef, children, sidebarClassName, isOpen}) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div ref={anchorRef || null}>
      <div
        className={cn(
          'sidebar_ui',
          isOpen && 'sidebar_open_ui', 'sidebar_container',
          'hide-in-tablet', isMounted && 'transition'
      )}>
        {children}
      </div>
      </div>
  )
  }
  
  export default Sidebar;