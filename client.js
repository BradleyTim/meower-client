console.log('WORKING...')

const form = document.querySelector('form');
const loading = document.querySelector('.loading');
const API_URL = 'http://localhost:5000/meowers';

loading.style.display = 'none';

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(form);

  const name = formData.get('name');
  const content = formData.get('content');

  const meower = {
    name,
    content
  };

  console.log(meower);

  form.style.display = 'none';
  loading.style.display = '';

  fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify(meower),
    headers: {
      'content-type': 'application/json'
    }
  });

  console.log('SUBMITTED!!');
});