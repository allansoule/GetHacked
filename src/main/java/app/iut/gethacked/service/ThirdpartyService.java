package app.iut.gethacked.service;

import app.iut.gethacked.domain.ThirdParty;
import app.iut.gethacked.domain.User;
import app.iut.gethacked.domain.UserThirdPartyMembership;
import app.iut.gethacked.repository.ThirdPartyRepository;
import app.iut.gethacked.repository.UserRepository;
import app.iut.gethacked.service.dto.RegisterThirdPartyMemberRequestDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Component
public class ThirdpartyService {

    @Autowired
    UserService userService;

    @Autowired
    UserRepository userRepository;

    @Autowired
    ThirdPartyRepository thirdPartyRepository;

    public ThirdParty thirdpartyOfCurrentUser(){
       ThirdParty res;
       User jhiUser = userService.getUserWithAuthorities().get();
       res = thirdPartyRepository.findAllByMembers_User(jhiUser).get(0);
     return res;
    }

    public ThirdParty registerThirdPartyMember(RegisterThirdPartyMemberRequestDTO request){
        User ownerToAdd;
        try {
            ownerToAdd = userRepository.findOneByLogin(request.ownerToAdd).get();
        }catch(Exception ex){
            throw new RuntimeException("User not found", ex);
        }
        ThirdParty thirdParty = new ThirdParty();
        thirdParty.setName(request.name);
        UserThirdPartyMembership member = new UserThirdPartyMembership(thirdParty,ownerToAdd,request.type);
        thirdParty.getMembers().add(member);
        thirdParty = thirdPartyRepository.save(thirdParty);
        return thirdParty;
    }


}
