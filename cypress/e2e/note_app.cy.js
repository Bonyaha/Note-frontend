describe('Note app', function () {
  beforeEach(function () {
    cy.visit('')
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Roman Skidan',
      username: 'Roman',
      password: 'Bonyaha',
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
  })

  it('front page can be opened', function () {
    cy.contains('Notes')
    cy.contains(
      'Note app, Department of Computer Science, University of Helsinki 2023'
    )
  })

  it('user can log in', function () {
    cy.contains('log in').click()
    cy.get('#username').type('Roman')
    cy.get('#password').type('Bonyaha')
    cy.get('#login-button').click()
    cy.contains('Roman Skidan logged in')
  })

  it('login fails with wrong password', function () {
    cy.contains('log in').click()
    cy.get('#username').type('mluukkai')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()

    cy.get('.error')
      .should('contain', 'Wrong credentials')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid')

    cy.get('html').should('not.contain', 'Roman Skidan logged in')
    cy.contains('Roman Skidan logged in').should('not.exist') //the same as above
  })

  describe('when logged in', function () {
    beforeEach(function () {
      /* cy.contains('log in').click()
      cy.get('input:first').type('Roman')
      cy.get('input:last').type('Bonyaha')
      cy.get('#login-button').click() */
      cy.login({ username: 'Roman', password: 'Bonyaha' })
    })

    it('a new note can be created', function () {
      cy.contains('new note').click()
      cy.get('#newNote').type('a note created by cypress')
      cy.contains('save').click()
      cy.contains('a note created by cypress')
    })

    describe('and several notes exist', function () {
      beforeEach(function () {
        /* cy.contains('new note').click()
        cy.get('#newNote').type('another note cypress')
        cy.contains('save').click() */
        cy.createNote({ content: 'first note', important: false })
        cy.createNote({ content: 'second note', important: false })
        cy.createNote({ content: 'third note', important: false })
      })
      /*
      it('one of those can be made important', function () {
        cy.contains('second note')
        cy.contains('make important').click()

        cy.contains('second note')
        cy.contains('make not important')
      }) */
      it('one of those can be made important', function () {
        cy.contains('li', 'second note').find('button').eq(1).as('theButton') // selects the first button found within the li
        cy.get('@theButton').click()
        cy.get('@theButton').should('contain', 'make not important')
      })
    })
  })
  it('then example', function () {
    cy.get('button').then((buttons) => {
      console.log('number of buttons', buttons.length)
      cy.wrap(buttons[0]).click()
    })
  })
})
