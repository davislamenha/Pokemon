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

  async getData(id) {
    const resp = await fetch(`${this.url}${id}`);
    const dados = await resp.json();
    const { name, stats, types, sprites } = dados;

    this.getImg(sprites);
    this.getName(name);
    this.getStats(stats);
    this.getTypes(types);
  }

  getImg(sprites) {
    this.pokeImgFront.attributes.src.value = sprites.front_default;
    this.pokeImgBack.attributes.src.value = sprites.back_default;
  }

  getName(name) {
    this.pokeName.innerText = name;
  }

  getStats(stats) {
    this.pokeHp.style.width = `${stats[0].base_stat / 2}px`;
    this.pokeAttack.style.width = `${stats[1].base_stat / 2}px`;
    this.pokeDefense.style.width = `${stats[2].base_stat / 2}px`;
  }

  getTypes(types) {
    this.cleanAttribute(this.pokeType1, "class", "poke-type1");
    this.cleanAttribute(this.pokeType2, "class", "poke-type2");

    this.pokeType1.innerText = types[0].type.name;
    this.pokeType1.classList.add(types[0].type.name);

    if (types[1]) {
      this.pokeType2.classList.remove("hide");
      this.pokeType2.innerText = types[1].type.name;
      this.pokeType2.classList.add(types[1].type.name);
    } else {
      this.pokeType2.classList.add("hide");
    }
  }

  cleanAttribute(element, attribute, attributeElement = "") {
    element.setAttribute(attribute, attributeElement);
  }

  next() {
    if (this.getData(this.nextPokemon)) {
      this.getData(this.nextPokemon);
      this.nextPokemon += 1;
      this.previousPokemon += 1;
      this.currentPokemon += 1;
    }
  }

  previous() {
    if (this.currentPokemon > 1) {
      this.getData(this.previousPokemon);
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
    this.getData(this.currentPokemon);
    this.bind();
    this.addEvents();
  }
}
