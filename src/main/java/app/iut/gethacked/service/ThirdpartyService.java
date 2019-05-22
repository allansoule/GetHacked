package app.iut.gethacked.service;

import app.iut.gethacked.repository.ThirdPartyRepository;
import org.springframework.stereotype.Component;

@Component
public class ThirdpartyService {

    UserService userService;

    ThirdPartyRepository thirdPartyRepository;

//    public List<ThirdParty> findAllByCurrent(){
//        User user = userService.getUserWithAuthorities().get();
//        return thirdPartyRepository.findAllBy
//    }

}
