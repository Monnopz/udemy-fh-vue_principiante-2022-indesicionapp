import {shallowMount, mount} from '@vue/test-utils' //Esto es necesario para poder montar los componentes de Vue para probarlos
import Indecision from '@/components/Indecision'

describe('Indecision Component', () => {

    //Spy: Son espias que estan pendientes de cualquier suceso: metodos, librerias completas, implementaciones de metodo
    //Mock: Es un objeto o funcion de simulacro preprogramada para ejecutar pruebas; prueba una parte estructural de programa

    let wrapper
    let clgSpy

    //Hay que hacer un mock (funcion de simulacro) de toda la funcion fetch, dentro de todo el objeto global window (global en node)
    global.fetch = jest.fn(()=> Promise.resolve({
        json: () => Promise.resolve({
            answer: 'yes',
            forced: false,
            image: 'https://yesno.wtf/assets/yes/2.gif'
        }) //el json es una promesa
    })) //global es el equivalente a window y ambos son objetos

    beforeEach(()=>{

        wrapper = shallowMount(Indecision)
        
        clgSpy = jest.spyOn(console, 'log') //Se espia el objeto console y el metodo log

        //Despues de cada una de las pruebas, hay que limpiar los mocks
        // clgSpy.mockClear()
        jest.clearAllMocks()

    })

    // test('se hace match con el snapshot', () => expect(wrapper.html()).toMatchSnapshot)

    test('escribir en el input no debe de disparar nada (console.log)', async () => {

        //wrapper es el objeto y vm es la instancia de vue
        
        const getAnswerSpy = jest.spyOn(wrapper.vm, 'getAnswer')
        
        const input = wrapper.find('input')

        await input.setValue('Hola Mundo') //Cualquier modificacion que se haga en el DOM se pone con await

        expect(clgSpy).toHaveBeenCalled() //Que haya sido llamado el console
        // expect(clgSpy).toHaveBeenCalledTimes(2) //Que haya sido llamado el console

        expect(getAnswerSpy).toHaveBeenCalledTimes(0)
        // expect(getAnswerSpy).not.toHaveBeenCalled()

    });

    test('escribir el simbolo de "?" debe de disparar el getAnswer ', async () => {

        //El fetch API no existe en Node, es algo que existe en los navegadores web
        // Hay que hacer un mock de toda la funcion fetch, dentro de todo el objeto global window
        // En node el equivalente de window es global

        const getAnswerSpy = jest.spyOn(wrapper.vm, 'getAnswer')

        const input = wrapper.find('input')

        await input.setValue('?')

        //Aqui solo se espia que pasa con el metodo
        expect(getAnswerSpy).toHaveBeenCalled() //esta prueba pasa gracias a que se agrego una mock function en global.fetch para simular una peticion
        
    });

    test('pruebas en getAnswer', async () => {

        await wrapper.vm.getAnswer() //Aqui se ejecuta de manera explicita el metodo

        const img = wrapper.find('img')
        expect(img.exists()).toBeTruthy()
        expect(wrapper.vm.img).toBe('https://yesno.wtf/assets/yes/2.gif')
        // expect(wrapper.vm.answer).toBe('Si!')
        expect(wrapper.vm.respuestas.yes).toContain(wrapper.vm.answer);
        
    });

    test('pruebas en getAnswer - Fallo en el API', async () => {
        
        //Cuando la respuesta de un API no esta en el rango de 2xx, entonces es error

        fetch.mockImplementationOnce(()=>Promise.reject('API es down'))

        await wrapper.vm.getAnswer() //Aqui se ejecuta de manera explicita el metodo

        const img = wrapper.find('img')

        expect(img.exists()).toBeFalsy()

        expect(wrapper.vm.answer).toBe('No se pudo cargar el API')

    });

})