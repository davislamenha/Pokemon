export default class PokemonApi {
  constructor(url) {
    this.url = url;

    this.pokeImg = document.querySelector(".poke-img");
    this.pokeName = document.querySelector(".poke-name");
    this.pokeHp = document.querySelector(".poke-hp");
    this.pokeAttack = document.querySelector(".poke-attack");
    this.pokeDefense = document.querySelector(".poke-defense");
    this.pokeType1 = document.querySelector(".poke-type1");
    this.pokeType2 = document.querySelector(".poke-type2");
  }

  async getUrl(id) {
    const resp = await fetch(`${this.url}${id}`);
    const dados = await resp.json();
    const { name, stats, types, sprites } = dados;

    this.pokeImg.attributes.src.value = sprites.front_default;
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

  init() {
    this.getUrl(1);
  }
}
