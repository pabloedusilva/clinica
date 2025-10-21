# 🏥 PhysioHome & Care

## 📋 Descrição
Plataforma completa de fisioterapia domiciliar desenvolvida em **HTML5, CSS3 e JavaScript puro**. Sistema funcional simulado com armazenamento em LocalStorage, permitindo interação completa entre pacientes e fisioterapeutas.

## ✨ Funcionalidades

### 🏠 Tela Inicial
- Apresentação da marca PhysioHome & Care
- Cards de funcionalidades com animações
- Botões de login e cadastro
- Design responsivo e moderno

### 👤 Autenticação
- **Login** com validação
- **Cadastro** de pacientes e fisioterapeutas
- Diferenciação de perfis (paciente/fisioterapeuta)
- Persistência de sessão com LocalStorage
- Opção "Lembrar de mim"

### 🩺 Dashboard do Paciente
- Boas-vindas personalizadas
- Cards de estatísticas (agendamentos, exercícios, mensagens, evolução)
- Menu lateral com navegação intuitiva
- Visualização de próximos agendamentos
- Exercícios pendentes em destaque

### 👨‍⚕️ Dashboard do Fisioterapeuta
- Visão geral de pacientes ativos
- Gerenciamento de consultas
- Lista de pacientes com informações detalhadas
- Acompanhamento de evolução

### 📅 Agendamentos
- Calendário funcional interativo
- Criação de novos agendamentos via modal
- Escolha de fisioterapeuta (pacientes)
- Definição de data, hora e local
- Lista de agendamentos com opções de editar/cancelar
- Armazenamento em LocalStorage

### 🧘 Exercícios Personalizados
- Lista de exercícios com ícones e descrições
- Filtros: Todos, Pendentes, Concluídos
- Botão "Marcar como Feito"
- Contador de repetições
- Badges visuais de status
- Progresso salvo no LocalStorage

### 💬 Chat
- Interface estilo WhatsApp
- Lista de conversas (fisioterapeuta/suporte)
- Envio e recebimento de mensagens
- Resposta automática simulada
- Mensagens armazenadas no LocalStorage
- Avatar e status online

### 📊 Relatórios
- Gráfico de evolução semanal (CSS puro)
- Estatísticas detalhadas
- Cards com métricas (sessões, taxa de melhora, exercícios, avaliação)
- Botão "Baixar PDF" (simulado)

### 👤 Perfil
- Visualização de dados do usuário
- Edição de informações pessoais
- Badge de identificação (paciente/fisioterapeuta)
- Campos: nome, email, idade, condição médica
- Salvamento automático no LocalStorage

## 🎨 Design e Estilo

### Paleta de Cores Refinada
- **Primária**: #667eea (roxo moderno)
- **Primária Light**: #7c3aed (roxo vibrante)
- **Secundária**: #48bb78 (verde suave)
- **Fundo**: #f7fafc (cinza ultra claro)
- **Texto**: #1a202c (cinza escuro)
- **Superfície**: #ffffff (branco puro)

### Características Visuais Premium
- ✅ Design clean, minimalista e ultra-moderno
- ✅ Layout responsivo adaptativo (desktop, tablet, mobile)
- ✅ Gradientes animados e dinâmicos
- ✅ Sombras em múltiplas camadas (xs, sm, md, lg, xl, 2xl)
- ✅ Sombras coloridas com efeito de profundidade
- ✅ Animações suaves com cubic-bezier
- ✅ Efeitos de hover sofisticados
- ✅ Transições fluidas em todos os elementos
- ✅ Ícones com gradiente e animações
- ✅ Scrollbar personalizado com gradiente
- ✅ Tooltips elegantes com animação
- ✅ Cards flutuantes com bordas sutis
- ✅ Efeitos de glassmorphism
- ✅ Backdrop blur nos modais
- ✅ Fonte Inter do Google Fonts
- ✅ Anti-aliasing otimizado
- ✅ Border-radius consistentes e harmoniosos
- ✅ Feedback visual em todas as interações

## 🗂️ Estrutura de Arquivos

```
clinica/
├── index.html          # Página principal com todas as telas
├── css/
│   └── style.css       # Estilos completos e responsivos
├── js/
│   └── script.js       # Lógica e funcionalidades
└── assets/
    └── images/         # Pasta para imagens (opcional)
```

## 🚀 Como Usar

1. **Abrir o Projeto**
   - Abra o arquivo `index.html` em qualquer navegador moderno

