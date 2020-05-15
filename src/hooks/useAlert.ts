import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFlash, selector } from 'modules/flash';

function useAlert() {
  const dispatch = useDispatch();
  const flash = useSelector(selector);

  const setDefaultAlert = useCallback((message: string) => {
    dispatch(setFlash({ message, type: 'base' }))
  }, [dispatch]);

  const setSuccessAlert = useCallback((message: string) => {
    dispatch(setFlash({ message, type: 'success' }));
  }, [dispatch]);

  const setErrorAlert = useCallback((message: string) => {
    dispatch(setFlash({ message, type: 'error' }));
  }, [dispatch]);

  return {
    flash,
    setDefaultAlert,
    setSuccessAlert,
    setErrorAlert
  }
}

export default useAlert;