let nominput = document.querySelector('#pokeName');
let affichImage = document.querySelector('#imagedex .box1');
let pokeId = document.querySelector('#pokeId');
let nomId = document.querySelector('.box2 .name');
let stat = document.getElementById("box");
let nomSaisie;
let idSaisie;
let i = 0;
function getvalue() { nomSaisie = nominput.value; };
function getValueId() { idSaisie = pokeId.value; };

nominput.addEventListener("keyup", (event) => {
    if (event.keyCode == 13) {
        getvalue();
        nominput.value = "";
        fetch(`https://pokebuildapi.fr/api/v1/pokemon`)
            .then(Response => Response.json())
            .then(data => {
                let tabname = data.filter(element => element.name == nomSaisie);
                if(tabname.length != 0){
                        affichImage.style.backgroundImage = "url(" + tabname[0].image + ")";
                        nomId.innerText = "Nom : " + tabname[0].name;
                        
                                if (i > 5) {
                                    let paragraphe = document.getElementById("parag");
                                    paragraphe.parentNode.removeChild(paragraphe);
                                } else {
                                    for (const [key, val] of Object.entries(tabname[0].stats)) {
                                        let newTexte = document.createElement('p')
                                        newTexte.setAttribute('id', 'parag');
                                        newTexte.innerText = key + ":" + val;
                                        stat.append(newTexte);
                                        newTexte.style.marginLeft = "38px";
                                        i++;
                                        
                                    }
                                }
                }else{
                    alert("Attention nom mal écrit");
                }
              
            })
            .catch(error => console.error(error));
    }
})




pokeId.addEventListener("keyup", (event) => {
    if (event.keyCode == 13) {
        getValueId();
        pokeId.value = "";

        fetch(`https://pokebuildapi.fr/api/v1/pokemon`)
            .then(Response => Response.json())
            .then(data => {

                for (let value of data) {

                    if (idSaisie == value.pokedexId) {
                        affichImage.style.backgroundImage = "url(" + value.image + ")";
                        nomId.innerText = "Nom : " + value.name;

                        if (i > 5) {
                            let paragraphe = document.getElementById("parag");
                            paragraphe.parentNode.removeChild(paragraphe);
                        } else {
                            for (const [key, val] of Object.entries(value.stats)) {
                                let newTexte = document.createElement('p')
                                newTexte.setAttribute('id', 'parag');
                                newTexte.innerText = key + ":" + val;
                                stat.append(newTexte);
                                newTexte.style.marginLeft = "38px";
                                i++;
                                console.log(i);
                            }
                        }


                    }
                }
            })
            .catch(error => console.error(error));
    }

})


