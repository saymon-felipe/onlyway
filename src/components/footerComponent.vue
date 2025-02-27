<template>
    <footer>
        <div class="radio-player">
            <div class="radio-cover">
                <img :src="$radioData.art" :alt="$radioData.title">
            </div>
            <div class="player-container">
                <i class="fas rounded-button" :class="isPlaying ? 'fa-pause' : 'fa-play'" @click="togglePlay"></i>
                <div class="visualizer-container">
                    <div class="visualizer-text">
                        <p>TOCANDO AGORA</p>
                        <h2 :title="$radioData.title">{{ $radioData.title }}</h2>
                    </div>
                    <canvas ref="canvas" class="visualizer"></canvas>
                </div>
                <div class="volume">
                    <i class="fas rounded-button" :class="volume == 0 ? 'fa-volume-off' : 'fa-volume-up'" v-on:click="controlVolume =! controlVolume"></i>
                    <div class="volume-container" v-if="controlVolume">
                        <input type="range" min="0" class="personalized-input-range" max="1" step="0.01" v-model="volume" @input="setVolume" />
                    </div>
                </div>
                <div class="control-volume-wrapper" v-if="controlVolume" v-on:click="controlVolume = false"></div>
                <audio ref="audio" src="https://stream3.svrdedicado.org/8042/stream" crossorigin="anonymous" preload="auto" @play="onPlay" @pause="onPause" @ended="onEnd"></audio>
            </div>
        </div>
    </footer>
</template>

