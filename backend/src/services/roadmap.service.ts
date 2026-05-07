import { Service } from "typedi";
import { AppDataSource } from "../data-source";
import { Roadmap } from "../entities/roadmap.entity";

@Service()
export class RoadmapService {
  private roadmapRepo = AppDataSource.getRepository(Roadmap);

  async createRoadmap(userId: string, data: Partial<Roadmap>) {
    const newRoadmap = this.roadmapRepo.create({
      ...data,
      user: { id: userId } as any, 
    });
    return await this.roadmapRepo.save(newRoadmap);
  }

  async getUserRoadmaps(userId: string) {
    return await this.roadmapRepo.find({
      where: { user: { id: userId } },
    });
  }

  async getRoadmapById(id: string) {
    return await this.roadmapRepo.findOne({
      where: { id },
      relations: ["user"], 
    });
  }
}
