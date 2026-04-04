import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useMotos } from './MotoContext';

export default function Abastecer() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  
  // Puxa as motos e a função de atualizar do seu contexto
  const { motos, setMotos } = useMotos(); 

  // Estados dos campos do formulário
  const [km, setKm] = useState('');
  const [litros, setLitros] = useState('');
  const [valor, setValor] = useState('');

  const handleSalvar = () => {
    // Validação básica
    if (!km || !litros || !valor) {
      Alert.alert('Ops!', 'Preencha todos os campos para registrar o abastecimento.');
      return;
    }

    // Criando o novo registro para o histórico
    const novoRegistro = {
      data: new Date().toLocaleDateString('pt-BR'), // Pega a data de hoje
      servico: `Abastecimento - ${litros}L`,
      km: `${km} km`,
      valor: `R$ ${valor}`
    };

    // Atualizando a lista de motos
    const motosAtualizadas = motos.map(moto => {
      if (moto.id === String(id)) {
        // Pega o histórico atual ou cria um vazio, e adiciona o novo no topo
        const historicoAtualizado = [novoRegistro, ...(moto.historico || [])];
        return { ...moto, historico: historicoAtualizado };
      }
      return moto;
    });

    // Salva no contexto
    if (setMotos) {
      setMotos(motosAtualizadas);
      Alert.alert('Sucesso!', 'Abastecimento registrado na sua garagem.', [
        { text: 'OK', onPress: () => router.back() } // Volta pro Dashboard
      ]);
    } else {
      Alert.alert('Atenção', 'A função setMotos não foi encontrada no seu MotoContext.');
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* CABEÇALHO */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>NOVO ABASTECIMENTO</Text>
      </View>

      <View style={styles.formContainer}>
        {/* CAMPO: ODÔMETRO */}
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

        {/* CAMPO: LITROS */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>QUANTIDADE DE LITROS</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: 12.5"
            keyboardType="numeric"
            value={litros}
            onChangeText={setLitros}
          />
        </View>

        {/* CAMPO: VALOR */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>VALOR TOTAL (R$)</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: 75.00"
            keyboardType="numeric"
            value={valor}
            onChangeText={setValor}
          />
        </View>

        {/* BOTÃO SALVAR */}
        <TouchableOpacity style={styles.btnSalvar} onPress={handleSalvar}>
          <Text style={styles.btnSalvarText}>SALVAR REGISTRO</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fcf9f8' },
  
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 24, paddingTop: 60, paddingBottom: 20 },
  backButton: { paddingVertical: 8, paddingRight: 16 },
  backButtonText: { color: '#ff6b00', fontWeight: 'bold' },
  headerTitle: { fontSize: 14, fontWeight: '900', color: '#1b1c1c', letterSpacing: 2, marginLeft: 'auto' },

  formContainer: { padding: 24 },
  
  inputGroup: { marginBottom: 24 },
  label: { fontSize: 10, fontWeight: '900', color: '#8e7164', letterSpacing: 2, marginBottom: 8 },
  input: { 
    backgroundColor: '#eeebea', 
    borderRadius: 12, 
    padding: 16, 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#1b1c1c' 
  },

  btnSalvar: { 
    backgroundColor: '#d35400', 
    paddingVertical: 18, 
    borderRadius: 12, 
    alignItems: 'center', 
    marginTop: 20 
  },
  btnSalvarText: { color: '#fff', fontWeight: '900', fontSize: 14, letterSpacing: 2 },
});