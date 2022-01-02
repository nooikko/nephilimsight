const submit = () => {
  const [{ id }] = document.getElementsByClassName('selected');

  window.Main.sendMessage('select-screen', id);
  const [button] = document.getElementsByTagName('button');

  button.disabled = true;
  button.textContent = 'Saving';
};

const createButton = () => {
  const screenContainer = document.getElementById('screen-container').parentElement;
  const container = document.createElement('div');
  container.classList.add('flex');
  container.classList.add('flex-row');
  container.classList.add('justify-around');
  container.classList.add('mt-10');
  const button = document.createElement('button');
  button.type = 'submit';
  button.textContent = 'Submit';
  button.addEventListener('click', submit);

  container.appendChild(button);

  screenContainer.appendChild(container);
};

const selectImage = (event) => {
  const { target } = event;
  const images = document.getElementsByTagName('img');
  Array.from(images).forEach(image => image.classList.remove('selected'));

  target.classList.add('selected');
};

const createImage = (input) => {
  const container = document.createElement('div');
  container.classList.add('flex');
  container.classList.add('flex-col');
  const image = document.createElement('img');
  image.src = `data:image/jpeg;base64, ${input.base64}`;
  image.classList.add('screenshot-container');
  image.id = input.id;

  if (input.current) {
    image.classList.add('selected');
  }

  image.addEventListener('click', selectImage);

  container.appendChild(image);

  return container;
};

const deleteSpinner = () => {
  const [spinner] = document.getElementsByClassName('fa-spinner');

  spinner.remove();
};

const handleScreens = (data) => {
  const container = document.getElementById('screen-container');

  const elements = data.map(image => createImage(image));

  deleteSpinner();
  elements.forEach((element) => container.appendChild(element));
  createButton();
};

const enableButton = () => {
  const [button] = document.getElementsByTagName('button');
  button.textContent = 'Saved!';

  setTimeout(() => {
    button.disabled = false;
    button.textContent = 'Submit';
  }, 2500);
};

window.onload = () => {
  window.Main.on('get-all-screens', handleScreens);
  window.Main.on('select-screen', enableButton);

  window.Main.sendMessage('get-all-screens');
};