2. **Criar uma Conta**
   - Clique em "Criar Conta"
   - Preencha os dados (nome, email, senha)
   - Escolha o tipo: Paciente ou Fisioterapeuta
   - Aceite os termos

3. **Login**
   - Use o email e senha cadastrados
   - Marque "Lembrar de mim" para permanecer logado

4. **Navegar pelo Dashboard**
   - Use o menu lateral para acessar as seções
   - Explore agendamentos, exercícios, chat, relatórios e perfil

## 💾 Dados Simulados

### Usuários de Teste
Você pode criar seus próprios usuários ou usar o sistema para cadastrar novos.

### Fisioterapeutas Disponíveis
- Dr. Carlos Silva - Ortopedia
- Dra. Ana Paula - Neurologia
- Dr. Roberto Santos - Esportiva

### Exercícios Pré-cadastrados
- Alongamento Cervical
- Fortalecimento Lombar
- Mobilidade de Ombros
- Alongamento de Pernas

### 🎯 **Melhorias de Design Implementadas:**

#### 🎨 **Sistema de Cores Premium**
- Paleta roxo/verde moderna e sofisticada
- Gradientes animados com múltiplas camadas
- Sistema de sombras em 7 níveis (xs até 2xl)
- Sombras coloridas com blur e spread
- Cores consistentes com opacidade precisa

#### ✨ **Animações Avançadas**
- **Gradientes animados** na home (15s infinite)
- **Float animation** no ícone principal
- **Slide/Fade** em todos os cards e seções
- **Hover effects** com transform e scale
- **Ripple effect** nos botões
- **Shimmer loading** para estados de carregamento
- **Message slide** nas conversas do chat
- **Shake animation** em mensagens de erro
- **Modal animations** com cubic-bezier

#### 🎯 **Componentes Refinados**

**Botões:**
- Gradientes em primários e success
- Efeito ripple ao clicar
- Sombras coloridas
- Transform suave no hover
- Border-radius consistente (full)

**Cards:**
- Bordas sutis (1px)
- Linha superior animada no hover
- Transform translateY no hover
- Ícones com gradiente
- Sombras progressivas

**Inputs/Forms:**
- Focus com shadow ring (4px)
- Transições suaves
- Background gradient no focus
- Labels com ícones coloridos
- Border-radius harmonioso

**Sidebar/Menu:**
- Gradiente sutil no header
- Barra lateral animada (width transition)
- Ícones com scale no hover
- Active state com gradiente
- Box-shadow em camadas

**Modais:**
- Backdrop blur (4px)
- Slide up com scale
- Close button com rotate no hover
- Border sutil
- Shadow 2xl

**Chat:**
- Avatares com gradiente
- Mensagens com slide animation
- Background diferenciado
- Input com focus ring
- Active state refinado

**Calendário:**
- Dias com border e hover
- Selected state com gradiente
- Today com border especial
- Appointments com indicador dot
- Scale no hover

**Exercícios:**
- Header com gradiente animado
- Badges com border
- Cards com transform
- Imagens com efeito rotate overlay

**Relatórios:**
- Barras com gradiente vertical
- Values com background
- Cards com gradiente sutil
- Hover com scale

#### � **Responsividade Aprimorada**
- Breakpoints: 768px (tablet) e 480px (mobile)
- Menu mobile com overlay e shadow
- Cards em coluna única
- Buttons full-width
- Padding ajustado por device
- Font-sizes escaláveis

#### 🎨 **Tipografia Premium**
- **Fonte**: Inter (Google Fonts)
- Weights: 400, 500, 600, 700, 800
- Letter-spacing refinado
- Line-height otimizado (1.65)
- Anti-aliasing ativado

#### 🌈 **Efeitos Especiais**
- **Glassmorphism**: backdrop-filter nos modais
- **Gradientes animados**: background-position shift
- **Radial overlays**: efeitos de luz
- **Box-shadow layering**: profundidade realista
- **Border gradients**: linhas coloridas animadas
- **Text gradients**: ícones e títulos
- **Hover transforms**: translateY, scale, rotate
- **Smooth scrolling**: cubic-bezier transitions

#### 🎯 **Detalhes de Polimento**
- Transições com cubic-bezier (0.4, 0, 0.2, 1)
- Consistência de border-radius (sm, md, lg, xl, 2xl, full)
- Sistema de spacing harmonioso
- Z-index hierárquico
- Overflow controlado
- Focus states acessíveis
- Estados de hover em todos os interativos
- Loading states com spinner gradiente

