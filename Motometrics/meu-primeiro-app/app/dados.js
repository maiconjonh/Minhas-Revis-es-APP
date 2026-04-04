export const frota = [
  {
    id: '1',
    nome: 'Triumph Speed 400',
    subtitulo: 'Naked Roadster • Edição 2024',
    status: 'Excelente',
    imagem: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=800&auto=format&fit=crop',
    especificacoes: { motor: '398', potencia: '40', torque: '37.5', cambio: '6', peso: '170', tanque: '13' },
    historico: [
      { id: 1, data: '15 Mai 2024', servico: 'Troca de Óleo e Filtro', km: '12.500 km', status: 'Concluído' },
      { id: 2, data: '10 Fev 2024', servico: 'Troca das Pastilhas de Freio', km: '10.000 km', status: 'Concluído' }
    ],
    cronograma: [
      { id: 1, servico: 'Revisão Geral (15.000 km)', kmsFaltam: 'Faltam 800 km', urgencia: 'alta' },
      { id: 2, servico: 'Troca do Fluido de Freio', kmsFaltam: 'Faltam 2.500 km', urgencia: 'media' }
    ]
  },
  {
    id: '2',
    nome: 'Honda CB 500X',
    subtitulo: 'Crossover • Edição 2022',
    status: 'Revisão Próxima',
    imagem: 'https://images.unsplash.com/photo-1622185135505-2d795003994a?q=80&w=800&auto=format&fit=crop',
    especificacoes: { motor: '471', potencia: '50', torque: '43.0', cambio: '6', peso: '199', tanque: '17.7' },
    historico: [
      { id: 1, data: '20 Mar 2024', servico: 'Revisão de 20.000 km', km: '20.000 km', status: 'Concluído' },
      { id: 2, data: '05 Jan 2024', servico: 'Troca do Kit Relação', km: '15.000 km', status: 'Concluído' }
    ],
    cronograma: [
      { id: 1, servico: 'Troca do Pneu Traseiro', kmsFaltam: 'Faltam 300 km', urgencia: 'alta' },
      { id: 2, servico: 'Troca de Óleo Menor', kmsFaltam: 'Faltam 4.000 km', urgencia: 'baixa' }
    ]
  }
];