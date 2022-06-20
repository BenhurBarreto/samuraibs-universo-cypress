
import { el } from './elements'

class Header {

    userLoggedIn(username) {
        cy.get(el.fullName, {timeout: 7000})
            .should('be.visible')
            .should('have.text', username)
    }
}

export default new Header()