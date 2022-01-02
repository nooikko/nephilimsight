const handleButton = () => {
  window.Main.sendMessage('find-chat');
  const spinner = document.createElement('i');
  spinner.className = 'text-2xl animate-spin fas fa-spinner px-2';

  const [button] = document.getElementsByTagName('button');

  button.disabled = true;
  button.textContent = null;
  button.appendChild(spinner);
};

const addFindChatListener = () => {
  const [button] = document.getElementsByTagName('button');

  button.addEventListener('click', handleButton);
};

const buildCanvas = (data) => {
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = () => {
      const div = document.createElement('div');
      div.classList.add('find-chat');
      const canvas = document.createElement('canvas');
      canvas.width = image.width;
      canvas.height = image.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(image, 0, 0);

      ctx.beginPath();
      ctx.lineWidth = '6';
      ctx.strokeStyle = 'red';
      ctx.rect(data.blPoint.x, data.trPoint.y, data.trPoint.x - data.blPoint.x, data.blPoint.y - data.trPoint.y );
      ctx.stroke();
      ctx.closePath();
      div.appendChild(canvas);
      const [button] = document.getElementsByTagName('button');
      button.remove();

      resolve(div);
    };
    image.src = `data:image/jpeg;base64, ${data.picture}`;
  });

};

const handleImage = async (data) => {
  const canvas = await buildCanvas(data);
  const textContainer = document.getElementById('screen-container');
  const contentContainer = document.getElementById('content-container');
  textContainer.remove();

  contentContainer.appendChild(canvas);
};

window.onload = () => {
  window.Main.on('find-chat', handleImage);
  window.Main.on('get-configuration', (data) => {
    const { trPoint, blPoint } = data.CHAT_AREA;

    if (!trPoint.y || !trPoint.x || !blPoint.y || !blPoint.x) {
      addFindChatListener();
    }

    // Do something here to check if there is already a configuration
  });
  window.Main.sendMessage('get-configuration');

};