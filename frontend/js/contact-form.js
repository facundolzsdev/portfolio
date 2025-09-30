class ContactForm {
    constructor(formId, config = {}) {
        this.form = document.getElementById(formId);
        this.emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        this.phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./]?[0-9]{3,}[-\s./0-9]*$/;
        this.submitBtn = null;
        this.originalBtnText = '';

        this.config = {
            productionUrl: 'https://portfolio-backend-ao2t.onrender.com/api/contact',
            localUrl: 'http://localhost:8080/api/contact',
            timeout: 10000,
            ...config
        };

        if (this.form) {
            this.init();
        }
    }

    init() {
        this.submitBtn = this.form.querySelector('input[type="submit"]');
        this.originalBtnText = this.submitBtn ? this.submitBtn.value : '';

        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        console.log('ContactForm initialized');
    }

    async handleSubmit(event) {
        event.preventDefault();
        this.clearErrors();

        if (!this.validateForm()) {
            return;
        }

        await this.sendForm();
    }

    validateForm() {
        let isValid = true;

        const email = this.getFieldValue('email');
        if (email && !this.emailRegex.test(email)) {
            this.showFieldError('email', 'Ingresa un email válido (ej: usuario@dominio.com)');
            isValid = false;
        }

        const phone = this.getFieldValue('phone');
        if (phone && !this.validatePhone(phone)) {
            this.showFieldError('phone', 'Ingresa un número telefónico válido (ej: +54 11 1234-5678)');
            isValid = false;
        }

        return isValid;
    }

    validatePhone(phone) {
        const cleanPhone = phone.replace(/\s/g, '');

        const digitCount = cleanPhone.replace(/[^0-9]/g, '').length;
        if (digitCount < 7 || digitCount > 15) {
            return false;
        }

        return this.phoneRegex.test(phone);
    }

    async sendForm() {
        this.setLoadingState(true);

        const formData = this.getFormData();

        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

            const response = await fetch(this.getApiUrl(), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
                signal: controller.signal
            });

            clearTimeout(timeoutId);
            await this.handleResponse(response);

        } catch (error) {
            console.error('Error sending form:', error);

            let errorMessage;
            if (error.name === 'AbortError') {
                errorMessage = 'El servidor tardó demasiado en responder. Intenta nuevamente.';
            } else if (error instanceof TypeError || error.message.includes('fetch')) {
                errorMessage = 'No se pudo conectar con el servidor. Verifica tu conexión a internet.';
            } else {
                errorMessage = 'Error inesperado. Por favor, intenta nuevamente.';
            }
            NotificationManager.showError(errorMessage);
        } finally {
            this.setLoadingState(false);
        }
    }

    async handleResponse(response) {
        if (response.ok) {
            const result = await response.text();
            NotificationManager.showSuccess(result);
            this.resetForm();
        } else {
            let errorMessage;

            try {
                const errorText = await response.text();
                errorMessage = errorText || this.getHttpErrorMessage(response.status);
            } catch (e) {
                errorMessage = this.getHttpErrorMessage(response.status);
            }

            NotificationManager.showError(errorMessage);
        }
    }

    /**
     * Gets a specific error message based on the HTTP code.
     */
    getHttpErrorMessage(status) {
        switch (status) {
            case 400:
                return 'Los datos enviados no son válidos. Revisa el formulario.';
            case 401:
                return 'No tienes autorización para realizar esta acción.';
            case 403:
                return 'Acceso denegado al servidor.';
            case 404:
                return 'El servicio de contacto no está disponible.';
            case 429:
                return 'Demasiados intentos. Espera unos minutos antes de reintentar.';
            case 500:
                return 'Error interno del servidor. Intenta nuevamente.';
            case 502:
            case 503:
            case 504:
                return 'El servidor no está disponible temporalmente. Intenta más tarde.';
            default:
                return `Error del servidor (${status}). Intenta nuevamente.`;
        }
    }

    getFormData() {
        return {
            fullName: this.getFieldValue('fullName'),
            email: this.getFieldValue('email'),
            phone: this.getFieldValue('phone'),
            subject: this.getFieldValue('subject'),
            message: this.getFieldValue('message')
        };
    }

    getFieldValue(fieldName) {
        const field = this.form.querySelector(`[name="${fieldName}"]`);
        return field ? field.value.trim() : '';
    }

    setLoadingState(isLoading) {
        if (!this.submitBtn) return;

        if (isLoading) {
            this.submitBtn.disabled = true;
            this.submitBtn.value = 'Enviando...';
            this.submitBtn.style.opacity = '0.7';
            this.submitBtn.style.cursor = 'not-allowed';
            this.submitBtn.classList.add('loading');
        } else {
            this.submitBtn.disabled = false;
            this.submitBtn.value = this.originalBtnText;
            this.submitBtn.style.opacity = '1';
            this.submitBtn.style.cursor = 'pointer';
            this.submitBtn.classList.remove('loading');
        }
    }

    showFieldError(fieldName, message) {
        const field = this.form.querySelector(`[name="${fieldName}"]`);
        if (!field) return;

        field.classList.add('form-field-error');

        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;

        const inputBox = field.closest('.input-box') || field.parentNode;
        inputBox.appendChild(errorDiv);

        field.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    clearErrors() {
        const errorElements = this.form.querySelectorAll('.field-error');
        errorElements.forEach(el => el.remove());

        const fields = this.form.querySelectorAll('input, textarea');
        fields.forEach(field => {
            field.classList.remove('form-field-error');
            field.style.borderColor = '';
            field.style.backgroundColor = '';
        });
    }

    resetForm() {
        this.form.reset();
        this.clearErrors();
    }

    /**
     * Automatic switch between local development mode and production mode
     */
    getApiUrl() {
        const isLocal = window.location.hostname === 'localhost' ||
            window.location.hostname === '127.0.0.1';

        return isLocal
            ? 'http://localhost:8080/api/contact'
            : 'https://PENDIENTE-ACTUALIZAR.onrender.com/api/contact'; // TODO: Replace with actual Render URL
    }
}

