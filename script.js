const modal = document.getElementById('modal');
const modalBody = document.getElementById('modal-body');
const dateModal = document.getElementById('dateModal');
const cardDropdown = document.getElementById('cardDropdown');
const cardDropdownContent = document.getElementById('cardDropdownContent');
const dateText = document.getElementById('dateText');
let activeButton = null;
let countdownInterval = null;

function openModal(buttonId) {
    const button = document.getElementById(buttonId);
    
    // Remover clase active de todos los botones
    document.querySelectorAll('.action-button').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Activar el botón clickeado
    button.classList.add('active');
    activeButton = buttonId;
    
    // Cambiar contenido del modal según el botón
    if (buttonId === 'btn1') {
        modalBody.innerHTML = `
            <strong>Naaaaa ya falta poco linda, ya te quiero ver :)</strong><br><br>
            <p>Este es el contenido personalizado para "Mucho pipipi".</p>
        `;
    } else if (buttonId === 'btn2') {
        modalBody.innerHTML = `
            <strong>Sipiiiiii</strong><br><br>
            <p>Ya casi nos podemos ver y tener nuestras citas romanticas y que me de taquicardia por verte ahahah</p>
            <div id="countdown" style="font-size: 24px; font-weight: bold; color: #564e2bff; margin: 20px 0; font-family: 'Courier New', monospace;">
                <div style="margin: 10px 0;">
                    <span id="days">00</span> días
                </div>
                <div style="margin: 10px 0;">
                    <span id="hours">00</span>h : <span id="minutes">00</span>m : <span id="seconds">00</span>s
                </div>
            </div>
            <p style="font-size: 14px; color: #666;">6 de Noviembre 2025 - 6:00 PM 💕</p>
        `;
        
        // Iniciar el temporizador
        startCountdown();
    }
    
    // Mostrar modal con animación
    modal.classList.add('show');
    
    // Prevenir scroll del body
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
    
    // Limpiar el temporizador cuando se cierre el modal
    if (countdownInterval) {
        clearInterval(countdownInterval);
        countdownInterval = null;
    }
    
    // Remover clase active de todos los botones
    document.querySelectorAll('.action-button').forEach(btn => {
        btn.classList.remove('active');
    });
    activeButton = null;
}

// Nuevas funciones para la sección de citas
function goToNewPage() {
    // Redirigir a una nueva página
    window.open('citas.html', '_blank');
}

function openDateModal() {
    dateModal.classList.add('show');
    document.body.style.overflow = 'hidden';
    
    // Limpiar el textarea
    if (dateText) {
        dateText.value = '';
        updateCharCount();
    }
}

function closeDateModal() {
    dateModal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

function closeCardDropdown() {
    if (cardDropdown) {
        cardDropdown.classList.remove('show');
    }
}

function submitDate() {
    const dateValue = dateText.value.trim();

    if (dateValue === '') {
        alert('pipipipi escribe una cita :(');
        return;
    }

    // Aquí pones tu URL de Formspree
    const formspreeURL = "https://formspree.io/f/xkgqwwje"; // 👈 cambia esto por tu URL real

    // Enviar la cita a tu correo mediante Formspree
    fetch(formspreeURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            cita: dateValue,
            fecha: new Date().toLocaleString()
        })
    })
    .then(response => {
        if (response.ok) {
            alert(`Se envio tu cita hermosa: "${dateValue}" eeeeeeeee`);
            closeDateModal();
        } else {
            alert("Hubo un problema al enviar la cita pipipipi");
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Error de conexión ");
    });
}


function updateCharCount() {
    const charCount = document.getElementById('charCount');
    if (charCount && dateText) {
        charCount.textContent = dateText.value.length;
    }
}

