
import dashPage from '../support/pages/dash'

import { customer, provider, appointment } from '../support/factories/dash'

describe('dashboard', function () {
    context('quando o cliente faz um agendamento no app mobile', function () {

        before(function () {
            cy.postUser(provider)
            cy.postUser(customer)

            cy.apiLogin(customer)

            cy.setProviderId(provider.email)
            cy.createAppointment(appointment.hour)
        })

        it('o mesmo deve ser exibido no dashboard', function () {
            
            const day = Cypress.env('appointmentDay')
            
            cy.uiLogin(provider)

            dashPage.calendarShouldBeVisible()
            dashPage.selectDay(day)
            dashPage.appointmentShouldBeVisible(customer, appointment.hour)
        })
    })
})