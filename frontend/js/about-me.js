document.addEventListener('DOMContentLoaded', function () {
    const logo = document.querySelector('.logo');

    if (logo) {
        logo.addEventListener('click', function () {
            showPersonalStoryModal();
        });
    }
});

function showPersonalStoryModal() {
    const modal = document.createElement('div');
    modal.className = 'story-modal-overlay';
    modal.innerHTML = `
        <div class="story-modal">
            <div class="story-modal-header">
                <h2>El camino recorrido</h2>
                <span class="close-story-modal">&times;</span>
            </div>
            <div class="story-modal-content">
                <div class="story-intro">
                    <img src="assets/my_icon.png" alt="Spy++" class="story-logo">
                    <p class="story-subtitle">De reparar computadoras a desarrollar software</p>
                </div>
                
                <div class="story-timeline">
                    <!-- First -->
                    <div class="story-era">
                        <div class="era-icon">🛠️</div>
                        <h3>Los Primeros Años - El Hardware</h3>
                        <p>Haber crecido con una computadora en casa me permitió adquirir conocimientos en reparación, 
                        cambio de piezas y componentes, formateo, e instalación de sistemas operativos (Windows) y programas.</p>
                    </div>
                    
                    <!-- Second -->
                    <div class="story-era">
                        <div class="era-icon">💡</div>
                        <h3>2021 - El Punto de Inflexión</h3>
                        <p>Mi intención cambió: quería <strong>crear software</strong>, no solo utilizarlo. 
                        Comencé una exhaustiva investigación sobre qué necesitaba aprender para poder lograrlo.</p>
                    </div>
                    
                    <!-- Third -->
                    <div class="story-era">
                        <div class="era-icon">📚</div>
                        <h3>Los Fundamentos - QuickBasic y Pascal</h3>
                        <p>Mis primeras líneas de código fueron escritas en los ya obsoletos lenguajes <strong>QuickBasic y Pascal</strong> (ambos de paradigma estructural), 
                        estudiando y practicando con ejemplos del excelentísimo libro <em>'Algoritmos Y Estructuras de Datos'</em> del maestro Niklaus Wirth.</p>
                    </div>
                    
                    <!-- Fourth -->
                    <div class="story-era">
                        <div class="era-icon">🚀</div>
                        <h3>El Gran Salto - Paradigma Orientado a Objetos</h3>
                        <p>
                        Mientras que la programación estructural se centra en secuencias lógicas de instrucciones y funciones, 
                        la orientada a objetos exige pensar en términos de entidades, relaciones y comportamientos. 
                        Este cambio de paradigma, de la lógica lineal a la lógica de modelado de la realidad, es lo que hace que dar este salto sea un desafío.
                        </p>
                    </div>
                    
                    <!-- Fifth -->
                    <div class="story-era">
                        <div class="era-icon">☕</div>
                        <h3>El Encuentro con Java</h3>
                        <p>El libro <em>'Cómo programar en Java'</em> de Deitel & Deitel (Padre e Hijo), con su estilo didáctico, facilitó la comprensión de conceptos complejos. 
                        Desde entonces, no me alejé de este lenguaje de programación.</p>
                    </div>
                    
                    <!-- Sixth -->
                    <div class="story-era">
                        <div class="era-icon">🎓</div>
                        <h3>2025 - Certificación Oracle</h3>
                        <p>Validé formalmente mis conocimientos obteniendo la certificación 
                        <strong>Oracle Certified Foundations Associate</strong>, 
                        demostrando dominio en fundamentos de Java y POO.</p>
                    </div>
                </div>
                
                <div class="story-current">
                    <h3>👨‍💻 Mi Presente</h3>
                    <p>Hoy me especializo en el ecosistema Java, creando software escalable y mantenible, 
                    aplicando esos fundamentos sólidos en proyectos que resuelven problemas reales.</p>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    modal.querySelector('.close-story-modal').onclick = () => modal.remove();
    modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
    document.addEventListener('keydown', function closeOnEsc(e) {
        if (e.key === 'Escape') {
            modal.remove();
            document.removeEventListener('keydown', closeOnEsc);
        }
    });
}