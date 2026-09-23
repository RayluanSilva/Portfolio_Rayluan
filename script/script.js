/* =========================================================
   Portfólio de Rayluan Silva
   Menu, link ativo, animação ao rolar, prévias dos projetos,
   janela de detalhes (modal) e formulário de contato.
   ========================================================= */

/* ---------- Menu mobile ---------- */
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-menu a').forEach(link => link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

/* ---------- Link ativo conforme a seção visível ---------- */
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveLink() {
    let current = '';
    sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 140) current = section.id;
    });
    navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
}
window.addEventListener('scroll', updateActiveLink, { passive: true });
updateActiveLink();

/* ---------- Animação de entrada ao rolar ---------- */
const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ---------- Prévias dos projetos (iframe reduzido) ----------
   Cada iframe tem 1280x800 px e é reduzido com transform: scale()
   para caber no card. Ele só carrega quando o card aparece na tela. */
function scalePreviews() {
    document.querySelectorAll('.preview').forEach(preview => {
        const frame = preview.querySelector('iframe');
        if (frame) frame.style.transform = `scale(${preview.clientWidth / 1280})`;
    });
}

const previewObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const frame = entry.target.querySelector('iframe[data-src]');
        if (frame) {
            frame.setAttribute('scrolling', 'no');
            frame.src = frame.dataset.src;
            frame.removeAttribute('data-src');
        }
        previewObserver.unobserve(entry.target);
    });
}, { rootMargin: '200px' });

document.querySelectorAll('.preview').forEach(p => previewObserver.observe(p));
window.addEventListener('resize', scalePreviews);
scalePreviews();

/* ---------- Dados dos projetos (usados no modal) ---------- */
const projectsData = {
    tcc: {
        title: 'Simulando: plataforma de simulados (TCC)',
        description: 'Projeto de conclusão do curso técnico: plataforma completa para criar e resolver simulados, com correção automática e três perfis de acesso (aluno, professor e administrador).',
        features: [
            'Login com perfis diferentes para aluno, professor e administrador',
            'Simulado cronometrado com correção automática',
            'Professor cadastra questões (com imagem) usando um código de acesso',
            'Gerador de simulados a partir do banco de questões',
            'Exportação de resultados para planilha Excel',
            'Painel administrativo para gerenciar usuários e conteúdo'
        ],
        technologies: ['PHP (PDO)', 'MySQL', 'JavaScript', 'HTML5', 'CSS3', 'Bootstrap 5'],
        challenges: 'Construir uma aplicação full stack com níveis de acesso diferentes, modelar o banco de dados das questões e respostas e gerar relatórios a partir dos resultados.',
        demo: 'https://simulando.byethost15.com/',
        repo: 'https://github.com/RayluanSilva/simulando'
    },
    salao: {
        title: 'Salão da Leila: sistema de agendamento',
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
        demo: 'https://salao-da-leila.vercel.app',
        repo: 'https://github.com/RayluanSilva/salao-da-leila'
    },
    habitos: {
        title: 'Hábitos Saudáveis',
        description: 'Site para acompanhar hábitos saudáveis: o usuário entra, marca os hábitos do dia e acompanha o progresso em um painel com calendário e conquistas. Os dados ficam salvos no próprio navegador.',
        features: [
            'Página inicial, login e painel de hábitos',
            'Cadastro, edição e exclusão de hábitos',
            'Calendário com o histórico de cada dia',
            'Metas e conquistas desbloqueáveis',
            'Dados salvos com localStorage',
            'Layout responsivo'
        ],
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'localStorage'],
        challenges: 'Gerenciar todos os dados só no front-end com localStorage e manter o código organizado em várias telas.',
        demo: 'https://rayluansilva.github.io/habitos-saudaveis/',
        repo: 'https://github.com/RayluanSilva/habitos-saudaveis'
    },
    burger: {
        title: 'Burger on the Grill: site de hamburgueria',
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
        demo: 'https://rayluansilva.github.io/Burguer-On-the-Grill/',
        repo: 'https://github.com/RayluanSilva/Burguer-On-the-Grill'
    },
    energia: {
        title: 'Calculadora de Energia',
        description: 'Calcula o consumo de energia elétrica para clientes residenciais, comerciais e industriais, gera uma fatura detalhada e simula o pagamento com cálculo de troco.',
        features: [
            'Validação de dados em tempo real',
            'Cálculo automático conforme o tipo de cliente',
            'Fatura detalhada',
            'Simulação de pagamento com troco',
            'Interface responsiva'
        ],
        technologies: ['HTML5', 'CSS3', 'JavaScript'],
        challenges: 'Validar os dados em tempo real e manter a experiência fluida entre as etapas do processo.',
        demo: 'sites/CalculoEnergia.html'
    },
    aprova: {
        title: 'Aprova ou Reprova',
        description: 'Calcula a média das notas dos quatro bimestres e informa se o aluno foi aprovado ou reprovado, considerando a nota mínima de 30 pontos.',
        features: [
            'Cálculo automático da média',
            'Validação das notas (0 a 10)',
            'Resultado visual imediato',
            'Animações em CSS',
            'Design responsivo'
        ],
        technologies: ['HTML5', 'CSS3', 'JavaScript'],
        challenges: 'Criar animações em CSS sem prejudicar a responsividade em telas diferentes.',
        demo: 'sites/AprovaouReprova.html'
    },
    saque: {
        title: 'Saque Bancário',
        description: 'Simulador de caixa eletrônico que calcula a menor quantidade de cédulas (R$ 100, 50, 20, 10, 5 e 1) para o valor pedido.',
        features: [
            'Algoritmo que usa sempre a maior cédula possível',
            'Validação do valor digitado',
            'Resultado detalhado por cédula',
            'Opção de voltar e refazer',
            'Design responsivo'
        ],
        technologies: ['HTML5', 'CSS3', 'JavaScript'],
        challenges: 'Escrever um algoritmo guloso simples e correto para distribuir as cédulas.',
        demo: 'sites/SaqueBancario.html'
    },
    combustivel: {
        title: 'Calculadora de Combustível',
        description: 'Calcula o gasto com combustível em uma viagem a partir do preço do litro, do consumo do veículo (km/l) e da distância.',
        features: [
            'Cálculo de litros e custo total',
            'Validação dos dados de entrada',
            'Resultado claro e detalhado',
            'Opção de recalcular',
            'Design responsivo'
        ],
        technologies: ['HTML5', 'CSS3', 'JavaScript'],
        challenges: 'Garantir cálculos corretos com números decimais e uma interface simples de usar.',
        demo: 'sites/CalculadoraCombustível.html'
    }
};

