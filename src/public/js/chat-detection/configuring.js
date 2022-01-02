const getButton = () => {
  const [button] = document.getElementsByTagName('button');

  return button;
};


const setButtonAttributes = (attributes) => {
  const button = getButton();

  if (attributes.textContent && button.childNodes.length) {
    button.childNodes = null;
  }

  Object.keys(attributes).forEach((key) => {
    button[key] = attributes[key];
  });
};

const buildCanvas = (data) => {
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = () => {
      const div = document.createElement('div');
      div.classList.add('find-chat');
      div.classList.add('flex');
      div.classList.add('flex-col');
      div.classList.add('items-center');
      div.classList.add('justify-around');
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
      const textNode = document.createElement('div');
      textNode.classList.add('mb-1');
      textNode.textContent = 'If the chat is correctly highlighted, click confirm';
      div.appendChild(textNode);
      div.appendChild(canvas);

      resolve(div);
    };
    image.src = `data:image/jpeg;base64, ${data.picture}`;
  });

};

const setupSaveHandler = (data) => {
  const button = getButton();

  setButtonAttributes({
    disabled: false,
    textContent: 'Confirm',
  });

  button.addEventListener('click', () => {
    window.Main.sendMessage('confirm-chat', data);
  });
};

const handleImage = async (data) => {
  const canvas = await buildCanvas(data);
  const textContainer = document.getElementById('screen-container');
  const contentContainer = document.getElementById('content-container');
  textContainer.remove();

  contentContainer.appendChild(canvas);


  setupSaveHandler(data);
};

const handleSave = (data) => {
  if (data.status = 'ok') {
    window.location = './configured.html';
  }
};

window.onload = () => {
  window.Main.on('find-chat', handleImage);
  window.Main.on('confirm-chat', handleSave);

  window.Main.sendMessage('find-chat');
};