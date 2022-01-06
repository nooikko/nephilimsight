const handleData = (data) => {
  if (data) {
    window.location = './index.html';
    return;
  }

  setTimeout(() => {
    window.Main.sendMessage('detect-game');
  }, 2500);
};

window.onload = () => {
  window.Main.on('detect-game', handleData);

  window.Main.sendMessage('detect-game');
};