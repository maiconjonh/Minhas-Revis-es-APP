// Importa hooks de navegação
import { useLocalSearchParams, useRouter } from "expo-router";
// Importa componentes do React Native e Linking para abrir URLs
import {
  Alert,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
// Importa ImagePicker para seleção de imagens
import * as ImagePicker from "expo-image-picker";
// Importa o hook do contexto das motos
import { useMotos } from "./MotoContext";
// Importa o componente NavBar
import NavBar from "./NavBar";

// Define o componente principal da tela de detalhes da moto
export default function DetalhesDaMoto() {
  // Hook para navegação
  const router = useRouter();

  // Obtém o parâmetro 'id' da URL
  const { id } = useLocalSearchParams();

  // Desestrutura o contexto para obter motos e setMotos
  const { motos, setMotos } = useMotos();
  // Encontra a moto correspondente ao ID ou usa a primeira
  const moto = motos.find((m) => m.id === String(id)) || motos[0];

  // Função para solicitar permissões e escolher imagem da galeria
  const escolherImagemGaleria = async () => {
    // Solicita permissão para acessar a galeria
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permissão necessária",
        "Precisamos de acesso à galeria para escolher uma foto.",
      );
      return;
    }

    // Abre o seletor de imagem
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      atualizarImagemMoto(result.assets[0].uri);
    }
  };

  // Função para tirar foto com a câmera
  const tirarFoto = async () => {
    // Solicita permissão para usar a câmera
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permissão necessária",
        "Precisamos de acesso à câmera para tirar uma foto.",
      );
      return;
    }

    // Abre a câmera
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      atualizarImagemMoto(result.assets[0].uri);
    }
  };

  // Função para atualizar a imagem da moto
  const atualizarImagemMoto = (novaImagem) => {
    const motosAtualizadas = motos.map((m) =>
      m.id === moto.id ? { ...m, imagem: novaImagem } : m,
    );
    setMotos(motosAtualizadas);
  };

  // Função para mostrar opções de seleção de imagem
  const editarImagem = () => {
    Alert.alert("Editar Foto da Moto", "Como você quer alterar a foto?", [
      { text: "Galeria", onPress: escolherImagemGaleria },
      { text: "Câmera", onPress: tirarFoto },
      { text: "Cancelar", style: "cancel" },
    ]);
  };

  // Retorna o JSX da interface
  return (
    // Container principal
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.push("/")}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>← Garagem</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>FICHA TÉCNICA</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.heroSection}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: moto.imagem }} style={styles.heroImage} />
            <TouchableOpacity
              style={styles.editImageBtn}
              onPress={editarImagem}
            >
              <Text style={styles.editImageIcon}>📷</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.editPhotoButton}
            onPress={editarImagem}
          >
            <Text style={styles.editPhotoButtonText}>Editar foto da moto</Text>
          </TouchableOpacity>
          <Text style={styles.tagLabel}>MÁQUINA {moto.id}</Text>
          <Text style={styles.motoName}>{moto.nome}</Text>
          <Text style={styles.motoSubName}>{moto.subtitulo}</Text>
        </View>

        <View style={styles.specsCard}>
          <Text style={styles.sectionLabel}>ESPECIFICAÇÕES TÉCNICAS</Text>

          <View style={styles.gridRow}>
            <View style={styles.gridItem}>
              <Text style={styles.itemLabel}>MOTOR</Text>
              <Text style={styles.itemValue}>
                {moto.especificacoes.motor}{" "}
                <Text style={styles.itemUnit}>CC</Text>
              </Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.itemLabel}>POTÊNCIA MÁX</Text>
              <Text style={styles.itemValue}>
                {moto.especificacoes.potencia}{" "}
                <Text style={styles.itemUnit}>PS</Text>
              </Text>
            </View>
          </View>

          <View style={[styles.gridRow, { marginTop: 24 }]}>
            <View style={styles.gridItem}>
              <Text style={styles.itemLabel}>TORQUE MÁX</Text>
              <Text style={styles.itemValue}>
                {moto.especificacoes.torque}{" "}
                <Text style={styles.itemUnit}>NM</Text>
              </Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.itemLabel}>CÂMBIO</Text>
              <Text style={styles.itemValue}>
                {moto.especificacoes.cambio}{" "}
                <Text style={styles.itemUnit}>Marchas</Text>
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.smallCardsContainer}>
          <View style={styles.weightCard}>
            <Text style={styles.sectionLabel}>PESO EM ORDEM</Text>
            <Text style={styles.largeValue}>
              {moto.especificacoes.peso}{" "}
              <Text style={styles.largeUnit}>kg</Text>
            </Text>
          </View>

          <View style={styles.fuelCard}>
            <Text
              style={[styles.sectionLabel, { color: "rgba(255,255,255,0.5)" }]}
            >
              TANQUE
            </Text>
            <Text style={[styles.largeValue, { color: "#ffffff" }]}>
              {moto.especificacoes.tanque}{" "}
              <Text style={[styles.largeUnit, { color: "#ffffff" }]}>
                Litros
              </Text>
            </Text>
          </View>

          <View style={styles.autonomyCard}>
            <Text
              style={[styles.sectionLabel, { color: "rgba(255,107,0,0.5)" }]}
            >
              AUTONOMIA APROX.
            </Text>
            <Text style={[styles.largeValue, { color: "#ff6b00" }]}>
              {Math.round((parseFloat(moto.especificacoes.tanque) / 6.2) * 100)}{" "}
              <Text style={[styles.largeUnit, { color: "#ff6b00" }]}>km</Text>
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.manualBtn}
          onPress={() =>
            Linking.openURL(
              "https://www.triumphmotorcycles.com/en-us/models/speed-triumph-speed-400/owners-manual",
            )
          }
        >
          <Text style={styles.manualBtnText}>
            📖 ABRIR MANUAL DO PROPRIETÁRIO
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Barra de navegação fixa */}
      <NavBar id={id} telaAtual="detalhes" />
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
    fontWeight: "900",
    color: "#1b1c1c",
    letterSpacing: 2,
    marginLeft: "auto",
  },
  // Estilo para o conteúdo rolável
  scroll: { padding: 24, paddingBottom: 40 },
  // Estilo para a seção hero
  heroSection: { marginBottom: 32 },
  // Estilo para o container da imagem
  imageContainer: { position: "relative", marginBottom: 16 },
  // Estilo para a imagem hero
  heroImage: {
    width: "100%",
    height: 200,
    borderRadius: 16,
    backgroundColor: "#e5e2e1",
  },
  // Estilo para o botão de editar imagem
  editImageBtn: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },
  // Estilo para o botão de editar foto abaixo da imagem
  editPhotoButton: {
    backgroundColor: "#ff6b00",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 16,
    alignSelf: "flex-start",
  },
  editPhotoButtonText: {
    color: "#fff",
    fontWeight: "bold",
    letterSpacing: 1,
  },
  // Estilo para o ícone do botão editar
  editImageIcon: { fontSize: 18 },
  // Estilo para o rótulo da tag
  tagLabel: {
    fontSize: 12,
    fontWeight: "900",
    color: "#ff6b00",
    letterSpacing: 2,
    marginBottom: 8,
  },
  // Estilo para o nome da moto
  motoName: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#1b1c1c",
    textTransform: "uppercase",
  },
  // Estilo para o subtítulo da moto
  motoSubName: {
    fontSize: 14,
    color: "#4c616c",
    marginTop: 4,
    fontWeight: "600",
  },
  // Estilo para o card de especificações
  specsCard: {
    backgroundColor: "#f6f3f2",
    padding: 24,
    borderRadius: 16,
    marginBottom: 16,
  },
  // Estilo para o rótulo da seção
  sectionLabel: {
    fontSize: 10,
    fontWeight: "900",
    color: "#4c616c",
    letterSpacing: 3,
    marginBottom: 24,
  },
  // Estilo para a linha da grade
  gridRow: { flexDirection: "row", justifyContent: "space-between" },
  // Estilo para o item da grade
  gridItem: { flex: 1 },
  // Estilo para o rótulo do item
  itemLabel: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#8e7164",
    marginBottom: 4,
  },
  // Estilo para o valor do item
  itemValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1b1c1c",
  },
  // Estilo para a unidade do item
  itemUnit: {
    fontSize: 14,
    fontWeight: "normal",
    color: "#4c616c",
  },
  // Estilo para o container de pequenos cards
  smallCardsContainer: { flexDirection: "column", gap: 16 },
  // Estilo para o card de peso
  weightCard: {
    backgroundColor: "#eae7e7",
    padding: 24,
    borderRadius: 16,
  },
  // Estilo para o card de combustível
  fuelCard: {
    backgroundColor: "#1b1c1c",
    padding: 24,
    borderRadius: 16,
  },
  // Estilo para o card de autonomia
  autonomyCard: {
    backgroundColor: "#fff5f0",
    padding: 24,
    borderRadius: 16,
  },
  // Estilo para o valor grande
  largeValue: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1b1c1c",
  },
  // Estilo para a unidade grande
  largeUnit: {
    fontSize: 16,
    color: "#4c616c",
  },
  // Estilo para o botão do manual
  manualBtn: {
    backgroundColor: "#ff6b00",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },
  // Estilo para o texto do botão do manual
  manualBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
