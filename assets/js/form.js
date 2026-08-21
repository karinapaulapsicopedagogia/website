// ========================================================
// FORM.JS - Validação do Formulário de Contato
// ========================================================

(function() {
    'use strict';

    const form = document.getElementById('contactForm');
    if (!form) return;

    // --- MÁSCARA PARA TELEFONE ---
    const phoneInput = document.getElementById('telefone');
    if (phoneInput) {
        phoneInput.addEventListener('input', (e) => {
            // Remove tudo que não é número
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 11) value = value.slice(0, 11);
            
            // Aplica a máscara: (99) 99999-9999 ou (99) 9999-9999
            if (value.length > 0) {
                value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
                if (value.length > 10) {
                    value = value.replace(/(\d{5})(\d{4})/, '$1-$2');
                } else if (value.length > 6) {
                    value = value.replace(/(\d{4})(\d{4})/, '$1-$2');
                }
            }
            e.target.value = value;
        });
    }

    // --- VALIDAÇÃO EM TEMPO REAL ---
    const fields = form.querySelectorAll('input, textarea');
    fields.forEach(field => {
        // Valida ao perder o foco (quando sai do campo)
        field.addEventListener('blur', () => {
            validateField(field);
        });

        // Limpa o erro enquanto o usuário digita
        field.addEventListener('input', () => {
            const group = field.closest('.form-group');
            if (group && field.value.trim()) {
                group.classList.remove('error');
                const errorMessage = group.querySelector('.error-message');
                if (errorMessage) {
                    errorMessage.style.display = 'none';
                }
            }
        });
    });

    // --- FUNÇÃO DE VALIDAÇÃO ---
    function validateField(field) {
        const group = field.closest('.form-group');
        if (!group) return;

        let isValid = true;
        let errorText = '';

        // Remove erro anterior
        group.classList.remove('error');
        const errorMessage = group.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.style.display = 'none';
        }

        // 1. Campo obrigatório
        if (field.hasAttribute('required') && !field.value.trim()) {
            isValid = false;
            errorText = 'Este campo é obrigatório';
        }

        // 2. Validação de e-mail
        if (field.type === 'email' && field.value.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value.trim())) {
                isValid = false;
                errorText = 'Por favor, insira um e-mail válido';
            }
        }

        // 3. Validação de telefone
        if (field.id === 'telefone' && field.value.trim()) {
            const phoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
            if (!phoneRegex.test(field.value.trim())) {
                isValid = false;
                errorText = 'Formato: (99) 99999-9999';
            }
        }

        // Aplica erro se inválido
        if (!isValid) {
            group.classList.add('error');
            if (errorMessage) {
                errorMessage.textContent = errorText;
                errorMessage.style.display = 'block';
            }
        }

        return isValid;
    }

    // --- ENVIO DO FORMULÁRIO ---
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;

        // Valida todos os campos
        fields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });

        if (isValid) {
            // Simula envio (mostra loading)
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;

            // Após 2 segundos, mostra mensagem de sucesso
            setTimeout(() => {
                form.innerHTML = `
                    <div class="form-success">
                        <div class="success-icon">✓</div>
                        <h3>Mensagem enviada!</h3>
                        <p>Obrigado pelo contato. Responderei em breve.</p>
                        <button type="button" class="btn btn-primary btn-form" onclick="location.reload()">
                            Enviar nova mensagem
                        </button>
                    </div>
                `;

                // Log dos dados (apenas para demonstração)
                const formData = new FormData(form);
                console.log('Dados enviados:', Object.fromEntries(formData));
            }, 2000);
        } else {
            // Foca no primeiro campo com erro
            const firstError = form.querySelector('.form-group.error input, .form-group.error textarea');
            if (firstError) {
                firstError.focus();
            }
        }
    });

    // --- ESTILOS PARA MENSAGEM DE SUCESSO ---
    const style = document.createElement('style');
    style.textContent = `
        .form-success {
            text-align: center;
            padding: var(--spacing-xl) var(--spacing-lg);
        }
        .success-icon {
            width: 64px;
            height: 64px;
            background: var(--color-success);
            color: var(--color-white);
            border-radius: var(--radius-full);
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-size: 2rem;
            margin-bottom: var(--spacing-md);
        }
        .form-success h3 {
            font-family: var(--font-primary);
            font-size: var(--font-size-2xl);
            margin-bottom: var(--spacing-sm);
        }
        .form-success p {
            opacity: 0.8;
            margin-bottom: var(--spacing-lg);
        }
    `;
    document.head.appendChild(style);
})();