const handleDetectGame = (data) => {
  console.log(data);
};


window.onload = () => {

  window.Main.on('detect-game', handleDetectGame);
  window.Main.sendMessage('detect-game');
};