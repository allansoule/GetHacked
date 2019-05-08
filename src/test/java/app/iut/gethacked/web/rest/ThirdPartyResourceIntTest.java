package app.iut.gethacked.web.rest;

import app.iut.gethacked.GetHackedApp;

import app.iut.gethacked.domain.ThirdParty;
import app.iut.gethacked.repository.ThirdPartyRepository;
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
 * Test class for the ThirdPartyResource REST controller.
 *
 * @see ThirdPartyResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GetHackedApp.class)
public class ThirdPartyResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private ThirdPartyRepository thirdPartyRepository;

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

    private MockMvc restThirdPartyMockMvc;

    private ThirdParty thirdParty;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ThirdPartyResource thirdPartyResource = new ThirdPartyResource(thirdPartyRepository);
        this.restThirdPartyMockMvc = MockMvcBuilders.standaloneSetup(thirdPartyResource)
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
    public static ThirdParty createEntity(EntityManager em) {
        ThirdParty thirdParty = new ThirdParty()
            .name(DEFAULT_NAME);
        return thirdParty;
    }

    @Before
    public void initTest() {
        thirdParty = createEntity(em);
    }

    @Test
    @Transactional
    public void createThirdParty() throws Exception {
        int databaseSizeBeforeCreate = thirdPartyRepository.findAll().size();

        // Create the ThirdParty
        restThirdPartyMockMvc.perform(post("/api/third-parties")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(thirdParty)))
            .andExpect(status().isCreated());

        // Validate the ThirdParty in the database
        List<ThirdParty> thirdPartyList = thirdPartyRepository.findAll();
        assertThat(thirdPartyList).hasSize(databaseSizeBeforeCreate + 1);
        ThirdParty testThirdParty = thirdPartyList.get(thirdPartyList.size() - 1);
        assertThat(testThirdParty.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createThirdPartyWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = thirdPartyRepository.findAll().size();

        // Create the ThirdParty with an existing ID
        thirdParty.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restThirdPartyMockMvc.perform(post("/api/third-parties")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(thirdParty)))
            .andExpect(status().isBadRequest());

        // Validate the ThirdParty in the database
        List<ThirdParty> thirdPartyList = thirdPartyRepository.findAll();
        assertThat(thirdPartyList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllThirdParties() throws Exception {
        // Initialize the database
        thirdPartyRepository.saveAndFlush(thirdParty);

        // Get all the thirdPartyList
        restThirdPartyMockMvc.perform(get("/api/third-parties?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(thirdParty.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }
    
    @Test
    @Transactional
    public void getThirdParty() throws Exception {
        // Initialize the database
        thirdPartyRepository.saveAndFlush(thirdParty);

        // Get the thirdParty
        restThirdPartyMockMvc.perform(get("/api/third-parties/{id}", thirdParty.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(thirdParty.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingThirdParty() throws Exception {
        // Get the thirdParty
        restThirdPartyMockMvc.perform(get("/api/third-parties/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateThirdParty() throws Exception {
        // Initialize the database
        thirdPartyRepository.saveAndFlush(thirdParty);

        int databaseSizeBeforeUpdate = thirdPartyRepository.findAll().size();

        // Update the thirdParty
        ThirdParty updatedThirdParty = thirdPartyRepository.findById(thirdParty.getId()).get();
        // Disconnect from session so that the updates on updatedThirdParty are not directly saved in db
        em.detach(updatedThirdParty);
        updatedThirdParty
            .name(UPDATED_NAME);

        restThirdPartyMockMvc.perform(put("/api/third-parties")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedThirdParty)))
            .andExpect(status().isOk());

        // Validate the ThirdParty in the database
        List<ThirdParty> thirdPartyList = thirdPartyRepository.findAll();
        assertThat(thirdPartyList).hasSize(databaseSizeBeforeUpdate);
        ThirdParty testThirdParty = thirdPartyList.get(thirdPartyList.size() - 1);
        assertThat(testThirdParty.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingThirdParty() throws Exception {
        int databaseSizeBeforeUpdate = thirdPartyRepository.findAll().size();

        // Create the ThirdParty

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restThirdPartyMockMvc.perform(put("/api/third-parties")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(thirdParty)))
            .andExpect(status().isBadRequest());

        // Validate the ThirdParty in the database
        List<ThirdParty> thirdPartyList = thirdPartyRepository.findAll();
        assertThat(thirdPartyList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteThirdParty() throws Exception {
        // Initialize the database
        thirdPartyRepository.saveAndFlush(thirdParty);

        int databaseSizeBeforeDelete = thirdPartyRepository.findAll().size();

        // Delete the thirdParty
        restThirdPartyMockMvc.perform(delete("/api/third-parties/{id}", thirdParty.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ThirdParty> thirdPartyList = thirdPartyRepository.findAll();
        assertThat(thirdPartyList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ThirdParty.class);
        ThirdParty thirdParty1 = new ThirdParty();
        thirdParty1.setId(1L);
        ThirdParty thirdParty2 = new ThirdParty();
        thirdParty2.setId(thirdParty1.getId());
        assertThat(thirdParty1).isEqualTo(thirdParty2);
        thirdParty2.setId(2L);
        assertThat(thirdParty1).isNotEqualTo(thirdParty2);
        thirdParty1.setId(null);
        assertThat(thirdParty1).isNotEqualTo(thirdParty2);
    }
}
