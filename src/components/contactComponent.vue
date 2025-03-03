<template>
    <section>
        <div class="contact-success" ref="contactSuccess">
            <h1 class="principal-text">Obrigado!</h1>
            <h3 class="secondary-text">Nossa equipe entrará em contato em breve.</h3>
        </div>
        <div class="contact" ref="contact">
            <ul class="list">
                <li>
                    <strong>E-mail:</strong>
                    <span><a href="mailto:radioonlyway2025@gmail.com" target="_blank" class="link">radioonlyway2025@gmail.com</a></span>
                </li>
                <li>
                    <strong>Whatsapp:</strong>
                    <span><a :href="'https://wa.me/' + 5541984093742 + '?text=' + encodeURIComponent('Olá, estou entrando em contato através do site da OnlyWay.')" target="_blank" class="link">(41) 9 8409-3742</a></span>
                </li>
            </ul>
            <form class="contact-form list" @submit.prevent="sendContact()">
                <h3 class="section-title">CONTATO</h3>
                <div class="form-group">
                    <input type="text" placeholder="Nome" required maxlength="255" v-model="nome">
                </div>
                <div class="form-group">
                    <input type="email" placeholder="E-mail" required maxlength="255" v-model="email">
                </div>
                <div class="form-group">
                    <select required v-model="motivo">
                        <option value="">* Selecione *</option>
                        <option value="pedir_musica">Pedir música</option>
                        <option value="parceria">Parceria</option>
                        <option value="sugestao">Sugestão</option>
                        <option value="duvida">Dúvida</option>
                        <option value="outros">Outros</option>
                    </select>
                </div>
                <div class="form-group">
                    <textarea required placeholder="Mensagem" maxlength="5000" v-model="mensagem"></textarea>
                </div>
                <button class="btn primary-button" type="submit">Enviar</button>
            </form>
        </div>
    </section>
</template>
<script>
export default {
    data() {
        return {
            mensagem: "",
            motivo: "",
            email: "",
            nome: "",
            sended: false
        }
    },
    watch: {
        sended: function () {
            this.toggleSended();
        }
    },
    methods: {
        toggleSended: function () {
            if (this.sended) {
                this.$refs.contact.style.opacity = 0;
                this.$refs.contactSuccess.style.opacity = 1;

                setTimeout(() => {
                    this.$refs.contact.style.display = 'none';
                    this.$refs.contactSuccess.style.display = 'block';
                }, 400)
            } else {
                this.$refs.contact.style.opacity = 1;
                this.$refs.contactSuccess.style.opacity = 0;

                setTimeout(() => {
                    this.$refs.contact.style.display = 'block';
                    this.$refs.contactSuccess.style.display = 'none';
                }, 400)
            }
        },
        sendContact: function () {
            let data = {
                mensagem: this.mensagem,
                motivo: this.motivo,
                email: this.email,
                nome: this.nome
            }

            console.log(data);

            setTimeout(() => {
                this.sended = true;
            })
        }
    },
    mounted: function () {
        this.toggleSended();
    }
}
</script>
<style scoped>
ul {
    & li {
        margin: 1.5rem 0;
        display: flex;
        flex-wrap: wrap;
    }
}

strong {
    width: 100px;
    display: inline-block;
}

.contact-form {
    margin-top: 4rem;
}

.contact, .contact-success {
    transition: opacity 0.4s ease-in-out;
}
</style>