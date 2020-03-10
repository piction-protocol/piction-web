import { useEffect, useContext } from 'react';
import { LayoutContext } from 'context/LayoutContext';

function useProjectLayout(project: any) {
  const { setLayout } = useContext(LayoutContext);

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
