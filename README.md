## ⚙️ Tecnologías Utilizadas

### 📑 Frontend
* **HTML5** Estructura base
* **CSS3** Estilos y diseño responsivo
* **Javascript** Menú dinámico, animaciones de texto, lightbox y validación/envío del formulario de contacto

### 📑 Backend
* **Java 17** Lenguaje principal
* **Spring Boot 3.x** Framework para construir y exponer la API del contacto
* **Resend.com** Servicio de envío de correos electrónicos
* **Spring Web Client** Comunicación con API de Resend
* **Spring Context (MessageSource)** Gestión de mensajes internacionalizados
* **SLF4J + Logback** Manejo centralizado de logs

---

## 🗂️ Estructura General del Proyecto

### 📑 Backend

| Paquete        | Contenido | Descripción |
| -------------- | --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| **config**     | `WebConfig`                 | Configuración central. Define reglas de **CORS** para permitir la comunicación segura entre el frontend y el backend.                 |
| **controller** | `ContactController`         | Controlador REST que gestiona el **formulario de contacto**. Procesa los datos recibidos y delega el envío al servicio de email. |
| **dto**        | `ContactFormDTO`            | Objeto de transferencia de datos que representa los campos del formulario de contacto (nombre, email, teléfono, asunto, mensaje). |
| **service**    | `ResendEmailService`        | Servicio encargado del envío de correos electrónicos mediante la API de *Resend.com*. |
| **util**       | `ContactFormSanitizer`      | Utilidad encargada de **sanitizar y limpiar** la entrada del usuario antes de procesarla. |

### 📑 Frontend

| Paquete/Carpeta     | Contenido                | Descripción                                                                                                                                                                                           |
| --------------------- | ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **assets**            | imágenes <br> `lottie/`                     | Contiene los recursos gráficos utilizados en el portfolio (certificados, íconos, etc). La subcarpeta `lottie/` contiene una animación en formato .json utilizada en el sitio.                                                                                                       |
| **css**               | `styles.css` <br> `contact-form.css` <br> `about-me.css` | `styles.css`: estilos generales y diseño responsive del portfolio. <br> `contact-form.css`: estilos específicos y responsive del formulario de contacto. <br> `about-me.css`: estilos del modal de la sección "Sobre mí".                           |
| **js**                | `ui-core.js` <br> `contact-form.js` <br> `about-me.js`   | `ui-core.js`: lógica para el menú, animaciones de texto, lightbox de certificados, etc. <br> `contact-form.js`: lógica del formulario de contacto, validaciones de campos y envío de datos al backend. <br> `about-me.js`: crea y da funcionalidad al modal de la sección "Sobre mí". |
| *(raíz del proyecto)* | `index.html`                         | Página principal del portfolio. Define la estructura general del sitio e integra los estilos y scripts.                                                                                               |
---

## 📬 Funcionamiento del Envío de Correos

El sistema de contacto está compuesto por dos partes: la lógica del frontend (JavaScript) y el backend (Spring Boot).

### ▶️ Frontend (*contact-form.js*)
Se implementa una clase `ContactForm` que gestiona el formulario:

- Validaciones en el cliente:
    * Email válido (regex).
    * Teléfono válido (regex).
    * Si alguna validación falla, se muestra un error debajo del campo correspondiente.

- Envío al backend con fetch:
    * Con timeout configurable.
    * Usa un *switch automático* para elegir entre **API local** o **API en producción**.

- Modales personalizados:
    * ✅ **SuccessModal**: confirma que el mensaje se envió correctamente.
    * ❌ **ErrorModal**: muestra el motivo del error (HTTP code, servidor caído, timeout, etc..).
    * Ambos tienen estilos diferenciados, animaciones, cierre automático y son fáciles de extender.    

- Extensibilidad:
    * Código modular y reutilizable en otros proyectos que requieran formularios de contacto.
    * Fácil de agregar más validaciones, campos o estilos.    


### ▶️ Backend (*ContactController.java* y *ResendEmailService.java*)
Expone el endpoint `/api/contact` que recibe el formulario.

Flujo de trabajo:
- **Sanitización de datos** (via `ContactFormSanitizer`):
    * Limpia entradas (espacios, caracteres inválidos, saltos de línea, etc..).
- **Envío de correo** usando *ResendEmailService*:
    * Se comunica con la API de Resend.com mediante REST.
    * Construye el email. 
    * Permite reply-to para responder directamente al remitente.
- **Manejo de errores:**
    * Captura excepciones genéricas del servicio de email.
    * Mensajes obtenidos dinámicamente de `messages.properties`.


### 💡 Decisiones de diseño
- **Principio YAGNI** aplicado:
No se duplicaron validaciones en el backend, ya que el único origen de datos es el propio formulario del frontend (no se prevé recibir requests de clientes externos como Postman).
- **Responsabilidades claras**:
    * El frontend valida, informa al usuario y gestiona la experiencia.
    * El backend recibe datos saneados y los procesa.
- **Reutilización**:
La lógica de los modales y el form puede migrarse sin cambios mayores a otro proyecto.    

---

## 🚀 Deployment

### Frontend (Netlify)
- **URL:** https://facundodev.netlify.app
- **Configuración:** Deploy automático desde GitHub
- **Características:** SSL gratuito, CDN global

### Backend (Render)
- **URL:** https://portfolio-backend-ao2t.onrender.com
- **Plan:** Free tier
- **Timeout configurado:** 60 segundos 

### Servicio de Email (Resend.com)
- **Plan:** Free tier (100 emails/mes)
- **Características:** Alta tasa de entrega, API simple