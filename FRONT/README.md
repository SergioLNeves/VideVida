# ViDeVida - Sistema de Gestão Hospitalar

Um sistema moderno de gestão hospitalar desenvolvido com React, TypeScript e Vite, oferecendo interfaces diferenciadas para pacientes, médicos e administradores.

## 🏥 Sobre o Projeto

O ViDeVida é uma plataforma completa para gerenciamento hospitalar que facilita a interação entre pacientes, profissionais de saúde e administradores através de portais personalizados e seguros.

## ✨ Funcionalidades

### 🔐 Sistema de Autenticação
- **Login inteligente em duas etapas**: Primeiro verifica se o email existe no sistema
- **Cadastro dinâmico**: Redirecionamento automático para cadastro quando email não existe
- **Autenticação baseada em tipos de usuário**: Controle de acesso específico para cada perfil
- **Proteção de rotas**: Sistema de rotas protegidas com base no tipo de usuário

### 👤 Portal do Paciente
- **Dashboard personalizado** com informações relevantes do paciente
- **Agendamento de consultas** (em desenvolvimento)
- **Histórico médico** e acesso a exames
- **Interface intuitiva e responsiva**

### 👩‍⚕️ Portal Médico
- **Painel de controle completo** para profissionais de saúde
- **Gestão de consultas** e agendamentos
- **Acesso ao histórico dos pacientes**
- **Ferramentas para prescrições e laudos**
- **Calendário integrado** para organização de horários

### 🛡️ Painel Administrativo
- **Dashboard executivo** com métricas e relatórios
- **Gestão de usuários** (pacientes, médicos, funcionários)
- **Controle de permissões** e configurações do sistema
- **Relatórios gerenciais** e análises
- **Configurações avançadas** do sistema

## 🚀 Tecnologias Utilizadas

### Frontend
- **React 18+** - Library principal para construção da interface
- **TypeScript** - Tipagem estática para maior segurança
- **Vite** - Build tool moderna e rápida
- **React Router DOM** - Roteamento client-side
- **TanStack Query (React Query)** - Gerenciamento de estado servidor

### UI/UX
- **Shadcn UI** - Sistema de componentes moderno
- **Radix UI** - Componentes acessíveis e customizáveis
- **Tailwind CSS** - Framework CSS utility-first
- **Lucide React** - Ícones elegantes e consistentes
- **Sonner** - Notificações toast elegantes

### Formulários e Validação
- **React Hook Form** - Gerenciamento eficiente de formulários
- **Zod** - Validação de esquemas TypeScript-first

## 📋 Pré-requisitos

- Node.js (versão 18 ou superior)
- pnpm (gerenciador de pacotes recomendado)

## 🛠️ Instalação e Configuração

1. **Clone o repositório**
   ```bash
   git clone <url-do-repositorio>
   cd FRONT
   ```

2. **Instale as dependências**
   ```bash
   pnpm install
   ```

3. **Execute o projeto em modo desenvolvimento**
   ```bash
   pnpm dev
   ```

4. **Acesse a aplicação**
   ```
   http://localhost:5173
   ```

## 📁 Estrutura do Projeto

```
src/
├── components/           # Componentes reutilizáveis
│   └── ui/              # Componentes base (Shadcn UI)
├── contexts/            # Contextos React (AuthContext)
├── hooks/               # Custom hooks
├── lib/                 # Utilitários e configurações
├── pages/               # Páginas da aplicação
│   ├── LoginPage.tsx    # Tela de login em duas etapas
│   ├── RegisterPage.tsx # Tela de cadastro
│   ├── AdminPage.tsx    # Dashboard administrativo
│   ├── MedicoPage.tsx   # Portal médico
│   └── PacientePage.tsx # Portal do paciente
├── services/            # Serviços e APIs
├── types/               # Definições de tipos TypeScript
├── utils/               # Funções utilitárias e ProtectedRoute
└── assets/              # Recursos estáticos
```

## 👥 Tipos de Usuário

### 🏥 Administrador (`admin`)
- Acesso completo ao sistema
- Gestão de usuários e permissões
- Relatórios e métricas avançadas
- Configurações globais

### 👩‍⚕️ Médico (`medico`)
- Portal profissional especializado
- Gestão de consultas e pacientes
- Acesso a históricos médicos
- Ferramentas clínicas

### 👤 Paciente (`paciente`)
- Portal pessoal simplificado
- Agendamento de consultas
- Acesso ao próprio histórico
- Interface user-friendly

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
pnpm dev

# Build para produção
pnpm build

# Preview da build
pnpm preview

# Linting
pnpm lint
```

## 🎨 Padrões de Design

- **Design System** baseado em Shadcn UI
- **Responsive Design** com abordagem mobile-first
- **Dark/Light Mode** suportado nativamente
- **Acessibilidade** seguindo padrões WCAG
- **UX consistente** entre diferentes portais

## 🔒 Segurança

- **Rotas protegidas** com validação de tipo de usuário
- **Context API** para gerenciamento seguro de estado
- **TypeScript** para prevenção de erros em tempo de compilação
- **Validação client-side** com Zod

## 📱 Responsividade

O sistema é totalmente responsivo e otimizado para:
- 📱 **Mobile** (smartphones)
- 📊 **Tablet** (tablets)
- 💻 **Desktop** (computadores)

## 🚧 Roadmap

- [ ] Integração com backend real
- [ ] Sistema de notificações em tempo real
- [ ] Chat entre médicos e pacientes
- [ ] Módulo de telemedicina
- [ ] App mobile nativo
- [ ] Relatórios avançados com gráficos

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feat/nova-feature`)
3. Commit suas mudanças (`git commit -m 'feat: adiciona nova feature'`)
4. Push para a branch (`git push origin feat/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

**Desenvolvido com ❤️ para revolucionar o atendimento hospitalar**
    ...reactDom.configs.recommended.rules,
  },
})
```
