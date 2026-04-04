// Importa hooks de navegação
import { useLocalSearchParams, useRouter } from "expo-router";
// Importa componentes do React Native
import {
  Image,
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

// Define o componente principal da tela de dashboard
export default function Dashboard() {
  // Hook para navegação
  const router = useRouter();
  // Obtém o parâmetro 'id' da URL
  const { id } = useLocalSearchParams();
  // Desestrutura o contexto para obter motos
  const { motos } = useMotos();

  // Encontra a moto correspondente ao ID ou usa a primeira
  const moto = motos.find((m) => m.id === String(id)) || motos[0];

  // Calcula o último km do histórico ou usa valor padrão
  const ultimoKm =
    moto.historico && moto.historico.length > 0
      ? parseInt(moto.historico[0].km.replace(" km", ""))
      : 22760;
  // Valores de desgaste hardcoded por enquanto
  const desgastePneus = 85;
  const desgasteOleo = 64;
  const desgasteCorrente = 98;
  const desgasteMotor = 90;
  const desgasteFreios = 75;
  // Calcula a saúde geral como média dos desgastes
  const saudeGeral = Math.round(
    (desgastePneus +
      desgasteOleo +
      desgasteCorrente +
      desgasteMotor +
      desgasteFreios) /
      5,
  );
  // Consumo médio hardcoded
  const consumoMedio = 6.2;

  // Define a próxima revisão em 24.000 km
  const proximaRevisaoKm = 24000;
  // Calcula km restantes
  const kmRestantes = proximaRevisaoKm - ultimoKm;
  // Calcula data próxima (exemplo: +2 meses)
  const dataProxima = new Date();
  dataProxima.setMonth(dataProxima.getMonth() + 2);
  // Formata a data
  const dataFormatada = dataProxima.toLocaleDateString("pt-BR");

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
        <Text style={styles.headerTitle}>MOTOMETRICS</Text>
      </View>

      {/* Área rolável para o conteúdo */}
      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Seção hero com imagem da moto */}
        <View style={styles.heroSection}>
          <Text style={styles.tagLabel}>MÁQUINA ATUAL</Text>
          <Text style={styles.motoName}>
            {moto.nome || "TRIUMPH SPEED 400"}
          </Text>
          <Image
            source={{ uri: moto.imagem }}
            style={styles.heroImage}
            resizeMode="contain"
          />
        </View>

        {/* Linha de botões de ação */}
        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={styles.btnPrimary}
            onPress={() =>
              router.push({ pathname: "/revisao", params: { id } })
            }
          >
            <Text style={styles.btnPrimaryText}>+ NOVA REVISÃO</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnSecondary}
            onPress={() =>
              router.push({ pathname: "/abastecer", params: { id } })
            }
          >
            <Text style={styles.btnSecondaryText}>⛽ ABASTECER</Text>
          </TouchableOpacity>
        </View>

        {/* Card de saúde geral */}
        <View style={styles.card}>
          <View style={styles.healthHeader}>
            <View>
              <Text style={styles.sectionLabel}>SAÚDE GERAL</Text>
              <Text style={styles.healthValue}>
                {saudeGeral}
                <Text style={styles.healthPercent}>%</Text>
              </Text>
            </View>
            {/* Círculo de progresso visual */}
            <View style={styles.circleProgress}>
              <View style={styles.circleInner} />
            </View>
          </View>

          <View style={styles.integrityHeader}>
            <Text style={styles.subLabel}>INTEGRIDADE DOS COMPONENTES</Text>
            <Text style={styles.idealText}>IDEAL</Text>
          </View>

          {/* Barra de progresso horizontal */}
          <View style={styles.progressBarBg}>
            <View
              style={[styles.progressBarFill, { width: `${saudeGeral}%` }]}
            />
          </View>

          {/* Mini cards de componentes */}
          <View style={styles.componentsRow}>
            <View style={styles.miniCard}>
              <Text style={styles.miniCardLabel}>PNEUS</Text>
              <Text style={styles.miniCardValue}>{desgastePneus}%</Text>
            </View>
            <View style={styles.miniCard}>
              <Text style={styles.miniCardLabel}>VIDA DO ÓLEO</Text>
              <Text style={styles.miniCardValue}>{desgasteOleo}%</Text>
            </View>
            <View style={styles.miniCard}>
              <Text style={styles.miniCardLabel}>CORRENTE</Text>
              <Text style={styles.miniCardValue}>{desgasteCorrente}%</Text>
            </View>
          </View>
          <View style={styles.componentsRow}>
            <View style={styles.miniCard}>
              <Text style={styles.miniCardLabel}>MOTOR</Text>
              <Text style={styles.miniCardValue}>{desgasteMotor}%</Text>
            </View>
            <View style={styles.miniCard}>
              <Text style={styles.miniCardLabel}>FREIOS</Text>
              <Text style={styles.miniCardValue}>{desgasteFreios}%</Text>
            </View>
          </View>
        </View>

        {/* Card de próxima revisão */}
        <View style={[styles.card, styles.revisionCard]}>
          <View style={styles.revisionHeader}>
            <Text style={styles.revisionTitle}>📅 PRÓXIMA REVISÃO</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>GERAL</Text>
            </View>
          </View>

          <Text style={styles.subLabel}>DATA AGENDADA</Text>
          <Text style={styles.dateValue}>{dataFormatada}</Text>

          <View style={styles.revisionFooter}>
            <View>
              <Text style={styles.subLabel}>LIMITE DO INTERVALO</Text>
              <Text style={styles.limitValue}>
                {proximaRevisaoKm} <Text style={styles.unitText}>KM</Text>
              </Text>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <Text style={styles.subLabel}>RESTANTE</Text>
              <Text style={styles.remainingValue}>
                {kmRestantes} <Text style={styles.unitText}>KM</Text>
              </Text>
            </View>
          </View>
        </View>

        {/* Cards menores na base */}
        <View style={styles.bottomRow}>
          <View style={[styles.card, styles.halfCard]}>
            <Text style={styles.iconText}>⏱</Text>
            <Text style={styles.subLabel}>ODÔMETRO TOTAL</Text>
            <Text style={styles.smallCardValue}>{ultimoKm} km</Text>
          </View>
          <View style={[styles.card, styles.halfCard]}>
            <Text style={styles.iconText}>⛽</Text>
            <Text style={styles.subLabel}>CONSUMO MÉDIO</Text>
            <Text style={styles.smallCardValue}>{consumoMedio} L/100</Text>
          </View>
        </View>
      </ScrollView>

      {/* Barra de navegação fixa */}
      <NavBar id={id} telaAtual="dashboard" />
    </View>
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
  },
  // Estilo para a área rolável
  scrollArea: { flex: 1 },
  // Estilo para o conteúdo rolável
  scrollContent: { paddingHorizontal: 24, paddingBottom: 40 },
  // Estilo para a seção hero
  heroSection: {
    alignItems: "flex-start",
    marginBottom: 24,
  },
  // Estilo para o rótulo da tag
  tagLabel: {
    fontSize: 10,
    fontWeight: "900",
    color: "#8e7164",
    letterSpacing: 2,
    marginBottom: 4,
  },
  // Estilo para o nome da moto
  motoName: {
    fontSize: 28,
    fontWeight: "900",
    color: "#1b1c1c",
    textTransform: "uppercase",
    marginBottom: 16,
  },
  // Estilo para a imagem hero
  heroImage: {
    width: "100%",
    height: 220,
    backgroundColor: "#f2eeec",
    borderRadius: 16,
  },
  // Estilo para a linha de ações
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  // Estilo para o botão primário
  btnPrimary: {
    backgroundColor: "#d35400",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    flex: 1,
    marginRight: 12,
    alignItems: "center",
  },
  // Estilo para o texto do botão primário
  btnPrimaryText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  // Estilo para o botão secundário
  btnSecondary: {
    backgroundColor: "#f6f3f2",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    flex: 1,
    marginLeft: 12,
    alignItems: "center",
  },
  // Estilo para o texto do botão secundário
  btnSecondaryText: {
    color: "#1b1c1c",
    fontSize: 14,
    fontWeight: "bold",
  },
  // Estilo para o card
  card: {
    backgroundColor: "#f6f3f2",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  // Estilo para o cabeçalho de saúde
  healthHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  // Estilo para o rótulo da seção
  sectionLabel: {
    fontSize: 10,
    fontWeight: "900",
    color: "#8e7164",
    letterSpacing: 2,
  },
  // Estilo para o valor de saúde
  healthValue: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#1b1c1c",
  },
  // Estilo para o percentual de saúde
  healthPercent: {
    fontSize: 24,
    color: "#8e7164",
  },
  // Estilo para o círculo de progresso
  circleProgress: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#e5e2e1",
    justifyContent: "center",
    alignItems: "center",
  },
  // Estilo para o interior do círculo
  circleInner: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#d35400",
  },
  // Estilo para o cabeçalho de integridade
  integrityHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  // Estilo para o sub-rótulo
  subLabel: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#8e7164",
  },
  // Estilo para o texto ideal
  idealText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#4c616c",
  },
  // Estilo para o fundo da barra de progresso
  progressBarBg: {
    height: 8,
    backgroundColor: "#e5e2e1",
    borderRadius: 4,
    marginBottom: 20,
  },
  // Estilo para o preenchimento da barra de progresso
  progressBarFill: {
    height: 8,
    backgroundColor: "#d35400",
    borderRadius: 4,
  },
  // Estilo para a linha de componentes
  componentsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  // Estilo para o mini card
  miniCard: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 4,
  },
  // Estilo para o rótulo do mini card
  miniCardLabel: {
    fontSize: 8,
    fontWeight: "bold",
    color: "#8e7164",
    marginBottom: 4,
  },
  // Estilo para o valor do mini card
  miniCardValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1b1c1c",
  },
  // Estilo para o card de revisão
  revisionCard: {
    backgroundColor: "#1b1c1c",
  },
  // Estilo para o cabeçalho de revisão
  revisionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  // Estilo para o título de revisão
  revisionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff",
  },
  // Estilo para o badge
  badge: {
    backgroundColor: "#ff6b00",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  // Estilo para o texto do badge
  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
  // Estilo para o valor da data
  dateValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 16,
  },
  // Estilo para o rodapé de revisão
  revisionFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  // Estilo para o valor limite
  limitValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff",
  },
  // Estilo para o texto da unidade
  unitText: {
    fontSize: 12,
    color: "rgba(255,255,255,0.6)",
  },
  // Estilo para o valor restante
  remainingValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ff6b00",
  },
  // Estilo para a linha inferior
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  // Estilo para o card meio
  halfCard: {
    flex: 1,
    marginHorizontal: 4,
    alignItems: "center",
  },
  // Estilo para o texto do ícone
  iconText: {
    fontSize: 24,
    marginBottom: 8,
  },
  // Estilo para o valor do pequeno card
  smallCardValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1b1c1c",
  },
});
