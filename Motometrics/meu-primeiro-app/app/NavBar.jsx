import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
// O Expo já vem com uma biblioteca de ícones fantástica!
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

export default function NavBar({ id, telaAtual }) {
  const router = useRouter();

  // Função para navegar entre as abas sem empilhar dezenas de telas (usamos o replace)
  const navegarPara = (caminho) => {
    router.replace({ pathname: caminho, params: { id } });
  };

  return (
    <View style={styles.navBar}>
      {/* Botão DASHBOARD */}
      <TouchableOpacity style={styles.navItem} onPress={() => navegarPara('/dashboard')}>
        <MaterialCommunityIcons 
          name="speedometer" 
          size={26} 
          color={telaAtual === 'dashboard' ? '#ff6b00' : '#a39893'} 
        />
        <Text style={[styles.navText, telaAtual === 'dashboard' && styles.navTextActive]}>
          DASHBOARD
        </Text>
      </TouchableOpacity>

      {/* Botão HISTÓRICO */}
      <TouchableOpacity style={styles.navItem} onPress={() => navegarPara('/historico')}>
        <MaterialCommunityIcons 
          name="text-box-outline" 
          size={26} 
          color={telaAtual === 'historico' ? '#ff6b00' : '#a39893'} 
        />
        <Text style={[styles.navText, telaAtual === 'historico' && styles.navTextActive]}>
          HISTÓRICO
        </Text>
      </TouchableOpacity>

      {/* Botão AGENDA (Seu Cronograma) */}
      <TouchableOpacity style={styles.navItem} onPress={() => navegarPara('/cronograma')}>
        <MaterialCommunityIcons 
          name="calendar-month-outline" 
          size={26} 
          color={telaAtual === 'cronograma' ? '#ff6b00' : '#a39893'} 
        />
        <Text style={[styles.navText, telaAtual === 'cronograma' && styles.navTextActive]}>
          AGENDA
        </Text>
      </TouchableOpacity>

      {/* Botão FICHA TÉCNICA (Seus Detalhes) */}
      <TouchableOpacity style={styles.navItem} onPress={() => navegarPara('/detalhes')}>
        <MaterialCommunityIcons 
          name="cog-outline" 
          size={26} 
          color={telaAtual === 'detalhes' ? '#ff6b00' : '#a39893'} 
        />
        <Text style={[styles.navText, telaAtual === 'detalhes' && styles.navTextActive]}>
          FICHA TÉCNICA
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    paddingBottom: 24, // Espaço para não ficar colado na borda inferior do celular
    borderTopWidth: 1,
    borderTopColor: '#f0ece9',
    elevation: 10, // Sombra no Android
    shadowColor: '#000', // Sombra no iOS
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  navText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#a39893',
    marginTop: 4,
    letterSpacing: 0.5,
  },
  navTextActive: {
    color: '#ff6b00',
  }
});