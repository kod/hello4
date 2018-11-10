import React from 'react';

export default ({
  Modal,
  visible,
  formatMessage,
  router,
  SCREENS,
  ...restProps
}) => (
  <Modal
    {...restProps}
    visible={visible}
    transparent
    maskClosable={false}
    title={formatMessage({ id: 'pleaseLogIn' })}
    footer={[
      {
        text: formatMessage({ id: 'cancel' }),
        onPress: () => {
          router.push(`/`);
        },
      },
      {
        text: formatMessage({ id: 'login' }),
        onPress: () => {
          router.push(`/${SCREENS.Login}`);
        },
      },
    ]}
  />
);
