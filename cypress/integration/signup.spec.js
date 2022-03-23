
import faker from '@faker-js/faker'
import signupPage from '../support/pages/signup'


describe('cadastro', function () {

    context('quando o usuário é novato', function () {

        const user = {
            name: 'Benhur Barreto',
            email: 'benhurbbs@gmail.com',
            password: 'pwd123'
        }

        before(function () {
            cy.task('removeUser', user.email)
                .then(function (result) {
                    console.log(result)
                })
        })

        it('deve cadastrar um novo usuário', function () {

            signupPage.go()
            signupPage.form(user)
            signupPage.submit()
            signupPage.toast.shouldHaveText('Agora você se tornou um(a) Samurai, faça seu login para seus agendamentos!')
        })
    })

    context('quando o email já existe', function () {
        const user = {
            name: 'João Lucas',
            email: 'joao@samuraibs.com',
            password: 'pwd123',
            is_provider: true
        }

        before(function () {
            cy.task('removeUser', user.email)
                .then(function (result) {
                    console.log(result)
                })

            cy.request(
                'POST',
                'http://localhost:3333/users',
                user
            ).then(function (response) {
                expect(response.status).to.eq(200)
            })
        })

        it('não deve cadastrar o usuário', function () {

            signupPage.go()
            signupPage.form(user)
            signupPage.submit()
            signupPage.toast.shouldHaveText('Email já cadastrado para outro usuário.')
        })
    })

    context('quando o email é incorreto', function () {
        const user = {
            name: 'Elizabeth Olsen',
            email: 'liza.yahoo.com',
            password: 'pwd123',
        }

        it('deve exibir mensagem de alerta', function() {
            signupPage.go()
            signupPage.form(user)
            signupPage.submit()
            signupPage.alertHaveText('Informe um email válido')
        })
    })

    context('quando a senha tem menos de 6 caracteres', function() {

        const passwords = ['1', '22', '333', '4444', '55555']

        beforeEach(function() {
            signupPage.go()
        })

        passwords.forEach(function(p) {
            it('não deve cadastrar com a senha: ' + p, function() {

                const user = {
                    name: 'Jason Friday',
                    email: 'jason@gmail.com',
                    password: p,
                }

                signupPage.form(user)
                signupPage.submit()
            })
        })

        afterEach(function(){
            signupPage.alertHaveText('Pelo menos 6 caracteres')
        })
    })

    context.only('quando não preencho nenhum dos campos', function() {
        const alertMessages = [
            'Nome é obrigatório',
            'E-mail é obrigatório',
            'Senha é obrigatória'
        ]

        before(function() {
            signupPage.go()
            signupPage.submit()
        })

        alertMessages.forEach(function(alert) {

            it('deve exibir ' + alert.toLocaleLowerCase(), function(){
                signupPage.alertHaveText(alert)
            })
        })
    })
})