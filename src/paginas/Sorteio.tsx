import { useState } from "react";
import { useListaDeParticipantes } from "../state/hook/useListaDeParticipantes";
import { useResultadoSorteio } from "../state/hook/useResultadoSorteio";
import styles from './Sorteio.module.css'
import Card from "../componentes/Card";

const Sorteio = () => {
  const participantes = useListaDeParticipantes()

  const [participanteDaVez, setParticipanteDaVez] = useState('')
  const [amigoSecreto, setAmigoSecreto] = useState('')

  const resultado = useResultadoSorteio()

  const sortear = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault()
    if (resultado.has(participanteDaVez)) {
      setAmigoSecreto(resultado.get(participanteDaVez)!)
      setTimeout(() => {
        setAmigoSecreto('*****')
      }, 5000)
    }

  }

    return (
    <Card>
      <section className={styles.sorteio}>
        <h2>Quem vai tirar o papelzinho?</h2>
        <form onSubmit={sortear}>
          <select 
            required 
            id="participanteDaVez"
            name="participanteDaVez" 
            placeholder="Selecione o seu nome"
            value={participanteDaVez}
            onChange={evento => setParticipanteDaVez(evento.target.value)}
          >
            <option>Selecione seu nome</option>
            {participantes.map(participante => <option key={participante}>{participante}</option>)}
          </select>
          <p>Clique em sortear para ver quem é seu amigo secreto!</p>
          <button className={styles.botao_sortear}>Sortear</button>
        </form>
        {amigoSecreto && <p className={styles.resultado} role="alert">{amigoSecreto}</p>}
        <footer className={styles.sorteio}>
          <img src="/imagens/aviao.png" alt="Um desenho de aviao de papel" className={styles.aviao} />
        </footer>
      </section>
    </Card>
  );
};

export default Sorteio;
