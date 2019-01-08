import React from 'react';

export default ({
  Modal,
  visible,
  formatMessage,
  router,
  SCREENS,
  i18n,
  ...restProps
}) => (
  <Modal
    {...restProps}
    visible={visible}
    transparent
    maskClosable={false}
    title={i18n.pleaseLogIn}
    footer={[
      {
        text: i18n.cancel,
        onPress: () => {
          router.push(`/`);
        },
      },
      {
        text: i18n.login,
        onPress: () => {
          router.push(`/${SCREENS.Login}`);
        },
      },
    ]}
  />
);
