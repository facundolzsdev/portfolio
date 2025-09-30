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
                    <!-- First Phase -->
                    <div class="story-era">
                        <div class="era-icon">🛠️</div>
                        <h3>Los Primeros Años - El Hardware</h3>
                        <p>Haber crecido con una computadora en casa me permitió adquirir conocimientos en reparación, 
                        cambio de piezas y componentes, formateo, e instalación de sistemas operativos (Windows) y programas.</p>
                    </div>
                    
                    <!-- Second Phase -->
                    <div class="story-era">
                        <div class="era-icon">💡</div>
                        <h3>2021 - El Punto de Inflexión</h3>
                        <p>Mi intención cambió: quería <strong>crear software</strong>, no solo utilizarlo. 
                        Comencé una exhaustiva investigación sobre qué necesitaba aprender para poder lograrlo.</p>
                    </div>
                    
                    <!-- Third Phase -->
                    <div class="story-era">
                        <div class="era-icon">📚</div>
                        <h3>Los Fundamentos - QuickBasic y Pascal</h3>
                        <p>Mis primeras líneas de código fueron escritas en los ya obsoletos lenguajes <strong>QuickBasic y Pascal</strong> (ambos de paradigma estructural), 
                        copiando ejemplos del excelentísimo libro <em>'Algoritmos Y Estructuras de Datos'</em> del maestro Niklaus Wirth.</p>
                        <div class="vintage-tools">
                            <span class="vintage-tool">QuickBasic</span>
                            <span class="vintage-tool">Pascal</span>
                            <span class="vintage-tool">Niklaus Wirth</span>
                        </div>
                    </div>
                    
                    <!-- Fourth Phase -->
                    <div class="story-era">
                        <div class="era-icon">🚀</div>
                        <h3>El Gran Salto - Paradigma Orientado a Objetos</h3>
                        <p>
                   Mientras que la programación estructural se centra en secuencias lógicas de instrucciones y funciones, 
                   la orientada a objetos exige pensar en términos de entidades, relaciones y comportamientos. 
                   Este cambio de paradigma, de la lógica lineal a la lógica de modelado de la realidad, es lo que hace que dar este salto sea un desafío.
                        </p>
                    </div>
                    
                    <!-- Fifth Phase -->
                    <div class="story-era">
                        <div class="era-icon">☕</div>
                        <h3>El Encuentro con Java</h3>
                        <p>El libro <em>'Cómo programar en Java'</em> de Deitel & Deitel (Padre e Hijo), con su clásica hormiguita explicando cada detalle, hizo más ameno el aprendizaje. 
                        Desde entonces, no me alejé de este lenguaje de programación.</p>
                        <div class="modern-tools">
                            <span class="modern-tool">Java</span>
                            <span class="modern-tool">Deitel & Deitel</span>
                            <span class="modern-tool">POO</span>
                        </div>
                    </div>
                </div>
                
                <div class="story-philosophy">
                    <blockquote>
                        "Write Once, Run Anywhere" - La versatilidad de Java permite desarrollar 
                        desde juegos hasta páginas web robustas, aplicaciones de escritorio y móviles.
                    </blockquote>
                </div>
                
                <div class="story-current">
                    <h3>👨‍💻 Mi Presente</h3>
                    <p>Hoy me especializo en el ecosistema Java, creando software escalable y mantenible, 
                    aplicando esos fundamentos que aprendí desde los libros hasta la práctica real.</p>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Close modal
    modal.querySelector('.close-story-modal').onclick = () => modal.remove();
    modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
    document.addEventListener('keydown', function closeOnEsc(e) {
        if (e.key === 'Escape') {
            modal.remove();
            document.removeEventListener('keydown', closeOnEsc);
        }
    });
}