// Función para voltear cartas
function flipCard(cardElement, cardNumber) {
    // Voltear la carta
    cardElement.classList.add('flipped');
    
    // Mensajes personalizados para cada carta
    const messages = {
        1: `<strong>Noporolo intenta de nuevo ヽ(=^･ω･^=)丿</strong><br>
            <p>No estes triste bonita, tu futura novia te da besitos :3\n\nTamoooooooooooooo. No pienses que olvide tu regalo cacorro bonita. Puede que yo este lejos, pero siempre voy a intentar darte asi sea el regalo mas cacorrisimo ahahahah :)</p>
            <p>Tampoco pienses que no me gusto Dan Da Dan, no pude avanzar más porque estuve ocupada haciendo esto haahah</p>`,
        
        2: `<strong>Ya casi eeeeeee ٩(♡ε♡ )۶</strong><br>
            <p>Algun día te hago el maso completo de cartas de la sirenita y mas lindo ahahahha. \n\nMe encantas daniela, de verdad no te imaginas cuanto. Cursi demasiado demasiado, pero siento que en cierta forma le das un poco de sentido a mi vida. Siento que ahora todo lo que hago e intento mejorar o lograr tiene más proposito de pensar en un futuro contigo ela. \n</p>
            <p style="color: #7a5f2bff;">Borra eso de tu mente ahaha muy cursi ヾ│・ェ・ヾ│</p>`,
        3: `
            <strong>¡RON PA’ TO’ EL MUNDO QUE INVITA PIPE DAZA!</strong><br>
            Pero son solo 50k (︶︹︶) pipipi hhahaha 
            <img src="lio.png" alt="Imagen especial" style="max-width: 100%; border-radius: 10px; margin-top: 15px;"><br>
            <p>Es muy muy tonto, lo se. Y no se compara en nada a lo que me gustaria darte, pero tu no me das tu dirección aaaaaa!!! Pero cuando te vea, vamos a tener nuestra cita hermosa. Quisiera ir contigo, pero por ahora disfrutalo ;)</p>
            <p>Te amo te amo te amo ela :), una hermosa como tu no puede pasar amor y amistad sin que la mujer que se muere por ella le de una cacorrada je. El siguiente año, sea como sea va a ser mejor bonita. Eres mi persona favorita ＼（　●　⌒　∇　⌒　●　）／</p>
            ¡Muy buena elección futura novia :)!
            
            <p style="font-size: 14px; color: #666;">Pdst: Como ese no sea el Lio que a ti te encanta me mato eeee</p>`
    };
    
    // Mostrar el mensaje dentro del modal
    setTimeout(() => {
        modalBody.innerHTML = `
            <div class="card-message-body">
                <div id="cardMessage">${messages[cardNumber]}</div>
                <button class="card-ok-btn" onclick="closeModal()">Jijiji</button>
            </div>
        `;
        modal.querySelector('.modal-content').classList.add('card-message-modal');
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }, 300);
    
    // Opcional: Después de un tiempo, voltear la carta de vuelta
    setTimeout(() => {
        cardElement.classList.remove('flipped');
    }, 3000);
}



function startCountdown() {
    // Fecha objetivo: 6 de noviembre de 2025 a las 6:00 PM
    const targetDate = new Date('November 6, 2025 18:00:00').getTime();
    
    // Limpiar intervalo anterior si existe
    if (countdownInterval) {
        clearInterval(countdownInterval);
    }
    
    countdownInterval = setInterval(function() {
        const now = new Date().getTime();
        const distance = targetDate - now;
        
        if (distance < 0) {
            // Si ya pasó la fecha
            clearInterval(countdownInterval);
            document.getElementById('countdown').innerHTML = `
                <div style="font-size: 18px; color: #4caf50;">
                    yipi yei yei
                </div>
            `;
            return;
        }
        
        // Calcular tiempo restante
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Actualizar elementos si existen
        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');
        
        if (daysEl) daysEl.textContent = days.toString().padStart(2, '0');
        if (hoursEl) hoursEl.textContent = hours.toString().padStart(2, '0');
        if (minutesEl) minutesEl.textContent = minutes.toString().padStart(2, '0');
        if (secondsEl) secondsEl.textContent = seconds.toString().padStart(2, '0');
        
    }, 1000);
}

