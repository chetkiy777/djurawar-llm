const socket = io();

const form = document.querySelector('.form');
const input = document.querySelector('.form__input');
const messages = document.querySelector('.messages')

const addMessage = (text) => {
  const item = document.createElement('li');
  item.textContent = text;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
} 

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (input.value) {
    addMessage(input.value)
    socket.emit('chat message', input.value);
    input.value = '';
  }
});


socket.on('chat message', function(msg) {
  addMessage(msg)
});