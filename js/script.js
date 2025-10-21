// ================================================
// VARIÁVEIS GLOBAIS E CONSTANTES
// ================================================
let currentUser = null;
let currentSection = 'dashboard';
let currentChat = null;

// ================================================
// INICIALIZAÇÃO
// ================================================
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    setupEventListeners();
    checkLoggedUser();
});

// Inicializar dados de exemplo no LocalStorage
function initializeApp() {
    // Criar fisioterapeutas de exemplo se não existirem
    if (!localStorage.getItem('fisioterapeutas')) {
        const fisios = [
            {
                id: 1,
                nome: 'Dr. Carlos Silva',
                especialidade: 'Ortopedia',
                crm: '12345-SP'
            },
            {
                id: 2,
                nome: 'Dra. Ana Paula',
                especialidade: 'Neurologia',
                crm: '67890-SP'
            },
            {
                id: 3,
                nome: 'Dr. Roberto Santos',
                especialidade: 'Esportiva',
                crm: '11223-SP'
            }
        ];
        localStorage.setItem('fisioterapeutas', JSON.stringify(fisios));
    }

    // Criar exercícios de exemplo se não existirem
    if (!localStorage.getItem('exercises')) {
        const exercises = [
            {
                id: 1,
                nome: 'Alongamento Cervical',
                descricao: 'Exercício para relaxamento da região do pescoço',
                icon: 'fa-head-side-virus',
                status: 'pending',
                repeticoes: '3x ao dia'
            },
            {
                id: 2,
                nome: 'Fortalecimento Lombar',
                descricao: 'Fortalecimento da musculatura lombar',
                icon: 'fa-person-walking',
                status: 'pending',
                repeticoes: '2x ao dia'
            },
            {
                id: 3,
                nome: 'Mobilidade de Ombros',
                descricao: 'Exercícios para aumentar a amplitude de movimento',
                icon: 'fa-hands',
                status: 'pending',
                repeticoes: '3x ao dia'
            },
            {
                id: 4,
                nome: 'Alongamento de Pernas',
                descricao: 'Alongamento da musculatura posterior das pernas',
                icon: 'fa-person-walking',
                status: 'pending',
                repeticoes: '2x ao dia'
            }
        ];
        localStorage.setItem('exercises', JSON.stringify(exercises));
    }
}

// Verificar se há usuário logado
function checkLoggedUser() {
    const user = localStorage.getItem('currentUser');
    if (user) {
        currentUser = JSON.parse(user);
        showDashboard();
    } else {
        showHomeScreen();
    }
}

// ================================================
// NAVEGAÇÃO ENTRE TELAS
// ================================================
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

function showHomeScreen() {
    showScreen('homeScreen');
}

function showLoginScreen() {
    showScreen('loginScreen');
    document.getElementById('loginError').classList.remove('show');
}

function showRegisterScreen() {
    showScreen('registerScreen');
    document.getElementById('registerError').classList.remove('show');
}

function showDashboard() {
    showScreen('dashboardScreen');
    renderDashboard();
}

// ================================================
// AUTENTICAÇÃO
// ================================================
function setupEventListeners() {
    // Formulário de Login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Formulário de Cadastro
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
}

function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        currentUser = user;
        if (rememberMe) {
            localStorage.setItem('currentUser', JSON.stringify(user));
        }
        showDashboard();
    } else {
        showError('loginError', 'E-mail ou senha incorretos');
    }
}

function handleRegister(e) {
    e.preventDefault();
    
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const type = document.getElementById('registerType').value;
    const acceptTerms = document.getElementById('acceptTerms').checked;
    
    if (!acceptTerms) {
        showError('registerError', 'Você deve aceitar os termos de uso');
        return;
    }
    
    if (password.length < 6) {
        showError('registerError', 'A senha deve ter no mínimo 6 caracteres');
        return;
    }
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    if (users.find(u => u.email === email)) {
        showError('registerError', 'Este e-mail já está cadastrado');
        return;
    }
    
    const newUser = {
        id: Date.now(),
        name,
        email,
        password,
        type,
        createdAt: new Date().toISOString(),
        idade: '',
        condicao: ''
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    currentUser = newUser;
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    
    showDashboard();
}

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.classList.add('show');
    
    setTimeout(() => {
        errorElement.classList.remove('show');
    }, 5000);
}

