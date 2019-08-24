
const form = document.querySelector('form');
const loading = document.querySelector('.loading');
const API_URL = window.location.hostname === 'localhost' ? 'http://localhost:5000/meowers' : 'https://meower-api.herokuapp.com/meowers';

loading.style.display = '';

listAllMeowers();

function listAllMeowers() {

  fetch(API_URL)
    .then(response => response.json())
    .then(meowers => {
      meowers.reverse().forEach(meower => {
        loading.style.display = '';

        const container = document.querySelector('.meowers-container');
        const div = document.createElement('div');

        const h5 = document.createElement('h5');
        h5.textContent = meower.name;

        const paragraph = document.createElement('p');
        paragraph.textContent = meower.content;

        div.appendChild(h5);
        div.appendChild(paragraph);
        div.classList.add('meower-div');

        container.appendChild(div);

        loading.style.display = 'none';

      });
    });
};


form.addEventListener('submit', (event) => {
  event.preventDefault();
  const container = document.querySelector('.meowers-container');
  container.innerHTML = '';

  const formData = new FormData(form);

  const name = formData.get('name');
  const content = formData.get('content');

  const meower = {
    name,
    content
  };

  //console.log(meower);

  form.style.display = 'none';
  loading.style.display = '';


  fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify(meower),
    headers: {
      'content-type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(mew => {
      //console.log(mew);
      form.reset();
      form.style.display = '';
      loading.style.display = 'none';
    });
  //console.log('SUBMITTED!!');
  listAllMeowers();
});
