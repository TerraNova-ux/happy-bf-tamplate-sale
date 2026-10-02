const screens = [...document.querySelectorAll('.screen')];
const modal = document.querySelector('#modal');
const modalContent = document.querySelector('#modal-content');
const pinEl = document.querySelector('#pin');
const statusEl = document.querySelector('#unlock-status');

let pin = '';
const CORRECT = '1207';

let bgMusic = null;
let musicButton = null;

/* =========================================
   MUSIC
   ========================================= */

function initMusic() {
  bgMusic = document.getElementById('bgMusic');
  musicButton = document.querySelector('.music');

  if (!bgMusic) {
    console.error('Cherivelle: bgMusic element not found.');
    return;
  }

  bgMusic.volume = 0.55;
  bgMusic.loop = true;

  console.log('Cherivelle music loaded:', bgMusic.currentSrc);
}

function startMusic() {
  if (!bgMusic) {
    initMusic();
  }

  if (!bgMusic) return;

  bgMusic.volume = 0.55;

  const playPromise = bgMusic.play();

  if (playPromise !== undefined) {
    playPromise
      .then(() => {
        console.log('Cherivelle music PLAYING');

        if (musicButton) {
          musicButton.textContent = '🔊';
          musicButton.setAttribute('aria-label', 'Pause music');
          musicButton.classList.add('playing');
        }
      })
      .catch(error => {
        console.error('Cherivelle music FAILED:', error);
      });
  }
}

function toggleMusic() {
  if (!bgMusic) {
    initMusic();
  }

  if (!bgMusic) return;

  if (bgMusic.paused) {
    startMusic();
  } else {
    bgMusic.pause();

    if (musicButton) {
      musicButton.textContent = '🎵';
      musicButton.setAttribute('aria-label', 'Play music');
      musicButton.classList.remove('playing');
    }
  }
}

initMusic();

function show(id){screens.forEach(s=>s.classList.toggle('active',s.id===id));window.scrollTo({top:0,behavior:'smooth'});}
function openModal(type){
 const content = {
  gift: `
    <h3>A Little Gift 🎁</h3>
    <div style="text-align:center;font-size:100px">🎁</div>
    <p style="text-align:center;font-family:Caveat;font-size:27px">
      A little something for my favorite person, wrapped with all my love. ❤️
    </p>
    <div style="text-align:center">
      <button class="primary" data-action="celebrate">
        Open surprise ♡
      </button>
    </div>
  `,

  letter: `
    <h3>Dear Love 💌</h3>
    <div class="letter-paper">
      <p>
        Dear Love,<br><br>

        I don't always know how to put everything I feel into words,
        so I made this little world for you instead. ❤️<br><br>

        Thank you for being you, for making ordinary moments feel special,
        and for being such an important part of my life.<br><br>

        With all my love,<br>
        Always ❤️
      </p>
    </div>
  `,

  memories: `
    <h3>Our Memories 📸</h3>

    <div class="photos">
      <div class="photo" style="--r:-2deg">📷</div>
      <div class="photo" style="--r:3deg">🌅</div>
      <div class="photo" style="--r:2deg">🫶</div>
      <div class="photo" style="--r:-3deg">✨</div>
    </div>

    <p style="text-align:center;font-family:Caveat;font-size:24px">
      Every little moment with you is one worth keeping. ❤️
    </p>
  `,

  award: `
    <h3>Best BF Award 🏆</h3>

    <div class="award-paper">
      <div style="font-size:42px">👑</div>

      <h4>
        BEST<br>
        BOYFRIEND
      </h4>

      <p>
        Presented to <strong>[NAME]</strong><br><br>

        For being the person who makes my days brighter,
        my smiles bigger, and my life a little more beautiful. ❤️
      </p>

      <div style="font-size:32px">🏆 ❤️ 🏆</div>
    </div>
  `,

  reasons: `
    <h3>Why I Love Having You ❤️</h3>

    <ul class="reason-list">
      <li>♡ You always make me smile</li>
      <li>♡ You make ordinary days special</li>
      <li>♡ You know how to make me laugh</li>
      <li>♡ You’re always there for me</li>
      <li>♡ You make life brighter</li>
      <li>♡ You’re simply you ❤️</li>
    </ul>
  `,

  video: `
    <h3>A Message From Me 🎬</h3>

    <div class="video-box">
      ▶
    </div>

    <p style="text-align:center;font-family:Caveat;font-size:25px">
      There are some things I'd rather show you than type...
      ❤️
    </p>
  `,

  fun: `
    <h3>Just For You ✦</h3>

    <div style="display:grid;gap:12px">

      <button class="primary" data-action="celebrate">
        🎁 Another surprise
      </button>

      <button class="primary" data-action="final">
        Just For My Boyfriend ✦
      </button>

    </div>
  `
}[type];
 modalContent.innerHTML=content||'';modal.classList.add('open');modal.setAttribute('aria-hidden','false');
}
function closeModal(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true');}
function celebrate(){
 closeModal();confetti();
 setTimeout(()=>openModal('final'),350);
}
function final(){closeModal();confetti();setTimeout(()=>openModalContent(`<div class="final"><div class="cake">🎂</div><h3>Happy Boyfriend Day<br>[Name]!</h3><p>May your day be as special and amazing as you are. 💗</p><div style="font-size:36px">🎈 💕 ✨ 🎈</div></div>`),250);}
function openModalContent(html){modalContent.innerHTML=html;modal.classList.add('open');modal.setAttribute('aria-hidden','false');}
function confetti(){const root=document.querySelector('#confetti');for(let i=0;i<65;i++){const p=document.createElement('i');p.className='confetti-piece';p.style.left=Math.random()*100+'vw';p.style.background=['#ef6f9f','#ffd166','#8ecae6','#b8d77a','#c8a2ff'][i%5];p.style.setProperty('--x',(Math.random()*260-130)+'px');p.style.animationDelay=Math.random()*.45+'s';root.appendChild(p);setTimeout(()=>p.remove(),2500)}}

document.addEventListener('click', e => {

  // =========================
  // MUSIC BUTTON
  // =========================
  if (e.target.closest('.music')) {
    toggleMusic();
    return;
  }


  // =========================
  // PASSWORD KEYPAD
  // =========================
  const key = e.target.closest('[data-key]');

  if (key) {

    const v = key.dataset.key;

    if (v === 'clear') {

      pin = '';

    } else if (v === 'submit') {

      if (pin === CORRECT) {

        statusEl.textContent = 'Unlocked ♡';

        show('welcome');

        pin = '';

        // Start music after successful unlock
        startMusic();

      } else {

        statusEl.textContent = 'Not quite — try again ♡';

        pin = '';
      }

    } else if (pin.length < 4) {

      pin += v;
    }

    pinEl.textContent = pin
      .padEnd(4, '•')
      .split('')
      .join(' ');

    return;
  }


  // =========================
  // INTERACTIVE OBJECTS
  // =========================
  const open = e.target.closest('[data-open]');

  if (open) {

    openModal(open.dataset.open);

    return;
  }


  // =========================
  // ACTION BUTTONS
  // =========================
  const action =
    e.target.closest('[data-action]')?.dataset.action;

  if (!action) return;


  if (action === 'open-envelope') {

    show('unlock');

  }

  if (action === 'back-intro') {

    show('intro');

  }

  if (action === 'enter-room') {

    show('room');

    confetti();

  }

  if (action === 'close-modal') {

    closeModal();

  }

  if (action === 'celebrate') {

    celebrate();

  }

  if (action === 'final') {

    final();

  }

});