// Importa a biblioteca para impressão de PDF
import * as Print from "expo-print";
// Importa hooks de navegação
import { useLocalSearchParams, useRouter } from "expo-router";
// Importa componentes do React Native
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
// Importa o hook do contexto das motos
import { useMotos } from "./MotoContext";
// Importa o componente NavBar
import NavBar from "./NavBar";

// Define o componente principal da tela de histórico
export default function Historico() {
  // Hook para navegação
  const router = useRouter();
  // Obtém o parâmetro 'id' da URL
  const { id } = useLocalSearchParams();
  // Desestrutura o contexto para obter motos
  const { motos } = useMotos();
  // Encontra a moto correspondente ao ID ou usa a primeira
  const moto = motos.find((m) => m.id === String(id)) || motos[0];

  // Função assíncrona para exportar o histórico em PDF
  const exportarPDF = async () => {
    // Define o conteúdo HTML do PDF
    const html = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { color: #ff6b00; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>
          <h1>Histórico de Manutenção - ${moto.nome}</h1>
          <p>Custo Total: R$ ${
            moto.historico
              ? moto.historico
                  .reduce((total, item) => {
                    // Converte o valor para número, removendo 'R$ ' e trocando vírgula por ponto
                    const valor = parseFloat(
                      item.valor.replace("R$ ", "").replace(",", "."),
                    );
                    // Soma o valor ao total, tratando NaN como 0
                    return total + (isNaN(valor) ? 0 : valor);
                  }, 0)
                  .toFixed(2) // Formata para 2 casas decimais
                  .replace(".", ",") // Troca ponto por vírgula
              : "0,00" // Valor padrão se não houver histórico
          }</p>
          <table>
            <tr><th>Data</th><th>Serviço</th><th>KM</th><th>Valor</th></tr>
            ${moto.historico ? moto.historico.map((item) => `<tr><td>${item.data}</td><td>${item.servico}</td><td>${item.km}</td><td>${item.valor}</td></tr>`).join("") : ""}
          </table>
        </body>
      </html>
    `;
    // Chama a função para imprimir o PDF
    await Print.printAsync({ html });
  };

  // Retorna o JSX da interface
  return (
    // Container principal
    <View style={styles.container}>
      {/* Seção do cabeçalho */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.push("/")}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>← Garagem</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>HISTÓRICO</Text>
      </View>

      {/* Área rolável para o conteúdo */}
      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Título com o nome da moto */}
        <Text style={styles.motoTitle}>{moto.nome}</Text>
        {/* Rótulo da seção */}
        <Text style={styles.sectionLabel}>REGISTROS DE MANUTENÇÃO</Text>

        {/* Card exibindo o custo total */}
        <View style={styles.totalCard}>
          <Text style={styles.totalLabel}>CUSTO TOTAL DE MANUTENÇÃO</Text>
          <Text style={styles.totalValue}>
            R${" "}
            {moto.historico
              ? moto.historico
                  .reduce((total, item) => {
                    // Converte o valor para número
                    const valor = parseFloat(
                      item.valor.replace("R$ ", "").replace(",", "."),
                    );
                    // Soma ao total
                    return total + (isNaN(valor) ? 0 : valor);
                  }, 0)
                  .toFixed(2) // Formata
                  .replace(".", ",")
              : "0,00"}
          </Text>
        </View>

        {/* Botão para exportar PDF */}
        <TouchableOpacity style={styles.exportBtn} onPress={exportarPDF}>
          <Text style={styles.exportBtnText}>📄 EXPORTAR RELATÓRIO PDF</Text>
        </TouchableOpacity>

        {/* Verifica se há histórico e mapeia os itens */}
        {moto.historico && moto.historico.length > 0 ? (
          moto.historico.map((item, index) => (
            // Card para cada item do histórico
            <View key={index} style={styles.card}>
              <Text style={styles.date}>{item.data}</Text>
              <Text style={styles.service}>{item.servico}</Text>
              <Text style={styles.km}>KM: {item.km}</Text>
              <Text style={styles.valor}>{item.valor}</Text>
            </View>
          ))
        ) : (
          // Texto se não houver registros
          <Text style={styles.empty}>Nenhum registro encontrado.</Text>
        )}
      </ScrollView>

      {/* Barra de navegação fixa */}
      <NavBar id={id} telaAtual="historico" />
    </View>
  );
}

// Define os estilos usando StyleSheet
const styles = StyleSheet.create({
  // Estilo para o container principal
  container: { flex: 1, backgroundColor: "#fcf9f8" },
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
    fontWeight: "bold",
    letterSpacing: 2,
    marginLeft: "auto",
  },
  // Estilo para a área rolável
  scrollArea: { flex: 1 },
  // Estilo para o conteúdo rolável
  scrollContent: { padding: 24, paddingBottom: 40 },
  // Estilo para o título da moto
  motoTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#1b1c1c",
  },
  // Estilo para o rótulo da seção
  sectionLabel: {
    fontSize: 10,
    fontWeight: "900",
    color: "#8e7164",
    letterSpacing: 2,
    marginBottom: 16,
  },
  // Estilo para o card do custo total
  totalCard: {
    backgroundColor: "#1b1c1c",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    alignItems: "center",
  },
  // Estilo para o rótulo do custo total
  totalLabel: {
    fontSize: 12,
    fontWeight: "900",
    color: "#ff6b00",
    letterSpacing: 2,
    marginBottom: 8,
  },
  // Estilo para o valor do custo total
  totalValue: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#ffffff",
  },
  // Estilo para o botão exportar
  exportBtn: {
    backgroundColor: "#ff6b00",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 20,
  },
  // Estilo para o texto do botão exportar
  exportBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  // Estilo para o card de cada item
  card: {
    backgroundColor: "#f6f3f2",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  // Estilo para a data
  date: {
    fontSize: 12,
    color: "#8e7164",
    fontWeight: "bold",
    marginBottom: 4,
  },
  // Estilo para o serviço
  service: {
    fontSize: 16,
    color: "#1b1c1c",
    fontWeight: "600",
    marginBottom: 4,
  },
  // Estilo para os km
  km: {
    fontSize: 14,
    color: "#4c616c",
    marginBottom: 4,
  },
  // Estilo para o valor
  valor: {
    fontSize: 16,
    color: "#ff6b00",
    fontWeight: "bold",
  },
  // Estilo para o texto vazio
  empty: {
    color: "#a39893",
    fontStyle: "italic",
    textAlign: "center",
    marginTop: 20,
  },
});
