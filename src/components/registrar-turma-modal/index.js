import styles from "./registro-turma.module.css"
import { Button } from '@/components/Button'

import Turma from "../../models/Turma";
import axios from 'axios';
import { useState } from "react";

export function RegistrarTurma({action}){
    const [turma, setTurma] = useState(Turma);
    const [sucesso, setSucesso] = useState();
    const handleSubmit = (event) => {
      event.preventDefault();
      try{
        const data = {
          teamNumber: turma.numeroTurma,
          teamName: turma.serie
        };
          const response = axios.post('https://localhost:7061/api/schoolteams', data)
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
      setTurma((prevData) => ({
        ...prevData,
        [id]: value,
      }));
    };
    return(
      <div className={styles.formulario}>
        <h1>Registrar Turma</h1>
      <form onSubmit={handleSubmit}>
        <div class="row">
          <div class="col">
            <input id="numeroTurma" type="text" class="form-control" value={turma.numeroTurma} placeholder="Número da turma" onChange={handleChange}  required/>
          </div>
          <div class="col">
            <input id="serie" type="text" class="form-control" value={turma.serie} placeholder="Série" onChange={handleChange}  required/>
          </div>
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