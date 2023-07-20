import { useQuery } from 'react-query';
import styles from './editar-aluno.module.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Aluno from '@/models/Aluno';

export function EditarAluno({action, alunoId}){

    const [aluno, setAluno] = useState(Aluno);
    const [sucesso, setSucesso] = useState();

    
        useEffect(() => {    
            axios.get(`https://localhost:7061/api/students/${alunoId}`)
            .then(res => {
                setAluno(() => ({
                    name: res.data.name,
                    data_nascimento: res.birthDate,
                    turmaId: res.data.schoolTeam.id,
                }));
            })
            .catch(error => {
                console.log('Erro ao obter dados de edição:', error);
            });
        }, [alunoId]);

    const handleSubmit = async (event) => {
      event.preventDefault();
      const data = {
        name: aluno.name,
        birthDate: aluno.data_nascimento,
        schoolTeamId: aluno.turmaId
      }

      try{
          await axios.put(`https://localhost:7061/api/students/${alunoId}`, data)
          console.log(data);
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
            setAluno((prevData) => ({
              ...prevData,
              turmaId: parseInt(value), 
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

   if (!alunoId) return null;
    return(
        <div className={`${styles.modal} ${styles.modalAberto}`}>
            <div className={styles.modalContent}>
                <div className={styles.formulario}>
                    <h1>Editar Aluno</h1>
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
                        {aluno.turmaId !== undefined ? (
                            <select
                            class="form-control"
                            id="exampleFormControlSelect1"
                            value={aluno.turmaId}
                            onChange={handleChange}
                            required
                            >
                            {data &&
                                data.map((turma) => (
                                <option key={turma.id} value={turma.id}>
                                    {turma.teamNumber}
                                </option>
                                ))}
                            </select>
                        ) : (
                            <p>Carregando turmas...</p>
                        )}
                    </div>
                    {verificarCadastro()}
                    <div className={styles.buttons}>
                    <button type="submit" class="btn btn-primary">{"Registrar"}</button>
                    <button class="btn btn-danger" onClick={action}>Voltar</button>
                    </div>
                </form>
                </div>   
            </div>
        </div>
    );
}