<template>
  <img v-if="img" :src="img" alt="bg">
  <!-- En visual, si se pone un punto seguido de una palabra y despues un enter (ejemplo .bg-dark) se crea un div con la clase bg-dark -->
  <div class="bg-dark"></div>
  <div class="indecision-container">
    <input type="text" placeholder="Hazme una pregunta" v-model="question">
    <p>Recuerda terminar con un signo de interrogacion (?)</p>
    <div v-if="isValidQuestion">
        <h2>{{question}}</h2>
        <h1>{{answer}}</h1>
    </div>
  </div>
</template>

<script>
// v-model: para variables que requieren cambiarse y asignarse y asi aprovechar el two-day binding
// v-bind: para variables que solo van a asignarse (por ejemplo cambiar clases, estilos y atributos de un elemento HTML/Vue)
// v-on: para ejecutar eventos de ciertos elementos (por ejemplo clic, teclas presionadas (keypress), entre otros)
export default {
    name: 'Indesicion',
    data() {
        return { //Objeto reactivo
            question: null, //Propiedad reactiva
            answer: null,
            img: null,
            isValidQuestion: false,
            respuestas: {
                yes   : 'Si!',
                no    : 'No!',
                maybe : 'Probablemente'
            }
        }
    },
    methods: {
        async getAnswer() {

            try {
                this.answer = 'Pensando...'

                const { answer, image } = await fetch('https://yesno.wtf/api').then( r => r.json() ) 

                this.answer = this.respuestas[answer]

                this.img = image
            } catch (error) {
                console.log('IndecisionComponent: ', error)
                this.answer = 'No se pudo cargar el API'
                this.img = null
            }

        }
    },
    watch: { //El watch esta pendiente de los cambios de las propiedades reactivas
        question(value, oldValue) {// Se tiene que llamar (question) igual a la propiedad que se está llamando (question)
            
            this.isValidQuestion = false

            console.log({value})

            if(!value.includes('?')) return

            this.isValidQuestion = true

            //Hacer petirion HTTP
            this.getAnswer()
        }
    }
}
</script>

// Con scoped solo se aplica el css a este componente
<style scoped>

    img, .bg-dark {
        height: 100vh;
        left: 0px;
        max-height: 100%;
        max-width: 100%;
        position: fixed;
        top: 0px;
        width: 100vw;
    }

    .bg-dark {
        background-color: rgba(0, 0, 0, 0.4);
    }

    .indecision-container {
        position: relative;
        z-index: 99;
    }
    
    input {
        width: 250px;
        padding: 10px 15px;
        border-radius: 5px;
        border: none;
    }
    input:focus {
        outline: none;
    }

    p {
        color: white;
        font-size: 20px;
        margin-top: 0px;
    }

    h1, h2 {
        color: white;
    }
    
    h2 {
        margin-top: 150px;
    }

</style>