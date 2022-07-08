
import loginPage from '../support/pages/login'
import dashPage from '../support/pages/dash'

describe('dashboard', function () {
    context('quando o cliente faz um agendamento no app mobile', function () {

        const data = {
            costumer: {
                name: 'Nikki Sixx',
                email: 'sixx@motleycrue.com',
                password: 'pwd123',
                is_provider: false
            },
            provider: {
                name: 'Ramon Valdes',
                email: 'ramon@televisa.com',
                password: 'pwd123',
                is_provider: true
            },
            appointmentHour: '14:00'
        }

        before(function () {
            cy.postUser(data.provider)
            cy.postUser(data.costumer)

            cy.apiLogin(data.costumer)

            cy.setProviderId(data.provider.email)
            cy.createAppointment(data.appointmentHour)
        })

        it('o mesmo deve ser exibido no dashboard', function () {
            
            loginPage.go()
            loginPage.form(data.provider)
            loginPage.submit()

            dashPage.calendarShouldBeVisible()

            const day = Cypress.env('appointmentDay')
            dashPage.selectDay(day)

            dashPage.appointmentShouldBeVisible(data.costumer, data.appointmentHour)
        })
    })
})