const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

const modal = document.getElementById('projectModal');
const modalBody = document.getElementById('modalBody');
const closeBtn = document.querySelector('.close');

const projectsData = {
    energia: {
        title: 'Calculadora de Energia',
        description: 'Sistema completo para cálculo de consumo de energia elétrica com diferentes tipos de clientes (residencial, comercial e industrial). O sistema gera uma fatura detalhada e simula o processo de pagamento com cálculo de troco.',
        features: [
            'Validação de dados em tempo real',
            'Cálculo automático baseado no tipo de cliente',
            'Geração de fatura detalhada',
            'Simulação de pagamento com troco',
            'Interface responsiva e intuitiva',
            'Animações e efeitos visuais'
        ],
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap Icons'],
        challenges: 'O principal desafio foi implementar a validação em tempo real e criar uma experiência de usuário fluida com múltiplas etapas de processo.',
    },
    aprova: {
        title: 'Aprova ou Reprova',
        description: 'Aplicação educacional que calcula a média das notas dos 4 bimestres escolares e determina se o aluno foi aprovado ou reprovado, considerando a nota mínima de 30 pontos.',
        features: [
            'Cálculo automático de médias',
            'Validação de notas (0-10)',
            'Feedback visual imediato',
            'Design responsivo',
            'Animações de texto brilhante',
            'Interface intuitiva para educadores'
        ],
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'CSS Animations'],
        challenges: 'Criar uma interface visualmente atrativa com animações CSS personalizadas e garantir a responsividade em diferentes dispositivos.',
    },
    saque: {
        title: 'Saque Bancário',
        description: 'Simulador de saque bancário que calcula automaticamente a quantidade ideal de cédulas (R$100, R$50, R$20, R$10, R$5, R$1) para qualquer valor de saque solicitado.',
        features: [
            'Algoritmo otimizado para cálculo de cédulas',
            'Validação de valores de entrada',
            'Interface moderna com gradientes',
            'Exibição detalhada do resultado',
            'Funcionalidade de voltar e refazer',
            'Design responsivo'
        ],
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap Icons'],
        challenges: 'Desenvolver um algoritmo eficiente para distribuição de cédulas e criar uma interface que simule a experiência real de um caixa eletrônico.',
    },
    combustivel: {
        title: 'Calculadora de Combustível',
        description: 'Ferramenta prática para calcular gastos com combustível em viagens, considerando o preço do combustível, consumo do veículo (km/l) e distância a percorrer.',
        features: [
            'Cálculo preciso de consumo e gastos',
            'Validação de dados de entrada',
            'Interface com gradientes personalizados',
            'Resultados detalhados e claros',
            'Funcionalidade de recálculo',
            'Design totalmente responsivo'
        ],
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap Icons'],
        challenges: 'Criar uma interface visualmente atrativa com gradientes complexos e garantir cálculos precisos para diferentes cenários de viagem.',
    },
    habitos: {
        title: 'Site de Hábitos Saudáveis',
        description: 'Plataforma completa para acompanhamento de hábitos saudáveis com sistema de cadastro, painel de progresso e armazenamento local de dados usando localStorage.',
        features: [
            'Sistema CRUD completo para hábitos',
            'Armazenamento local com localStorage',
            'Painel de progresso interativo',
            'Formulários de cadastro validados',
            'CSS centralizado e organizado',
            'Interface responsiva e moderna'
        ],
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'LocalStorage API'],
        challenges: 'Implementar um sistema completo de gerenciamento de dados no front-end usando apenas localStorage e criar uma arquitetura CSS escalável.',
    },
    salao: {
        title: 'Salão da Leila — Sistema de Agendamento',
        description: 'Sistema de agendamento para salão de beleza, desenvolvido como teste prático para uma vaga de desenvolvimento. Clientes agendam serviços online e a administradora gerencia tudo por um painel com dashboard de faturamento.',
        features: [
            'Cadastro e login com Firebase Authentication',
            'Agendamento de um ou mais serviços por vez',
            'Aviso de agendamento na mesma semana',
            'Alteração e cancelamento até 2 dias antes',
            'Histórico com filtro por período',
            'Painel administrativo com status por serviço',
            'Dashboard com faturamento, ticket médio e serviços mais pedidos',
            'Regras de segurança no Cloud Firestore'
        ],
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'Firebase Authentication', 'Cloud Firestore'],
        challenges: 'Garantir que cada cliente veja e altere apenas os próprios agendamentos, usando regras de segurança do Firestore, e calcular os indicadores do dashboard direto no front-end.',
    },
    burger: {
        title: 'Burger on the Grill — Site de Hamburgueria',
        description: 'Site institucional responsivo para uma hamburgueria de Cabrália Paulista/SP, pensado para celular e para levar o cliente direto ao pedido pelo WhatsApp.',
        features: [
            'Layout responsivo (mobile first)',
            'Galeria de fotos dos produtos',
            'Cardápio organizado por categorias',
            'Seção de avaliações de clientes',
            'Mapa com localização e horário de funcionamento',
            'Botão de contato direto pelo WhatsApp'
        ],
        technologies: ['HTML5', 'CSS3', 'JavaScript'],
        challenges: 'Criar uma identidade visual marcante e manter a página leve e rápida em celulares.',
    },
    tcc: {
        title: 'TCC - Plataforma Simulando',
        description: 'Projeto de conclusão de curso: plataforma completa de criação e resolução de Simulados, com correção automática, sistema de login diferenciado para alunos e professores, painel administrativo e sistema de relatórios.',
        features: [
            'Sistema de autenticação completo',
            'Correção automática de simulados',
            'Cronômetro Inteligente',
            'Relatórios em Planilhas Excel',
            'Painel diferenciado para alunos e professores',
            'Banco de questões do ENEM',
            'Sistema de simulados cronometrados',
            'Relatórios de desempenho detalhados',
            'Interface administrativa completa',
            'Banco de dados MySQL integrado'
        ],
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'PHP', 'MySQL', 'Bootstrap'],
        challenges: 'Desenvolver uma aplicação full-stack completa com diferentes níveis de acesso, integração com banco de dados e sistema de relatórios complexos.',
    },
};

