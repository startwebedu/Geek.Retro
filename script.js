// Script para rolagem suave e funcionalidades básicas

document.addEventListener('DOMContentLoaded', function() {
    
    // Função para rolagem suave ao clicar nos links de navegação
    function initSmoothScroll() {
        const navLinks = document.querySelectorAll('[data-scroll]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('data-scroll');
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    // Calcular a posição considerando a altura da navegação fixa
                    const navHeight = document.querySelector('.main-nav').offsetHeight;
                    const targetPosition = targetSection.offsetTop - navHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // Função para destacar o link ativo na navegação
    function initActiveNavigation() {
        const navLinks = document.querySelectorAll('.main-nav a');
        const sections = document.querySelectorAll('section');
        
        window.addEventListener('scroll', function() {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (window.pageYOffset >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('data-scroll') === current) {
                    link.classList.add('active');
                }
            });
        });
    }
    
    // Função para efeitos de hover nos cards
    function initCardEffects() {
        const cards = document.querySelectorAll('.guest-card, .day-card, .info-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
    }
    
    // Inicializar todas as funções
    initSmoothScroll();
    initActiveNavigation();
    initCardEffects();
    
    // Log para confirmar que o script foi carregado
    console.log('Geek Day - Site carregado com sucesso!');
});

document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("imgFull");
    const closeBtn = document.querySelector(".close-modal");
    const images = document.querySelectorAll('.expandable-img');

    // Ao clicar na imagem da grade
    images.forEach(img => {
        img.onclick = function() {
            modal.style.display = "block";
            modalImg.src = this.src;
            document.body.style.overflow = "hidden"; // Trava o scroll do fundo
        }
    });

    // Fechar ao clicar no X ou fora da imagem
    function closeModal() {
        modal.style.display = "none";
        document.body.style.overflow = "auto"; // Libera o scroll
    }

    closeBtn.onclick = closeModal;
    modal.onclick = function(e) {
        if(e.target !== modalImg) closeModal();
    }
});
const menuBtn = document.getElementById('menuBtn');
const mainNav = document.getElementById('mainNav');
const navLinks = document.querySelectorAll('.nav-list a');

// Abre/Fecha menu ao clicar nas barrinhas
menuBtn.addEventListener('click', () => {
    mainNav.classList.toggle('active');
    // Animação simples das barrinhas (opcional)
    menuBtn.classList.toggle('open');
});

// Fecha o menu ao clicar em qualquer link (para navegar até a seção)
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        mainNav.classList.remove('active');
    });
});