// ================================================
// RENDERIZAÇÃO DO DASHBOARD
// ================================================
function renderDashboard() {
    const dashboardScreen = document.getElementById('dashboardScreen');
    
    const dashboardHTML = `
        <div class="dashboard-container">
            <!-- Sidebar -->
            <aside class="sidebar" id="sidebar">
                <div class="sidebar-header">
                    <i class="fas fa-heartbeat"></i>
                    <h3>PhysioHome</h3>
                </div>
                
                <nav class="sidebar-menu">
                    <div class="menu-item active" onclick="showSection('dashboard')">
                        <i class="fas fa-th-large"></i>
                        <span>Dashboard</span>
                    </div>
                    <div class="menu-item" onclick="showSection('agendamentos')">
                        <i class="fas fa-calendar-check"></i>
                        <span>Agendamentos</span>
                    </div>
                    ${currentUser.type === 'paciente' ? `
                    <div class="menu-item" onclick="showSection('exercicios')">
                        <i class="fas fa-dumbbell"></i>
                        <span>Exercícios</span>
                    </div>
                    ` : ''}
                    ${currentUser.type === 'fisioterapeuta' ? `
                    <div class="menu-item" onclick="showSection('pacientes')">
                        <i class="fas fa-users"></i>
                        <span>Pacientes</span>
                    </div>
                    ` : ''}
                    <div class="menu-item" onclick="showSection('chat')">
                        <i class="fas fa-comments"></i>
                        <span>Chat</span>
                    </div>
                    <div class="menu-item" onclick="showSection('relatorios')">
                        <i class="fas fa-chart-line"></i>
                        <span>Relatórios</span>
                    </div>
                    <div class="menu-item" onclick="showSection('perfil')">
                        <i class="fas fa-user"></i>
                        <span>Perfil</span>
                    </div>
                </nav>
                
                <div class="sidebar-footer">
                    <button class="btn btn-danger btn-full" onclick="handleLogout()">
                        <i class="fas fa-sign-out-alt"></i> Sair
                    </button>
                </div>
            </aside>
            
            <!-- Toggle Menu Mobile -->
            <button class="mobile-menu-toggle" onclick="toggleMobileMenu()">
                <i class="fas fa-bars"></i>
            </button>
            
            <!-- Main Content -->
            <main class="main-content">
                <div id="dashboardContent">
                    ${renderDashboardHome()}
                </div>
            </main>
        </div>
    `;
    
    dashboardScreen.innerHTML = dashboardHTML;
}

function renderDashboardHome() {
    const userName = currentUser.name.split(' ')[0];
    
    return `
        <div class="dashboard-section active" id="section-dashboard">
            <div class="content-header">
                <h1>Olá, ${userName}! 👋</h1>
                <p>Bem-vindo ao seu painel ${currentUser.type === 'paciente' ? 'do paciente' : 'do fisioterapeuta'}</p>
            </div>
            
            <!-- Cards de Estatísticas -->
            <div class="dashboard-cards">
                <div class="dashboard-card">
                    <div class="card-icon blue">
                        <i class="fas fa-calendar-check"></i>
                    </div>
                    <div class="card-title">Próximos Agendamentos</div>
                    <div class="card-value">${getUpcomingAppointments()}</div>
                </div>
                
                ${currentUser.type === 'paciente' ? `
                <div class="dashboard-card">
                    <div class="card-icon green">
                        <i class="fas fa-dumbbell"></i>
                    </div>
                    <div class="card-title">Exercícios Pendentes</div>
                    <div class="card-value">${getPendingExercises()}</div>
                </div>
                ` : `
                <div class="dashboard-card">
                    <div class="card-icon green">
                        <i class="fas fa-users"></i>
                    </div>
                    <div class="card-title">Pacientes Ativos</div>
                    <div class="card-value">8</div>
                </div>
                `}
                
                <div class="dashboard-card">
                    <div class="card-icon orange">
                        <i class="fas fa-comments"></i>
                    </div>
                    <div class="card-title">Mensagens Novas</div>
                    <div class="card-value">${getUnreadMessages()}</div>
                </div>
                
                <div class="dashboard-card">
                    <div class="card-icon red">
                        <i class="fas fa-chart-line"></i>
                    </div>
                    <div class="card-title">Taxa de Evolução</div>
                    <div class="card-value">85%</div>
                </div>
            </div>
            
            <!-- Próximos Agendamentos -->
            <div class="section-card">
                <div class="section-header">
                    <h2><i class="fas fa-calendar-alt"></i> Próximos Agendamentos</h2>
                    <button class="btn btn-primary" onclick="showSection('agendamentos')">
                        Ver Todos
                    </button>
                </div>
                ${renderRecentAppointments()}
            </div>
            
            ${currentUser.type === 'paciente' ? `
            <!-- Exercícios Recentes -->
            <div class="section-card">
                <div class="section-header">
                    <h2><i class="fas fa-dumbbell"></i> Seus Exercícios</h2>
                    <button class="btn btn-primary" onclick="showSection('exercicios')">
                        Ver Todos
                    </button>
                </div>
                ${renderRecentExercises()}
            </div>
            ` : ''}
        </div>
    `;
}

