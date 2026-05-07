import { JsonController, Get, Post, Body, Authorized, Req, Param } from "routing-controllers";
import { Service } from "typedi";
import { RoadmapService } from "../services/roadmap.service";

@JsonController("/roadmaps")
@Service()
export class RoadmapController {
  constructor(private roadmapService: RoadmapService) {}

  @Post("/")
  @Authorized() // 🔒 Only logged-in users can create
  async create(@Req() req: any, @Body() data: any) {
    return await this.roadmapService.createRoadmap(req.user.id, data);
  }

  @Get("/my")
  @Authorized() // 🔒 Only see YOUR roadmaps
  async getMyRoadmaps(@Req() req: any) {
    return await this.roadmapService.getUserRoadmaps(req.user.id);
  }

  @Get("/:id") // 🌐 Public route: Anyone can see a roadmap
  async getOne(@Param("id") id: string) {
    return await this.roadmapService.getRoadmapById(id);
  }
}
