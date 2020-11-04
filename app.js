var app = new Vue({
    el: '#app',
    data: {
        letters: ["a", "b", "c", "d"],
        index: parseInt(localStorage.getItem('index')) || 1,
        answers: JSON.parse(localStorage.getItem('answers')) || []
        /* 
        
        example format du tableau answers

        {
            index: 1,
            letter: "a"
        }

        */
    },
    methods: {
        suivant() {
            this.index += 1
            this.save()
        },
        precedent() {
            if (this.index > 1)
                this.index -= 1
            this.save()
        },
        add(letter) {
            let newAnswer = { index: this.index, letter: letter }
            if (this.isAlreadyAnswered()) {
                // si on a deja repondu a la question
                // on cherche l index du tableau ou se situe la question
                // on remplace l objet a cet index
                let answer_tmp = [...this.answers]
                const newIndex = this.answers.findIndex(ans => ans.index === this.index)
                answer_tmp[newIndex] = newAnswer
                this.answers = answer_tmp
            } else {
                this.answers = [...this.answers, newAnswer]
            }
            this.index += 1
            this.save()
        },
        reset() {
            this.answers = []
            this.index = 1
            this.save()
        },
        isAlreadyAnswered() {
            // .find retourne undefined si on a jamais répondu à la question
            return this.answers.find(ans => ans.index === this.index) !== undefined
        },
        save() {
            localStorage.setItem("answers", JSON.stringify(this.answers))
            localStorage.setItem("index", this.index)
        }

    }
})