// ================================================
// SEÇÕES DO DASHBOARD
// ================================================
function showSection(sectionName) {
    currentSection = sectionName;
    
    // Atualizar menu ativo
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
    });
    event.currentTarget.classList.add('active');
    
    // Renderizar seção
    const content = document.getElementById('dashboardContent');
    
    switch(sectionName) {
        case 'dashboard':
            content.innerHTML = renderDashboardHome();
            break;
        case 'agendamentos':
            content.innerHTML = renderAgendamentos();
            break;
        case 'exercicios':
            content.innerHTML = renderExercicios();
            break;
        case 'pacientes':
            content.innerHTML = renderPacientes();
            break;
        case 'chat':
            content.innerHTML = renderChat();
            initializeChat();
            break;
        case 'relatorios':
            content.innerHTML = renderRelatorios();
            setTimeout(renderCharts, 100);
            break;
        case 'perfil':
            content.innerHTML = renderPerfil();
            break;
    }
    
    // Fechar menu mobile se estiver aberto
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
        sidebar.classList.remove('mobile-open');
    }
}

// ================================================
// AGENDAMENTOS
// ================================================
function renderAgendamentos() {
    return `
        <div class="dashboard-section active" id="section-agendamentos">
            <div class="content-header">
                <h1><i class="fas fa-calendar-check"></i> Agendamentos</h1>
                <p>Gerencie suas consultas e horários</p>
            </div>
            
            <div class="section-card">
                <div class="section-header">
                    <h2>Calendário</h2>
                    <button class="btn btn-primary" onclick="openNewAppointmentModal()">
                        <i class="fas fa-plus"></i> Novo Agendamento
                    </button>
                </div>
                ${renderCalendar()}
            </div>
            
            <div class="section-card">
                <h2 style="margin-bottom: 1rem;">Lista de Agendamentos</h2>
                ${renderAppointmentsList()}
            </div>
        </div>
        
        <!-- Modal Novo Agendamento -->
        <div id="appointmentModal" class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>Novo Agendamento</h2>
                    <button class="modal-close" onclick="closeModal('appointmentModal')">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <form id="appointmentForm" class="auth-form">
                    ${currentUser.type === 'paciente' ? `
                    <div class="form-group">
                        <label><i class="fas fa-user-md"></i> Fisioterapeuta</label>
                        <select id="appointmentFisio" required>
                            <option value="">Selecione...</option>
                            ${getFisioterapeutas().map(f => 
                                `<option value="${f.id}">${f.nome} - ${f.especialidade}</option>`
                            ).join('')}
                        </select>
                    </div>
                    ` : `
                    <div class="form-group">
                        <label><i class="fas fa-user"></i> Paciente</label>
                        <input type="text" id="appointmentPaciente" required placeholder="Nome do paciente">
                    </div>
                    `}
                    
                    <div class="form-group">
                        <label><i class="fas fa-calendar"></i> Data</label>
                        <input type="date" id="appointmentDate" required>
                    </div>
                    
                    <div class="form-group">
                        <label><i class="fas fa-clock"></i> Hora</label>
                        <input type="time" id="appointmentTime" required>
                    </div>
                    
                    <div class="form-group">
                        <label><i class="fas fa-map-marker-alt"></i> Local</label>
                        <input type="text" id="appointmentLocal" required placeholder="Endereço do atendimento">
                    </div>
                    
                    <div class="form-group">
                        <label><i class="fas fa-notes-medical"></i> Observações</label>
                        <textarea id="appointmentNotes" rows="3" placeholder="Observações adicionais"></textarea>
                    </div>
                    
                    <button type="submit" class="btn btn-primary btn-full">
                        <i class="fas fa-check"></i> Confirmar Agendamento
                    </button>
                </form>
            </div>
        </div>
    `;
}

function renderCalendar() {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    
    return `
        <div class="calendar-container">
            <div class="calendar-header">
                <button class="btn btn-icon" onclick="previousMonth()">
                    <i class="fas fa-chevron-left"></i>
                </button>
                <h3>${getMonthName(currentMonth)} ${currentYear}</h3>
                <button class="btn btn-icon" onclick="nextMonth()">
                    <i class="fas fa-chevron-right"></i>
                </button>
            </div>
            <div class="calendar-grid">
                <div class="calendar-day" style="font-weight: 600;">Dom</div>
                <div class="calendar-day" style="font-weight: 600;">Seg</div>
                <div class="calendar-day" style="font-weight: 600;">Ter</div>
                <div class="calendar-day" style="font-weight: 600;">Qua</div>
                <div class="calendar-day" style="font-weight: 600;">Qui</div>
                <div class="calendar-day" style="font-weight: 600;">Sex</div>
                <div class="calendar-day" style="font-weight: 600;">Sáb</div>
                ${generateCalendarDays(currentMonth, currentYear)}
            </div>
        </div>
    `;
}

