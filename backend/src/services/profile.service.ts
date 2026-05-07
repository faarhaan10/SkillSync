import { Service } from "typedi";
import { AppDataSource } from "../data-source";
import { Profile } from "../entities/profile.entity";
import { Raw } from "typeorm";

@Service()
export class ProfileService {
  private profileRepo = AppDataSource.getRepository(Profile);

  async getProfileByUserId(userId: string) {
    return await this.profileRepo.findOne({
      where: {
        user: {
          id: userId,
        },
      },
    });
  }

  async updateProfile(userId: string, payload: Partial<Profile>) {
    const profile = await this.getProfileByUserId(userId);
    if (!profile) throw new Error("Profile not found");

    if (payload.skills) {
    payload.skills = payload.skills.map(skill => ({
      ...skill,
      displayName: skill.name,
      name: skill.name.toLowerCase()

    }));
  }
    // Merge the new data into the existing profile
    Object.assign(profile, payload);
    return await this.profileRepo.save(profile);
  }

  async searchBySkill(skills: string[]) {
    const queryArray = skills.map(name=>({name:name.toLowerCase()}));
    
    return await this.profileRepo.find({
      where: {
        skills: Raw((alias) => `${alias} @> :query`, {
          query: JSON.stringify(queryArray),
        }),
      },
      relations: ["user"],
    });
  }
}
