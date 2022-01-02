const getButton = () => {
  const [button] = document.getElementsByTagName('button');

  return button;
};


const handleConfigRedirect = (data) => {
  const params = new URLSearchParams(window.location.search);
  const reconfig = params.get('reconfig');
  if (data.CHAT_AREA && !reconfig) {
    window.location = './configured.html';
  }
};

const addHandler = () => {
  const button = getButton();

  button.addEventListener('click', () => {
    window.location = './configuring.html';
  });
};

window.onload = () => {
  // Retrieve existing config and redirect if needed
  window.Main.on('get-configuration', handleConfigRedirect);
  window.Main.sendMessage('get-configuration');

  addHandler();
};