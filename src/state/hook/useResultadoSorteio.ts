import { useRecoilValue } from "recoil"
import { resultadoDoAmigoScreto } from "../atom"

export const useResultadoSorteio = () => {
  return useRecoilValue(resultadoDoAmigoScreto)
}

export default useResultadoSorteio