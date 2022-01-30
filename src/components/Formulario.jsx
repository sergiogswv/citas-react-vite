import {useState, useEffect} from 'react'
import Alerta from './Alerta'

const Formulario = ({setPacientes, pacientes, paciente, setPaciente}) => {

  const [nombre, setNombre] = useState("")
  const [propietario, setPropietario] = useState("")
  const [email, setEmail] = useState("")
  const [fecha, setFecha] = useState("")
  const [sintomas, setSintomas] = useState("")

  const [error, setError] = useState(false)

  useEffect(() => {
    if(Object.keys(paciente).length > 0){
      setNombre(paciente.nombre)
      setPropietario(paciente.propietario)
      setEmail(paciente.email)
      setFecha(paciente.fecha)
      setSintomas(paciente.sintomas)
    }
  }, [paciente]);
  

  const generarId = () => {
    const random = Math.random().toString(36).substr(2)
    const fecha = Date.now().toString(36)

    return random+fecha
  }

  const handleSubmit = (e) =>{
    e.preventDefault()
    
    //Validacion del Formulario
    if([nombre, propietario, email, fecha, sintomas].includes('')){
      setError(true)
      return;
    }
    
    setError(false)

    //objeto de paciente
    const objetoPaciente = {
      nombre, 
      propietario, 
      email, 
      fecha, 
      sintomas,
      
    }

    if(paciente.id){
      // Editando el registro
      objetoPaciente.id = paciente.id
      const pacientesActualizados = pacientes.map(pacienteState => pacienteState.id === paciente.id ? objetoPaciente : pacienteState)

      setPacientes(pacientesActualizados)
      setPaciente({})
    }else{
      // Nuevo registro
      objetoPaciente.id = generarId()
      setPacientes([...pacientes, objetoPaciente])
    }

    //reiniciar el form
    setNombre('')
    setEmail('')
    setPropietario('')
    setFecha('')
    setSintomas('')
  }

  return (
    <div className="md:w-1/2 lg:w-2/5">
      <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>
      <p className="mt-5 text-lg text-center mb-10">Añade pacientes y {""}
        <span className="text-indigo-600 font-bold">Administralos</span>
      </p>

      <form 
        className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
        onSubmit={handleSubmit}
      >
        {error && (
          <Alerta>
            <p>Todos los campos son obligatorios</p>
          </Alerta>
        )}
        <div className="mb-5"> 
          <label 
            className="block text-gray-700 uppercase font-bold" 
            htmlFor="nombre">
              Nombre Mascota: 
          </label>
          <input 
            type='text' 
            placeholder="Nombre de la Mascota" 
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" 
            id="nombre"
            value={nombre} 
            onChange={ (e) => setNombre(e.target.value) } 
          />
        </div>
        <div className="mb-5"> 
          <label 
            className="block text-gray-700 uppercase font-bold" 
            htmlFor="propietario">
              Nombre Propietario: 
          </label>
          <input 
            type='text' 
            placeholder="Nombre del Propietario" 
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" 
            id="propietario"
            value={propietario} 
            onChange={ (e) => setPropietario(e.target.value) }   
          />
        </div>
        <div className="mb-5"> 
          <label 
            className="block text-gray-700 uppercase font-bold" 
            htmlFor="email">
              Email: 
          </label>
          <input 
            type='email' 
            placeholder="Email del Propietario" 
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" 
            id="email"
            value={email} 
            onChange={ (e) => setEmail(e.target.value) }   
          />
        </div>
        <div className="mb-5"> 
          <label 
            className="block text-gray-700 uppercase font-bold" 
            htmlFor="alta">
              Alta: 
          </label>
          <input 
            type='date' 
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" 
            id="alta"
            value={fecha} 
            onChange={ (e) => setFecha(e.target.value) }   
          />
        </div>
        <div className="mb-5"> 
          <label 
            className="block text-gray-700 uppercase font-bold" 
            htmlFor="sintomas">
              Sintomas: 
          </label>
          <textarea 
            id="sintomas"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" 
            placeholder="Describe los sintomas"
            value={sintomas} 
            onChange={ (e) => setSintomas(e.target.value) } 
          />
        </div>

        <input 
          type='submit'
          className="bg-indigo-600 w-full text-white uppercase p-3 font-bold hover:bg-indigo-700 cursor-pointer transition-all"
          value={paciente.id ? 'Editar Paciente' : 'Agregar Paciente'}
        />
      </form>
    </div>
  )
}

export default Formulario
