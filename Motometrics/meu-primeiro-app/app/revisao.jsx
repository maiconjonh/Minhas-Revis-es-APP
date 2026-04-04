// Importa hooks e componentes necessários do expo-router e React Native
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
// Importa o hook personalizado para acessar o contexto das motos
import { useMotos } from "./MotoContext";

// Define o componente principal da tela de nova revisão
export default function NovaRevisao() {
  // Hook para navegação
  const router = useRouter();
  // Obtém o parâmetro 'id' da URL para identificar a moto
  const { id } = useLocalSearchParams();

  // Desestrutura o contexto para obter motos e a função para atualizá-las
  const { motos, setMotos } = useMotos();

  // Estado para armazenar o valor do campo serviço
  const [servico, setServico] = useState("");
  // Estado para armazenar o valor do campo quilometragem
  const [km, setKm] = useState("");
  // Estado para armazenar o valor do campo valor
  const [valor, setValor] = useState("");

  // Função chamada ao pressionar o botão salvar
  const handleSalvar = () => {
    // Verifica se todos os campos estão preenchidos
    if (!servico || !km || !valor) {
      // Exibe alerta se algum campo estiver vazio
      Alert.alert("Ops!", "Preencha todos os campos para registrar a revisão.");
      return;
    }

    // Cria um objeto com os dados da nova revisão
    const novoRegistro = {
      // Obtém a data atual formatada em português brasileiro
      data: new Date().toLocaleDateString("pt-BR"),
      // Atribui o valor do campo serviço
      servico: servico,
      // Formata a quilometragem com 'km'
      km: `${km} km`,
      // Formata o valor com 'R$'
      valor: `R$ ${valor}`,
    };

    // Mapeia as motos para atualizar a moto específica
    const motosAtualizadas = motos.map((moto) => {
      // Verifica se o ID da moto corresponde ao parâmetro
      if (moto.id === String(id)) {
        // Adiciona o novo registro ao início do histórico
        const historicoAtualizado = [novoRegistro, ...(moto.historico || [])];
        // Retorna a moto atualizada com o novo histórico
        return { ...moto, historico: historicoAtualizado };
      }
      // Retorna a moto sem alterações
      return moto;
    });

    // Verifica se a função setMotos existe
    if (setMotos) {
      // Atualiza o estado das motos no contexto
      setMotos(motosAtualizadas);
      // Exibe alerta de sucesso e navega de volta
      Alert.alert("Sucesso!", "Revisão registrada na sua garagem.", [
        { text: "OK", onPress: () => router.back() },
      ]);
    } else {
      // Exibe alerta se a função não for encontrada
      Alert.alert(
        "Atenção",
        "A função setMotos não foi encontrada no seu MotoContext.",
      );
    }
  };

  // Retorna o JSX da interface
  return (
    // Container principal com ajuste de teclado
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* Seção do cabeçalho */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>← Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>NOVA REVISÃO</Text>
      </View>

      {/* Área rolável para o formulário */}
      <ScrollView
        style={styles.formContainer}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Grupo de entrada para descrição do serviço */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>DESCRIÇÃO DO SERVIÇO</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Troca de óleo e filtro"
            value={servico}
            onChangeText={setServico}
          />
        </View>

        {/* Grupo de entrada para odômetro */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>ODÔMETRO ATUAL (KM)</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: 22760"
            keyboardType="numeric"
            value={km}
            onChangeText={setKm}
          />
        </View>

        {/* Grupo de entrada para valor */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>VALOR TOTAL (R$)</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: 1200.00"
            keyboardType="numeric"
            value={valor}
            onChangeText={setValor}
          />
        </View>

        {/* Botão para salvar a revisão */}
        <TouchableOpacity style={styles.saveBtn} onPress={handleSalvar}>
          <Text style={styles.saveBtnText}>REGISTRAR REVISÃO</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// Define os estilos usando StyleSheet
const styles = StyleSheet.create({
  // Estilo para o container principal
  container: { flex: 1, backgroundColor: "#fdfbfa" },
  // Estilo para o cabeçalho
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 20,
  },
  // Estilo para o botão voltar
  backButton: { paddingVertical: 8, paddingRight: 16 },
  // Estilo para o texto do botão voltar
  backButtonText: { color: "#ff6b00", fontWeight: "bold" },
  // Estilo para o título do cabeçalho
  headerTitle: {
    fontSize: 14,
    fontWeight: "900",
    color: "#1b1c1c",
    letterSpacing: 2,
    marginLeft: "auto",
  },
  // Estilo para o container do formulário
  formContainer: { flex: 1 },
  // Estilo para o conteúdo rolável
  scrollContent: { padding: 24, paddingBottom: 40 },
  // Estilo para o grupo de entrada
  inputGroup: { marginBottom: 20 },
  // Estilo para o rótulo
  label: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#8e7164",
    marginBottom: 8,
  },
  // Estilo para o campo de entrada
  input: {
    backgroundColor: "#f6f3f2",
    padding: 16,
    borderRadius: 12,
    fontSize: 16,
  },
  // Estilo para o botão salvar
  saveBtn: {
    backgroundColor: "#d35400",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },
  // Estilo para o texto do botão salvar
  saveBtnText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
