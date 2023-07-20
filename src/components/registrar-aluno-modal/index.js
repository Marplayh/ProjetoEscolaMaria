import { useQuery } from 'react-query';
import styles from './registro.module.css';
import axios from 'axios';
import { useState } from 'react';

export function RegistrarAluno({action}){

  const [aluno, setAluno] = useState({
    name: '',
    data_nascimento: '',
    turmaId: null
  });
    const [sucesso, setSucesso] = useState();
    const handleSubmit = (event) => {
      event.preventDefault();
      try{
        const data = {
          name: aluno.name,
          birthDate: aluno.data_nascimento,
          schoolTeamId: aluno.turmaId
        };
          const response = axios.post('https://localhost:7061/api/students', data)
          console.log(response.data);
          setSucesso(true); 
      }catch(error){
          setSucesso(false);
         console.log('msg: ' + error)
      }  
    };
    const verificarCadastro = ()=>{
      if(sucesso === true){
          return (
          <p className='text-success'>Cadastrado com sucesso!</p>
          )
      } else if(sucesso === false){
          return(
              <p className='text-danger'>Erro no cadastro!</p>
          )
      } else{
          return;
      } 
    }
    const handleChange = (event) => {
      const { id, value } = event.target;
      setSucesso(null);
      setAluno((prevData) => ({
        ...prevData,
        [id]: value,
      }));

      if (id === 'exampleFormControlSelect1') {
        // Atualize turmaId quando ocorrer uma alteração no select
        setAluno((prevData) => ({
          ...prevData,
          turmaId: parseInt(value), // Converter o valor para int
        }));
      }
    };

  const {data} = useQuery('schoolteams', async ()=>{
    try {
        const response = await axios.get('https://localhost:7061/api/schoolteams');
        console.log(response.data);
        return response.data;
      } catch (error) {
        throw new Error('Failed to fetch data');
    }
   })
    return(
      <div className={styles.formulario}>
        <h1>Registrar Aluno</h1>
      <form onSubmit={handleSubmit}>
        <div class="row">
          <div class="col">
            <input id='name' 
            type="text" 
            class="form-control" 
            placeholder="Nome do aluno" 
            value={aluno.name}  
            onChange={handleChange}  required/>
          </div>
          <div class="col">
            <input id='data_nascimento' 
            type="date" 
            class="form-control" 
            placeholder="Data de nascimento" 
            value={aluno.data_nascimento}  
            onChange={handleChange}  required/>
          </div>
        </div>
        <div class="form-group mt-3 text-center">
            <label for="exampleFormControlSelect1">Selecione a turma</label>
            <select class="form-control" id="exampleFormControlSelect1" value={aluno.turmaId || ''} onChange={handleChange} required>
              {data && data.map((turma) => {
                console.log(turma.Id);
                return(
                <option key={console.log(turma.id)} value={turma.id}>{turma.teamNumber}</option>
                )})
              }           
            </select>
        </div>
        {verificarCadastro()}
        <div className={styles.buttons}>
          <button type="submit" class="btn btn-primary">{"Registrar"}</button>
          <button class="btn btn-danger" onClick={action}>Voltar</button>
        </div>
      </form>
      </div>
    );
}