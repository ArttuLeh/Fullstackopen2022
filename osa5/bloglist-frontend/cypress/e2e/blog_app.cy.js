describe('Blog app', function() {
   beforeEach(function() {
      cy.visit('')
      cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
      const user = {
         name: 'admin',
         username: 'test',
         password: 'test'
      }
      cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
   })

   it('Login form is shown', function() {
      cy.visit('')
      cy.contains('Blogs')
      cy.contains('Login')
      cy.contains('Blog app, Deparment of Computer Science, University of Helsinki')
   })

   describe('Login', function() {
      it('succeeds with correct credentials', function() {
         cy.contains('Login').click()
         cy.get('#username').type('test')
         cy.get('#password').type('test')
         cy.get('#login-button').click()

         cy.contains('admin is logged in')
      })

      it('fails with wrong credentials', function() {
         cy.contains('Login').click()
         cy.get('#username').type('test')
         cy.get('#password').type('teest')
         cy.get('#login-button').click()

         cy.get('.error')
            .should('contain', 'wrong username or password')
            .and('have.css', 'color', 'rgb(255, 0, 0)')
            .and('have.css', 'border-style', 'solid')

         cy.get('html').should('not.contain', 'admin logged in')
      })
   })

   describe('When logged in', function() {
      beforeEach(function() {
         cy.login({ username: 'test', password: 'test' })
         cy.createBlog({ title: 'test blog', author: 'admin', url: 'testing.com' })
      })

      it('A blog can be created', function() {
         cy.contains('New blog').click()
         cy.get('#title').type('test blog')
         cy.get('#author').type('admin')
         cy.get('#url').type('testing.com')
         cy.get('#create-button').click()
         cy.contains('test blog')
      })

      it('A blog can be liked', function() {
         cy.contains('view').click()
         cy.contains('like').click()

         cy.get('.error')
            .should('contain', 'like succefully added')
            .and('have.css', 'color', 'rgb(255, 0, 0)')
            .and('have.css', 'border-style', 'solid')
         cy.get('#blogLike').should('contain', '1')
      })

      it('A blog can be deleted', function() {
         cy.contains('view').click()
         cy.contains('remove').click()

         cy.on('window:confirm', function(text) {
            //cy.get(text).should('contain', 'Remove blog test blog by admin')
            expect(text).to.contain('Remove blog test blog by admin')
         })
         cy.get('html').should('not.contain', 'test blog')
      })

      describe('Logged in another user', function() {
         beforeEach(function() {
            const testUser = {
               name: 'test-user',
               username: 'testUser',
               password: 'testuser'
            }
            cy.request('POST', `${Cypress.env('BACKEND')}/users`, testUser)
            cy.login({ username: 'testUser', password: 'testuser' })
         })

         it('Only blog owner see remove button', function() {
            cy.contains('view').click()

            cy.get('.blog-view').should('not.contain', 'remove')
         })
      })
      describe('When there are many blogs', function() {
         beforeEach(function() {
            cy.createBlog({ title: 'test blog 2', author: 'admin', url: 'testing.com' })
            cy.createBlog({ title: 'test blog 3', author: 'admin', url: 'testing.com' })
         })

         it('Blogs are sorted by most likes', function() {
            cy.get('.blog')
               .eq(1)
               .should('contain', 'test blog 2')
               .contains('view').click()
            cy.contains('like')
               .click().wait(6000)
               .click()
            cy.contains('hide').click().wait(6000)

            cy.get('.blog')
               .eq(2)
               .should('contain', 'test blog 3')
               .contains('view').click()
            cy.contains('like').click()
            cy.contains('hide').click()

            cy.get('.blog').eq(0).should('contain', 'test blog 2')
            cy.get('.blog').eq(1).should('contain', 'test blog 3')
            cy.get('.blog').eq(2).should('contain', 'test blog')
         })
      })
   })
})