/* ---------- Modal de detalhes ---------- */
const modal = document.getElementById('projectModal');
const modalBody = document.getElementById('modalBody');

function openModal(key) {
    const p = projectsData[key];
    if (!p) return;

    const links = [
        p.demo ? `<a href="${p.demo}" target="_blank" rel="noopener" class="btn btn-primary btn-sm"><i class="bi bi-box-arrow-up-right"></i> Ver site</a>` : '',
        p.repo ? `<a href="${p.repo}" target="_blank" rel="noopener" class="btn btn-secondary btn-sm"><i class="bi bi-github"></i> Código</a>` : ''
    ].join('');

    modalBody.innerHTML = `
        <h2>${p.title}</h2>
        <p class="modal-desc">${p.description}</p>
        <h3 class="modal-heading">Funcionalidades</h3>
        <ul class="feature-bullets">${p.features.map(f => `<li><i class="bi bi-check2"></i> ${f}</li>`).join('')}</ul>
        <h3 class="modal-heading">Tecnologias</h3>
        <div class="project-tech">${p.technologies.map(t => `<span class="tech-tag">${t}</span>`).join('')}</div>
        <h3 class="modal-heading">Desafio</h3>
        <p class="modal-desc">${p.challenges}</p>
        <div class="project-buttons">${links}</div>
    `;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = '';
}

document.querySelectorAll('[data-modal]').forEach(btn => {
    btn.addEventListener('click', () => openModal(btn.dataset.modal));
});
document.querySelector('.close').addEventListener('click', closeModal);
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

/* ---------- Formulário de contato ----------
   O site é estático (GitHub Pages), então o formulário abre o
   programa de e-mail da pessoa com a mensagem já preenchida. */
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
        showNotification('Preencha todos os campos.', 'error');
        return;
    }

    const subject = encodeURIComponent(`Contato pelo portfólio: ${name}`);
    const body = encodeURIComponent(`Nome: ${name}\nE-mail: ${email}\n\n${message}`);
    window.location.href = `mailto:slvrayluan08@gmail.com?subject=${subject}&body=${body}`;

    showNotification('Abrindo seu programa de e-mail…', 'success');
    contactForm.reset();
});

function showNotification(text, type = 'success') {
    const old = document.querySelector('.notification');
    if (old) old.remove();

    const n = document.createElement('div');
    n.className = `notification ${type}`;
    n.innerHTML = `<i class="bi ${type === 'success' ? 'bi-check-circle-fill' : 'bi-exclamation-circle-fill'}"></i><span>${text}</span>`;
    document.body.appendChild(n);
    requestAnimationFrame(() => n.classList.add('show'));
    setTimeout(() => {
        n.classList.remove('show');
        setTimeout(() => n.remove(), 300);
    }, 3500);
}

/* ---------- Ano atual no rodapé ---------- */
document.getElementById('year').textContent = new Date().getFullYear();