class NotificationManager {
    static showSuccess(message) {
        const modal = new SuccessModal(message);
        modal.show();
    }

    static showError(message) {
        const modal = new ErrorModal(message);
        modal.show();
    }
}

class SuccessModal {
    constructor(message) {
        this.message = message;
        this.overlay = null;
        this.modal = null;
    }

    show() {
        this.create();
        this.addEventListeners();
        this.animate();
        this.autoClose();
    }

    create() {
        this.overlay = document.createElement('div');
        this.overlay.className = 'success-modal-overlay';

        this.modal = document.createElement('div');
        this.modal.className = 'success-modal';
        this.modal.innerHTML = this.getModalContent();

        this.overlay.appendChild(this.modal);
        document.body.appendChild(this.overlay);
    }

    getModalContent() {
        return `
        <div>
            <div class="success-icon">✓</div>
            <h3 class="success-title">¡Mensaje Enviado!</h3>
            <p class="success-message">${this.message}</p>
            <button class="success-button" data-action="close">
                Cerrar
            </button>
        </div>
    `;
    }

    addEventListeners() {
        const closeBtn = this.modal.querySelector('[data-action="close"]');
        closeBtn.addEventListener('click', () => this.close());

        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) {
                this.close();
            }
        });

        this.escapeHandler = (e) => {
            if (e.key === 'Escape') {
                this.close();
            }
        };
        document.addEventListener('keydown', this.escapeHandler);
    }

    animate() {
        requestAnimationFrame(() => {
            this.overlay.classList.add('show');
        });
    }

    autoClose() {
        this.autoCloseTimeout = setTimeout(() => {
            this.close();
        }, 6000);
    }

    close() {
        if (this.autoCloseTimeout) {
            clearTimeout(this.autoCloseTimeout);
        }
        document.removeEventListener('keydown', this.escapeHandler);
        this.overlay.classList.remove('show');
        setTimeout(() => {
            if (this.overlay && this.overlay.parentNode) {
                this.overlay.parentNode.removeChild(this.overlay);
            }
        }, 300);
    }
}

class ErrorModal {
    constructor(message) {
        this.message = message;
        this.overlay = null;
        this.modal = null;
    }

    show() {
        this.create();
        this.addEventListeners();
        this.animate();
        this.autoClose();
    }

    create() {
        this.overlay = document.createElement('div');
        this.overlay.className = 'error-modal-overlay';

        this.modal = document.createElement('div');
        this.modal.className = 'error-modal';
        this.modal.innerHTML = this.getModalContent();

        this.overlay.appendChild(this.modal);
        document.body.appendChild(this.overlay);
    }

    getModalContent() {
        return `
        <div>
            <div class="error-icon">✖</div>
            <h3 class="error-title">¡Error al enviar!</h3>
            <p class="error-message">${this.message}</p>
            <button class="error-button" data-action="close">
                Cerrar
            </button>
        </div>
    `;
    }

    addEventListeners() {
        const closeBtn = this.modal.querySelector('[data-action="close"]');
        closeBtn.addEventListener('click', () => this.close());

        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) {
                this.close();
            }
        });

        this.escapeHandler = (e) => {
            if (e.key === 'Escape') {
                this.close();
            }
        };
        document.addEventListener('keydown', this.escapeHandler);
    }

    animate() {
        requestAnimationFrame(() => {
            this.overlay.classList.add('show');
        });
    }

    autoClose() {
        this.autoCloseTimeout = setTimeout(() => {
            this.close();
        }, 9000);
    }

    close() {
        if (this.autoCloseTimeout) {
            clearTimeout(this.autoCloseTimeout);
        }
        document.removeEventListener('keydown', this.escapeHandler);
        this.overlay.classList.remove('show');
        setTimeout(() => {
            if (this.overlay && this.overlay.parentNode) {
                this.overlay.parentNode.removeChild(this.overlay);
            }
        }, 300);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    new ContactForm('contactForm');
});
