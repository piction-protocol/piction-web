import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import { createPortal } from 'react-dom';

function LinkaPayment({
  requestUrl, linkaPaymentFormView,
}) {
  const container = document.createElement('div');
  const popup = window.open('', '', 'width=800,height=600');
  popup.document.body.appendChild(container);
  const formRef = useRef(null);

  useEffect(() => {
    formRef.current.submit();
  });

  return (
    createPortal((
      <form method="post" action={requestUrl} ref={formRef}>
        {Object.entries(linkaPaymentFormView).map(([key, value]) => (
          <input type="hidden" name={key} value={value} key={key} />
        ))}
      </form>
    ), container)
  );
}

LinkaPayment.propTypes = {
  requestUrl: PropTypes.string.isRequired,
  linkaPaymentFormView: PropTypes.object.isRequired,
};

export default LinkaPayment;
