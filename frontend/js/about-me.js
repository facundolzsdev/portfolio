document.addEventListener('DOMContentLoaded', function () {
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', function () {
            showPersonalStoryModal();
        });
    }
});

function showPersonalStoryModal() {
    document.documentElement.classList.add('no-scroll');
    document.body.classList.add('no-scroll');

    const modal = document.createElement('div');
    modal.className = 'story-modal-overlay';
    modal.innerHTML = `
        <div class="story-modal">
            <div class="story-modal-header">
                <h2>Sobre Mí</h2>
                <span class="close-story-modal">&times;</span>
            </div>
            <div class="story-modal-content">
                <div class="story-intro">
                    <img src="assets/my_icon.png" alt="Spy++" class="story-logo">
                    <p class="story-subtitle">Hardware, fundamentos y especialización</p>
                </div>
                
                <div class="story-timeline">
                    <div class="story-era">
                        <div class="era-icon"><i class='bx bx-wrench'></i></div>
                        <h3>Hardware & Arquitectura</h3>
                       <p>Mi base técnica nació del hardware. La reparación y el mantenimiento de equipos me permitió entender el funcionamiento interno de las máquinas antes de escribir mi primera línea de código.</p>
                    </div>
                    
                    <div class="story-era">
                        <div class="era-icon"><i class='bx bx-bulb'></i></div>
                        <h3>2022 — El Cambio</h3>
                        <p>Decidí dejar de reparar sistemas para empezar a construirlos. Inicié una investigación profunda para trazar mi camino como desarrollador de software.</p>
                    </div>
                    
                    <div class="story-era">
                        <div class="era-icon"><i class='bx bx-code-block'></i></div>
                        <h3>Raíces: QuickBasic y Pascal</h3>
                        <p>Escribí mis primeras líneas de código en los lenguajes <strong>QuickBasic</strong> y <strong>Pascal</strong>, estudiando y practicando con ejemplos del libro <em>'Algoritmos y Estructuras de Datos'</em> del maestro <strong>Niklaus Wirth</strong>.</p>
                    </div>
                    
                    <div class="story-era">
                        <div class="era-icon"><i class='bx bx-objects-vertical-bottom'></i></div>
                        <h3>Cambio de paradigma</h3>
                        <p>Aprendí a diseñar software pensando en componentes reutilizables y relaciones entre elementos, en lugar de instrucciones secuenciales. Este cambio de mentalidad fue clave para construir sistemas más complejos.</p>
                    </div>
                    
                    <div class="story-era">
                        <div class="era-icon"><i class='bx bxl-java'></i></div>
                        <h3>Especialización en Java</h3>
                        <p>Adopté <strong>Java</strong> como mi lenguaje principal debido a su robustez y versatilidad. Su ecosistema y la capacidad para construir sistemas escalables definieron mi perfil, convirtiéndose en el pilar de mi arquitectura de desarrollo <strong>Backend</strong>.</p>
                    </div>
                    
                    <div class="story-era">
                        <div class="era-icon"><i class='bx bx-certification'></i></div>
                        <h3>2025 — Certificación Oracle</h3>
                        <p>Consolidé mi formación técnica obteniendo la credencial <strong>Oracle Certified Foundations Associate</strong> emitida por <strong>Oracle University</strong>. Esta certificación valida mi conocimiento en los estándares de <strong>Java SE</strong> y el diseño avanzado de <strong>Programación Orientada a Objetos</strong>.</p>
                    </div>
                </div>
                
                <div class="story-current">
                    <div class="current-icon"><i class='bx bx-terminal'></i></div>
                    <h3>Mi Presente</h3>
                    <p>Me enfoco en convertir necesidades de negocio en <strong>soluciones tecnológicas robustas</strong>. 
                    Combino la disciplina de mis raíces con estándares modernos para desarrollar sistemas que no solo funcionen, sino que estén <strong>preparados para crecer</strong>.</p>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    const closeModal = () => {
        modal.remove();
        document.documentElement.classList.remove('no-scroll');
        document.body.classList.remove('no-scroll');
    };

    modal.querySelector('.close-story-modal').onclick = closeModal;
    modal.onclick = (e) => { if (e.target === modal) closeModal(); };

    const onKeyDown = (e) => {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', onKeyDown);
        }
    };

    document.addEventListener('keydown', onKeyDown);
}