// ==========================================================================
// CONFIGURAÇÃO DO TÚNEL DE METEOROS ESTILO HIPERESPAÇO (CORRIGIDO)
// ==========================================================================
document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('chuva-meteoros');
    if (!container) return;

    // -----------------------------------------------------------------
    // CONTROLES DE CONFIGURAÇÃO (Altere os valores abaixo como quiser)
    // -----------------------------------------------------------------
    const maxMeteoros = 35;          // QUANTIDADE: Mais alto = mais cheio / Mais baixo = mais limpo
    const aceleracaoMeteoro = 0.0001;  // VELOCIDADE: Aceleração progressiva (ex: 0.08 mais lento, 0.20 mais rápido)
    
    // Cores pedidas: Azul, Rosa, Laranja (originais do site) + Vermelho
    const coresNeon = ['#e7f522', '#ff007f', '#2e0ad1', '#ff0000']; 
    // -----------------------------------------------------------------

    // Cria o elemento Canvas dinamicamente para maior performance
    const canvas = document.createElement('canvas');
    container.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    let largura = (canvas.width = window.innerWidth);
    let altura = (canvas.height = window.innerHeight);

    // Ponto central da explosão (levemente acima do meio, simulando o horizonte)
    let centroX = largura / 2;
    let centroY = altura * 0.45;

    const meteoros = [];

    // Redimensiona o canvas dinamicamente se a janela mudar de tamanho
    window.addEventListener('resize', function() {
        largura = (canvas.width = window.innerWidth);
        altura = (canvas.height = window.innerHeight);
        centroX = largura / 2;
        centroY = altura * 0.45;
    });

    class MeteoroHiperespaco {
        constructor() {
            this.reset();
        }

        reset() {
            // Nascem bem concentrados próximos ao centro
            this.x = centroX + (Math.random() - 0.5) * 100;
            this.y = centroY + (Math.random() - 0.5) * 100;
            
            // Calcula o ângulo em 360 graus a partir do centro
            this.angulo = Math.atan2(this.y - centroY, this.x - centroX);
            
            // Velocidade inicial aleatória
            this.velocidade = Math.random() * 1 + 0.5;
            this.distancia = 0;
            
            // Tamanho final e cor sorteada do array
            this.tamanhoMaximo = Math.random() * 2.5 + 2;
            this.cor = coresNeon[Math.floor(Math.random() * coresNeon.length)];
        }

        update() {
            // Aplica a aceleração configurada no topo do script
            this.velocidade += aceleracaoMeteoro; 
            this.distancia += this.velocidade;

            // Move a partícula radialmente para fora do centro
            this.x += Math.cos(this.angulo) * this.velocidade;
            this.y += Math.sin(this.angulo) * this.velocidade;

            // Se cruzar os limites da tela, reseta de volta ao centro
            if (this.x < 0 || this.x > largura || this.y < 0 || this.y > altura) {
                this.reset();
            }
        }

        draw() {
            // Força um comprimento mínimo para a cauda (evita bugs de renderização próximos ao centro)
            const comprimentoCauda = Math.max(35, this.velocidade * 2.5);
            const caudaX = this.x - Math.cos(this.angulo) * comprimentoCauda;
            const caudaY = this.y - Math.sin(this.angulo) * comprimentoCauda;

            // Cria o gradiente linear da cauda (Início transparente -> Fim na cor Neon)
            const gradiente = ctx.createLinearGradient(caudaX, caudaY, this.x, this.y);
            gradiente.addColorStop(0, 'transparent');
            gradiente.addColorStop(0.5, this.cor);
            gradiente.addColorStop(1, '#ffffff'); // Cabeça brilhante do meteoro

            // Ativa o efeito Glow de Neon nativo do Canvas
            ctx.shadowBlur = 8;
            ctx.shadowColor = this.cor;

            // Desenha o traço do meteoro
            ctx.beginPath();
            ctx.moveTo(caudaX, caudaY);
            ctx.lineTo(this.x, this.y);
            
            // Aumenta a espessura à medida que se aproxima das bordas (perspectiva)
            ctx.lineWidth = Math.min(this.tamanhoMaximo, Math.max(1.5, this.distancia / 80));
            ctx.strokeStyle = gradiente;
            ctx.lineCap = 'round';
            ctx.stroke();

            // Desenha a bolinha brilhante na ponta do meteoro
            ctx.beginPath();
            ctx.arc(this.x, this.y, ctx.lineWidth / 1.2, 0, Math.PI * 2);
            ctx.fillStyle = '#ffffff';
            ctx.shadowBlur = 12; // Brilho extra na ponta
            ctx.fill();

            // Reseta as sombras para não afetar as próximas renderizações e manter a performance estável
            ctx.shadowBlur = 0;
        }
    }

    // Inicialização da lista com espaçamento para os meteoros não nascerem todos grudados
    for (let i = 0; i < maxMeteoros; i++) {
        const m = new MeteoroHiperespaco();
        m.distancia = Math.random() * largura;
        m.x = centroX + Math.cos(m.angulo) * m.distancia * 0.6;
        m.y = centroY + Math.sin(m.angulo) * m.distancia * 0.6;
        meteoros.push(m);
    }

    // Loop de renderização contínuo
    function animar() {
        ctx.clearRect(0, 0, largura, altura); // Mantém o fundo transparente do site visível[cite: 3]

        meteoros.forEach(meteoro => {
            meteoro.update();
            meteoro.draw();
        });

        requestAnimationFrame(animar);
    }

    animar();
});