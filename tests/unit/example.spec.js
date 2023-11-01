// En caso de jestjs, dentro de la carpeta tests/unit hay que crear la misma estructura de directorios tal y como está en src
// Por ejemplo si src tiene carpeta components, entonces en unit tambien va una carpeta components
//Este describe es un test suite que lleva varias test donde se hacen evaluaciones pequeñas
//Jest es un framework para hacer pruebas
describe('Example Component', () => {
  test('Debe de ser mayor a 10', () => {//Esta funcion puede ser asincrona. Por defecto es sincrona
    
    //Arreglar (Arrange)
    let value = 10;

    //Estimulo o actuar (Act)
    value = value + 2;

    //Observar el resultado o afirmar (Assert)
    // if(value > 10){
    //   //Todo bien
    // }
    // else{
    //   throw `${value} no es mayor a 10`
    // }

    // expect es usado caca vez cuando se quiere testear un valor
    expect(value).toBeGreaterThan(10) 

  }) //'Lo que va entre comillas es una breve descripcion de lo que la prueba va a realizar'
}) //Dentro de describe va una funcion y su nombre será el nombre del componente que estamos probando

//Para probar, nos fijamos a los comandos que estan en el readmi o en el package.json en la seccion de scripts
//npm run test:unit este comando hace una prueba global de todo
//Todos los errores en las prubas va a depender del codigo escrito