Cypress.Commands.add('login', ({ username, password }) => {
   cy.request('POST', `${Cypress.env('BACKEND')}/login`,{
      username, password
   }).then(({ body }) => {
      localStorage.setItem('loggedBlogappUser', JSON.stringify(body))
      cy.visit(`${Cypress.env('baseUrl')}`)
   })
})

Cypress.Commands.add('createBlog', ({ title, author, url }) => {
   cy.request({
      url: `${Cypress.env('BACKEND')}/blogs`,
      method: 'POST',
      body: { title, author, url },
      headers: {
         'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogappUser')).token}`
      }
   })

   cy.visit(`${Cypress.env('baseUrl')}`)
})