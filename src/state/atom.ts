import { atom } from "recoil";

export const listaParticipantesState = atom<string[]>({
    key: "listaParticipantesState",
    default: []
})

export const resultadoDoAmigoScreto = atom<Map<string, string>>({
    key: "resultadoDoAmigoScreto",
    default: new Map()
})

export const erroState = atom<string>({
    key: 'erroState',
    default:''
})