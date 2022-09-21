export default class PokemonApi {
  constructor(url) {
    this.url = url;

    this.pokeImgFront = document.querySelector(".poke-img-front");
    this.pokeImgBack = document.querySelector(".poke-img-back");
    this.pokeName = document.querySelector(".poke-name");
    this.pokeHp = document.querySelector(".poke-hp");
    this.pokeAttack = document.querySelector(".poke-attack");
    this.pokeDefense = document.querySelector(".poke-defense");
    this.pokeType1 = document.querySelector(".poke-type1");
    this.pokeType2 = document.querySelector(".poke-type2");

    this.nextBtn = document.querySelector(".next");
    this.previousBtn = document.querySelector(".prev");

    this.currentPokemon = 1;
    this.nextPokemon = 2;
    this.previousPokemon = 0;
  }

  async getUrl(id) {
    const resp = await fetch(`${this.url}${id}`);
    const dados = await resp.json();
    const { name, stats, types, sprites } = dados;

    this.pokeImgFront.attributes.src.value = sprites.front_default;
    this.pokeImgBack.attributes.src.value = sprites.back_default;
    this.pokeName.innerText = name;
    this.pokeHp.innerText = stats[0].base_stat;
    this.pokeAttack.innerText = stats[1].base_stat;
    this.pokeDefense.innerText = stats[2].base_stat;
    this.pokeType1.innerText = types[0].type.name;
    if (types[1]) {
      this.pokeType2.classList.remove("hide");
      this.pokeType2.innerText = types[1].type.name;
    } else {
      this.pokeType2.classList.add("hide");
    }
  }

  next() {
    if (this.getUrl(this.nextPokemon)) {
      this.getUrl(this.nextPokemon);
      this.nextPokemon += 1;
      this.previousPokemon += 1;
      this.currentPokemon += 1;
    }
  }

  previous() {
    if (this.currentPokemon > 1) {
      this.getUrl(this.previousPokemon);
      this.nextPokemon -= 1;
      this.previousPokemon -= 1;
      this.currentPokemon -= 1;
    }
  }

  addEvents() {
    this.nextBtn.addEventListener("click", this.next);
    this.previousBtn.addEventListener("click", this.previous);
  }

  bind() {
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
  }

  init() {
    this.getUrl(this.currentPokemon);
    this.bind();
    this.addEvents();
  }
}
