loadChampions()


function loadChampions() {


    fetch('http://ddragon.leagueoflegends.com/cdn/12.16.1/data/pt_BR/champion.json')
        .then(function (resultado) {
            return resultado.json();
        })
        .then(function (json) {
            montarLista(json)
            
        })
        .catch(function (error) {
            console.log("Houve algum erro")
        });

}

function montarLista(lista) {


    let dados = Object.entries(lista.data)
    
    let container = document.querySelector('main')



    for (let i = 0; i < dados.length; i++) {

        const champion = document.createElement('button');

        champion.setAttribute(`class`, `champ ${i} ${dados[i][1].id}`);

        champion.style.backgroundImage = `url( 'http://ddragon.leagueoflegends.com/cdn/12.16.1/img/champion/${dados[i][1].id}.png')`;

        const championName = document.createElement('span');

        championName.innerText = `${dados[i][1].name}`;

        champion.appendChild(championName);
        container.appendChild(champion);

    }

}

const area = document.querySelector('main')
const info = document.querySelector('.information')
const areaChamp = document.querySelector('.campeoes')
const loreChamp = document.querySelector('.lore')
const imagemChamp = document.getElementById('imagem-campeao')
const titulo = document.getElementById('titulo-campeao')
const lore = document.getElementById('lore-campeao')

area.addEventListener('click', (event) => {

    const eBotao = event.target.nodeName === 'BUTTON'
    if (!eBotao) { return }
    event.stopPropagation()
    info.classList.toggle('visivel')

    console.log(event.target.classList)

    fetch(`http://ddragon.leagueoflegends.com/cdn/12.16.1/data/pt_BR/champion/${event.target.classList[2]}.json`)
    .then(function (resultado) {
        return resultado.json();
    })
    .then(function (json) {
        criacaoInfo(json)




    })
    .catch(function (error) {
        console.log("erro no segundo")
    });



})

info.addEventListener('click', function (e) {
    e.stopPropagation()
})

document.querySelector('.fa-solid').addEventListener('click', function (e) {
    e.stopPropagation()
    info.classList.toggle('visivel')
})

document.querySelector('body').addEventListener('click', function (e) {

    if (info.classList.contains('visivel')) {
        info.classList.toggle('visivel')
    } else {
        return
    }
})


function criacaoInfo(dados){


    let informacoes = Object.entries(dados.data)
    
   
    imagemChamp.src = `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${informacoes[0][1].id}_0.jpg`    

    
    titulo.innerHTML = `${informacoes[0][1].name} </br> ${informacoes[0][1].title}`  
    
    lore.innerText = `${informacoes[0][1].lore}`
    
}