function openModal(projectKey) {
    const project = projectsData[projectKey];
    if (!project) return;

    modalBody.innerHTML = `
        <h2>${project.title}</h2>
        <p class="project-description">${project.description}</p>
        
        <h3><i class="bi bi-star-fill"></i> Principais Funcionalidades</h3>
        <ul class="feature-list">
            ${project.features.map(feature => `<li>${feature}</li>`).join('')}
        </ul>
        
        <h3><i class="bi bi-tools"></i> Tecnologias Utilizadas</h3>
        <div class="tech-tags">
            ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
        </div>
        
        <h3><i class="bi bi-lightbulb-fill"></i> Desafios e Aprendizados</h3>
        <p>${project.challenges}</p>
        
        ${project.demo ? `
            <div class="modal-buttons">
                <a href="${project.demo}" target="_blank" class="btn btn-primary">
                    <i class="bi bi-eye-fill"></i> Ver Demonstração
                </a>
            </div>
        ` : ''}
    `;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

closeBtn.addEventListener('click', closeModal);
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        closeModal();
    }
});

const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    const subject = `Contato do Portfólio - ${name}`;
    const body = `Nome: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AMensagem:%0D%0A${message}`;
    
    window.location.href = `mailto:slvrayluan08@gmail.com?subject=${subject}&body=${body}`;
    
    showNotification('Redirecionando para o cliente de email...', 'success');
    setTimeout(() => {
        contactForm.reset();
    }, 1000);
});

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="bi bi-check-circle-fill"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 4000);
}

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

document.querySelectorAll('.project-card, .skill-category, .timeline-item, .stat-item').forEach(el => {
    observer.observe(el);
});

const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    setTimeout(typeWriter, 1000);
}

function animateCounters() {
    const counters = document.querySelectorAll('.stat-item h3');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const increment = target / 50;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + '+';
                setTimeout(updateCounter, 30);
            } else {
                counter.textContent = target + '+';
            }
        };
        
        updateCounter();
    });
}

const aboutSection = document.querySelector('#about');
const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            aboutObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (aboutSection) {
    aboutObserver.observe(aboutSection);
}

const additionalStyles = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--card);
        border: 1px solid var(--primary);
        border-radius: 8px;
        padding: 1rem;
        z-index: 3000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        box-shadow: var(--shadow);
    }
    
    .notification.show {
        transform: translateX(0);
    }
    
    .notification.success {
        border-color: var(--primary);
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: var(--text);
    }
    
    .notification-content i {
        color: var(--primary);
    }
    
    .animate-in {
        animation: slideInUp 0.6s ease forwards;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .feature-list {
        list-style: none;
        padding: 0;
        margin: 1rem 0;
    }
    
    .feature-list li {
        padding: 0.5rem 0;
        padding-left: 1.5rem;
        position: relative;
        color: var(--text-light);
    }
    
    .feature-list li::before {
        content: '✓';
        position: absolute;
        left: 0;
        color: var(--primary);
        font-weight: bold;
    }
    
    .project-description {
        color: var(--text-light);
        font-size: 1.1rem;
        line-height: 1.6;
        margin-bottom: 2rem;
    }
    
    .modal-buttons {
        margin-top: 2rem;
        text-align: center;
    }
    
    .tech-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin: 1rem 0;
    }
    
    #modalBody h3 {
        color: var(--primary);
        margin: 1.5rem 0 1rem 0;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);
