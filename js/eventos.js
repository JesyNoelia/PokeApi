

const getRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
}

document.addEventListener('DOMContentLoaded', () => {
    const random = getRandom(1, 650)
    fetchData(random);
})

//let interval = window.setInterval(getRandom, 3000);

const fetchData = async (pRandom) => {
    try {
        const request = await fetch(`https://pokeapi.co/api/v2/pokemon/${pRandom}`)
        const data = await request.json()
        //console.log(data);

        const pokemon = {
            img: data.sprites.other.dream_world.front_default,
            nombre: data.name,
            hp: data.stats[0].base_stat,
            experiencia: data.base_experience,
            ataque: data.stats[1].base_stat,
            especial: data.stats[3].base_stat,
            defensa: data.stats[2].base_stat
        }


        pintarCard(pokemon)
    } catch (error) {
        console.log(error);
    }

}

const pintarCard = (pokemon) => {
    console.log(pokemon);

    const flex = document.querySelector('.flex')
    //en el main es donde se va a pintar la info
    const template = document.getElementById('template-card').content
    //siempre que trabajamos con template se pone el content para acceder a la informacion que contiene el content.

    const clone = template.cloneNode(true)
    //siempre que se trabaja con un template conviene crear un clon

    const fragment = document.createDocumentFragment()
    //el fragment es algo invisible que se genera solamente en JS no interfiere el html, se manipula el dom, 

    clone.querySelector('.card-body-img').setAttribute('src', pokemon.img);
    //setAttribute, establece el valor de un atributo en el elemento indicado. si el atributo ya qexiste, el valor es actualizado, en caso contrario el nuevo atributo es añadido con el nombre y valor indicado.en este caso el atributo que se quiere modificar es la src d ela imagen.
    clone.querySelector('.card-body-title').innerHTML = `${pokemon.nombre}   <span>${pokemon.hp} hp</span>`;
    clone.querySelector('.card-body-text').textContent = pokemon.experiencia + ' Exp';
    clone.querySelectorAll('.card-footer-social h3')[0].textContent = pokemon.ataque;
    clone.querySelectorAll('.card-footer-social h3')[1].textContent = pokemon.especial;
    clone.querySelectorAll('.card-footer-social h3')[2].textContent = pokemon.defensa;

    fragment.appendChild(clone);
    flex.appendChild(fragment)
}




