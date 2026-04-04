# Requisitos do Aplicativo Motometrics

Este documento lista os requisitos funcionais e não funcionais do aplicativo atualmente implementado.

## Requisitos Funcionais

1. Cadastro e gerenciamento de motos
   - O usuário pode visualizar uma lista de motos cadastradas na garagem.
   - O usuário pode acessar a tela de cadastro de nova moto.
   - O usuário pode adicionar uma nova moto com nome, especificações técnicas e foto.
   - Para motos sem foto selecionada, é usada uma imagem padrão.

2. Visualização da garagem
   - O aplicativo exibe cards de moto com imagem, nome e placa (ou indicação de não cadastrada).
   - O usuário pode acessar a dashboard de cada moto.

3. Dashboard da moto
   - Exibe imagem, nome e subtítulo da moto.
   - Mostra indicadores de saúde da moto, como desgaste estimado de componentes.
   - Exibe próxima revisão com quilometragem e data prevista.
   - Permite navegar para registrar nova revisão.
   - Permite navegar para tela de abastecimento.

4. Registro de revisão
   - O usuário pode registrar uma nova revisão com descrição do serviço, quilometragem e valor.
   - O registro é salvo no histórico da moto correspondente.
   - O histórico de revisões é atualizado imediatamente após o registro.

5. Histórico de manutenção
   - O aplicativo mostra o histórico de manutenção da moto.
   - Exibe custo total acumulado de manutenção.
   - Exibe cada registro com data, serviço, quilometragem e valor.
   - Permite exportar o histórico em PDF.

6. Cronograma de revisões
   - Exibe próximas revisões agendadas para a moto selecionada.
   - Mostra o serviço previsto e a data de revisão.

7. Ficha técnica da moto
   - Exibe especificações como motor, potência, torque, câmbio, peso e tanque.
   - Calcula autonomia aproximada com base na capacidade do tanque e consumo médio.
   - Mostra botão para abrir o manual do proprietário em um link externo.

8. Edição de foto da moto
   - O usuário pode alterar a foto da moto existente usando galeria ou câmera.
   - A nova foto é salva no contexto da moto e exibida imediatamente.

9. Versão atual e estado de beta
   - O aplicativo deve exibir a versão atual e informar que está em beta.
   - A versão atual do app é `1.0.0-beta`.

10. Navegação
    - O aplicativo usa navegação baseada em rotas de arquivo Expo Router.
    - Possui barra de navegação fixa para alternar entre dashboard, histórico, cronograma e outras telas.

## Requisitos Não Funcionais

1. Plataforma
   - O aplicativo é construído com Expo e deve ser compatível com Android, iOS e web.
   - Deve usar o padrão do React Native para criar interfaces nativas.

2. Interface e usabilidade
   - Interfaces devem ser responsivas e permitir rolagem em conteúdos longos.
   - Componentes devem seguir layout claro e botões legíveis.
   - Deve usar estilos centralizados com `StyleSheet` para consistência visual.

3. Dados e estado
   - O estado de motos é gerenciado em um contexto global (`MotoContext`).
   - Dados são mantidos em memória durante a sessão do app.
   - Não há persistência em banco de dados remoto ou local configurado atualmente.

4. Performance
   - A interface deve responder rapidamente a navegações e ações do usuário.
   - O app deve carregar imagens via URI e exibi-las sem travamentos.

5. Qualidade de código
   - O código deve ser claro e comentado para explicar funcionalidades principais.
   - Deve passar validações de lint do Expo/ESLint.

6. Dependências
   - Usa `expo-image-picker` para seleção de imagens de galeria e câmera.
   - Usa `expo-print` para exportação de PDF.
   - Usa `expo-router` para navegação.

7. Estado de maturidade
   - O aplicativo está em fase beta e pode ter funcionalidades em desenvolvimento.
   - Atualizações e ajustes de interface ainda são esperados.

## Observações

- O app atual não implementa armazenamento persistente de longo prazo (como banco local ou nuvem).
- Não existe ainda suporte a autenticação de usuário.
- O controle de histórico e cronograma é feito por moto, usando o contexto compartilhado.
- O arquivo `VERSION_HISTORY.md` registra as versões anteriores e a versão atual em beta.
