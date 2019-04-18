package app.iut.gethacked.web.rest;

import app.iut.gethacked.GetHackedApp;

import app.iut.gethacked.domain.UserThirdPartyMembership;
import app.iut.gethacked.repository.UserThirdPartyMembershipRepository;
import app.iut.gethacked.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;


import static app.iut.gethacked.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the UserThirdPartyMembershipResource REST controller.
 *
 * @see UserThirdPartyMembershipResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GetHackedApp.class)
public class UserThirdPartyMembershipResourceIntTest {

    private static final String DEFAULT_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_TYPE = "BBBBBBBBBB";

    @Autowired
    private UserThirdPartyMembershipRepository userThirdPartyMembershipRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restUserThirdPartyMembershipMockMvc;

    private UserThirdPartyMembership userThirdPartyMembership;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final UserThirdPartyMembershipResource userThirdPartyMembershipResource = new UserThirdPartyMembershipResource(userThirdPartyMembershipRepository);
        this.restUserThirdPartyMembershipMockMvc = MockMvcBuilders.standaloneSetup(userThirdPartyMembershipResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static UserThirdPartyMembership createEntity(EntityManager em) {
        UserThirdPartyMembership userThirdPartyMembership = new UserThirdPartyMembership()
            .type(DEFAULT_TYPE);
        return userThirdPartyMembership;
    }

    @Before
    public void initTest() {
        userThirdPartyMembership = createEntity(em);
    }

    @Test
    @Transactional
    public void createUserThirdPartyMembership() throws Exception {
        int databaseSizeBeforeCreate = userThirdPartyMembershipRepository.findAll().size();

        // Create the UserThirdPartyMembership
        restUserThirdPartyMembershipMockMvc.perform(post("/api/user-third-party-memberships")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userThirdPartyMembership)))
            .andExpect(status().isCreated());

        // Validate the UserThirdPartyMembership in the database
        List<UserThirdPartyMembership> userThirdPartyMembershipList = userThirdPartyMembershipRepository.findAll();
        assertThat(userThirdPartyMembershipList).hasSize(databaseSizeBeforeCreate + 1);
        UserThirdPartyMembership testUserThirdPartyMembership = userThirdPartyMembershipList.get(userThirdPartyMembershipList.size() - 1);
        assertThat(testUserThirdPartyMembership.getType()).isEqualTo(DEFAULT_TYPE);
    }

    @Test
    @Transactional
    public void createUserThirdPartyMembershipWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = userThirdPartyMembershipRepository.findAll().size();

        // Create the UserThirdPartyMembership with an existing ID
        userThirdPartyMembership.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restUserThirdPartyMembershipMockMvc.perform(post("/api/user-third-party-memberships")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userThirdPartyMembership)))
            .andExpect(status().isBadRequest());

        // Validate the UserThirdPartyMembership in the database
        List<UserThirdPartyMembership> userThirdPartyMembershipList = userThirdPartyMembershipRepository.findAll();
        assertThat(userThirdPartyMembershipList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllUserThirdPartyMemberships() throws Exception {
        // Initialize the database
        userThirdPartyMembershipRepository.saveAndFlush(userThirdPartyMembership);

        // Get all the userThirdPartyMembershipList
        restUserThirdPartyMembershipMockMvc.perform(get("/api/user-third-party-memberships?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(userThirdPartyMembership.getId().intValue())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())));
    }
    
    @Test
    @Transactional
    public void getUserThirdPartyMembership() throws Exception {
        // Initialize the database
        userThirdPartyMembershipRepository.saveAndFlush(userThirdPartyMembership);

        // Get the userThirdPartyMembership
        restUserThirdPartyMembershipMockMvc.perform(get("/api/user-third-party-memberships/{id}", userThirdPartyMembership.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(userThirdPartyMembership.getId().intValue()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingUserThirdPartyMembership() throws Exception {
        // Get the userThirdPartyMembership
        restUserThirdPartyMembershipMockMvc.perform(get("/api/user-third-party-memberships/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUserThirdPartyMembership() throws Exception {
        // Initialize the database
        userThirdPartyMembershipRepository.saveAndFlush(userThirdPartyMembership);

        int databaseSizeBeforeUpdate = userThirdPartyMembershipRepository.findAll().size();

        // Update the userThirdPartyMembership
        UserThirdPartyMembership updatedUserThirdPartyMembership = userThirdPartyMembershipRepository.findById(userThirdPartyMembership.getId()).get();
        // Disconnect from session so that the updates on updatedUserThirdPartyMembership are not directly saved in db
        em.detach(updatedUserThirdPartyMembership);
        updatedUserThirdPartyMembership
            .type(UPDATED_TYPE);

        restUserThirdPartyMembershipMockMvc.perform(put("/api/user-third-party-memberships")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedUserThirdPartyMembership)))
            .andExpect(status().isOk());

        // Validate the UserThirdPartyMembership in the database
        List<UserThirdPartyMembership> userThirdPartyMembershipList = userThirdPartyMembershipRepository.findAll();
        assertThat(userThirdPartyMembershipList).hasSize(databaseSizeBeforeUpdate);
        UserThirdPartyMembership testUserThirdPartyMembership = userThirdPartyMembershipList.get(userThirdPartyMembershipList.size() - 1);
        assertThat(testUserThirdPartyMembership.getType()).isEqualTo(UPDATED_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingUserThirdPartyMembership() throws Exception {
        int databaseSizeBeforeUpdate = userThirdPartyMembershipRepository.findAll().size();

        // Create the UserThirdPartyMembership

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUserThirdPartyMembershipMockMvc.perform(put("/api/user-third-party-memberships")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userThirdPartyMembership)))
            .andExpect(status().isBadRequest());

        // Validate the UserThirdPartyMembership in the database
        List<UserThirdPartyMembership> userThirdPartyMembershipList = userThirdPartyMembershipRepository.findAll();
        assertThat(userThirdPartyMembershipList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteUserThirdPartyMembership() throws Exception {
        // Initialize the database
        userThirdPartyMembershipRepository.saveAndFlush(userThirdPartyMembership);

        int databaseSizeBeforeDelete = userThirdPartyMembershipRepository.findAll().size();

        // Delete the userThirdPartyMembership
        restUserThirdPartyMembershipMockMvc.perform(delete("/api/user-third-party-memberships/{id}", userThirdPartyMembership.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<UserThirdPartyMembership> userThirdPartyMembershipList = userThirdPartyMembershipRepository.findAll();
        assertThat(userThirdPartyMembershipList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(UserThirdPartyMembership.class);
        UserThirdPartyMembership userThirdPartyMembership1 = new UserThirdPartyMembership();
        userThirdPartyMembership1.setId(1L);
        UserThirdPartyMembership userThirdPartyMembership2 = new UserThirdPartyMembership();
        userThirdPartyMembership2.setId(userThirdPartyMembership1.getId());
        assertThat(userThirdPartyMembership1).isEqualTo(userThirdPartyMembership2);
        userThirdPartyMembership2.setId(2L);
        assertThat(userThirdPartyMembership1).isNotEqualTo(userThirdPartyMembership2);
        userThirdPartyMembership1.setId(null);
        assertThat(userThirdPartyMembership1).isNotEqualTo(userThirdPartyMembership2);
    }
}
