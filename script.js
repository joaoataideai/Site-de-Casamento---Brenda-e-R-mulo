// Scroll suave para links de âncora
document.querySelectorAll('a.nav-link[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const alvo = document.querySelector(this.getAttribute('href'));
        if (!alvo) return;
        const offset = document.querySelector('.navbar').offsetHeight + 8;
        const top = alvo.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
    });
});

// Marcar link ativo conforme scroll
window.addEventListener('scroll', function () {
    const pos = window.scrollY + document.querySelector('.navbar').offsetHeight + 20;
    document.querySelectorAll('section[id]').forEach(sec => {
        const top = sec.offsetTop;
        const height = sec.offsetHeight;
        const id = sec.getAttribute('id');
        if (pos >= top && pos < top + height) {
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            const active = document.querySelector('.nav-link[href="#' + id + '"]');
            if (active) active.classList.add('active');
        }
    });
});

// LGPD - Cookie simples
function setCookie(nome, valor, dias) {
    const d = new Date();
    d.setTime(d.getTime() + (dias * 24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = nome + "=" + valor + ";" + expires + ";path=/";
}

function getCookie(nome) {
    const name = nome + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
    }
    return "";
}

(function initLGPD() {
    if (!getCookie('lgpdAceito')) {
        const lgpdBar = document.getElementById('lgpdBar');
        if (lgpdBar) lgpdBar.style.display = 'flex';
    }
    const lgpdAccept = document.getElementById('lgpdAccept');
    if (lgpdAccept) {
        lgpdAccept.addEventListener('click', function () {
            setCookie('lgpdAceito', 'sim', 365);
            const lgpdBar = document.getElementById('lgpdBar');
            if (lgpdBar) lgpdBar.style.display = 'none';
        });
    }
})();

// Tentar ativar som após primeira interação do usuário
document.addEventListener('click', function () {
    const audio = document.getElementById('player');
    if (!audio) return;
    audio.muted = false;
    const playPromise = audio.play();
    if (playPromise !== undefined) {
        playPromise.catch(function (error) {
            console.warn('Não foi possível reproduzir o áudio automaticamente:', error);
        });
    }
}, { once: true });
