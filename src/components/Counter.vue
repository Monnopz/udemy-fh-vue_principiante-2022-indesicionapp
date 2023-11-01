<template>
  <h2>{{customTitle}}</h2>
  <p>{{counter}}<sup>2</sup> = {{squareCounter}}</p>
  <p data-testid="counter">{{counter}}</p>

  <div>
    <!-- Se usa una arroba (@) como atajo para escuchar eventos; por ejemplo de v-on:click="funcion" seria @click="funcion" -->
    <button @click="increase()">+1</button>
    <button v-on:click="decrease()">-1</button>
  </div>
</template>

<script>
// El name ayuda a identificar el componente en las developer tools
// Tambien ayuda a identificarlo en el Vue Router
//las propiedades computadas mantienen en cache las operaciones. Cuando los valores cambian, las propiedades computadas se actualizan
export default {
    // name: 'Patito'
    //Properties, props o atributos
    //En kebak case (titulo-del-libro)
    //La diferencia entre property y atributo es que la property esta definida en las properties
    // props: ['title', 'start'], //Forma 1 de definir props
    props: { //Forma 2 de definir props
        title: String,
        start: {
            type: Number,
            // require: true
            default: 100,
            validator( value ) { //value es lo que recibe de valor de prop. Esto es solo informativo para desarrolladores
                return value >= 0
            }
        }
    },
    data() {
        return {
            counter: this.start
        }
    },
    methods: {
        increase() {
            this.counter++;
        },
        decrease() {
            this.counter--;
        }
    },
    computed: {
        squareCounter() {
            return this.counter * this.counter
        },
        customTitle() {
            // return this.title ? this.title : 'Counter'
            return this.title || 'Counter'
        }
    }
}
</script>

<style>

button {
    background-color: #64BB87;
    border-radius: 5px;
    border: 1px solid white;
    color: white;
    cursor: pointer;
    margin: 0 5px;
    padding: 5px 15px;
    transition: 0.3s ease-in-out;
}

button:hover {
    background-color: #5AA67B;
    transition: 0.3s ease-in-out;
}

</style>
