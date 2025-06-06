import { act, fireEvent, render, screen } from "@testing-library/react";
import Formulario from "./Formulario";
import { RecoilRoot } from "recoil";

describe('o comportamento do Formulario.tsx', () => {
  // Jest
  
  test("quando o input está vazio, novos participantes não podem ser adicionados", () => {
    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>
    );
    // encontra no DOM o input
    const input = screen.getByPlaceholderText(
      "Insira os nomes dos participantes"
    );
  
    // encontra o botão
    const botao = screen.getByRole("button");
  
    // garantir que o input esteja no documento
    expect(input).toBeInTheDocument();
  
    // garantir que o botão esteja desabilitado
    expect(botao).toBeDisabled();
  });
  
  test("adicionar um particiapnte caso exista um nome preenchido", () => {
    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>
    );
    // encontra no DOM o input
    const input = screen.getByPlaceholderText(
      "Insira os nomes dos participantes"
    );
  
    // encontra o botão
    const botao = screen.getByRole("button");
  
    // inserir um valor no input
    fireEvent.change(input, {
      target: {
        value: "Ana",
      },
    });
  
    // clicar no botão de submeter
    fireEvent.click(botao);
  
    // garantir que o input esteja com o foco ativo
    expect(input).toHaveFocus();
  
    // garantir que o input não tenha um valor
    expect(input).toHaveValue("");
  });
  
  test("nomes duplicados não podem ser adicionar na lista", () => {
    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>
    );
    const input = screen.getByPlaceholderText("Insira os nomes dos participantes");
    const botao = screen.getByRole("button");
    fireEvent.change(input, {
      target: {
        value: "Ana",
      },
    });
    fireEvent.click(botao);
    fireEvent.change(input, {
      target: {
        value: "Ana",
      },
    });
    fireEvent.click(botao);
  
    const mensagemDeErro = screen.getByRole("alert");
  
    expect(mensagemDeErro.textContent).toBe(
      "Nomes duplicados não são permitidos!"
    );
  });
  
  test("a mensagem de erro deve sumir após os timers", () => {
    jest.useFakeTimers()
    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>
    );
    const input = screen.getByPlaceholderText("Insira os nomes dos participantes");
    const botao = screen.getByRole("button");
    fireEvent.change(input, {
      target: {
        value: "Ana",
      },
    });
    fireEvent.click(botao);
    fireEvent.change(input, {
      target: {
        value: "Ana",
      },
    });
    fireEvent.click(botao);
    let mensagemDeErro = screen.queryByRole("alert");
    expect(mensagemDeErro).toBeInTheDocument();
  
    //esperar N segundos
    act(()=> {
      jest.runAllTimers()
    });
  
  
    mensagemDeErro = screen.queryByRole("alert");
    expect(mensagemDeErro).toBeNull();
  
  });

})
