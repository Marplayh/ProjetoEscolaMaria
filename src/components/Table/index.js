import { useQuery } from 'react-query';
import styles from './tabela-styles.module.css'

import { EditarAluno } from '../editar-aluno-modal';

import axios from 'axios';
import { useState } from 'react';


export function Table({action}){

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [studentSelected, setStudentSelected] = useState(null);

  const openModal = (alunoId) => {
    setStudentSelected(alunoId);
    setIsOpenModal(true);  
  };

  const closeModal = () => {
    setStudentSelected(null);
    setIsOpenModal(false);
  };
    const formatData = (data) => {
        const date = new Date(data);
        const dia = String(date.getDate()).padStart(2, '0');
        const mes = String(date.getMonth() + 1).padStart(2, '0');
        const ano = date.getFullYear();
        return `${dia}/${mes}/${ano}`;
      };

    const {data, isFetching, isError, refetch } = useQuery('students', async ()=>{
        try {
            const response = await axios.get('https://localhost:7061/api/students');
            return response.data;
          } catch (error) {
            throw new Error('Failed to fetch data');
        }
     })

     const deletarCliente = async (id) =>{
      try{
        await axios.delete(`https://localhost:7061/api/students/${id}`);      
        refetch();
      }catch(error){
        console.log('Error: ', error);
      }
        
    }
    return(
      <div className={`${styles.tabela} ${styles.overlay}`}>
        <div className={styles.tableContainer}>
        <table class="table table-hover table-dark">
          <thead>
            <tr>
              <th scope="col">Aluno</th>
              <th scope="col">Data de Nascimento</th>
              <th scope="col">Matrícula</th>
              <th scope="col">Turma</th>
              <th scope="col">Série</th>
            </tr>
          </thead>
          {isError ? (
          <h4 className="text-danger">Aconteceu um erro ou a tabela está vazia</h4>
          ) : isFetching ? (
          <span>Carregando...</span>
          ) : data ? (
          <tbody>
              {data.map((item, index) => (
              <tr key={index}>
                  <td>{item.name}</td>
                  <td>{formatData(item.birthDate)}</td>
                  <td>{item.registration}</td>
                  <td>{item.schoolTeam.teamNumber}</td>
                  <td>{item.schoolTeam.teamName}</td>
                  <td className={styles.icons} onClick={()=>openModal(item.id)}><i class="fa-regular fa-pen-to-square" style={{color: "#259340"}}></i></td>
                  <td className={styles.icons} onClick={()=>deletarCliente(item.id)}><i class="fa-solid fa-trash" style={{color: "#e41111"}}></i></td>
                  {studentSelected === item.id && (<EditarAluno isOpenModal={true} action={closeModal} alunoId={item.id}/>)}
              </tr>
              ))}
          </tbody>
          ) : null}
        </table>
        
        <button onClick={action} class="btn btn-danger">Fechar Tabela</button>
        </div>
      </div>  
    );
}