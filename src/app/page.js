"use client"

import { Button } from '@/components/Button'
import styles from './page.module.css'
import { RegistrarAluno } from '@/components/registrar-aluno-modal'
import { RegistrarTurma } from '@/components/registrar-turma-modal'
import { useState } from 'react'

import { Table } from '@/components/Table'
import { ClassList } from '@/components/Class-list'


export default function Home() {

  const [isActiveAluno, setIsActiveAluno] = useState(false);
  const [isActiveTurma, setIsActiveTurma] = useState(false);
  const [isActiveVerAlunos, setIsActiveVerAlunos] = useState(false);
  const [isActiveVerTurmas, setIsActiveVerTurmas] = useState(false);
  function handleAlunoClick() {
    setIsActiveAluno(!isActiveAluno);
  }
  function handleTurmaClick() {
    setIsActiveTurma(!isActiveTurma);
  }
  function handleVerAlunosClick() {
    setIsActiveVerAlunos(!isActiveVerAlunos);
  }
  function handleVerTurmasClick() {
    setIsActiveVerTurmas(!isActiveVerTurmas);
  }
  return (
    <main className={styles.main}>
      <h1>Escola Maria Maria</h1>
        <div className={styles.buttons}>
        {isActiveAluno ? <RegistrarAluno action={handleAlunoClick}></RegistrarAluno> : 
        <Button onClick={handleAlunoClick}>{"Registrar Aluno"}</Button>} 
        {isActiveTurma ? <RegistrarTurma action={handleTurmaClick}></RegistrarTurma> : 
        <Button onClick={handleTurmaClick}>{"Registrar Turma"}</Button>} 
        </div>
        <div className={styles.buttons}>
          {isActiveVerAlunos ? (<Table action={handleVerAlunosClick}/>) : 
          (<Button onClick={handleVerAlunosClick}>{"Lista de Alunos"}</Button>)}
          {isActiveVerTurmas ? (<ClassList action={handleVerTurmasClick}/>) : 
          (<Button onClick={handleVerTurmasClick}>{"Lista de turmas"}</Button>)}    
        </div>
      
      
    </main>
  )
}
