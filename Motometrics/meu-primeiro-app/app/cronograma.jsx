import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useMotos } from './MotoContext';
import NavBar from './NavBar';

export default function Cronograma() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { motos } = useMotos();
  const moto = motos.find(m => m.id === String(id)) || motos[0];

  return (
    <View style={styles.container}>
      {/* CABEÇALHO */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/')} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Garagem</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>AGENDA</Text>
      </View>

      {/* CONTEÚDO ROLÁVEL - Agora forçado a respeitar o espaço */}
      <ScrollView style={styles.scrollArea} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.motoTitle}>{moto.nome}</Text>
        <Text style={styles.sectionLabel}>PRÓXIMAS REVISÕES</Text>

        {moto.cronograma && moto.cronograma.length > 0 ? (
          moto.cronograma.map((item, index) => (
            <View key={index} style={styles.card}>
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>PENDENTE</Text>
              </View>
              <Text style={styles.service}>{item.servico}</Text>
              <Text style={styles.date}>Previsão: {item.data}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.empty}>Nenhuma revisão agendada.</Text>
        )}
      </ScrollView>

      {/* BARRA DE NAVEGAÇÃO FIXA */}
      <NavBar id={id} telaAtual="cronograma" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fcf9f8' },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 24, paddingTop: 60, paddingBottom: 20 },
  backButton: { paddingVertical: 8, paddingRight: 16 },
  backButtonText: { color: '#ff6b00', fontWeight: 'bold' },
  headerTitle: { fontSize: 14, fontWeight: 'bold', letterSpacing: 2, marginLeft: 'auto' },
  scrollArea: { flex: 1 }, // Isso é a mágica que impede a lista de cobrir a barra
  scrollContent: { padding: 24, paddingBottom: 40 },
  motoTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#1b1c1c' },
  sectionLabel: { fontSize: 10, fontWeight: '900', color: '#8e7164', letterSpacing: 2, marginBottom: 16 },
  card: { backgroundColor: '#1b1c1c', padding: 20, borderRadius: 16, marginBottom: 12 },
  statusBadge: { backgroundColor: '#ff6b00', alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4, marginBottom: 10 },
  statusText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
  service: { fontSize: 18, color: '#fff', fontWeight: 'bold', marginBottom: 4 },
  date: { fontSize: 13, color: 'rgba(255,255,255,0.6)' },
  empty: { color: '#a39893', fontStyle: 'italic' }
});