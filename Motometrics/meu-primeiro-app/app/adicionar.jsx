import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useMotos } from "./MotoContext";

export default function AdicionarMoto() {
  const router = useRouter();
  const { adicionarMoto } = useMotos();

  // Estados para guardar cada informação do formulário
  const [nome, setNome] = useState("");
  const [cc, setCc] = useState("");
  const [potencia, setPotencia] = useState("");
  const [torque, setTorque] = useState("");
  const [cambio, setCambio] = useState("");
  const [peso, setPeso] = useState("");
  const [tanque, setTanque] = useState("");
  // Estado para a imagem selecionada
  const [imagem, setImagem] = useState(null);

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
      setImagem(result.assets[0].uri);
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
      setImagem(result.assets[0].uri);
    }
  };

  // Função para mostrar opções de seleção de imagem
  const selecionarImagem = () => {
    Alert.alert("Escolher Foto", "Como você quer adicionar a foto da moto?", [
      { text: "Galeria", onPress: escolherImagemGaleria },
      { text: "Câmera", onPress: tirarFoto },
      { text: "Cancelar", style: "cancel" },
    ]);
  };

  const salvar = () => {
    if (!nome) return alert("A máquina precisa de um nome!");

    adicionarMoto({
      nome: nome,
      subtitulo: "Nova Máquina na Garagem",
      status: "Excelente",
      // Usa a imagem selecionada ou uma padrão
      imagem:
        imagem ||
        "https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?q=80&w=800",
      especificacoes: {
        motor: cc || "--",
        potencia: potencia || "--",
        torque: torque || "--",
        cambio: cambio || "--",
        peso: peso || "--",
        tanque: tanque || "--",
      },
      historico: [],
      cronograma: [],
    });

    router.back();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backText}>Cancelar</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>NOVA MOTO</Text>
      </View>

      <ScrollView style={styles.form} showsVerticalScrollIndicator={false}>
        <Text style={styles.label}>NOME DA MOTO</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Honda CB 500F"
          value={nome}
          onChangeText={setNome}
        />

        {/* Linha 1: Cilindrada e Potência */}
        <View style={styles.row}>
          <View style={styles.halfInput}>
            <Text style={styles.label}>CILINDRADA (CC)</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="471"
              value={cc}
              onChangeText={setCc}
            />
          </View>
          <View style={styles.halfInput}>
            <Text style={styles.label}>POTÊNCIA (CV)</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="50.4"
              value={potencia}
              onChangeText={setPotencia}
            />
          </View>
        </View>

        {/* Linha 2: Torque e Marchas */}
        <View style={styles.row}>
          <View style={styles.halfInput}>
            <Text style={styles.label}>TORQUE (KGF.M)</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="4.5"
              value={torque}
              onChangeText={setTorque}
            />
          </View>
          <View style={styles.halfInput}>
            <Text style={styles.label}>MARCHAS</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="6"
              value={cambio}
              onChangeText={setCambio}
            />
          </View>
        </View>

        {/* Linha 3: Peso e Tanque */}
        <View style={styles.row}>
          <View style={styles.halfInput}>
            <Text style={styles.label}>PESO (KG)</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="189"
              value={peso}
              onChangeText={setPeso}
            />
          </View>
          <View style={styles.halfInput}>
            <Text style={styles.label}>TANQUE (L)</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="17.1"
              value={tanque}
              onChangeText={setTanque}
            />
          </View>
        </View>

        {/* Seção de seleção de imagem */}
        <Text style={styles.label}>FOTO DA MOTO</Text>
        <TouchableOpacity
          style={styles.imageSelector}
          onPress={selecionarImagem}
        >
          {imagem ? (
            <Image source={{ uri: imagem }} style={styles.selectedImage} />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Text style={styles.imagePlaceholderText}>
                📷 Toque para adicionar foto
              </Text>
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.selectImageBtn}
          onPress={selecionarImagem}
        >
          <Text style={styles.selectImageBtnText}>
            {imagem ? "Alterar foto" : "Selecionar foto"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.saveBtn} onPress={salvar}>
          <Text style={styles.saveBtnText}>ADICIONAR À GARAGEM</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fcf9f8" },
  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  backText: { color: "#4c616c", fontWeight: "bold" },
  headerTitle: { fontSize: 14, fontWeight: "bold", letterSpacing: 2 },
  form: { paddingHorizontal: 24, paddingBottom: 40 },
  label: {
    fontSize: 10,
    fontWeight: "900",
    color: "#8e7164",
    marginBottom: 8,
    letterSpacing: 1,
  },
  input: {
    backgroundColor: "#f6f3f2",
    padding: 16,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 24,
    color: "#1b1c1c",
  },
  row: { flexDirection: "row", justifyContent: "space-between", gap: 16 },
  halfInput: { flex: 1 },
  imageSelector: { marginBottom: 16 },
  selectedImage: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    resizeMode: "cover",
  },
  imagePlaceholder: {
    width: "100%",
    height: 200,
    backgroundColor: "#f6f3f2",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#e0dcd9",
    borderStyle: "dashed",
  },
  imagePlaceholderText: { color: "#8e7164", fontSize: 16, fontWeight: "600" },
  selectImageBtn: {
    alignSelf: "flex-start",
    backgroundColor: "#ff6b00",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 24,
  },
  selectImageBtnText: { color: "#fff", fontWeight: "bold", letterSpacing: 1 },
  changeImageBtn: { alignSelf: "center", marginBottom: 24 },
  changeImageText: { color: "#ff6b00", fontWeight: "bold", fontSize: 14 },
  saveBtn: {
    backgroundColor: "#1b1c1c",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 40,
  },
  saveBtnText: { color: "#fff", fontWeight: "bold", letterSpacing: 2 },
});
