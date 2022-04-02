let copyInfo;
let copyInfoStorage;
let motsClesExtrait;

//! 1 ) Récupération des informations sur le véhucule.

copyInfo = document.getElementById('copyInfo');

copyInfo.addEventListener('click', async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setCopyInfo,
  });
});

function setCopyInfo() {
  copyInfoStorage = localStorage.getItem('selection');

  // console.log(copyInfoStorage);

  //*! Poste des informations à la base de données.

  const headers = new Headers();
  headers.append(
    'Content-Type',
    'application/json',
    'Access-Control-Allow-Origin: *'
  );

  const values = {
    copyInfoStorage: copyInfoStorage,
  };
  // console.log(values);

  const body = JSON.stringify(values);

  const parametresDeRequete = {
    method: 'POST',
    headers: headers,
    body: body,
  };

  let url =
    'https://blooming-inlet-18326.herokuapp.com/api/dataFromExtensionRoute/texte/';

  fetch(url, parametresDeRequete)
    .then(function (r) {
      return r.json();
    })
    .then(function (data) {
      motsClesExtrait = data.extraction_result;

      console.log('Les data =====>', motsClesExtrait);

      alert(motsClesExtrait);
    })
    .then(() => {})
    .catch(function (error) {
      console.log(
        "Il y a eu un problème avec l'opération fetch : " + error.message
      );
    });

  //! ------------------------------------------------------

  // JSON.stringify(motsClesExtrait);

  // localStorage.removeItem('selection');
}
