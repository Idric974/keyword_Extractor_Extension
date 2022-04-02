// console.log('Hello Extension');

let data;

function getUserSelection() {
  //  localStorage.removeItem('selection');

  if (window.getSelection) {
    const selection = window.getSelection().toString();

    console.log('selection', selection);

    //*! Poste des informations à la base de données.

    const headers = new Headers();
    headers.append(
      'Content-Type',
      'application/json',
      'Access-Control-Allow-Origin: *'
    );

    const values = {
      copyInfoStorage: selection,
    };
    // console.log('values ===> ', values);

    const body = JSON.stringify(values);

    const parametresDeRequete = {
      method: 'POST',
      headers: headers,
      body: body,
    };

    // console.log('Parametres de requete ===> ', parametresDeRequete);

    let url =
      'https://blooming-inlet-18326.herokuapp.com/api/dataFromExtensionRoute/texte/';

    fetch(url, parametresDeRequete)
      .then(function (r) {
        return r.json();
      })
      .then(function (data) {
        motsClesExtrait = data.extraction_result;

        // console.log('Les data =====>', motsClesExtrait);

        navigator.clipboard.writeText(motsClesExtrait);
      })
      .then(() => {})
      .catch(function (error) {
        console.log(
          "Il y a eu un problème avec l'opération fetch : " + error.message
        );
      });

    //! ------------------------------------------------------
  }
}

document.addEventListener('mouseup', getUserSelection);
