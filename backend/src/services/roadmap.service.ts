import { Service } from "typedi";
import { AppDataSource } from "../data-source";
import { Roadmap } from "../entities/roadmap.entity";
import { AIService } from "./ai.service";

@Service()
export class RoadmapService {
  constructor(
    private aiService: AIService
  ) {}

  private roadmapRepo = AppDataSource.getRepository(Roadmap);


  async generateAIRoadmap(skill: string) {
    return await this.aiService.generateRoadmap(skill);
  }

    async generateAndSaveAIRoadmap(userId: string, skill: string) {
    // 1. Get the structured data from AI
    const aiResult = await this.aiService.generateRoadmap(skill);

    // 2. Save it as a real Roadmap in our database!
    const newRoadmap = this.roadmapRepo.create({
      title: aiResult.title,
      description: aiResult.description,
      steps: aiResult.steps, 
      user: { id: userId } as any,
    });

    return await this.roadmapRepo.save(newRoadmap);
  }


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
