//-- ================================================================================= --//
//-- Summary :: User Cypress tests - User logs in
//-- Created :: 11Apr2022
//-- Author  :: Duncan Appelbe (duncan.appelbe@ndorms.ox.ac.uk)
//-- ================================================================================= --//
describe( '002.001 - User logs in, view pages', () => {
    context('Authenticated - User', () => {
        it('Setup database', function () {
            cy.task('queryDb', `INSERT INTO studydetails (id, created_at, updated_at, studyname,
                                                          apiurl, apikey, studylogo, studyemail,
                                                          studyphone, studyaddress, studyaccruallink,
                                                          uploadedpis, studyrandomisationreportid,
                                                          randonumfield, allocationfield, sitenamefield,
                                                          studystatusreportid, expectedrecruits,
                                                          randodatefield) VALUES (1, '2022-04-22 10:42:53',
                                                                                  '2022-04-22 10:42:53', 'CRAFFT',
                                                                                  'https://redcap-cctr.octru.ox.ac.uk/api/',
                                                                                  'A71604FCD642E04E82712BAFBDFE09AF',
                                                                                  'signature.png',
                                                                                  'crafft@ndorms.ox.ac.uk',
                                                                                  '01865 228929',
                                                                                  'Oxford Trauma\\r\\nKadoorie Centre\\r\\nNDORMS\\r\\nUniversity of Oxford\\r\\nJohn Radcliffe Hospital\\r\\nHeadley Way\\r\\nOxford OX3 9DU',
                                                                                  'https://kadoorie.octru.ox.ac.uk/CRAFFT_SIMS/Recruitment',
                                                                                  1, 579, 'ra_subj_id',
                                                                                  'ra_treat_alloc', 'ra_cte_id', 784,
                                                                                  784, 'ra_date');`).then((result) => {
                expect(result.affectedRows).to.equal(1)
            });

            cy.task('queryDb', `INSERT INTO users (id, name, email, email_verified_at,
                                                   password, remember_token, created_at, updated_at,
                                                   last_login_at, last_login_ip, randomisation_number,
                                                   studyid) VALUES (2, 'Test User',
                                                                                  'test.user@Noidea.com', NULL,
                                                                                  '$2y$10$8T9RWIS3n3WQPhKArjL/H.HhDs.PgNfJ8/usl/l/6ktInJvksbe62',
                                                                                  'Vp5Jh0f1beK5qDBnWCwpklr2mUmt6LwL2uqGhAKF4iVIe3JACKQRLSet5vLZ',
                                                                                  '2022-04-22 12:42:37',
                                                                                  '2022-09-20 16:15:20',
                                                                                  '2022-09-20 17:15:20',
                                                                                  '195.213.65.98',
                                                                                  'CR-RAC-10035',
                                                                                  1);`).then((result) => {
                expect(result.affectedRows).to.equal(1)
            });


        });
        it('Login as test.user@Noidea.com, confirm that the home page is displayed', () => {
            //-- Arrange
            cy.visit('/login');
            cy.get('[data-cy=login-input-email]')
                .clear()
                .type('test.user@Noidea.com');
            cy.get('[data-cy=login-input-password]')
                .clear()
                .type('MyPassword4PIPs');
            //-- Act
            cy.get('[data-cy=login-submit]').click();
            //-- Assert
            cy.url().should('eq', Cypress.config().baseUrl + '/home');
            //-- hdr & footer
            cy.get('[data-cy=navlink-pips-home]').should('be.visible');
            cy.get('#footer').should('be.visible');
            cy.get('#footer').contains('Contact').should('be.visible');
            cy.get('[data-cy=mailto-vb]').should('be.visible');
            cy.get('[data-cy=mailto-da]').should('be.visible');
            cy.get('#footer').contains('Funded By').should('be.visible');
            cy.get('[data-cy=logo-nihr]').should('be.visible');
            cy.get('#footer').contains('Hosted By').should('be.visible');
            cy.get('[data-cy=logo-octru]').should('be.visible');
            cy.get('[data-cy=link_foi]').should('be.visible');
            cy.get('[data-cy=link_privacy]').should('be.visible');
            cy.get('[data-cy=link_accessibility]').should('be.visible');
            //-- Welcome popup
            cy.get('[data-cy=welcome-alert]').should('be.visible');
            cy.get('[data-cy=welcome-hdr]').should('be.visible');
            cy.get('[data-cy=welcome-hdr]').should('contain.text','WELCOME');
            cy.get('[data-cy=w-p1]').should('contain.text','Hello Test User thank you for agreeing to log into and hopefully find this mini website (portal) useful.');
            cy.get('[data-cy=w-p2]').should('contain.text','The last time that you logged in was: ');
            cy.get('[data-cy=w-p3]').should('contain.text','If you wish to send a message to the Central CRAFFT study team – please click');
            cy.get('[data-cy=w-p4]').should('contain.text','If you wish to send a message or give any feedback to the PIPS team');
            cy.get('[data-cy=w-p5]').should('contain.text','Click on the X in the top right-hand corner to clear this message');
            //- Card #1
            cy.get('[data-cy=c1]').should('be.visible');
            cy.get('[data-cy=c1-hdr]').should('contain.text','This is the personalised portal for Test User in the CRAFFT study');
            cy.get('[data-cy=c1-b1]').should('contain.text','CR-RAC-10035');
            cy.get('[data-cy=c1-b1-h3]').should('contain.text','Your CRAFFT trial number');
            cy.get('[data-cy=c1-b2-hdr]').should('contain.text','You were recruited at the Royal Aberdeen Children\'s Hospital RAC.');
            cy.get('[data-cy=c1-b3-hdr]').should('contain.text','You were allocated to the Non-surgical casting arm.');
            cy.get('[data-cy=c1-b4-hdr]').should('contain.text','You are the 1st participant who has agreed to take part in the CRAFFT trial.');
            //-- Card 2
            cy.get('[data-cy=c2]').should('be.visible');
            cy.get('[data-cy=c2-btn1]').should('contain.text','Where am I in my study journey?');
            cy.get('[data-cy=c2-btn2]').should('contain.text','The progress of the CRAFFT study');
            cy.get('[data-cy=c2-btn3]').should('contain.text','What is due for me next?');
            cy.get('[data-cy=c2-btn4]').should('contain.text','How do I contact the CRAFFT study team?');
            //-- card 3
            cy.get('[data-cy=c3]').should('be.visible');
            cy.get('[data-cy=c3-hdr]').should('contain.text','Download');
            cy.get('[data-cy=c3-pips-hdr]').should('contain.text','PIPS');
            cy.get('[data-cy=c3-study-hdr]').should('contain.text','CRAFFT');
        });
        it('Tidy database', function() {
            cy.task('queryDb', 'DELETE FROM studydetails where id = 1;').then((result) => {
                expect(result.affectedRows).to.equal(1)
            });
            cy.task('queryDb', 'DELETE FROM users where id = 2;').then((result) => {
                expect(result.affectedRows).to.equal(1)
            });
        });
    });
});
