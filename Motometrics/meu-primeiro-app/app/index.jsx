import Constants from "expo-constants";
import { useRouter } from "expo-router";
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useMotos } from "./MotoContext";

export default function Garagem() {
  const router = useRouter();
  const { motos } = useMotos();
  const version =
    Constants.expoConfig?.version ||
    Constants.manifest?.version ||
    "1.0.0-beta";
  const displayVersion = version.includes("beta") ? version : `${version} beta`;

  return (
    <View style={styles.container}>
      {/* CABEÇALHO COM SAUDAÇÃO E BOTÃO ADICIONAR */}
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Olá, piloto</Text>
          <Text style={styles.headerTitle}>MINHA GARAGEM</Text>
        </View>

        {/* Restauramos o botão com apenas "+" e a navegação real! */}
        <TouchableOpacity
          style={styles.btnAddHeader}
          onPress={() => router.push("/adicionar")}
        >
          <Text style={styles.btnAddText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* LISTA DE MOTOS */}
      <FlatList
        data={motos}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {/* IMAGEM DA MOTO */}
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: item.imagem }}
                style={styles.image}
                resizeMode="contain"
              />
            </View>

            {/* INFORMAÇÕES DA MOTO */}
            <View style={styles.infoContainer}>
              <Text style={styles.motoName}>{item.nome}</Text>
              <Text style={styles.motoPlate}>
                PLACA: {item.placa || "NÃO CADASTRADA"}
              </Text>
            </View>

            {/* BOTÃO ÚNICO - ACESSAR */}
            <TouchableOpacity
              style={styles.btnAccess}
              onPress={() =>
                router.push({ pathname: "/dashboard", params: { id: item.id } })
              }
            >
              <Text style={styles.btnAccessText}>ACESSAR</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            Nenhuma máquina na garagem ainda.
          </Text>
        }
      />
      <Text style={styles.versionText}>Versão {displayVersion}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fcf9f8" },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 20,
  },
  welcomeText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#8e7164",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: "#1b1c1c",
    letterSpacing: -0.5,
  },

  btnAddHeader: {
    backgroundColor: "#d35400",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  btnAddText: {
    fontSize: 24,
    fontWeight: "400",
    color: "#fff",
    marginTop: -2,
  },

  list: { padding: 24, paddingBottom: 40 },

  card: {
    backgroundColor: "#f6f3f2",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    alignItems: "center",
  },
  imageContainer: {
    width: "100%",
    height: 180,
    backgroundColor: "#eeebea",
    borderRadius: 12,
    marginBottom: 16,
  },
  image: { width: "100%", height: "100%" },

  infoContainer: { alignItems: "center", marginBottom: 20 },
  motoName: {
    fontSize: 24,
    fontWeight: "900",
    color: "#1b1c1c",
    textTransform: "uppercase",
    marginBottom: 4,
  },
  motoPlate: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#8e7164",
    letterSpacing: 1,
  },

  btnAccess: {
    width: "100%",
    backgroundColor: "#d35400",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  btnAccessText: {
    color: "#fff",
    fontWeight: "900",
    fontSize: 14,
    letterSpacing: 2,
  },

  emptyText: {
    textAlign: "center",
    color: "#a39893",
    fontStyle: "italic",
    marginTop: 40,
  },
  versionText: {
    textAlign: "center",
    color: "#8e7164",
    fontSize: 12,
    marginBottom: 24,
    fontWeight: "700",
  },
});
