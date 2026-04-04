// Importa React e hooks necessários para criar contexto e estado
import React, { createContext, useContext, useState } from "react";

// Cria um contexto para compartilhar dados das motos entre componentes
const MotoContext = createContext();

// Define o provedor do contexto que envolve os componentes filhos
export function MotoProvider({ children }) {
  // Estado inicial com uma lista de motos, incluindo dados hardcoded para exemplo
  const [motos, setMotos] = useState([
    {
      // ID único da moto
      id: "1",
      // Nome da moto
      nome: "TRIUMPH SPEED 400",
      // Subtítulo da moto
      subtitulo: "MODERN CLASSIC",
      // Placa da moto
      placa: "MTO-2024",
      // URL da imagem da moto
      imagem:
        "https://motosbr.com/wp-content/uploads/2023/06/Triumph-Speed-400-2024-3.png",

      // Objeto com especificações técnicas da moto
      especificacoes: {
        // Cilindrada do motor em cc
        motor: "398",
        // Potência máxima em PS
        potencia: "40",
        // Torque máximo em Nm
        torque: "37.5",
        // Número de marchas do câmbio
        cambio: "6",
        // Peso em ordem de marcha em kg
        peso: "170",
        // Capacidade do tanque em litros
        tanque: "13",
      },

      // Array com próximas revisões agendadas
      cronograma: [
        // Primeiro item do cronograma
        { servico: "Troca de Óleo e Filtro", data: "14/10/2024" },
        // Segundo item do cronograma
        { servico: "Revisão Geral", data: "20/12/2024" },
      ],
      // Array com histórico de manutenções
      historico: [
        // Primeiro registro do histórico
        {
          data: "10/08/2024",
          servico: "Troca de Pneu Traseiro",
          km: "15.000",
          valor: "R$ 850,00",
        },
        // Segundo registro do histórico
        {
          data: "05/05/2024",
          servico: "Revisão de 10.000km",
          km: "10.005",
          valor: "R$ 1.200,00",
        },
      ],
    },
  ]);

  // Função para adicionar uma nova moto à lista
  const adicionarMoto = (novaMoto) => {
    // Gera um novo ID baseado no tamanho atual da lista
    const id = (motos.length + 1).toString();
    // Adiciona a nova moto com o ID gerado à lista existente
    setMotos([...motos, { ...novaMoto, id }]);
  };

  // Retorna o provedor do contexto com os valores compartilhados
  return (
    <MotoContext.Provider value={{ motos, setMotos, adicionarMoto }}>
      {children}
    </MotoContext.Provider>
  );
}

// Hook personalizado para acessar o contexto das motos
export function useMotos() {
  // Obtém o contexto atual
  const context = useContext(MotoContext);
  // Lança erro se o hook for usado fora do provedor
  if (!context) {
    throw new Error("useMotos deve ser usado dentro de um MotoProvider");
  }
  // Retorna o contexto
  return context;
}
