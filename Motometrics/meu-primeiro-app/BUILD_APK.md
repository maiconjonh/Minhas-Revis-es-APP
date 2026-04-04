# 📱 Guia: Como Gerar o APK para Android

✅ **Status Atual**: Prebuild concluído! Projeto pronto para compilação.

---

## 🚀 OPÇÃO 1: Android Studio (Método Recomendado)

### ✓ Mais fácil e visual

### ✓ Ideal para iniciantes

### ✓ Já vem com tudo integrado

### Passos:

**1. Baixar e Instalar o Android Studio**

- Acesse: https://developer.android.com/studio
- Baixe a versão para Windows
- Execute o instalador
- Deixe instalar o Android SDK quando solicitado

**2. Abrir o Projeto**

- Abra Android Studio
- Clique em **File** → **Open**
- Navegue para: `C:\Users\joaov\Motometrics\meu-primeiro-app`
- Clique em **OK**
- Aguarde sincronizar (pode levar 5 minutos na primeira vez)

**3. Compilar o APK**

- Menu superior: **Build** → **Build Bundle(s) / APK(s)** → **Build APK(s)**
- Aguarde terminar (5-15 minutos)
- Aparecerá notificação com o link para o arquivo

**4. Localizar o APK Gerado**

```
C:\Users\joaov\Motometrics\meu-primeiro-app\app\build\outputs\apk\debug\app-debug.apk
```

---

## 📱 Instalar no Telefone Físico

### Via USB (Recomendado):

1. Conecte o telefone via USB
2. Ative "Modo Desenvolvedor": Configurações → Sobre → Toque 7x "Versão do Build"
3. Ative "Depuração USB" em Configurações → Opções de Desenvolvedor
4. No Android Studio: **Run** → **Run 'app'** → Selecione seu telefone

### Via Arquivo APK:

1. Passe o arquivo `app-debug.apk` para o telefone (USB, WhatsApp, Google Drive, etc.)
2. Abra o Gerenciador de Arquivos
3. Toque no arquivo APK
4. Toque em **Instalar**
5. Pronto! ✓

---

## 💻 OPÇÃO 2: Emulador Android (Sem telefone físico)

### Criar um Emulador:

1. Android Studio → **Tools** → **Device Manager**
2. Clique em **Create Device**
3. Selecione um modelo (ex: Pixel 5)
4. Clique Next, escolha Android 14, clique Next, clique Finish
5. Clique no botão **Play** para iniciar

### Executar o App no Emulador:

1. Com o emulador aberto no Android Studio
2. Clique em **Run** → **Run 'app'**
3. Selecione o emulador e clique OK

---

## 🔧 OPÇÃO 3: Linha de Comando (Avançado)

Se tiver Java JDK e Android SDK configurados:

```powershell
cd C:\Users\joaov\Motometrics\meu-primeiro-app\android
gradlew assembleDebug
```

O APK estará em: `app\build\outputs\apk\debug\app-debug.apk`

---

## 📊 Informações do APK Gerado

- **Tamanho**: ~50-80 MB
- **Nome**: `app-debug.apk`
- **Versão**: 1.0.0-beta
- **Compatibilidade**: Android 6.0+
- **Arquitetura**: ARM64 e x86_64

---

## ⚠️ Problemas Comuns

### ❌ "Gradle não encontrado"

→ Deixe Android Studio sincronizar completamente

### ❌ "JAVA_HOME não está definido"

→ Instale Java JDK: https://www.oracle.com/java/technologies/downloads/

### ❌ "Emulador não inicia"

→ Verifique se a Virtualização está ativa no Windows (BIOS)

### ❌ "APK não instala no telefone"

→ Ative "Instalar aplicativos de fontes desconhecidas" nas Configurações

---

## 🎯 Próximos Passos

### Para Distribuir:

- Passe o arquivo `.apk` para amigos/familiares
- Qualquer um pode instalar no seu telefone Android
- Não precisa de Play Store!

### Para Publicar na Play Store:

1. Crie uma conta: https://play.google.com/console ($25)
2. Gere um certificado de assinatura
3. Compile em modo "release"
4. Envie o APK signado

---

**App**: Motometrics - Meu Primeiro App  
**Versão**: 1.0.0-beta  
**Status**: ✅ Pronto para build
