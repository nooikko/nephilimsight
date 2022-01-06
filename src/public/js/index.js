const handleReadChat = (data) => {
console.log('🚀 ~ file: index.js ~ line 2 ~ handleReadChat ~ data', data);

  setTimeout(() => {
    window.Main.sendMessage('read-chat');
  }, 5000);
};

window.onload = () => {
  window.Main.on('read-chat', handleReadChat);


  window.Main.sendMessage('read-chat');
};