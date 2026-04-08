# Motometrics 🏍️
**Gestão Inteligente e Monitoramento de Manutenção para Motocicletas**

O **Motometrics** é um assistente digital desenvolvido para motociclistas que desejam total controle sobre a saúde e manutenção de seus veículos. O aplicativo centraliza o histórico de serviços, monitora o desgaste de componentes em tempo real e oferece alertas preventivos baseados em protocolos oficiais de engenharia.

## 🚀 Proposta do Projeto
O objetivo principal é substituir as anotações manuais por um sistema dinâmico que prevê revisões, ajuda a economizar em reparos corretivos e mantém o histórico de valorização do veículo sempre acessível.

## ✨ Principais Funcionalidades

### 1. Dashboard de Saúde Integrado
*   **Índice de Saúde Geral:** Visualização em porcentagem da integridade da moto.
*   **Monitoramento de Componentes:** Status em tempo real de itens críticos como **Vida do Óleo, Pneus e Corrente**.
*   **Dados de Uso:** Acompanhamento de odômetro total e média de consumo de combustível.

### 2. Cronograma e Lógica de Revisão
*   **Protocolos Oficiais:** Sincronização com intervalos de manutenção de fábrica (ex: Revisão de 1.000km, 16.000km).
*   **Alertas de Manutenção:** Lembretes para serviços recorrentes como tensão e lubrificação da corrente.
*   **Status de Desgaste:** Indicadores visuais para sistemas de **Motor, Freios e Pneus**.

### 3. Histórico de Manutenção (Diário de Serviço)
*   **Gestão Financeira:** Registro de valores pagos e cálculo do custo total de manutenção acumulado.
*   **Atividade Recente:** Lista detalhada de serviços realizados com data e quilometragem.
*   **Relatórios Profissionais:** Exportação do histórico completo em **PDF** para comprovação de revisões.

### 4. Ficha Técnica e Gestão de Frota
*   **Especificações Técnicas:** Dados detalhados como potência (PS), torque (NM), peso e capacidade do tanque.
*   **Multi-veículos:** Suporte para gerenciar mais de uma moto (Garagem) e trocar entre perfis rapidamente.

## 🛠️ Requisitos de Desenvolvimento
Conforme as diretrizes do projeto, este repositório foca em:
*   **Versionamento:** Controle rigoroso de commits e branches no GitHub.
*   **Persistência de Dados:** Armazenamento seguro de todas as informações de revisões e custos.
*   **Interface UX/UI:** Design intuitivo focado na agilidade do registro de dados pelo motociclista.

## 🛠️ Tecnologias Utilizadas

- **React Native** (0.81.5) com **Expo** (~54.0.33)
- **TypeScript** (~5.9.2)
- **Expo Router** (~6.0.23) para navegação baseada em arquivos
- **React Navigation** para navegação nativa
- **Expo Image Picker** para seleção de imagens
- **Expo Print** para exportação de PDFs
- Outras bibliotecas Expo para funcionalidades nativas

## 📦 Instalação

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/Minhas-Revis-es-APP.git
   cd Minhas-Revis-es-APP/Motometrics/meu-primeiro-app
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

## 🚀 Como Executar

- **Iniciar o servidor de desenvolvimento:**
  ```bash
  npm start
  ```

- **Executar no Android:**
  ```bash
  npm run android
  ```

- **Executar no iOS:**
  ```bash
  npm run ios
  ```

- **Executar na Web:**
  ```bash
  npm run web
  ```

Certifique-se de ter o Expo CLI instalado globalmente (`npm install -g @expo/cli`) e um emulador/simulador configurado.

## 📁 Estrutura do Projeto

```
Motometrics/meu-primeiro-app/
├── app/                    # Páginas e rotas (Expo Router)
│   ├── _layout.jsx        # Layout principal
│   ├── index.jsx          # Tela inicial/Dashboard
│   ├── abastecer.jsx      # Tela de abastecimento
│   ├── adicionar.jsx      # Adicionar moto/revisão
│   ├── cronograma.jsx     # Cronograma de revisões
│   ├── detalhes.jsx       # Detalhes da moto
│   ├── historico.jsx      # Histórico de manutenções
│   ├── revisao.jsx        # Tela de revisão
│   ├── modal.tsx          # Modal genérico
│   ├── MotoContext.js     # Contexto para estado da moto
│   └── NavBar.jsx         # Barra de navegação
├── components/            # Componentes reutilizáveis
│   ├── ui/               # Componentes de UI
│   └── ...
├── assets/               # Imagens e recursos estáticos
├── constants/            # Temas e constantes
├── hooks/                # Hooks customizados
└── scripts/              # Scripts utilitários
```

## 🤝 Como Contribuir

1. **Fork** o projeto
2. Crie uma branch para sua feature: `git checkout -b feature/nova-feature`
3. Commit suas mudanças: `git commit -m 'Adiciona nova feature'`
4. Push para a branch: `git push origin feature/nova-feature`
5. Abra um **Pull Request**

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

**Desenvolvido com ❤️ para motociclistas apaixonados!** 🏍️

