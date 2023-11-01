//Un test suite es todo el archivo de pruebas y suele tener muchos tests
import {shallowMount, mount} from '@vue/test-utils' //Esto es necesario para poder montar los componentes de Vue para probarlos
import Counter from '@/components/Counter'

//mount monta todo el componente y los subcomponentes
//shallowMount monta el componente especifico y sus hijos no llaman todas sus funciones (montada superficial)

describe('Counter Component', () => {

    //el describe tiene un ciclo de vida que consta de 4 piezas
    //beforeAll, afterAll, beforeEach, afterEach
    //Se usan para hacer limpiezas

    let wrapper;

    beforeEach(() => {
        wrapper = shallowMount(Counter)
    })

    // "test:unit:update": "vue-cli-service test:unit -u"; se agrego este script en el package.json porque no agarraba el -u

    // test('Debe de hacer match con el snapshot', () => {

    //     const wrapper = shallowMount(Counter) //Aqui se monta el entorno (Arrange)
    // Un snapshot es una copia que se crea de nuestro componente con el objetivo de compararla cada vez que sea necesario. Estos snapshots se guardan en la carpeta de snapshots
    //     //toMatchSnapshot permite tomar una captura de como luce el Counter.vue (con sus espacios, sus elementos html)
    //     expect(wrapper.html()).toMatchSnapshot() //Afirmando (Assert); nuestro componente debe hacer match con la "fotografia" que debe de ser en realidad nuestro componente
        
    //     //Con npm run test:unit -u se hace un update de los snapshots
    
    // })


    test('h2 debe de tener el valor por defecto "Counter"', () => {

        // const wrapper = shallowMount(Counter)

        expect(wrapper.find('h2').exists()).toBeTruthy() //Permite saber si el elemento existe

        const h2 = wrapper.find('h2') //permite encontrar un elemento html

        //h2.text() permite mostrar el texto que se muestra en este elemento

        expect(h2.text()).toBe('Counter') //toBe; tiene que ser

    })

    test('el valor por defecto debe de ser 100 en el p', () => {
        //Las pruebas deben ser tolerantes a cambios con respecto al componente analizado
        //Se recomienda colocar al elemento html un data atribute para la prueba
        //data-testid="counter"
        
        // const wrapper = shallowMount(Counter)

        // expect(wrapper.find('p').exists()).toBeTruthy() //Permite saber si el elemento existe

        // const pTags = wrapper.findAll('p') //findAll regresa un array de elementos

        // expect(parseInt(pTags.at(1).text())).toEqual(100) //at toma el indice del array; se parsea a numero porque los elementos html ya renderizados estan en strings

        //Hay que quitar los data-testid para no llevar y ensuciar estos cambios en produccion
        expect(wrapper.find('[data-testid="counter"]').exists()).toBeTruthy() //Permite saber si el elemento existe. Se pone entre corchetes el atributo que se esta jalando del html

        const value = wrapper.find('[data-testid="counter"]').text()

        expect(parseInt(value)).toBe(100)

    })

    test('debe de incrementar y decrementar el contador', async () => {

        //MI SOLUCION

        // const wrapper = shallowMount(Counter)

        // const btnTags = wrapper.findAll('button')

        // const increaseBtn = btnTags.at(0)
        // const decreaseBtn = btnTags.at(1)

        // const triggerBtns = async (btn, event, clicks) => {
        //     while (clicks > 0) {
        //         await btn.trigger(event)
        //         clicks --;
        //     }
        // }

        // await triggerBtns(increaseBtn, 'click', 3) //Se ponen awaits por los eventos que hay que esperar

        // await triggerBtns(decreaseBtn, 'click', 2) //Se ponen awaits por los eventos que hay que esperar

        // const value = wrapper.find('[data-testid="counter"]').text()

        // expect(value).toBe('101')



        //SOLUCION FERNANDO

        // const wrapper = shallowMount(Counter)

        const [ increaseBtn, decreaseBtn ] = wrapper.findAll('button') //Destructurando array

        const triggerBtns = async (btn, event, clicks) => {
            while (clicks > 0) {
                await btn.trigger(event)
                clicks --;
            }
        }

        await triggerBtns(increaseBtn, 'click', 3) //Se ponen awaits por los eventos que hay que esperar

        await triggerBtns(decreaseBtn, 'click', 2) //Se ponen awaits por los eventos que hay que esperar

        const value = wrapper.find('[data-testid="counter"]').text()

        expect(value).toBe('101')

    })

    test('debe de establecer el valor por defecto', () => {
        //Leer las properties de vue
        const { start } = wrapper.props()
        // const start = wrapper.props('start')

        const value = wrapper.find('[data-testid="counter"]').text()

        expect(Number(value)).toBe(start)

    })

    test('debe de mostrar la prop title', () => {
        //Enviar props y evaluarlas

        const title = 'Hola Mundo'

        const wrapper = shallowMount(Counter, {
            props: {
                title: title,
                start: 5
            }
        })

        expect(wrapper.find('h2').text()).toBe(title)

    })

})