function openModal(buttonId) {
    const button = document.getElementById(buttonId);

    // Remover clase active de todos los botones
    document.querySelectorAll('.action-button, .date-button').forEach(btn => {
        btn.classList.remove('active');
    });

    button.classList.add('active');
    activeButton = buttonId;

    // Contenido según el botón
    if (buttonId === 'btn1') {
        modalBody.innerHTML = `
            <strong>Naaaaa ya falta poquita bonita</strong><br><br>
             <p> El tiempo se pasa rapido con tu disfraz de halloween eeeeee y nuestras noches hablando (que no paren porfiii) y las fotos que prometo ahora si enviarte mucho mucho ahahahha</p>
             <br>
             <p> Ya te quiero ver hermosa :) </p>
             <br>
             <p>（＾⊆＾）</p>
        `;
    } else if (buttonId === 'btn2') {
        modalBody.innerHTML = `
    <strong>Sipiiiiii</strong><br><br>
    <p>Ya casi nos podemos ver y tener nuestras citas romanticas y que me de taquicardia por verte y darte besitos y agarrarte de la mano y aaaaaa.</p>
    <br>
    <p style="font-size: 14px; color: #666666ff;">Solo faltaaa:</p>
    <div id="countdown" style="font-size: 24px; font-weight: bold; color: #876a11ff; margin: 20px 0; font-family: 'Courier New', monospace;">                <div style="margin: 10px 0;">
            <span id="days">00</span> días
        </div>
        <div style="margin: 10px 0;">
            <span id="hours">00</span>h : <span id="minutes">00</span>m : <span id="seconds">00</span>s
        </div>
    </div>
    <br>
    <p>ˁ๑>ᴗ<๑ˀ</p>
`;
startCountdown();
    } else if (buttonId === 'manyBtn') {  // 🔹 nuestro nuevo botón
        modalBody.innerHTML = `
            <div class="carousel">
                <button class="carousel-btn prev" onclick="moveSlide(-1)">&#10094;</button>
                <div class="carousel-track">
                    <div class="carousel-slide">Tenemos que ir a comer tu paleta de goyurt y ver una peli en cine aaaaaaaaa q(^-^q). Yo te vuelvo a dar mi saco si te da frio (｡◕‿◕｡)</div>
                    <div class="carousel-slide">Tambien hay que ir a museos!!! Siento que te gustaria bastante y a mi tambien. Prometo tomarte lindas fotos :3. Yo quiero ʕ′⊙ᴥ⊙ˋʔ ahahahah soy ese</div>
                    <div class="carousel-slide">Tenemos como 50 citas pendientes de solo ir al cine aaaaaaaaa ˁ๑>ᴗ<๑ˀ. Esta vez que fuimos en villavo me gusto mucho la verdad je, fuiste muy linda ese día ela, gachas :)</div>
                    <div class="carousel-slide">Tenemos muyyy pendiente la cita extraromantica haciendo la pizza de shrek mhmmm esa es la más importante ヽ(´∇｀)ﾉ</div>
                    <div class="carousel-slide">Yo la verdad si quiero ir contigo al Jardin Botanico mucho mucho ^-^ pipipipipi me gustan las plantas son lindas. Yo me aprendo datos curiosos para que no te aburras :3</div>
                    <div class="carousel-slide">Aun no has probado mis pastas brutales que te enamorarian, así que esa es una más ヾ(･ω･｡)ｼ. Yyyyyy tu tambien tienes que dejarme probar tu comida que cocines!! yo se que cocinas rico!! ►.◄</div>
                    <div class="carousel-slide">Soy una mujer sencilla, y la verdad que extraño mucho caminar contigo cuando hace linda tarde. Te ves hermosa con el atardecer lindo. Es cita es de mis favoritas 〖≧◡≦✿〗</div>
                    <div class="carousel-slide">Muyy claramente la cita de cena romantica cocinada por vivi chef es de suma importancia. Yo soy bien romantica y cocino muy rico, que mas puedes pedir? ヾ(０∀０★)ﾟ･.｡</div>
                    <div class="carousel-slide">No creas que olvide Mercagan bonita, honestamente creo que es la cita más importante que tenemos. Y cuando vengas en serio que si vamos :) yo ahorro juiciosa je 〲( ^ᴗ^ )〴</div>
                    <div class="carousel-slide">Yo la verdad estoy que vuelvo a Bushido ahahhaah top citas, aunque un poco gracioso para haber sido de las primeras. Ese dia me la pase muy lindo, y quiero repetir ୧༼✿ ͡◕ д ◕͡ ༽୨</div>
                    <div class="carousel-slide">Noche de juegos de mesa!!!!!! Me meo de verdad que me meo, seria el dia mas feliz de mi vida. Y si vemos una peli despues aaaaaaaaaa ヾ(・∀・｀*)ﾉ☆</div>
                    <div class="carousel-slide">Se lo mucho que te gusta je, así que en realidad quiero ir a percimon contigo yipiiii. Dato curioso: Mi idea inicial era darte un bono de Percimon o un tarro de helado de ellos o algo ahahah pero recorde que no tenian sede en bucara pipipi ‘︿’</div>
                    <div class="carousel-slide">Sea como sea voy a buscar el lugar de corndogs coreanos y vamos a volver!!! Tambien es una de mis citas favoritas ahahahah estabamos muy drogadas, tenemos que volver drogadas ahahahh ◦°˚\☻/˚°◦</div>
                    <div class="carousel-slide">Esas pocas y muchas más tenemos por hacer ela, estoy feli y emocionada de tener muchas mas citas contigo hermosa. No hay nada que pueda pensar que no sea más feliz haciendolo contigo (◕‿◕✿)</div>
                </div>
                <button class="carousel-btn next" onclick="moveSlide(1)">&#10095;</button>
            </div>
        `;
        currentSlide = 0;
        updateCarousel();

        modal.querySelector('.modal-content').classList.add('big-modal');
    }

    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

// --- Variables globales carrusel ---
let currentSlide = 0;
function moveSlide(direction) {
    const slides = document.querySelectorAll('.carousel-slide');
    currentSlide = (currentSlide + direction + slides.length) % slides.length;
    updateCarousel();
}

function updateCarousel() {
    const track = document.querySelector('.carousel-track');
    if (track) {
        track.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
}


function closeModal() {
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
    
        modal.querySelector('.modal-content').classList.remove('card-message-modal');
        modal.querySelector('.modal-content').classList.remove('big-modal');

    // Limpiar el temporizador cuando se cierre el modal
    if (countdownInterval) {
        clearInterval(countdownInterval);
        countdownInterval = null;
    }
    
    // Remover clase active de todos los botones
    document.querySelectorAll('.action-button').forEach(btn => {
        btn.classList.remove('active');
    });
    activeButton = null;
}

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Cerrar modal al hacer clic en el overlay (fondo oscuro)
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });
    
    // Cerrar modal de citas al hacer clic en el overlay
    if (dateModal) {
        dateModal.addEventListener('click', function(event) {
            if (event.target === dateModal) {
                closeDateModal();
            }
        });
    }
    
    // Cerrar dropdown de cartas al hacer clic fuera
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.cards-container') && !event.target.closest('#cardDropdown')) {
            closeCardDropdown();
        }
    });
    
    // Cerrar modal con tecla Escape
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            if (modal.classList.contains('show')) {
                closeModal();
            }
            if (dateModal && dateModal.classList.contains('show')) {
                closeDateModal();
            }
            if (cardDropdown && cardDropdown.classList.contains('show')) {
                closeCardDropdown();
            }
        }
    });
    
    // Contador de caracteres para el textarea
    if (dateText) {
        dateText.addEventListener('input', updateCharCount);
    }
    
    // Efectos hover adicionales para los botones
    document.querySelectorAll('.action-button').forEach(button => {
        button.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(-2px)';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(0)';
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const audio = document.getElementById("bg-music");

    // Cuando dé clic en cualquier parte, activamos el sonido
    document.body.addEventListener("click", () => {
        if (audio.muted) {
            audio.muted = false;
            audio.play().catch(err => console.log("No se pudo reproducir:", err));
        }
    }, { once: true }); // ✅ solo la primera vez
});
