// ========================================
// VALIDAÇÃO DO FORMULÁRIO DE CONTATO
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form-contato');
    
    if (!form) {
        // console.log('Formulário de contato não encontrado nesta página');
        return;
    }
    
    // ===== CAMPOS DO FORMULÁRIO =====
    const nome = document.getElementById('nome');
    const email = document.getElementById('email');
    const telefone = document.getElementById('telefone');
    const assunto = document.getElementById('assunto');
    const mensagem = document.getElementById('mensagem');
    
    // ===== MÁSCARA DE TELEFONE =====
    if (telefone) {
        telefone.addEventListener('input', function() {
            let value = this.value.replace(/\D/g, '');
            
            if (value.length > 0) {
                // Formato: (00) 00000-0000
                if (value.length <= 2) {
                    this.value = value;
                } else if (value.length <= 6) {
                    this.value = '(' + value.substring(0, 2) + ') ' + value.substring(2);
                } else if (value.length <= 10) {
                    this.value = '(' + value.substring(0, 2) + ') ' + value.substring(2, 6) + '-' + value.substring(6);
                } else {
                    this.value = '(' + value.substring(0, 2) + ') ' + value.substring(2, 7) + '-' + value.substring(7, 11);
                }
            }
        });
    }
    
    // ===== VALIDAÇÃO EM TEMPO REAL =====
    // Nome
    if (nome) {
        nome.addEventListener('blur', function() {
            validarCampo(this, this.value.trim().length >= 3, 'Nome deve ter pelo menos 3 caracteres');
        });
    }
    
    // E-mail
    if (email) {
        email.addEventListener('blur', function() {
            validarCampo(this, validarEmail(this.value.trim()), 'E-mail inválido');
        });
    }
    
    // Assunto
    if (assunto) {
        assunto.addEventListener('change', function() {
            validarCampo(this, this.value !== '', 'Selecione um assunto');
        });
    }
    
    // Mensagem
    if (mensagem) {
        mensagem.addEventListener('blur', function() {
            validarCampo(this, this.value.trim().length >= 10, 'Mensagem deve ter pelo menos 10 caracteres');
        });
    }
    
    // ===== FUNÇÃO PARA VALIDAR CAMPO =====
    function validarCampo(campo, condicao, mensagemErro) {
        const feedback = campo.parentElement.querySelector('.feedback-error');
        
        if (!condicao) {
            campo.style.borderColor = 'var(--vermelho)';
            if (feedback) {
                feedback.textContent = mensagemErro;
                feedback.style.display = 'block';
            }
            return false;
        } else {
            campo.style.borderColor = 'var(--verde-escuro)';
            if (feedback) {
                feedback.style.display = 'none';
            }
            return true;
        }
    }
    
    // ===== FUNÇÃO PARA VALIDAR E-MAIL =====
    function validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    
    // ===== SUBMISSÃO DO FORMULÁRIO =====
    form.addEventListener('submit', function(e) {
        // Previne o envio padrão
        e.preventDefault();
        
        // ===== VALIDAR TODOS OS CAMPOS =====
        const isNomeValido = nome && nome.value.trim().length >= 3;
        const isEmailValido = email && validarEmail(email.value.trim());
        const isAssuntoValido = assunto && assunto.value !== '';
        const isMensagemValida = mensagem && mensagem.value.trim().length >= 10;
        
        // ===== EXIBIR ERROS =====
        let erros = [];
        
        if (!isNomeValido) {
            erros.push('Preencha seu nome completo');
            if (nome) {
                nome.style.borderColor = 'var(--vermelho)';
                const feedback = nome.parentElement.querySelector('.feedback-error');
                if (feedback) {
                    feedback.textContent = 'Nome deve ter pelo menos 3 caracteres';
                    feedback.style.display = 'block';
                }
            }
        }
        
        if (!isEmailValido) {
            erros.push('Preencha um e-mail válido');
            if (email) {
                email.style.borderColor = 'var(--vermelho)';
                const feedback = email.parentElement.querySelector('.feedback-error');
                if (feedback) {
                    feedback.textContent = 'E-mail inválido';
                    feedback.style.display = 'block';
                }
            }
        }
        
        if (!isAssuntoValido) {
            erros.push('Selecione um assunto');
            if (assunto) {
                assunto.style.borderColor = 'var(--vermelho)';
                const feedback = assunto.parentElement.querySelector('.feedback-error');
                if (feedback) {
                    feedback.textContent = 'Selecione um assunto';
                    feedback.style.display = 'block';
                }
            }
        }
        
        if (!isMensagemValida) {
            erros.push('Escreva uma mensagem com pelo menos 10 caracteres');
            if (mensagem) {
                mensagem.style.borderColor = 'var(--vermelho)';
                const feedback = mensagem.parentElement.querySelector('.feedback-error');
                if (feedback) {
                    feedback.textContent = 'Mensagem deve ter pelo menos 10 caracteres';
                    feedback.style.display = 'block';
                }
            }
        }
        
        // ===== SE HOUVER ERROS, INTERROMPE =====
        if (erros.length > 0) {
            // Scroll para o primeiro erro
            const primeiroErro = document.querySelector('.form-group input:invalid, .form-group select:invalid, .form-group textarea:invalid');
            if (primeiroErro) {
                primeiroErro.focus();
            }
            return;
        }
        
        // ===== TUDO VÁLIDO - ENVIA =====
        const btnSubmit = form.querySelector('button[type="submit"]');
        const textoOriginal = btnSubmit.innerHTML;
        
        // Desabilitar botão e mostrar loading
        btnSubmit.disabled = true;
        btnSubmit.innerHTML = '⏳ Enviando...';
        btnSubmit.style.opacity = '0.7';
        
        // Enviar o formulário
        form.submit();
        
        // Mostrar mensagem de sucesso
        setTimeout(function() {
            alert('✅ Mensagem enviada com sucesso!\n\nEntrarei em contato em breve.\n\n💚 Karina Paula');
            form.reset();
            btnSubmit.disabled = false;
            btnSubmit.innerHTML = textoOriginal;
            btnSubmit.style.opacity = '1';
        }, 1500);
    });
    
    // ===== ADICIONAR FEEDBACK DE ERRO DINAMICAMENTE =====
    document.querySelectorAll('.form-group input, .form-group select, .form-group textarea').forEach(campo => {
        const parent = campo.parentElement;
        if (!parent.querySelector('.feedback-error')) {
            const feedback = document.createElement('span');
            feedback.className = 'feedback-error';
            feedback.style.display = 'none';
            feedback.style.color = 'var(--vermelho)';
            feedback.style.fontSize = '0.8rem';
            feedback.style.marginTop = '5px';
            feedback.style.display = 'none';
            parent.appendChild(feedback);
        }
    });
});