// global variable here
const container = document.getElementById('playerContainer');
const detailsContainer = document.getElementById('detailsContainer');

// loading data form api
const loadData = Playername => {
  const URL = `https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${Playername}`;
  fetch(URL)
    .then(res => res.json())
    .then(data => showData(data.player.slice(0, 6)))
    .catch(er => {
      console.log(er);
    });
};
// show data form api
const showData = data => {
  data.forEach(element => {
    const { strPlayer, strNationality, strThumb, idPlayer } = element;
    const div = document.createElement('div');
    div.classList.add('col');
    div.innerHTML = `
    <div class="card ">
         <img src="${
           strThumb
             ? strThumb
             : 'https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg'
         }" class="card-img-top h-50" alt="..." >
      <div class="card-body">
         <h5 class="card-title">${strPlayer}</h5>
         <p class="card-text">Nationality: ${strNationality}</p>
      </div>
         <button onclick="loadDetails('${idPlayer}')" class="btn my-2 btn-primary">Details</  button>
         <button  class="btn deleteBtn btn-danger">Delete</button> 
      </div>
    `;
    container.appendChild(div);
    // delete btn for items
    const deleteBtns = document.getElementsByClassName('deleteBtn');
    for (const btn of deleteBtns) {
      btn.addEventListener('click', e => {
        const item = e.target.parentNode.parentNode;
        item.style.display = 'none';
        document.getElementById('male').classList.add('d-none');
        document.getElementById('female').classList.add('d-none');
        detailsContainer.innerHTML = '';
      });
    }
  });
};

// search data form api
document.getElementById('searchBtn').addEventListener('click', () => {
  const playerName = document.getElementById('inputValue').value;
  document.getElementById('male').classList.add('d-none');
  document.getElementById('female').classList.add('d-none');
  detailsContainer.innerHTML = '';
  if (playerName == '') {
    alert('please enter a valid name');
    return;
  }
  container.innerHTML = '';
  loadData(playerName);
  document.getElementById('inputValue').value = '';
});

// load details function
const loadDetails = id => {
  const URL = `https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${id}`;
  fetch(URL)
    .then(res => res.json())
    .then(data => showDetails(data))
    .catch(er => console.log(er));
};

// show details function
const showDetails = data => {
  console.log(data.players[0]);
  detailsContainer.innerHTML = '';
  const {
    strBirthLocation,
    strDescriptionIT,
    strGender,
    strHeight,
    strThumb,
    strPlayer,
    strInstagram,
    strDescriptionEN,
  } = data.players[0];
  if (strGender == 'Male') {
    document.getElementById('male').classList.remove('d-none');
    document.getElementById('female').classList.add('d-none');
  } else {
    document.getElementById('female').classList.remove('d-none');
    document.getElementById('male').classList.add('d-none');
  }
  detailsContainer.innerHTML = `
  <div class="card mb-3" style="max-width: 100%;">
  <div class="row g-0">
    <div class="col-md-4">
      <img src="${
        strThumb
          ? strThumb
          : 'https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg'
      }" class="img-fluid h-100 rounded-start" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${strPlayer}</h5>
        <p class="card-text">${
          strDescriptionIT
            ? strDescriptionIT.slice(0, 150)
            : strDescriptionEN.slice(0, 150)
        }</p>
        <p class="card-text"><small class="text-body-secondary">Birth Location: ${strBirthLocation}</small></p>
        <p>Height: ${strHeight ? strHeight : 'No data found'}</p>
        <p>Istagram: <a href="${strInstagram}"> ${
    strInstagram ? strInstagram : 'No data found'
  } </a></p>
      </div>
    </div>
  </div>
</div>
  `;
};

loadData('messi');
