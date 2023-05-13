$.confirm = function (options) {
  return new Promise((resolve, reject) => {
    const modal = $.modal({
      title: options.title,
      width: "400px",
      closable: false,
      onClose() {
        modal.destroy();
      },-*+
      
      content: options.content,
      footerButtons: [
        {
          text: "Cancel",
          type: "secondary",
          handler() {
            modal.close();
            reject();
          },
        },
        {
          text: "Delete",
          type: "danger",
          handler() {
            modal.close();
            resolve();
          },
        },
      ],
    });
    setTimeout(() => modal.open(), 200);
  });
};
