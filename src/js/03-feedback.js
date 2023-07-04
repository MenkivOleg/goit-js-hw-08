import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');

form.addEventListener('input', throttle(handleFormInput, 500));

document.addEventListener('DOMContentLoaded', () => {
  const formData = JSON.parse(localStorage.getItem('feedback-form-state'));
  if (formData) {
    emailInput.value = formData.email;
    messageInput.value = formData.message;
  }
});

form.addEventListener('submit', handleSubmit);

function handleFormInput() {
  const formData = {
    email: emailInput.value,
    message: messageInput.value,
  };
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}

function handleSubmit(event) {
  event.preventDefault();

  const emailValue = emailInput.value.trim();
  const messageValue = messageInput.value.trim();

  if (emailValue === '' || messageValue === '') {
    alert('Please fill all inputs');
  } else {
    const formData = {
      email: emailValue,
      message: messageValue,
    };
    console.log('Data:', formData);

    localStorage.removeItem('feedback-form-state');
    form.reset();
  }
}