- **HTML5** - Estrutura semântica
- **CSS3** - Estilização moderna com:
  - Flexbox e Grid Layout
  - Animações e transições
  - Media queries (responsividade)
  - Variáveis CSS (Custom Properties)
- **JavaScript (ES6+)** - Funcionalidades:
  - LocalStorage API
  - DOM Manipulation
  - Event Listeners
  - Template Literals
  - Arrow Functions
- **Font Awesome 6.4** - Ícones modernos

## 📱 Responsividade

O sistema é totalmente responsivo e se adapta a:
- 📱 **Mobile**: < 768px
- 📱 **Tablet**: 768px - 1024px
- 💻 **Desktop**: > 1024px

### Ajustes Mobile
- Menu lateral retrátil com botão toggle
- Cards em coluna única
- Botões em largura total
- Chat adaptado para tela pequena

## ⚡ Funcionalidades Destacadas

### LocalStorage
Todos os dados são armazenados localmente:
- ✅ Usuários cadastrados
- ✅ Sessão do usuário logado
- ✅ Agendamentos
- ✅ Exercícios e progresso
- ✅ Mensagens do chat
- ✅ Perfil do usuário

### Navegação SPA (Single Page Application)
- Sem recarregamento de página
- Transições suaves entre telas
- Menu lateral sempre visível no dashboard
- Feedback visual instantâneo

### Simulações Realistas
- Resposta automática no chat
- Validação de formulários
- Mensagens de sucesso/erro
- Confirmação de ações críticas
- Download de PDF simulado

## 🎯 Seções do Dashboard

| Seção | Paciente | Fisioterapeuta |
|-------|----------|----------------|
| Dashboard | ✅ | ✅ |
| Agendamentos | ✅ | ✅ |
| Exercícios | ✅ | ❌ |
| Pacientes | ❌ | ✅ |
| Chat | ✅ | ✅ |
| Relatórios | ✅ | ✅ |
| Perfil | ✅ | ✅ |

## 🔐 Segurança

⚠️ **Nota**: Este é um projeto frontend de demonstração. Em produção:
- Use backend real para autenticação
- Implemente hash de senhas
- Utilize HTTPS
- Adicione validações server-side
- Implemente tokens JWT

## 📝 Comentários no Código

Todo o código está comentado explicando:
- Estrutura das funções
- Lógica de negócio
- Manipulação do DOM
- Uso do LocalStorage
- Event listeners

## 🌟 Destaques do Design

### Animações
- Fade in ao carregar telas
- Slide up para cards
- Hover effects em botões
- Pulse na logo
- Transições suaves em modais

### UX/UI
- Tooltips informativos
- Badges de status coloridos
- Ícones intuitivos
- Feedback visual imediato
- Mensagens de erro/sucesso
- Confirmações de ação

## 🎨 Customização

Para personalizar cores, edite as variáveis CSS em `style.css`:

```css
:root {
    --primary-color: #6DAFE7;
    --secondary-color: #7ED957;
    --background: #F5F7FA;
    /* ... outras variáveis */
}
```

## 📦 Recursos Incluídos

✅ Sistema de autenticação completo  
✅ Dashboard diferenciado por tipo de usuário  
✅ Gerenciamento de agendamentos  
✅ Sistema de exercícios com progresso  
✅ Chat funcional com simulação de resposta  
✅ Relatórios visuais com gráficos  
✅ Perfil editável  
✅ Calendário interativo  
✅ Modais para ações  
✅ Menu mobile responsivo  
✅ LocalStorage completo  
✅ Código organizado e comentado  

## 🚀 Próximos Passos (Melhorias Futuras)

- [ ] Integração com backend real
- [ ] Upload de foto de perfil
- [ ] Notificações push
- [ ] Vídeos dos exercícios
- [ ] Sistema de avaliação (estrelas)
- [ ] Pagamento integrado
- [ ] Geolocalização para fisioterapeutas
- [ ] Videochamada integrada
- [ ] Exportação real de PDF
- [ ] Gráficos mais complexos (Chart.js)

## 👨‍💻 Desenvolvedor

Projeto desenvolvido com foco em:
- Código limpo e organizado
- Boas práticas de JavaScript
- CSS moderno e responsivo
- Experiência do usuário (UX)
- Interface intuitiva (UI)

## 📄 Licença

Este é um projeto de demonstração educacional.

---

**PhysioHome & Care** - Cuidado profissional no conforto do seu lar 🏥💚
