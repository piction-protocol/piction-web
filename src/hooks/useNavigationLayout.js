import { useEffect, useContext } from 'react';
import { LayoutContext } from 'contexts/LayoutContext';

function useProjectLayout(project) {
  const [, setLayout] = useContext(LayoutContext);

  useEffect(() => {
    if (!project) return () => setLayout({ type: 'default' });
    setLayout({
      type: 'project',
      data: { project },
    });

    return () => setLayout({ type: 'default' });
  }, [project, setLayout]);
}

export default useProjectLayout;
