import { useQuery } from 'react-query';
import styles from './class-list.module.css'
import axios from 'axios';
import { useState } from 'react';

export function ClassList({action}){
    const {data, isFetching, isError, refetch } = useQuery('students', async ()=>{
        try {
            const response = await axios.get('https://localhost:7061/api/schoolteams');
            return response.data;
          } catch (error) {
            throw new Error('Failed to fetch data');
        }
     })

     const [selectedTurma, setSelectedTurma] = useState(null);

    const handleTurmaClick = (turma) => {
        setSelectedTurma(turma);
    };

    return(
        <div className={styles.teamNumbers}>
            {data ? (data.map((turma) => (
          <div key={turma.id} className={`${styles.turmaItem} ${selectedTurma === turma ? styles.selected : styles.notSelected}`}>
            <span onClick={() => handleTurmaClick(turma)}>{turma.teamNumber}</span>
            {selectedTurma === turma && (
                <div className={styles.turmaInfo}>
                    <ul className={styles.studentList}>
                        {turma.students.map((student) => (
                        <li>{student.name}</li>
                        ))}
                    </ul>
                </div>
            )}
            {selectedTurma === turma && (
              <div className={styles.turmaName}>{turma.teamName}</div>
            )}
          </div>
        ))) : null}
            <button onClick={action} class="btn btn-danger">Fechar</button>
        </div>
    );
}