<script>
export default {
    data() {
        return {
            isPlaying: false,
            volume: 0,
            targetVolume: 0,
            audioContext: null,
            analyser: null,
            bufferLength: 0,
            dataArray: [],
            controlVolume: false,
            hasInitializedAudio: false, // Para evitar múltiplas inicializações
        }
    },
    mounted: function () {
        this.drawVisualizer(true);
    },
    methods: {
        drawVisualizer(initial = false) {
            const canvas = this.$refs.canvas;
            const canvasContext = canvas.getContext('2d');
            
            const scale = window.devicePixelRatio || 1;
            canvas.width = canvas.clientWidth * scale;
            canvas.height = canvas.clientHeight * scale;
            canvasContext.scale(scale, scale);

            const draw = () => {
                requestAnimationFrame(draw);

                if (!initial) {
                    this.analyser.getByteFrequencyData(this.dataArray);
                } else {
                    this.bufferLength = 64;
                }

                canvasContext.clearRect(0, 0, canvas.width, canvas.height);
        
                let spacing = 5;
                const barWidth = (canvas.width / this.bufferLength) * 0.7;
                let x = 0;
                const maxHeight = canvas.height * 0.8;
                const centerY = canvas.height / 2;

                const drawRoundedRect = (ctx, x, y, width, height, radius) => {
                    ctx.beginPath();
                    ctx.moveTo(x + radius, y);
                    ctx.lineTo(x + width - radius, y);
                    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
                    ctx.lineTo(x + width, y + height - radius);
                    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
                    ctx.lineTo(x + radius, y + height);
                    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
                    ctx.lineTo(x, y + radius);
                    ctx.quadraticCurveTo(x, y, x + radius, y);
                    ctx.closePath();
                    ctx.fill();
                };

                for (let i = 0; i < this.bufferLength; i++) {
                    let barHeight = !initial ? Math.max(Math.min(this.dataArray[i] / 2.5, maxHeight), 5) : 5;
                    let barX = x;
                    let barY = centerY - barHeight / 2;
                    let borderRadius = Math.min(barWidth / 2, barHeight / 2);

                    canvasContext.fillStyle = 'rgb(255, ' + (barHeight + 100) + ',0)';
                    drawRoundedRect(canvasContext, barX, barY, barWidth, barHeight, borderRadius);

                    x += barWidth + spacing;
                }
            };
    
            draw();
        },
        initAudioContext(initial = false) {
            if (!this.hasInitializedAudio) {
                this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
                this.analyser = this.audioContext.createAnalyser();
                this.analyser.fftSize = 128;
                this.bufferLength = this.analyser.frequencyBinCount;
                this.dataArray = new Uint8Array(this.bufferLength);

                const source = this.audioContext.createMediaElementSource(this.$refs.audio);
                source.connect(this.analyser);
                this.analyser.connect(this.audioContext.destination);

                this.drawVisualizer(initial);

                this.hasInitializedAudio = true;
            }
        },

        togglePlay() {
            this.initAudioContext();

            this.$nextTick(() => {
                if (this.isPlaying) {
                    this.fadeVolume(0, () => {
                        this.$refs.audio.pause();
                    });
                } else {
                    this.volume = 0; // Começa com volume 0
                    this.$refs.audio.volume = this.volume; // Define o volume do áudio
                    this.$refs.audio.play();
                    this.fadeVolume(1); // Faz o volume subir gradualmente
                }
                this.isPlaying = !this.isPlaying;
            });
        },
        
        setVolume() {
            this.$refs.audio.volume = parseFloat(this.volume);
        },
        
        fadeVolume(targetVolume, callback) {
            const step = (targetVolume - parseFloat(this.volume)) / 20; // Número de passos para suavizar
            const interval = setInterval(() => {
                this.volume = parseFloat(this.volume) + parseFloat(step.toFixed(2));
                if ((step > 0 && this.volume >= targetVolume) || (step < 0 && this.volume <= targetVolume)) {
                    clearInterval(interval);
                    this.volume = targetVolume; // Garante que chegue ao volume alvo
                    this.setVolume(); // Atualiza o volume do áudio
                    if (callback) callback(); // Chama o callback se existir
                } else {
                    this.setVolume(); // Atualiza o volume do áudio em cada passo
                }
            }, 10); // Intervalo entre passos
        },
        
        onPlay() {
            this.isPlaying = true;
        },
        
        onPause() {
            this.isPlaying = false;
        },
        
        onEnd() {
            this.isPlaying = false;
            this.$refs.audio.currentTime = 0;
        }
    }
}
</script>
<style scoped>
footer {
    position: fixed;
    bottom: 0;
    left: 0;
    height: 30vh;
    background: linear-gradient(to top, var(--blue-low), transparent);
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.radio-player {
    display: flex;
    align-items: center;
    height: fit-content;
    position: fixed;
    bottom: 2vh;
    left: 0;
    right: 0;
    margin: auto;
    width: 70vw;
    max-width: 95vw;
    padding: 1rem;
    max-width: 1300px;
    z-index: 9998;
    position: relative;

    & .radio-cover {
        width: 150px;
        height: 150px;
        position: relative;
        border-radius: 1.7rem;
        overflow: hidden;

        &::after {
            content: "";
            background: rgba(255, 255, 255, 0.15);
            transform: rotate(45deg);
            width: 200%;
            position: absolute;
            top: -120%;
            left: -120%;
            height: 200%;
            z-index: 2;
        }

        & img {
            width: 150px;
            height: 150px;
            object-fit: cover;
            border-radius: 1.7rem;
            border-top: 2px solid var(--gray-high);
            border-left: 2px solid var(--gray-high);
        }
    }

    & h2 {
        color: var(--green);
    }

    & .visualizer-container {
        background: var(--black);
        padding: 1rem;
        border-radius: 1rem;
        gap: 1rem;
        display: grid;
        flex: 1;
    }

    & .visualizer-text {
        width: 300px;
        overflow: hidden;        /* Oculta o texto que ultrapassa a largura */
        position: relative;      /* Necessário para posicionar o texto dentro */

        & h2 {
            font-size: 1rem;
            margin-bottom: 5px;
            white-space: nowrap;         /* Impede o texto de quebrar linha */
            animation: scroll-text 14s linear infinite; /* Animação de rolagem */
            animation-delay: 5s;
            display: inline-block;
        }

        & p {
            font-size: .9rem;
        }
    }
}

.player-container {
    flex: 1;
    display: flex;
    place-items: center;
    gap: 1.5rem;
    margin-left: 1.5rem;
}

@keyframes scroll-text {
  0% {
    transform: translateX(0%); /* Começa a animação no início */
    opacity: 1;
  }
  50% {
    transform: translateX(-100%); /* Vai para a esquerda, fora da tela */
    opacity: 1;
  }
  51% {
    transform: translateX(-100%); /* Vai para a esquerda, fora da tela */
    opacity: 0;
  }
  52% {
    transform: translateX(70%); /* Vai para a esquerda, fora da tela */
    opacity: 0;
  }
  53% {
    transform: translateX(70%); /* Vai para a esquerda, fora da tela */
    opacity: 1;
  }
  100% {
    transform: translateX(0%);
    opacity: 1;
  }
}

.play-button {
    margin-left: 1rem;
}
  
.visualizer {
width: 100%;
height: 100px;
background-color: var(--black);
border-bottom: 1px solid var(--green-low);
}

.controls {
display: flex;
flex-direction: column;
align-items: center;
}

button {
padding: 10px;
margin-bottom: 10px;
background-color: #4CAF50;
color: white;
border: none;
cursor: pointer;
border-radius: 5px;
}

button:hover {
background-color: #45a049;
}

input[type="range"] {
width: 100%;
margin-bottom: 10px;
}

.volume {
position: relative;
}

.volume-container {
position: absolute;
bottom: 110%;
height: 132px;
width: 35px;
border-radius: calc(10px + 1vw);
background: rgba(255, 255, 255, 0.1);
backdrop-filter: blur(10px);
display: grid;
place-items: center;
padding: .5rem;
z-index: 9999;
left: 5px;
box-shadow: 0 0 7px rgba(0, 0, 0, 0.3);

& input {
    transform: rotate(-90deg);
    width: 90px !important;
    margin: 0;
    margin-left: -35px;

}
}

.control-volume-wrapper {
position: fixed;
top: 0;
left: 0;
width: 100vw;
height: 100vh;
z-index: 9998;
}

.cover {
position: relative;
width: fit-content;
height: fit-content;
cursor: pointer;

&.closed .expand-button {
    transform: rotate(180deg);
}

& .expand-button {
    transform: rotate(0deg);
    position: absolute;
    color: var(--white);
    font-size: 1.3rem;
    background: rgba(0, 0, 0, 0.3);
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    top: 10px;
    right: 10px;
    z-index: 2;
}

& .playing-button {
    color: var(--white);
    font-size: 0.8rem;
    width: 40px;
    height: 40px;
    background: rgba(0, 0, 0, 0.9);
    border-radius: 50%;
    place-items: center;
    position: absolute;
    bottom: 10px;
    left: 10px;
    display: grid;
}

& .playing-button.playing {
    animation: rotate 5s linear infinite;
}
}

@keyframes rotate {
0% {
    transform: rotate(0);
}

100% {
    transform: rotate(360deg);
}
}
</style>