function generateCalendarDays(month, year) {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date().getDate();
    const currentMonth = new Date().getMonth();
    
    let html = '';
    
    // Dias vazios antes do início do mês
    for (let i = 0; i < firstDay; i++) {
        html += '<div class="calendar-day" style="opacity: 0.3;"></div>';
    }
    
    // Dias do mês
    for (let day = 1; day <= daysInMonth; day++) {
        const isToday = day === today && month === currentMonth;
        const classes = isToday ? 'calendar-day today' : 'calendar-day';
        html += `<div class="${classes}">${day}</div>`;
    }
    
    return html;
}

function getMonthName(month) {
    const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
                   'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    return months[month];
}

function renderAppointmentsList() {
    const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    const userAppointments = appointments.filter(a => a.userId === currentUser.id);
    
    if (userAppointments.length === 0) {
        return '<p style="text-align: center; color: var(--text-secondary); padding: 2rem;">Nenhum agendamento encontrado</p>';
    }
    
    return `
        <div class="appointments-list">
            ${userAppointments.map(app => `
                <div class="appointment-item">
                    <div class="appointment-info">
                        <div class="appointment-icon">
                            <i class="fas fa-user-md"></i>
                        </div>
                        <div class="appointment-details">
                            <h3>${app.fisio || app.paciente}</h3>
                            <p><i class="fas fa-calendar"></i> ${formatDate(app.date)} às ${app.time}</p>
                            <p><i class="fas fa-map-marker-alt"></i> ${app.local}</p>
                        </div>
                    </div>
                    <div class="appointment-actions">
                        <button class="btn btn-primary btn-icon" data-tooltip="Editar">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-danger btn-icon" onclick="deleteAppointment(${app.id})" data-tooltip="Cancelar">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function renderRecentAppointments() {
    const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    const userAppointments = appointments.filter(a => a.userId === currentUser.id).slice(0, 3);
    
    if (userAppointments.length === 0) {
        return '<p style="text-align: center; color: var(--text-secondary); padding: 1rem;">Nenhum agendamento próximo</p>';
    }
    
    return `
        <div class="appointments-list">
            ${userAppointments.map(app => `
                <div class="appointment-item">
                    <div class="appointment-info">
                        <div class="appointment-icon">
                            <i class="fas fa-user-md"></i>
                        </div>
                        <div class="appointment-details">
                            <h3>${app.fisio || app.paciente}</h3>
                            <p><i class="fas fa-calendar"></i> ${formatDate(app.date)} às ${app.time}</p>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function openNewAppointmentModal() {
    document.getElementById('appointmentModal').classList.add('active');
    
    // Configurar data mínima (hoje)
    const dateInput = document.getElementById('appointmentDate');
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
    
    // Event listener para o formulário
    const form = document.getElementById('appointmentForm');
    form.onsubmit = handleNewAppointment;
}

function handleNewAppointment(e) {
    e.preventDefault();
    
    const fisioId = document.getElementById('appointmentFisio')?.value;
    const paciente = document.getElementById('appointmentPaciente')?.value;
    const date = document.getElementById('appointmentDate').value;
    const time = document.getElementById('appointmentTime').value;
    const local = document.getElementById('appointmentLocal').value;
    const notes = document.getElementById('appointmentNotes').value;
    
    const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    
    let fisioName = '';
    if (currentUser.type === 'paciente') {
        const fisios = getFisioterapeutas();
        const fisio = fisios.find(f => f.id == fisioId);
        fisioName = fisio ? fisio.nome : '';
    }
    
    const newAppointment = {
        id: Date.now(),
        userId: currentUser.id,
        fisio: currentUser.type === 'paciente' ? fisioName : currentUser.name,
        paciente: currentUser.type === 'fisioterapeuta' ? paciente : currentUser.name,
        date,
        time,
        local,
        notes,
        status: 'agendado',
        createdAt: new Date().toISOString()
    };
    
    appointments.push(newAppointment);
    localStorage.setItem('appointments', JSON.stringify(appointments));
    
    closeModal('appointmentModal');
    showSection('agendamentos');
}

function deleteAppointment(id) {
    if (confirm('Deseja realmente cancelar este agendamento?')) {
        let appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
        appointments = appointments.filter(a => a.id !== id);
        localStorage.setItem('appointments', JSON.stringify(appointments));
        showSection('agendamentos');
    }
}

// ================================================
// EXERCÍCIOS
// ================================================
function renderExercicios() {
    return `
        <div class="dashboard-section active" id="section-exercicios">
            <div class="content-header">
                <h1><i class="fas fa-dumbbell"></i> Exercícios Personalizados</h1>
                <p>Seu plano de exercícios personalizado</p>
            </div>
            
            <div class="section-card">
                <div class="exercises-filter">
                    <button class="filter-btn active" onclick="filterExercises('all')">
                        <i class="fas fa-list"></i> Todos
                    </button>
                    <button class="filter-btn" onclick="filterExercises('pending')">
                        <i class="fas fa-clock"></i> Pendentes
                    </button>
                    <button class="filter-btn" onclick="filterExercises('completed')">
                        <i class="fas fa-check-circle"></i> Concluídos
                    </button>
                </div>
                
                <div class="exercises-list" id="exercisesList">
                    ${renderExercisesList('all')}
                </div>
            </div>
        </div>
    `;
}

function renderExercisesList(filter = 'all') {
    const exercises = JSON.parse(localStorage.getItem('exercises') || '[]');
    
    let filtered = exercises;
    if (filter === 'pending') {
        filtered = exercises.filter(e => e.status === 'pending');
    } else if (filter === 'completed') {
        filtered = exercises.filter(e => e.status === 'completed');
    }
    
    if (filtered.length === 0) {
        return '<p style="text-align: center; color: var(--text-secondary); padding: 2rem;">Nenhum exercício encontrado</p>';
    }
    
    return filtered.map(exercise => `
        <div class="exercise-card">
            <div class="exercise-image">
                <i class="fas ${exercise.icon}"></i>
            </div>
            <div class="exercise-content">
                <h3>${exercise.nome}</h3>
                <p>${exercise.descricao}</p>
                <p style="font-size: 0.85rem; color: var(--text-secondary);">
                    <i class="fas fa-redo"></i> ${exercise.repeticoes}
                </p>
                <div class="exercise-status">
                    <span class="exercise-badge ${exercise.status === 'completed' ? 'completed' : 'pending'}">
                        ${exercise.status === 'completed' ? 'Concluído' : 'Pendente'}
                    </span>
                    ${exercise.status === 'pending' ? `
                        <button class="btn btn-success" onclick="markExerciseComplete(${exercise.id})">
                            <i class="fas fa-check"></i> Marcar como Feito
                        </button>
                    ` : `
                        <button class="btn btn-secondary" onclick="markExercisePending(${exercise.id})">
                            <i class="fas fa-undo"></i> Refazer
                        </button>
                    `}
                </div>
            </div>
        </div>
    `).join('');
}

function renderRecentExercises() {
    const exercises = JSON.parse(localStorage.getItem('exercises') || '[]');
    const pending = exercises.filter(e => e.status === 'pending').slice(0, 3);
    
    if (pending.length === 0) {
        return '<p style="text-align: center; color: var(--text-secondary); padding: 1rem;">Todos os exercícios foram concluídos! 🎉</p>';
    }
    
    return `
        <div style="display: flex; flex-direction: column; gap: 1rem;">
            ${pending.map(exercise => `
                <div style="display: flex; align-items: center; justify-content: space-between; padding: 1rem; background: var(--background); border-radius: 10px;">
                    <div style="display: flex; align-items: center; gap: 1rem;">
                        <div style="width: 40px; height: 40px; background: rgba(109, 175, 231, 0.15); color: var(--primary-color); border-radius: 8px; display: flex; align-items: center; justify-content: center;">
                            <i class="fas ${exercise.icon}"></i>
                        </div>
                        <div>
                            <h4 style="margin: 0; color: var(--text-primary);">${exercise.nome}</h4>
                            <p style="margin: 0; font-size: 0.85rem; color: var(--text-secondary);">${exercise.repeticoes}</p>
                        </div>
                    </div>
                    <button class="btn btn-success btn-icon" onclick="markExerciseComplete(${exercise.id})" data-tooltip="Marcar como feito">
                        <i class="fas fa-check"></i>
                    </button>
                </div>
            `).join('')}
        </div>
    `;
}

function filterExercises(filter) {
    // Atualizar botões
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.currentTarget.classList.add('active');
    
    // Atualizar lista
    const list = document.getElementById('exercisesList');
    list.innerHTML = renderExercisesList(filter);
}

function markExerciseComplete(id) {
    const exercises = JSON.parse(localStorage.getItem('exercises') || '[]');
    const exercise = exercises.find(e => e.id === id);
    if (exercise) {
        exercise.status = 'completed';
        localStorage.setItem('exercises', JSON.stringify(exercises));
        
        // Atualizar visualização
        if (currentSection === 'exercicios') {
            showSection('exercicios');
        } else {
            renderDashboard();
        }
    }
}

function markExercisePending(id) {
    const exercises = JSON.parse(localStorage.getItem('exercises') || '[]');
    const exercise = exercises.find(e => e.id === id);
    if (exercise) {
        exercise.status = 'pending';
        localStorage.setItem('exercises', JSON.stringify(exercises));
        showSection('exercicios');
    }
}

// ================================================
// PACIENTES (para Fisioterapeutas)
// ================================================
function renderPacientes() {
    return `
        <div class="dashboard-section active" id="section-pacientes">
            <div class="content-header">
                <h1><i class="fas fa-users"></i> Meus Pacientes</h1>
                <p>Gerencie seus pacientes e acompanhe a evolução</p>
            </div>
            
            <div class="section-card">
                <div class="section-header">
                    <h2>Pacientes Ativos</h2>
                    <button class="btn btn-primary">
                        <i class="fas fa-plus"></i> Adicionar Paciente
                    </button>
                </div>
                
                <div class="exercises-list">
                    ${renderPacientesList()}
                </div>
            </div>
        </div>
    `;
}

function renderPacientesList() {
    const pacientes = [
        { nome: 'Maria Silva', idade: 45, condicao: 'Dor lombar', ultimaConsulta: '2025-10-18' },
        { nome: 'João Santos', idade: 62, condicao: 'Reabilitação pós-cirúrgica', ultimaConsulta: '2025-10-19' },
        { nome: 'Ana Costa', idade: 34, condicao: 'Lesão no ombro', ultimaConsulta: '2025-10-20' }
    ];
    
    return pacientes.map(p => `
        <div class="exercise-card">
            <div class="exercise-image">
                <i class="fas fa-user"></i>
            </div>
            <div class="exercise-content">
                <h3>${p.nome}</h3>
                <p><i class="fas fa-birthday-cake"></i> ${p.idade} anos</p>
                <p><i class="fas fa-notes-medical"></i> ${p.condicao}</p>
                <p style="font-size: 0.85rem; color: var(--text-secondary);">
                    <i class="fas fa-calendar"></i> Última consulta: ${formatDate(p.ultimaConsulta)}
                </p>
                <div class="exercise-status">
                    <button class="btn btn-primary">
                        <i class="fas fa-eye"></i> Ver Detalhes
                    </button>
                    <button class="btn btn-secondary">
                        <i class="fas fa-calendar-plus"></i> Agendar
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// ================================================
// CHAT
// ================================================
function renderChat() {
    return `
        <div class="dashboard-section active" id="section-chat">
            <div class="content-header">
                <h1><i class="fas fa-comments"></i> Chat</h1>
                <p>Converse com ${currentUser.type === 'paciente' ? 'seu fisioterapeuta' : 'seus pacientes'}</p>
            </div>
            
            <div class="chat-container" id="chatContainer">
                <div class="chat-list" id="chatList">
                    ${renderChatList()}
                </div>
                
                <div class="chat-box" id="chatBox">
                    <div class="chat-header">
                        <div class="chat-avatar">
                            <i class="fas fa-user-md"></i>
                        </div>
                        <div>
                            <h3 id="chatContactName">Selecione uma conversa</h3>
                            <p style="font-size: 0.85rem; color: var(--text-secondary);" id="chatContactStatus">Online</p>
                        </div>
                    </div>
                    
                    <div class="chat-messages" id="chatMessages">
                        <p style="text-align: center; color: var(--text-secondary); padding: 2rem;">
                            Selecione uma conversa para começar
                        </p>
                    </div>
                    
                    <div class="chat-input-container">
                        <input type="text" class="chat-input" id="chatInput" 
                               placeholder="Digite sua mensagem..." 
                               onkeypress="if(event.key==='Enter') sendMessage()">
                        <button class="btn btn-primary btn-icon" onclick="sendMessage()">
                            <i class="fas fa-paper-plane"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderChatList() {
    const contacts = currentUser.type === 'paciente' 
        ? [
            { id: 1, nome: 'Dr. Carlos Silva', tipo: 'fisioterapeuta', lastMessage: 'Bom dia! Como está se sentindo?', online: true },
            { id: 2, nome: 'Suporte PhysioHome', tipo: 'suporte', lastMessage: 'Estamos aqui para ajudar', online: true }
          ]
        : [
            { id: 1, nome: 'Maria Silva', tipo: 'paciente', lastMessage: 'Obrigada pelos exercícios!', online: false },
            { id: 2, nome: 'João Santos', tipo: 'paciente', lastMessage: 'Estou me sentindo melhor', online: true },
            { id: 3, nome: 'Ana Costa', tipo: 'paciente', lastMessage: 'Quando será a próxima sessão?', online: false }
          ];
    
    return contacts.map(contact => `
        <div class="chat-item" onclick="selectChat(${contact.id}, '${contact.nome}')">
            <div class="chat-avatar">
                <i class="fas ${contact.tipo === 'fisioterapeuta' ? 'fa-user-md' : contact.tipo === 'suporte' ? 'fa-headset' : 'fa-user'}"></i>
            </div>
            <div class="chat-info">
                <h4>${contact.nome}</h4>
                <p>${contact.lastMessage}</p>
            </div>
        </div>
    `).join('');
}

function initializeChat() {
    // Configurar mensagens iniciais se não existirem
    if (!localStorage.getItem('messages')) {
        localStorage.setItem('messages', JSON.stringify({}));
    }
}

function selectChat(contactId, contactName) {
    currentChat = contactId;
    
    // Atualizar UI
    document.getElementById('chatContactName').textContent = contactName;
    
    // Atualizar itens ativos
    document.querySelectorAll('.chat-item').forEach(item => {
        item.classList.remove('active');
    });
    event.currentTarget.classList.add('active');
    
    // Carregar mensagens
    loadMessages(contactId);
}

function loadMessages(contactId) {
    const messages = JSON.parse(localStorage.getItem('messages') || '{}');
    const chatKey = `${currentUser.id}-${contactId}`;
    const chatMessages = messages[chatKey] || [];
    
    const messagesContainer = document.getElementById('chatMessages');
    
    if (chatMessages.length === 0) {
        messagesContainer.innerHTML = '<p style="text-align: center; color: var(--text-secondary); padding: 2rem;">Inicie a conversa</p>';
        return;
    }
    
    messagesContainer.innerHTML = chatMessages.map(msg => `
        <div class="message ${msg.sent ? 'sent' : ''}">
            <div class="message-avatar">
                <i class="fas ${msg.sent ? 'fa-user' : 'fa-user-md'}"></i>
            </div>
            <div class="message-content">
                <div class="message-text">${msg.text}</div>
                <div class="message-time">${formatTime(msg.timestamp)}</div>
            </div>
        </div>
    `).join('');
    
    // Scroll para o fim
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function sendMessage() {
    const input = document.getElementById('chatInput');
    const text = input.value.trim();
    
    if (!text || !currentChat) return;
    
    const messages = JSON.parse(localStorage.getItem('messages') || '{}');
    const chatKey = `${currentUser.id}-${currentChat}`;
    
    if (!messages[chatKey]) {
        messages[chatKey] = [];
    }
    
    messages[chatKey].push({
        text,
        sent: true,
        timestamp: new Date().toISOString()
    });
    
    localStorage.setItem('messages', JSON.stringify(messages));
    
    input.value = '';
    loadMessages(currentChat);
    
    // Simular resposta automática após 2 segundos
    setTimeout(() => {
        messages[chatKey].push({
            text: 'Mensagem recebida! Vou responder em breve.',
            sent: false,
            timestamp: new Date().toISOString()
        });
        localStorage.setItem('messages', JSON.stringify(messages));
        loadMessages(currentChat);
    }, 2000);
}

// ================================================
// RELATÓRIOS
// ================================================
function renderRelatorios() {
    return `
        <div class="dashboard-section active" id="section-relatorios">
            <div class="content-header">
                <h1><i class="fas fa-chart-line"></i> Relatórios</h1>
                <p>Acompanhe sua evolução</p>
            </div>
            
            <div class="report-chart">
                <div class="section-header">
                    <h2>Evolução Semanal</h2>
                    <button class="btn btn-primary" onclick="downloadReport()">
                        <i class="fas fa-download"></i> Baixar PDF
                    </button>
                </div>
                
                <div class="chart-container" id="chartContainer">
                    <!-- Gráfico será gerado dinamicamente -->
                </div>
            </div>
            
            <div class="section-card">
                <h2 style="margin-bottom: 1.5rem;">Estatísticas</h2>
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-value">12</div>
                        <div class="stat-label">Sessões Realizadas</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">85%</div>
                        <div class="stat-label">Taxa de Melhora</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">24</div>
                        <div class="stat-label">Exercícios Concluídos</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">4.8</div>
                        <div class="stat-label">Avaliação Média</div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderCharts() {
    const container = document.getElementById('chartContainer');
    if (!container) return;
    
    const data = [
        { label: 'Seg', value: 60 },
        { label: 'Ter', value: 75 },
        { label: 'Qua', value: 70 },
        { label: 'Qui', value: 85 },
        { label: 'Sex', value: 90 },
        { label: 'Sáb', value: 80 },
        { label: 'Dom', value: 95 }
    ];
    
    const maxValue = Math.max(...data.map(d => d.value));
    
    container.innerHTML = data.map(item => {
        const height = (item.value / maxValue) * 100;
        return `
            <div class="chart-bar" style="height: ${height}%;">
                <div class="chart-value">${item.value}%</div>
                <div class="chart-label">${item.label}</div>
            </div>
        `;
    }).join('');
}

function downloadReport() {
    alert('✅ Relatório em PDF gerado com sucesso!\n\nO arquivo seria baixado em uma aplicação real.');
}

// ================================================
// PERFIL
// ================================================
function renderPerfil() {
    return `
        <div class="dashboard-section active" id="section-perfil">
            <div class="content-header">
                <h1><i class="fas fa-user"></i> Meu Perfil</h1>
                <p>Gerencie suas informações pessoais</p>
            </div>
            
            <div class="profile-container">
                <div class="profile-header">
                    <div class="profile-avatar">
                        <i class="fas fa-user"></i>
                    </div>
                    <h2 class="profile-name">${currentUser.name}</h2>
                    <p class="profile-email">${currentUser.email}</p>
                    <span class="exercise-badge ${currentUser.type === 'paciente' ? 'completed' : 'pending'}" 
                          style="display: inline-block; margin-top: 0.5rem;">
                        ${currentUser.type === 'paciente' ? 'Paciente' : 'Fisioterapeuta'}
                    </span>
                </div>
                
                <div class="profile-form">
                    <h3 style="margin-bottom: 1.5rem;">Informações Pessoais</h3>
                    <form id="profileForm" class="auth-form">
                        <div class="form-group">
                            <label><i class="fas fa-user"></i> Nome Completo</label>
                            <input type="text" id="profileName" value="${currentUser.name}" required>
                        </div>
                        
                        <div class="form-group">
                            <label><i class="fas fa-envelope"></i> E-mail</label>
                            <input type="email" id="profileEmail" value="${currentUser.email}" required>
                        </div>
                        
                        <div class="form-group">
                            <label><i class="fas fa-birthday-cake"></i> Idade</label>
                            <input type="number" id="profileIdade" value="${currentUser.idade || ''}" placeholder="Sua idade">
                        </div>
                        
                        ${currentUser.type === 'paciente' ? `
                        <div class="form-group">
                            <label><i class="fas fa-notes-medical"></i> Condição Médica</label>
                            <textarea id="profileCondicao" rows="3" placeholder="Descreva sua condição ou objetivo">${currentUser.condicao || ''}</textarea>
                        </div>
                        ` : ''}
                        
                        <button type="submit" class="btn btn-primary btn-full">
                            <i class="fas fa-save"></i> Salvar Alterações
                        </button>
                    </form>
                </div>
            </div>
        </div>
    `;
}

// Event listener será adicionado após renderização
document.addEventListener('submit', (e) => {
    if (e.target.id === 'profileForm') {
        e.preventDefault();
        handleProfileUpdate();
    }
});

function handleProfileUpdate() {
    const name = document.getElementById('profileName').value;
    const email = document.getElementById('profileEmail').value;
    const idade = document.getElementById('profileIdade').value;
    const condicao = document.getElementById('profileCondicao')?.value || '';
    
    // Atualizar usuário atual
    currentUser.name = name;
    currentUser.email = email;
    currentUser.idade = idade;
    currentUser.condicao = condicao;
    
    // Atualizar no localStorage
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    // Atualizar na lista de usuários
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    if (userIndex !== -1) {
        users[userIndex] = currentUser;
        localStorage.setItem('users', JSON.stringify(users));
    }
    
    alert('✅ Perfil atualizado com sucesso!');
    renderDashboard();
}

// ================================================
// FUNÇÕES AUXILIARES
// ================================================
function getFisioterapeutas() {
    return JSON.parse(localStorage.getItem('fisioterapeutas') || '[]');
}

function getUpcomingAppointments() {
    const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    return appointments.filter(a => a.userId === currentUser.id).length;
}

function getPendingExercises() {
    const exercises = JSON.parse(localStorage.getItem('exercises') || '[]');
    return exercises.filter(e => e.status === 'pending').length;
}

function getUnreadMessages() {
    return Math.floor(Math.random() * 5) + 1; // Simulado
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
}

function formatTime(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

function toggleMobileMenu() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('mobile-open');
}

function handleLogout() {
    if (confirm('Deseja realmente sair?')) {
        localStorage.removeItem('currentUser');
        currentUser = null;
        showHomeScreen();
    }
}

// Fechar modais ao clicar fora
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('active');
    }
});
