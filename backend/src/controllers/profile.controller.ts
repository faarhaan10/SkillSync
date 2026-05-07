import { Authorized, Body, Get, JsonController, Put, QueryParam, Req } from "routing-controllers";
import { Service } from "typedi";
import { ProfileService } from "../services/profile.service";


@JsonController('/profile')
@Service()
@Authorized()
export class ProfileController{
    constructor(private profileService: ProfileService) {} 


    @Get('/')
    async getMyProfile(@Req() req:any){
        const userId = req.user.id;
        return await this.profileService.getProfileByUserId(userId);
    }


    @Get('/search')
    async searchBySkill(@QueryParam("skills",{isArray:true}) skills:string[]){
        if(!skills || skills.length === 0) return [];
        return await this.profileService.searchBySkill(skills);
    }


    @Put('/')
    async updateMyProfile(@Req() req:any,@Body() data:any){
        const userId = req.user.id; 
        return await this.profileService.updateProfile(userId,data);
    }
    @Put('/:userId')
    async updateProfileByUserId(@Req() req:any,@Body() data:any){
        const userId = req.params.userId;  
        return await this.profileService.updateProfile(userId,data);
    }





}