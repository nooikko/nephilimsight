
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
      textNode.textContent = 'If the highlighted area is incorrect, try rescanning';
      div.appendChild(textNode);
      div.appendChild(canvas);

      resolve(div);
    };
    image.src = `data:image/jpeg;base64, ${data.picture}`;
  });

};

const showExistingConfig = async (data) => {
console.log('🚀 ~ file: configured.js ~ line 38 ~ showExistingConfig ~ data', data);
  const canvas = await buildCanvas(data.CHAT_AREA);
  const textContainer = document.getElementById('screen-container');
  const contentContainer = document.getElementById('content-container');
  textContainer.remove();

  contentContainer.appendChild(canvas);

};


window.onload = () => {
  // Retrieve existing config and redirect if needed
  window.Main.on('get-configuration', showExistingConfig);
  window.Main.sendMessage('get-configuration');

};